<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

{@render children()}

<style>
  :global(html) {
    background-color: black;
  }

  :global(body) {
    min-height: 100vh;
    background-color: black;
    color: white;
  }
</style>
