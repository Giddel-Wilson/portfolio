import * as THREE from 'three';

// Compact Ashima/Gustavson 3D simplex noise — standard public-domain-style
// GLSL utility used to drive the vertex displacement below.
const SNOISE_GLSL = /* glsl */ `
vec3 mod289(vec3 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
vec4 mod289(vec4 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
vec4 permute(vec4 x){ return mod289(((x*34.0)+1.0)*x); }
vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }
float snoise(vec3 v){
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(
            i.z + vec4(0.0, i1.z, i2.z, 1.0))
          + i.y + vec4(0.0, i1.y, i2.y, 1.0))
          + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}
`;

// Plain hex rather than CSS oklch() strings — three.js Color.setStyle support
// for the oklch() function varies by version, hex is guaranteed everywhere.
// These are chosen to match the CSS --color-breach / --color-secure tokens.
const BREACH_COLOR = new THREE.Color(0xff7a33);
const SECURE_COLOR = new THREE.Color(0x5eead4);
const BREACH_EMISSIVE = new THREE.Color(0xb8420a);
const SECURE_EMISSIVE = new THREE.Color(0x1f5f8b);

export class Core {
	group: THREE.Group;
	private mesh: THREE.Mesh;
	private shell: THREE.LineSegments;
	private material: THREE.MeshPhysicalMaterial;
	private uniforms: { uJagged: { value: number }; uTime: { value: number } } | null = null;
	private time = 0;
	private currentMorph = 0;

	constructor(quality: 'full' | 'lite' | 'static') {
		this.group = new THREE.Group();
		const detail = quality === 'full' ? 4 : 2;
		const geometry = new THREE.IcosahedronGeometry(1.35, detail);

		this.material = new THREE.MeshPhysicalMaterial({
			color: BREACH_COLOR.clone(),
			emissive: BREACH_EMISSIVE.clone(),
			emissiveIntensity: 0.35,
			metalness: 0.25,
			roughness: 0.55,
			transmission: 0,
			thickness: 1.2,
			ior: 1.45,
			clearcoat: 0.4,
			clearcoatRoughness: 0.3,
			flatShading: true
		});

		this.material.onBeforeCompile = (shader) => {
			shader.uniforms.uJagged = { value: 0.42 };
			shader.uniforms.uTime = { value: 0 };
			shader.vertexShader =
				`uniform float uJagged;\nuniform float uTime;\n${SNOISE_GLSL}\n` + shader.vertexShader;
			shader.vertexShader = shader.vertexShader.replace(
				'#include <begin_vertex>',
				`#include <begin_vertex>
				float n = snoise(position * 1.8 + uTime * 0.06);
				transformed += normalize(normal) * n * uJagged;`
			);
			this.uniforms = shader.uniforms as unknown as {
				uJagged: { value: number };
				uTime: { value: number };
			};
		};
		// Force compilation so onBeforeCompile fires before first frame.
		this.material.needsUpdate = true;

		this.mesh = new THREE.Mesh(geometry, this.material);
		this.mesh.castShadow = true;
		this.mesh.receiveShadow = true;

		// Ghost wireframe shell — reads as the "attack surface" scaffolding,
		// dissolves as the Core hardens into its secure state.
		const edges = new THREE.EdgesGeometry(geometry);
		const shellMaterial = new THREE.LineBasicMaterial({
			color: BREACH_COLOR.clone(),
			transparent: true,
			opacity: 0.5,
			blending: THREE.AdditiveBlending,
			depthWrite: false
		});
		this.shell = new THREE.LineSegments(edges, shellMaterial);
		this.shell.scale.setScalar(1.015);

		this.group.add(this.mesh, this.shell);
	}

	/** morph: 0 = fully breach (exposed/amber), 1 = fully secure (hardened/cyan glass) */
	update(dt: number, morph: number) {
		this.time += dt;
		this.currentMorph = morph;

		if (this.uniforms) {
			this.uniforms.uTime.value = this.time;
			this.uniforms.uJagged.value = 0.5 * (1 - morph) + 0.03; // never fully flat — keeps it alive
		}

		this.material.color.lerpColors(BREACH_COLOR, SECURE_COLOR, morph);
		this.material.emissive.lerpColors(BREACH_EMISSIVE, SECURE_EMISSIVE, morph);
		this.material.metalness = THREE.MathUtils.lerp(0.25, 0.05, morph);
		this.material.roughness = THREE.MathUtils.lerp(0.6, 0.08, morph);
		this.material.transmission = THREE.MathUtils.lerp(0, 0.85, morph);
		this.material.clearcoat = THREE.MathUtils.lerp(0.4, 1, morph);
		this.material.emissiveIntensity = THREE.MathUtils.lerp(0.4, 0.55, morph);

		const shellMat = this.shell.material as THREE.LineBasicMaterial;
		shellMat.color.lerpColors(BREACH_COLOR, SECURE_COLOR, morph);
		shellMat.opacity = THREE.MathUtils.lerp(0.55, 0.12, morph);

		this.group.rotation.y += dt * 0.06;
		this.group.rotation.x = Math.sin(this.time * 0.15) * 0.08;
	}

	dispose() {
		this.mesh.geometry.dispose();
		this.material.dispose();
		this.shell.geometry.dispose();
		(this.shell.material as THREE.Material).dispose();
	}
}
