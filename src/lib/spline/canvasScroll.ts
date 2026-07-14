import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface CanvasScrollOptions {
	canvas: HTMLElement;
	heroEl: HTMLElement;
	aboutEl: HTMLElement;
	onSettled: () => void;
	reducedMotion: boolean;
}

// Tunables, all in viewport-relative units (vw/vh) — predictable on any
// screen size and completely independent of the Spline scene's own scale.
const START_X_VW = 26; // how far right of center it starts in the hero
const SINK_Y_VH = 22; // how far it sinks as it hands off to Stack
const ZOOM_TOTAL = 0.16; // total scale growth across the whole journey
const EXIT_FADE_START = 0.12;
const EXIT_FADE_END = 1;
// Shifts when the exit/fade phase begins. Positive = starts later (more
// presence before it fades); negative = starts earlier (disappears sooner).
// There's no exact seconds-to-pixels conversion for a scroll-linked
// animation — this is the actual lever for "when", though, unlike scrub
// (which only affects smoothing/lag, never timing).
const EXIT_DELAY_PX = 120;

export function setupCanvasScroll(opts: CanvasScrollOptions) {
	gsap.registerPlugin(ScrollTrigger);
	const { canvas } = opts;

	if (opts.reducedMotion) {
		gsap.set(canvas, { x: 0, y: 0, scale: 1 });
		opts.onSettled();
		return { destroy: () => {} };
	}

	// Applied synchronously, immediately — the hero starting position is set
	// the instant this runs, not on the first ScrollTrigger tick, so there's
	// no possible frame where the canvas is still at its default (centered)
	// CSS transform before GSAP catches up.
	gsap.set(canvas, { x: `${START_X_VW}vw`, y: 0, scale: 1, transformOrigin: '50% 50%' });

	let settled = false;

	// Phase 1 — hero → about: translate right-to-center, first half of the zoom ramp.
	const arrive = ScrollTrigger.create({
		trigger: opts.heroEl,
		start: 'top top',
		end: 'bottom top',
		scrub: 0.5,
		onUpdate: (self) => {
			const p = self.progress;
			gsap.set(canvas, {
				x: `${START_X_VW * (1 - p)}vw`,
				scale: 1 + ZOOM_TOTAL * 0.5 * p
			});
			if (!settled && p > 0.97) {
				settled = true;
				opts.onSettled();
			}
		}
	});

	// Phase 2 (implicit): idles centered between the two triggers while
	// About's text reveals — gated on opts.onSettled, read by About.svelte.

	// Phase 3 — about exiting into Stack: sink downward, mask out the lower
	// portion (the "waist") so it dissolves instead of hard-clipping, and
	// fully disappear with real margin before Stack is on screen. The
	// trigger itself ends at the About section's midpoint rather than its
	// true bottom edge, and the opacity ramp finishes well before even that —
	// two layers of buffer, since scrub smoothing means the visual state
	// trails the actual scroll position slightly on a fast scroll.
	const exit = ScrollTrigger.create({
		trigger: opts.aboutEl,
		start: `center center+=${EXIT_DELAY_PX}px`,
		end: 'bottom center',
		scrub: 0.5,
		onUpdate: (self) => {
			const p = self.progress;
			gsap.set(canvas, {
				y: `${SINK_Y_VH * p}vh`,
				scale: 1 + ZOOM_TOTAL * (0.5 + 0.5 * p)
			});
			const maskStart = 100 - p * 90; // 100% visible -> 10% masked
			canvas.style.maskImage = `linear-gradient(to bottom, black ${maskStart}%, transparent 100%)`;
			canvas.style.setProperty('-webkit-mask-image', canvas.style.maskImage);
			// Keep the exit fade in step with the entrance: it begins later and
			// runs across almost the whole trigger instead of collapsing early.
			const fadeOut = Math.min(Math.max((p - EXIT_FADE_START) / (EXIT_FADE_END - EXIT_FADE_START), 0), 1);
			canvas.style.opacity = String(1 - fadeOut);
		}
	});

	return {
		destroy: () => {
			arrive.kill();
			exit.kill();
		}
	};
}
