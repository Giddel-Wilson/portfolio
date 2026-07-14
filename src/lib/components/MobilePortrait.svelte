<script lang="ts">
	import { onDestroy } from 'svelte';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import meSideView from '$lib/assets/meSideView.png';
	import meBackView from '$lib/assets/meBackView.png';
	import { scene } from '../stores/scene.svelte';

	let sidePortrait: HTMLImageElement;
	let backPortrait: HTMLImageElement;
	let wired = false;
	let heroTrigger: ScrollTrigger | null = null;
	let aboutTrigger: ScrollTrigger | null = null;

	function clamp01(value: number) {
		return Math.min(Math.max(value, 0), 1);
	}

	function applyPortraitState(
		element: HTMLImageElement,
		progress: number,
		{ startFade = 0.72, travel = 14 }: { startFade?: number; travel?: number }
	) {
		const motion = clamp01(progress);
		const fade = motion <= startFade ? 0 : clamp01((motion - startFade) / (1 - startFade));
		const lift = motion <= 0.08 ? 0 : (motion - 0.08) * travel;
		gsap.set(element, {
			y: `${lift}vh`,
			opacity: 1 - fade,
			scale: 1 - motion * 0.04
		});
	}

	$effect(() => {
		if (wired) return;
		if (!sidePortrait || !backPortrait || !scene.heroEl || !scene.aboutEl) return;

		wired = true;
		gsap.registerPlugin(ScrollTrigger);

		if (scene.reduceMotion) {
			gsap.set(sidePortrait, { y: 0, opacity: 1, scale: 1 });
			gsap.set(backPortrait, { y: 0, opacity: 0, scale: 1 });
			return;
		}

		gsap.set(sidePortrait, { y: 0, opacity: 1, scale: 1, transformOrigin: '50% 50%' });
		gsap.set(backPortrait, { y: 0, opacity: 0, scale: 1, transformOrigin: '50% 50%' });

		heroTrigger = ScrollTrigger.create({
			trigger: scene.heroEl,
			start: 'top top',
			end: 'bottom top',
			scrub: 0.55,
			onUpdate: (self) => {
				const p = self.progress;
				applyPortraitState(sidePortrait, p, { startFade: 0.68, travel: 14 });
			}
		});

		aboutTrigger = ScrollTrigger.create({
			trigger: scene.aboutEl,
			start: 'top top',
			end: 'bottom top',
			scrub: 0.55,
			onUpdate: (self) => {
				const p = self.progress;
				const show = clamp01(p / 0.15);
				const fadeOut = p <= 0.42 ? 0 : clamp01((p - 0.42) / 0.58);
				gsap.set(backPortrait, {
					y: `${Math.max(0, p - 0.1) * 16}vh`,
					opacity: show * (1 - fadeOut),
					scale: 1 - p * 0.04
				});
			}
		});

		return () => {
			heroTrigger?.kill();
			aboutTrigger?.kill();
		};
	});

	onDestroy(() => {
		heroTrigger?.kill();
		aboutTrigger?.kill();
	});
</script>

<div
	class="pointer-events-none fixed inset-0 z-0 flex items-center justify-center overflow-hidden xl:hidden"
	aria-hidden="true"
>
	<div class="relative h-[min(74svh,38rem)] w-[min(92vw,30rem)] translate-y-[clamp(-2rem,-4vh,0rem)]">
		<img
			bind:this={sidePortrait}
			src={meSideView}
			alt=""
			class="absolute inset-0 h-full w-full object-contain object-bottom motion-reduce:transition-none"
		/>

		<img
			bind:this={backPortrait}
			src={meBackView}
			alt=""
			class="absolute inset-0 h-full w-full object-contain object-center motion-reduce:transition-none"
		/>
	</div>
</div>