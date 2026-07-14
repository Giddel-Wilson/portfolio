import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

// Chromatic aberration + film grain + vignette, combined into one pass so a
// "lite" build only pays for a single extra fullscreen draw instead of three.
const GRAIN_ABERRATION_SHADER = {
	uniforms: {
		tDiffuse: { value: null },
		uTime: { value: 0 },
		uAberration: { value: 0.0025 },
		uGrain: { value: 0.035 },
		uVignette: { value: 0.35 }
	},
	vertexShader: /* glsl */ `
		varying vec2 vUv;
		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
		}
	`,
	fragmentShader: /* glsl */ `
		uniform sampler2D tDiffuse;
		uniform float uTime;
		uniform float uAberration;
		uniform float uGrain;
		uniform float uVignette;
		varying vec2 vUv;

		float rand(vec2 co) {
			return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
		}

		void main() {
			vec2 centered = vUv - 0.5;
			float dist = length(centered);
			vec2 dir = normalize(centered + 1e-6);
			float amount = uAberration * dist;

			float r = texture2D(tDiffuse, vUv - dir * amount).r;
			float g = texture2D(tDiffuse, vUv).g;
			float b = texture2D(tDiffuse, vUv + dir * amount).b;
			vec3 color = vec3(r, g, b);

			float grain = (rand(vUv * vec2(1024.0, 1024.0) + uTime) - 0.5) * uGrain;
			color += grain;

			float vig = smoothstep(0.9, 0.25, dist * (1.0 + uVignette));
			color *= mix(1.0 - uVignette * 0.6, 1.0, vig);

			gl_FragColor = vec4(color, 1.0);
		}
	`
};

export class PostFX {
	composer: EffectComposer;
	private grainPass: ShaderPass;
	private time = 0;

	constructor(
		renderer: THREE.WebGLRenderer,
		scene: THREE.Scene,
		camera: THREE.Camera,
		size: { width: number; height: number },
		tier: 'full' | 'lite'
	) {
		this.composer = new EffectComposer(renderer);
		this.composer.addPass(new RenderPass(scene, camera));

		if (tier === 'full') {
			const bloom = new UnrealBloomPass(
				new THREE.Vector2(size.width, size.height),
				0.65, // strength
				0.55, // radius
				0.72 // threshold
			);
			this.composer.addPass(bloom);
		}

		this.grainPass = new ShaderPass(GRAIN_ABERRATION_SHADER);
		if (tier === 'lite') {
			this.grainPass.uniforms.uGrain.value = 0.02;
			this.grainPass.uniforms.uAberration.value = 0.0015;
		}
		this.composer.addPass(this.grainPass);
		this.composer.addPass(new OutputPass());
	}

	update(dt: number) {
		this.time += dt;
		this.grainPass.uniforms.uTime.value = this.time;
	}

	setSize(width: number, height: number) {
		this.composer.setSize(width, height);
	}
}
