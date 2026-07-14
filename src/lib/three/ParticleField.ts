import * as THREE from 'three';

/**
 * Small instanced dodecahedra scattered in a shell around the Core —
 * read as scan nodes / packets. One InstancedMesh, one draw call,
 * regardless of count, so the mobile "lite" tier just gets fewer instances.
 */
export class ParticleField {
	mesh: THREE.InstancedMesh;
	private count: number;
	private speeds: Float32Array;
	private radii: Float32Array;
	private angles: Float32Array;
	private heights: Float32Array;
	private dummy = new THREE.Object3D();

	constructor(count: number) {
		this.count = count;
		const geometry = new THREE.OctahedronGeometry(0.045, 0);
		const material = new THREE.MeshStandardMaterial({
			color: 0x9fb4c9,
			emissive: 0x1f5f8b,
			emissiveIntensity: 0.6,
			roughness: 0.4,
			metalness: 0.3
		});
		this.mesh = new THREE.InstancedMesh(geometry, material, count);
		this.mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);

		this.speeds = new Float32Array(count);
		this.radii = new Float32Array(count);
		this.angles = new Float32Array(count);
		this.heights = new Float32Array(count);

		for (let i = 0; i < count; i++) {
			this.radii[i] = 2.4 + Math.random() * 3.2;
			this.angles[i] = Math.random() * Math.PI * 2;
			this.heights[i] = (Math.random() - 0.5) * 4.5;
			this.speeds[i] = 0.02 + Math.random() * 0.05;
			this.setInstance(i, 0);
		}
		this.mesh.instanceMatrix.needsUpdate = true;
	}

	private setInstance(i: number, dt: number) {
		this.angles[i] += this.speeds[i] * dt;
		const r = this.radii[i];
		const a = this.angles[i];
		this.dummy.position.set(Math.cos(a) * r, this.heights[i] + Math.sin(a * 0.6) * 0.3, Math.sin(a) * r);
		const scale = 0.6 + Math.sin(a * 3.0) * 0.2;
		this.dummy.scale.setScalar(scale);
		this.dummy.rotation.set(a, a * 0.7, 0);
		this.dummy.updateMatrix();
		this.mesh.setMatrixAt(i, this.dummy.matrix);
	}

	update(dt: number) {
		for (let i = 0; i < this.count; i++) this.setInstance(i, dt);
		this.mesh.instanceMatrix.needsUpdate = true;
	}

	dispose() {
		this.mesh.geometry.dispose();
		(this.mesh.material as THREE.Material).dispose();
	}
}
