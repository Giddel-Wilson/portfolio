import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let lenis: Lenis | null = null;

export function initLenis(reducedMotion: boolean): Lenis {
	gsap.registerPlugin(ScrollTrigger);

	lenis = new Lenis({
		duration: reducedMotion ? 0.1 : 0.85,
		easing: (t: number) => 1 - Math.pow(1 - t, 4), // ease-out-quart — snappier settle than cubic
		wheelMultiplier: 1.15,
		smoothWheel: !reducedMotion,
		syncTouch: false // native touch scroll feels better than simulated inertia on mobile
	});

	lenis.on('scroll', ScrollTrigger.update);

	gsap.ticker.add((time) => {
		lenis?.raf(time * 1000);
	});
	gsap.ticker.lagSmoothing(0);

	return lenis;
}

export function getLenis(): Lenis | null {
	return lenis;
}

export function destroyLenis() {
	lenis?.destroy();
	lenis = null;
}
