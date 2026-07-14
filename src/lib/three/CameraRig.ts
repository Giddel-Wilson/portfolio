import * as THREE from 'three';
import { damp, clamp } from '../utils/math';

interface Keyframe {
	position: THREE.Vector3;
	lookAt: THREE.Vector3;
	fov: number;
}

// One keyframe per section (hero, about, stack, projects, security, contact).
// The camera path is a straight interpolation between consecutive keyframes —
// simple, predictable, and easy to art-direct by eye.
const KEYFRAMES: Keyframe[] = [
	{ position: new THREE.Vector3(0, 0.1, 4.4), lookAt: new THREE.Vector3(0, 0, 0), fov: 42 }, // hero
	{ position: new THREE.Vector3(2.6, 0.6, 2.4), lookAt: new THREE.Vector3(0, 0.1, 0), fov: 44 }, // about
	{ position: new THREE.Vector3(-2.8, 1.1, 2.0), lookAt: new THREE.Vector3(0, 0.2, 0), fov: 46 }, // stack
	{ position: new THREE.Vector3(-1.6, -0.8, 3.4), lookAt: new THREE.Vector3(0.3, 0, 0), fov: 40 }, // projects
	{ position: new THREE.Vector3(1.4, -0.3, 2.2), lookAt: new THREE.Vector3(-0.2, 0.1, 0), fov: 38 }, // security
	{ position: new THREE.Vector3(0, 0.4, 5.2), lookAt: new THREE.Vector3(0, 0, 0), fov: 36 } // contact
];

export class CameraRig {
	camera: THREE.PerspectiveCamera;

	private pathTarget = new THREE.Vector3();
	private lookTarget = new THREE.Vector3();
	private currentPos = new THREE.Vector3().copy(KEYFRAMES[0].position);
	private currentLook = new THREE.Vector3().copy(KEYFRAMES[0].lookAt);
	private currentFov = KEYFRAMES[0].fov;
	private targetFov = KEYFRAMES[0].fov;

	// Mouse parallax, kept as a separate offset so it never fights the scroll path.
	private mouseTarget = new THREE.Vector2(0, 0);
	private mouseCurrent = new THREE.Vector2(0, 0);
	private mouseStrength = 0.28;

	constructor(aspect: number) {
		this.camera = new THREE.PerspectiveCamera(42, aspect, 0.1, 100);
		this.camera.position.copy(this.currentPos);
	}

	setScrollProgress(progress: number) {
		const p = clamp(progress, 0, 1) * (KEYFRAMES.length - 1);
		const i = Math.floor(p);
		const t = p - i;
		const a = KEYFRAMES[Math.min(i, KEYFRAMES.length - 1)];
		const b = KEYFRAMES[Math.min(i + 1, KEYFRAMES.length - 1)];
		this.pathTarget.lerpVectors(a.position, b.position, t);
		this.lookTarget.lerpVectors(a.lookAt, b.lookAt, t);
		this.targetFov = THREE.MathUtils.lerp(a.fov, b.fov, t);
	}

	/** nx, ny expected in [-1, 1] (normalized device pointer coords) */
	setPointer(nx: number, ny: number) {
		this.mouseTarget.set(nx * this.mouseStrength, -ny * this.mouseStrength * 0.6);
	}

	setReducedParallax(reduced: boolean) {
		this.mouseStrength = reduced ? 0.06 : 0.28;
	}

	update(dt: number) {
		// Damp toward the scroll-driven path target — smooth, frame-rate independent.
		this.currentPos.x = damp(this.currentPos.x, this.pathTarget.x, 3.2, dt);
		this.currentPos.y = damp(this.currentPos.y, this.pathTarget.y, 3.2, dt);
		this.currentPos.z = damp(this.currentPos.z, this.pathTarget.z, 3.2, dt);
		this.currentLook.x = damp(this.currentLook.x, this.lookTarget.x, 4, dt);
		this.currentLook.y = damp(this.currentLook.y, this.lookTarget.y, 4, dt);
		this.currentLook.z = damp(this.currentLook.z, this.lookTarget.z, 4, dt);
		this.currentFov = damp(this.currentFov, this.targetFov, 2.5, dt);

		// Layer the mouse offset on top, damped independently for a lighter feel.
		this.mouseCurrent.x = damp(this.mouseCurrent.x, this.mouseTarget.x, 5, dt);
		this.mouseCurrent.y = damp(this.mouseCurrent.y, this.mouseTarget.y, 5, dt);

		this.camera.position.set(
			this.currentPos.x + this.mouseCurrent.x,
			this.currentPos.y + this.mouseCurrent.y,
			this.currentPos.z
		);
		this.camera.lookAt(this.currentLook);
		if (Math.abs(this.camera.fov - this.currentFov) > 0.001) {
			this.camera.fov = this.currentFov;
			this.camera.updateProjectionMatrix();
		}
	}

	setAspect(aspect: number) {
		this.camera.aspect = aspect;
		this.camera.updateProjectionMatrix();
	}
}
