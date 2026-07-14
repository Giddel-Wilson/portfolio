<script lang="ts">
	import { onMount } from 'svelte';
	import SplitReveal from '../SplitReveal.svelte';
	import { registerSectionTrigger, revealOnEnter } from '../../scroll/timeline';
	import { skillGroups } from '../../data/skills';

	let sectionEl: HTMLElement;
	let listsEl: HTMLElement;

	onMount(() => {
		const st = registerSectionTrigger(sectionEl, 'stack');
		const groups = Array.from(listsEl.querySelectorAll('[data-skill-group]'));
		revealOnEnter(groups, { stagger: 0.15, y: 20 });
		return () => st.kill();
	});
</script>

<section
	id="stack"
	bind:this={sectionEl}
	class="flex min-h-[100svh] flex-col justify-center p-[clamp(1.5rem,5vw,3rem)]"
>
	<SplitReveal
		as="h2"
		text="What runs underneath."
		class="mb-[clamp(2rem,5vw,3.5rem)] block max-w-[28ch] font-display text-display-md tracking-tight text-balance text-ink"
	/>

	<div
		bind:this={listsEl}
		class="grid max-w-4xl grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[clamp(2rem,6vw,5rem)]"
	>
		{#each skillGroups as group (group.id)}
			<div data-skill-group>
				<div class="mb-3.5 flex items-baseline justify-between border-b border-line pb-2.5">
					<h3 class="font-display text-[1.4rem] text-ink">{group.title}</h3>
					<span class="font-mono text-[0.68rem] tracking-[0.08em] text-faint">{group.note}</span>
				</div>
				<ul class="flex flex-col">
					{#each group.items as item (item)}
						<li class="border-b border-line/60 py-2.5 text-[0.98rem] text-muted last:border-b-0">
							{item}
						</li>
					{/each}
				</ul>
			</div>
		{/each}
	</div>
</section>
