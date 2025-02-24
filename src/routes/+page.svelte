<script lang="ts">
  import Navbar from '$lib/components/Navbar.svelte';
  import HeroSection from '$lib/components/HeroSection.svelte';
</script>

<div class="h-full overflow-auto md:overflow-hidden bg-black text-white">
  <Navbar />
  <main>
    <HeroSection />
  </main>
</div>

<style>
  :global(html) {
    background-color: black;
    scroll-behavior: smooth;
    height: 100%;
  }
  
  :global(body) {
    margin: 0;
    padding: 0;
    height: 100%;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  }
</style>
