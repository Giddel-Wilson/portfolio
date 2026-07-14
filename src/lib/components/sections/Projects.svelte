<script lang="ts">
	import { onMount } from 'svelte';
	import SplitReveal from '../SplitReveal.svelte';
	import { registerSectionTrigger, revealOnEnter } from '../../scroll/timeline';
	import { projects } from '../../data/projects';

	let sectionEl: HTMLElement;
	let rows: HTMLElement[] = [];

	onMount(() => {
		const st = registerSectionTrigger(sectionEl, 'projects');
		const kills = rows.map((row) => revealOnEnter(Array.from(row.children), { stagger: 0.08 }));
		return () => {
			st.kill();
			kills.forEach((k) => k.scrollTrigger?.kill());
		};
	});
</script>

<section
	id="projects"
	bind:this={sectionEl}
	class="min-h-[100svh] p-[clamp(1.5rem,5vw,3rem)] py-[clamp(4rem,10vw,7rem)]"
>
	<SplitReveal
		as="h2"
		text="Shipped, then attacked."
		class="mb-[clamp(2.5rem,6vw,4.5rem)] block max-w-[26ch] font-display text-display-md tracking-tight text-balance text-ink"
	/>

	<div class="flex max-w-6xl flex-col gap-[clamp(3rem,8vw,6rem)]">
		{#each projects as project, i (project.id)}
			<article
				bind:this={rows[i]}
				class="grid grid-cols-1 gap-[clamp(1.5rem,4vw,3.5rem)] border-t border-line pt-[clamp(1.5rem,3vw,2.25rem)] {i %
					2 ===
				1
					? 'md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]'
					: 'md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]'}"
			>
				<div class={i % 2 === 1 ? 'md:order-2' : ''}>
					<span class="font-mono text-[0.75rem] text-faint">{project.year}</span>
					<h3 class="my-1.5 font-display text-[clamp(2rem,4vw,3.2rem)] leading-[0.98] text-ink">
						{project.name}
					</h3>
					<p
						class="font-mono text-[0.75rem] tracking-[0.04em] {project.state === 'secure'
							? 'text-secure'
							: 'text-breach'}"
					>
						{project.role}
					</p>
				</div>

				<div>
					<p class="max-w-[56ch] text-[1.05rem] leading-[1.65] text-muted">{project.summary}</p>
					<ul class="mt-4 flex flex-col gap-2">
						{#each project.details as d (d)}
							<li
								class="relative pl-[1.1rem] text-[0.92rem] leading-[1.5] text-muted before:absolute before:top-[0.55em] before:left-0 before:h-[5px] before:w-[5px] before:content-[''] {project.state ===
								'secure'
									? 'before:bg-secure'
									: 'before:bg-faint'}"
							>
								{d}
							</li>
						{/each}
					</ul>
					<div class="mt-5 flex flex-wrap gap-2">
						{#each project.stack as tech (tech)}
							<span class="border border-line px-2.5 py-1.5 font-mono text-[0.68rem] text-faint">
								{tech}
							</span>
						{/each}
					</div>
				</div>
			</article>
		{/each}
	</div>
</section>
