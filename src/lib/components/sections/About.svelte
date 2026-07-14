<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import SplitReveal from '../SplitReveal.svelte';
	import { registerSectionTrigger } from '../../scroll/timeline';
	import { scene } from '../../stores/scene.svelte';

	let sectionEl: HTMLElement;
	let leftCol: HTMLElement;
	let rightCol: HTMLElement;
	let played = false;

	onMount(() => {
		scene.setAboutEl(sectionEl);
		const st = registerSectionTrigger(sectionEl, 'about');
		return () => st.kill();
	});

	// Fires once the robot reports it has arrived and centered — not before,
	// regardless of how far the section itself has scrolled into view.
	$effect(() => {
		if (scene.robotSettled && !played) {
			played = true;
			gsap.fromTo(
				[leftCol, rightCol],
				{ opacity: 0, y: 22, filter: 'blur(6px)' },
				{ opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, stagger: 0.15, ease: 'power3.out' }
			);
		}
	});
</script>

<section
	id="about"
	bind:this={sectionEl}
	class="grid min-h-svh grid-cols-1 items-center gap-28 p-[clamp(1.5rem,5vw,3rem)] text-left md:grid-cols-[minmax(0,1fr)_minmax(14rem,26vw)_minmax(0,1fr)]"
>
	<div
		bind:this={leftCol}
		class="order-2 justify-self-start text-left md:order-0 md:justify-self-end md:text-right"
	>
		<SplitReveal
			as="h2"
			text="Two disciplines,"
			trigger="scroll"
			class="mb-5 block font-display text-display-md tracking-tight text-balance text-ink"
		/>
		<p class="max-w-[34ch] text-base leading-[1.7] text-muted md:ml-auto">
			I've been shipping production software as a full-stack developer since 2021, and just as long unable to leave what I build alone until I've tried to break it too.
		</p>
	</div>

	<div class="order-1 min-h-[35vh] md:order-0 md:min-h-[40vh]" aria-hidden="true"></div>

	<div bind:this={rightCol} class="order-3 text-left md:order-0">
		<SplitReveal
			as="h2"
			text="one habit."
			trigger="scroll"
			class="mb-5 block font-display text-display-md tracking-tight text-balance text-ink"
		/>
		<p class="max-w-[34ch] text-base leading-[1.7] text-muted">
			Most of my time goes into shipping real products, usually built with my core stack of SvelteKit, TypeScript, and Postgres. The rest goes into taking those same systems apart, using OWASP-guided penetration testing, and Defensys, my capstone project, which scores vulnerabilities with a trained classifier instead of a flat checklist.
		</p>
	</div>
</section>
