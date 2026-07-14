import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export interface SplineVec {
	x: number;
	y: number;
	z: number;
}
export interface SplineObjectLike {
	position: SplineVec;
	scale: SplineVec;
}

interface RobotScrollOptions {
	heroEl: HTMLElement;
	aboutEl: HTMLElement;
	maskTarget: HTMLElement; // element the "sink and fade" mask is applied to
	onSettled: () => void; // fires once, when the robot finishes arriving at center
	reducedMotion: boolean;
}

// --- Tunables --------------------------------------------------------------
// These are offsets from the robot's own resting position/scale in the Spline
// scene, not absolute coordinates. Run the dev build and watch the live
// "pos:" readout in the bottom-left panel while you scroll — that's the
// robot's actual position in scene units, so you can see directly whether
// these offsets are moving it far enough, rather than guessing blind.
//   START_OFFSET_X  how far right of center the robot starts in the hero (in
//                    Spline scene units). Flip the sign if it moves left instead.
//   SINK_OFFSET_Y   how far it sinks (in scene units) as it hands off to Stack.
//   ZOOM_AMOUNT     total fractional scale growth across the whole journey
//                    (0.18 = ends 18% bigger than it started).
const START_OFFSET_X = 900;
const SINK_OFFSET_Y = 500;
const ZOOM_AMOUNT = 0.18;

export function setupRobotScroll(robot: SplineObjectLike, opts: RobotScrollOptions) {
	gsap.registerPlugin(ScrollTrigger);

	const baseX = robot.position.x;
	const baseY = robot.position.y;
	const baseScale = robot.scale.x;
	let settled = false;

	if (opts.reducedMotion) {
		// No scroll-linked transform at all — robot sits at its natural resting pose.
		opts.onSettled();
		return { destroy: () => {} };
	}

	// Phase 1 — hero → about: translate right-to-center, first half of the zoom ramp.
	const arrive = ScrollTrigger.create({
		trigger: opts.heroEl,
		start: 'top top',
		end: 'bottom top',
		scrub: 0.5,
		onUpdate: (self) => {
			const p = self.progress;
			robot.position.x = baseX + START_OFFSET_X * (1 - p);
			const scale = baseScale * (1 + ZOOM_AMOUNT * 0.5 * p);
			robot.scale.x = robot.scale.y = robot.scale.z = scale;

			if (!settled && p > 0.97) {
				settled = true;
				opts.onSettled();
			}
		}
	});

	// Phase 2 (implicit): robot idles centered between the two triggers below while
	// About's text reveals — gated on opts.onSettled, read by About.svelte.

	// Phase 3 — about exiting into Stack: sink downward, fade the lower portion
	// (the "waist") via a mask so it dissolves instead of getting hard-clipped
	// by the viewport edge as it exits.
	const exit = ScrollTrigger.create({
		trigger: opts.aboutEl,
		start: 'center center',
		end: 'bottom top',
		scrub: 0.5,
		onUpdate: (self) => {
			const p = self.progress;
			robot.position.y = baseY - SINK_OFFSET_Y * p;
			const scale = baseScale * (1 + ZOOM_AMOUNT * (0.5 + 0.5 * p));
			robot.scale.x = robot.scale.y = robot.scale.z = scale;

			const maskStart = 100 - p * 60; // 100% (fully visible) -> 40% (mostly masked)
			opts.maskTarget.style.maskImage = `linear-gradient(to bottom, black ${maskStart}%, transparent 100%)`;
			opts.maskTarget.style.webkitMaskImage = opts.maskTarget.style.maskImage;
			opts.maskTarget.style.opacity = String(1 - Math.max(0, p - 0.75) / 0.25);
		}
	});

	return {
		destroy: () => {
			arrive.kill();
			exit.kill();
		}
	};
}
