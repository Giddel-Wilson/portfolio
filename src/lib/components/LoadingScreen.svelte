<script lang="ts">
	interface Props {
		progress: number; // 0-1
		visible: boolean;
	}
	let { progress, visible }: Props = $props();

	let pct = $derived(Math.round(progress * 100));
</script>

<div
	class="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-5 bg-void transition-[opacity,visibility] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
	class:opacity-0={!visible}
	class:invisible={!visible}
	class:pointer-events-none={!visible}
	aria-hidden={!visible}
>
	<div class="flex gap-2 font-mono text-[0.85rem] tracking-widest text-muted">
		<span class="text-breach">[</span>
		<span>CORE</span>
		<span class="text-breach">]</span>
	</div>
	<div class="h-0.5 w-[min(220px,60vw)] overflow-hidden bg-line">
		<div
			class="h-full bg-gradient-to-r from-breach to-secure transition-[width] duration-[250ms] ease-out"
			style:width="{pct}%"
		></div>
	</div>
	<div class="font-mono text-[0.8rem] text-faint">{pct.toString().padStart(3, '0')}%</div>
</div>
