<script lang="ts">
	import { onMount } from 'svelte';
	import SplitReveal from '../SplitReveal.svelte';
	import { registerSectionTrigger } from '../../scroll/timeline';
	import { scene } from '../../stores/scene.svelte';

	let sectionEl: HTMLElement;
	onMount(() => {
		scene.setHeroEl(sectionEl);
		const st = registerSectionTrigger(sectionEl, 'hero');
		return () => st.kill();
	});
</script>

<section
	id="hero"
	bind:this={sectionEl}
	class="relative grid min-h-[100svh] grid-cols-1 items-center overflow-hidden p-[clamp(1.5rem,5vw,3rem)] pb-[clamp(3rem,10vw,5rem)] lg:grid-cols-2 lg:pb-[clamp(1.5rem,5vw,3rem)]"
>
	<div class="relative z-[2] order-2 max-w-2xl lg:order-none lg:max-w-[35vw]">
		<p class="mb-3 font-mono text-[0.72rem] tracking-[0.14em] text-breach">
			FULL-STACK DEV · WEB SECURITY ANALYST
		</p>

		<SplitReveal
			as="h1"
			text="Wilson"
			trigger="immediate"
			class="mb-2.5 block w-full font-display text-[clamp(3rem,2.4rem+4vw,6.5rem)] leading-[0.92] tracking-tight text-balance text-ink"
		/>

		<SplitReveal
			as="h2"
			text="Builds systems. Breaks them on purpose."
			trigger="immediate"
			delay={0.35}
			class="mb-5 block w-full font-display text-[clamp(1.4rem,1.1rem+1.6vw,2.2rem)] leading-[1.08] tracking-tight text-balance text-muted"
		/>

		<p class="w-full text-base leading-[1.65] text-muted">
			Computer Science graduate from the University of Port Harcourt. I build full-stack products end to end, then attack the same surface with OWASP-guided tooling before anyone else gets the chance to.
		</p>
	</div>

	<!-- Reserved for the robot on the persistent canvas layer beneath — kept
	     deliberately empty so nothing here competes with it. -->
	<div class="order-1 min-h-[45vh] lg:order-none lg:min-h-0" aria-hidden="true"></div>
</section>
