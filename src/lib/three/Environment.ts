import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

/**
 * Generates a PMREM-processed environment map for realistic PBR reflections
 * and soft image-based lighting, without fetching an external .hdr file.
 * RoomEnvironment is a procedural three.js scene built for exactly this —
 * it's a genuine physically-plausible light rig, not a placeholder.
 *
 * Swap-in point: if you'd rather use a real captured HDRI (e.g. Poly Haven),
 * replace the `pmrem.fromScene(...)` call below with
 * `new RGBELoader().load(url, tex => pmrem.fromEquirectangular(tex))`.
 */
export function createEnvironment(renderer: THREE.WebGLRenderer) {
	const pmrem = new THREE.PMREMGenerator(renderer);
	pmrem.compileEquirectangularShader();
	const envScene = new RoomEnvironment();
	const envMap = pmrem.fromScene(envScene, 0.04).texture;
	pmrem.dispose();
	return envMap;
}
