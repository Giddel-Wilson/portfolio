<script lang="ts">
	import { onMount } from 'svelte';
	import SplitReveal from '../SplitReveal.svelte';
	import resume from '$lib/assets/GResume.pdf';
	import { registerSectionTrigger, revealOnEnter } from '../../scroll/timeline';

	let sectionEl: HTMLElement;
	let links: HTMLElement;

	const EMAIL = 'giddel100@gmail.com'; // TODO: replace with real address
	const socials = [
		{ label: 'GitHub', href: 'https://github.com/giddel-wilson' },
		{ label: 'LinkedIn', href: 'https://linkedin.com/in/yourhandle' },
		{ label: 'Resume', href: resume }
	];

	onMount(() => {
		const st = registerSectionTrigger(sectionEl, 'contact');
		revealOnEnter(Array.from(links.children), { stagger: 0.1 });
		return () => st.kill();
	});
</script>

<section
	id="contact"
	bind:this={sectionEl}
	class="flex min-h-[100svh] flex-col justify-between p-[clamp(1.5rem,5vw,3rem)]"
>
	<div class="my-auto max-w-3xl">
		<SplitReveal
			as="h2"
			text="Let's build something worth attacking."
			class="mb-[clamp(1.5rem,4vw,2.5rem)] block font-display text-display-lg leading-[1.02] tracking-tight text-balance text-ink"
		/>

		<a
			class="inline-block border-b border-secure/40 pb-[0.15em] font-display text-[clamp(1.25rem,3vw,1.9rem)] text-secure no-underline transition-colors duration-300 hover:border-secure"
			href="mailto:{EMAIL}"
		>
			{EMAIL}
		</a>

		<div bind:this={links} class="mt-[clamp(2rem,5vw,3rem)] flex gap-[clamp(1rem,3vw,2rem)]">
			{#each socials as s (s.label)}
				<a
					href={s.href}
					class="font-mono text-[0.8rem] tracking-[0.04em] text-muted no-underline transition-colors duration-300 hover:text-ink"
					target="_blank"
					rel="noreferrer"
				>
					{s.label} ↗
				</a>
			{/each}
		</div>
	</div>

	<footer
		class="flex justify-between border-t border-line pt-8 pb-16 md:pb-auto font-mono text-[0.68rem] text-faint"
	>
		<span>© {new Date().getFullYear()} Wilson</span>
		<span>Port Harcourt, NG</span>
	</footer>
</section>
