/**
 * Exponential damping (Freya Holmér's frame-rate independent lerp).
 * Use this everywhere instead of `current = target` or a naive
 * `current += (target - current) * 0.1` (which is frame-rate dependent).
 *
 * @param current  current value
 * @param target   target value
 * @param lambda   "speed" of the smoothing — higher = snappier
 * @param dt       delta time in seconds
 */
export function damp(current: number, target: number, lambda: number, dt: number): number {
	return target + (current - target) * Math.exp(-lambda * dt);
}

export function dampVec3(
	current: { x: number; y: number; z: number },
	target: { x: number; y: number; z: number },
	lambda: number,
	dt: number
) {
	current.x = damp(current.x, target.x, lambda, dt);
	current.y = damp(current.y, target.y, lambda, dt);
	current.z = damp(current.z, target.z, lambda, dt);
}

export function clamp(value: number, min: number, max: number): number {
	return Math.min(max, Math.max(min, value));
}

export function lerp(a: number, b: number, t: number): number {
	return a + (b - a) * t;
}

/** Remaps t from [0,1] within [edge0, edge1] and clamps, no smoothing applied. */
export function mapRange(
	value: number,
	inMin: number,
	inMax: number,
	outMin: number,
	outMax: number
): number {
	const t = clamp((value - inMin) / (inMax - inMin), 0, 1);
	return lerp(outMin, outMax, t);
}

/** Smoothstep — gentle ease at both ends of a 0-1 range. */
export function smoothstep(t: number): number {
	const x = clamp(t, 0, 1);
	return x * x * (3 - 2 * x);
}
