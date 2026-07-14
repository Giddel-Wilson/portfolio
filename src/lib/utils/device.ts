export type QualityTier = 'full' | 'lite' | 'static';
export type DeviceCategory = 'mobile' | 'tablet' | 'desktop';

export interface DeviceProfile {
	tier: QualityTier;
	category: DeviceCategory;
	prefersReducedMotion: boolean;
	isTouch: boolean;
	isMobile: boolean;
	isTablet: boolean;
	webglSupported: boolean;
}

// Viewport breakpoints — anything below TABLET_MAX_WIDTH is "medium or
// smaller" and gets folded into the same lite-tier bucket as phones.
const MOBILE_MAX_WIDTH = 768;
const TABLET_MAX_WIDTH = 1024;
// Some tablets (iPad Pro + keyboard, Surface-class devices) report a
// landscape width above TABLET_MAX_WIDTH, so touch capability gets one
// more chance to catch them before we call a device desktop.
const TOUCH_TABLET_MAX_WIDTH = 1366;

function supportsWebGL(): boolean {
	try {
		const canvas = document.createElement('canvas');
		return !!(
			window.WebGLRenderingContext &&
			(canvas.getContext('webgl2') || canvas.getContext('webgl'))
		);
	} catch {
		return false;
	}
}

/**
 * A single, honest read of the device's capability. Called once on mount.
 * Anything heavier than "lite" never gets constructed on mobile/tablet/
 * reduced-motion devices — this isn't a CSS toggle over an already-built
 * scene, it gates *whether the scene is built at all*.
 *
 * Only genuine desktop-class devices (wide viewport, no touchscreen
 * signal) get the "full" tier. Tablets and other medium-size/touch
 * devices share the same constraints as phones — mobile-class GPUs,
 * thermal throttling, battery sensitivity — so they're folded into
 * "lite" too, leaving desktop as the only tier that builds the heavy
 * scene.
 */
export function getDeviceProfile(): DeviceProfile {
	const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	// Primary input mechanism — kept for interaction/UI decisions.
	const isTouch = window.matchMedia('(pointer: coarse)').matches;
	// Does the device have a touchscreen at all, even if a mouse/trackpad
	// is the primary pointer (iPad + Magic Keyboard, Surface + type
	// cover)? More reliable signal for capability gating than isTouch.
	const hasCoarsePointer = window.matchMedia('(any-pointer: coarse)').matches;

	const width = window.innerWidth;

	const isMobile = width < MOBILE_MAX_WIDTH;
	const isTablet =
		!isMobile &&
		(width < TABLET_MAX_WIDTH || (hasCoarsePointer && width < TOUCH_TABLET_MAX_WIDTH));

	const category: DeviceCategory = isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop';

	const webglSupported = supportsWebGL();

	let tier: QualityTier = 'full';
	if (!webglSupported || prefersReducedMotion) tier = 'static';
	else if (isMobile || isTablet) tier = 'lite';

	return { tier, category, prefersReducedMotion, isTouch, isMobile, isTablet, webglSupported };
}