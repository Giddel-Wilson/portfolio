<script lang="ts">
	import { scene } from '../stores/scene.svelte';

	let scrollPct = $derived(Math.round(scene.progress * 100));
</script>

<div class="pointer-events-none fixed inset-x-0 bottom-0 z-40 h-0.5 bg-line" aria-hidden="true">
	<div class="h-full bg-gradient-to-r from-breach to-secure" style:width="{scrollPct}%"></div>
</div>
