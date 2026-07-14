<script lang="ts">
	import { onMount } from 'svelte';
	import SplitReveal from '../SplitReveal.svelte';
	import { registerSectionTrigger, revealOnEnter } from '../../scroll/timeline';

	let sectionEl: HTMLElement;
	let list: HTMLElement;

	onMount(() => {
		const st = registerSectionTrigger(sectionEl, 'security');
		revealOnEnter(Array.from(list.children), { stagger: 0.08 });
		return () => st.kill();
	});
</script>

<section
	id="security"
	bind:this={sectionEl}
	class="flex min-h-[100svh] flex-col justify-center gap-[clamp(2.5rem,6vw,4rem)] p-[clamp(1.5rem,5vw,3rem)]"
>
	<div class="max-w-2xl">
		<SplitReveal
			as="h2"
			text="Security isn't a pass at the end. It's the same read, run twice."
			class="mb-5 block font-display text-display-lg leading-[1.05] tracking-tight text-balance text-ink"
		/>
		<p class="max-w-[58ch] text-[1.05rem] leading-[1.65] text-muted">
			Defensys, my capstone project, scans real applications against the OWASP Top 10 and scores findings with a random forest classifier trained to tell a genuine vulnerability from false positives. Built the way I'd want a scanner to actually behave inside a CI pipeline, not a lab demo.
		</p>
	</div>

	<ul
		bind:this={list}
		class="grid max-w-6xl grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-[clamp(1.5rem,4vw,2.5rem)] border-t border-line pt-[clamp(1.5rem,3vw,2rem)]"
	>
		<li>
			<h4 class="mb-2.5 font-mono text-[0.72rem] tracking-[0.06em] text-secure">
				01 — Read as attacker
			</h4>
			<p class="text-[0.92rem] leading-[1.55] text-muted">
				Every feature gets probed the way an OWASP checklist would probe it, before it
				ships.
			</p>
		</li>
		<li>
			<h4 class="mb-2.5 font-mono text-[0.72rem] tracking-[0.06em] text-secure">
				02 — Score, don't guess
			</h4>
			<p class="text-[0.92rem] leading-[1.55] text-muted">
				Findings run through a trained classifier instead of a flat rules list, to cut
				noise.
			</p>
		</li>
		<li>
			<h4 class="mb-2.5 font-mono text-[0.72rem] tracking-[0.06em] text-secure">
				03 — Build the fix in
			</h4>
			<p class="text-[0.92rem] leading-[1.55] text-muted">
				Zero-knowledge auth, client-side encryption, race-safe writes: hardening as
				architecture, not as patchwork.
			</p>
		</li>
	</ul>
</section>
