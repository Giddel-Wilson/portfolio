import * as THREE from 'three';

const VERTEX = /* glsl */ `
varying vec3 vNormal;
varying vec3 vWorldPos;
void main() {
	vNormal = normalize(normalMatrix * normal);
	vec4 worldPos = modelMatrix * vec4(position, 1.0);
	vWorldPos = worldPos.xyz;
	gl_Position = projectionMatrix * viewMatrix * worldPos;
}
`;

const FRAGMENT = /* glsl */ `
uniform vec3 uColorTop;
uniform vec3 uColorBottom;
uniform vec3 uAccent;
uniform float uAccentStrength;
varying vec3 vNormal;
varying vec3 vWorldPos;

void main() {
	float h = normalize(vWorldPos).y * 0.5 + 0.5;
	vec3 base = mix(uColorBottom, uColorTop, h);
	float fresnel = pow(1.0 - abs(dot(normalize(vNormal), vec3(0.0, 0.0, 1.0))), 2.5);
	vec3 color = mix(base, uAccent, fresnel * uAccentStrength);
	gl_FragColor = vec4(color, 1.0);
}
`;

export class BackgroundField {
	mesh: THREE.Mesh;
	private material: THREE.ShaderMaterial;

	constructor() {
		const geometry = new THREE.SphereGeometry(40, 32, 32);
		this.material = new THREE.ShaderMaterial({
			vertexShader: VERTEX,
			fragmentShader: FRAGMENT,
			side: THREE.BackSide,
			uniforms: {
				uColorTop: { value: new THREE.Color(0x14161c) },
				uColorBottom: { value: new THREE.Color(0x07080a) },
				uAccent: { value: new THREE.Color(0xff7a33) },
				uAccentStrength: { value: 0.12 }
			}
		});
		this.mesh = new THREE.Mesh(geometry, this.material);
	}

	update(morph: number) {
		const accent = new THREE.Color(0xff7a33).lerp(new THREE.Color(0x2a6f8f), morph);
		this.material.uniforms.uAccent.value.copy(accent);
		this.material.uniforms.uAccentStrength.value = 0.1 + morph * 0.08;
	}

	dispose() {
		this.mesh.geometry.dispose();
		this.material.dispose();
	}
}
