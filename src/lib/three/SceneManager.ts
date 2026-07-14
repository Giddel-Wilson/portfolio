import * as THREE from 'three';
import { Core } from './Core';
import { ParticleField } from './ParticleField';
import { BackgroundField } from './BackgroundField';
import { CameraRig } from './CameraRig';
import { PostFX } from './PostFX';
import { createEnvironment } from './Environment';

export type SceneTier = 'full' | 'lite';

export class SceneManager {
	private renderer: THREE.WebGLRenderer;
	private scene = new THREE.Scene();
	private cameraRig: CameraRig;
	private core!: Core;
	private particles!: ParticleField;
	private background!: BackgroundField;
	private postFX!: PostFX;
	private clock = new THREE.Clock();
	private rafId: number | null = null;
	private rimLight!: THREE.DirectionalLight;
	private morph = 0;
	private disposed = false;

	constructor(
		private canvas: HTMLCanvasElement,
		private tier: SceneTier,
		private dpr: number,
		private particleCount: number
	) {
		this.renderer = new THREE.WebGLRenderer({
			canvas,
			antialias: false, // handled by post-processing / native resolution instead
			powerPreference: 'high-performance',
			alpha: false
		});
		this.renderer.setPixelRatio(dpr);
		this.renderer.shadowMap.enabled = true;
		this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
		this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
		this.renderer.toneMappingExposure = 1.05;
		this.renderer.outputColorSpace = THREE.SRGBColorSpace;

		this.cameraRig = new CameraRig(canvas.clientWidth / Math.max(canvas.clientHeight, 1));
	}

	/** Weighted async setup so the loading screen reflects real work. */
	async init(onProgress: (p: number) => void) {
		onProgress(0.05);

		const envMap = createEnvironment(this.renderer);
		this.scene.environment = envMap;
		this.scene.background = null; // BackgroundField supplies the visible backdrop
		onProgress(0.3);

		this.core = new Core(this.tier);
		this.scene.add(this.core.group);

		this.particles = new ParticleField(this.particleCount);
		this.scene.add(this.particles.mesh);

		this.background = new BackgroundField();
		this.scene.add(this.background.mesh);
		onProgress(0.55);

		const hemi = new THREE.HemisphereLight(0x2a3038, 0x05060a, 0.6);
		this.scene.add(hemi);

		const key = new THREE.DirectionalLight(0xfff2e0, 1.6);
		key.position.set(3, 3.4, 2.6);
		key.castShadow = true;
		key.shadow.mapSize.set(1024, 1024);
		key.shadow.radius = 4;
		key.shadow.camera.near = 1;
		key.shadow.camera.far = 12;
		this.scene.add(key);

		this.rimLight = new THREE.DirectionalLight(0xff9a5a, 2.2);
		this.rimLight.position.set(-2.6, 0.6, -3.2);
		this.scene.add(this.rimLight);
		onProgress(0.75);

		this.postFX = new PostFX(
			this.renderer,
			this.scene,
			this.cameraRig.camera,
			{ width: this.canvas.clientWidth, height: this.canvas.clientHeight },
			this.tier
		);

		// Force shader compilation up front so the first real frame doesn't stutter.
		await this.renderer.compileAsync(this.scene, this.cameraRig.camera);
		onProgress(0.95);

		this.resize(this.canvas.clientWidth, this.canvas.clientHeight);
		onProgress(1);
	}

	setScrollProgress(p: number) {
		this.cameraRig.setScrollProgress(p);
	}

	setMorph(m: number) {
		this.morph = m;
	}

	setPointer(nx: number, ny: number) {
		this.cameraRig.setPointer(nx, ny);
	}

	setReducedParallax(reduced: boolean) {
		this.cameraRig.setReducedParallax(reduced);
	}

	resize(width: number, height: number) {
		this.renderer.setSize(width, height, false);
		this.cameraRig.setAspect(width / Math.max(height, 1));
		this.postFX?.setSize(width, height);
	}

	private tick = () => {
		if (this.disposed) return;
		const dt = Math.min(this.clock.getDelta(), 0.05);

		this.core.update(dt, this.morph);
		this.particles.update(dt);
		this.background.update(this.morph);
		this.cameraRig.update(dt);

		const rimColor = new THREE.Color(0xff9a5a).lerp(new THREE.Color(0x5eead4), this.morph);
		this.rimLight.color.copy(rimColor);

		this.postFX.update(dt);
		this.postFX.composer.render();

		this.rafId = requestAnimationFrame(this.tick);
	};

	start() {
		if (this.rafId !== null) return;
		this.clock.start();
		this.rafId = requestAnimationFrame(this.tick);
	}

	stop() {
		if (this.rafId !== null) cancelAnimationFrame(this.rafId);
		this.rafId = null;
	}

	dispose() {
		this.disposed = true;
		this.stop();
		this.core?.dispose();
		this.particles?.dispose();
		this.background?.dispose();
		this.renderer.dispose();
	}
}
