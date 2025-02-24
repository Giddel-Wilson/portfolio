<script lang="ts">
  import Navbar from '$lib/components/Navbar.svelte';
  import { fade, fly } from 'svelte/transition';
  import { onMount } from 'svelte';
  import GW from '$lib/assets/me4.jpg';

  let isVisible = false;
  onMount(() => {
    isVisible = true;
  });

  const stats = [
    { label: "Years Experience", value: "5+" },
    { label: "Projects Completed", value: "50+" },
    { label: "Technologies", value: "20+" },
    { label: "Satisfied Clients", value: "30+" }
  ];
</script>

<div class="h-full lg:min-h-screen overflow-auto lg:overflow-hidden">
  <Navbar />
  <main class="container mx-auto px-4 pt-5 md:pt-14 pb-20 lg:py-36">
    <!-- Background Elements -->
    <div class="fixed inset-0 -z-10">
      <div class="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10"></div>
      <div class="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(white,transparent_85%)] opacity-20"></div>
    </div>

    <!-- Content -->
    <div class="relative h-full flex items-center">
      <div class="w-full max-w-7xl mx-auto">
        {#if isVisible}
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" in:fade={{ duration: 300, delay: 150 }}>
            <!-- Text Content -->
            <div class="space-y-8">
              <h1 
                class="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600"
                in:fly={{ y: 20, duration: 300, delay: 300 }}
              >
                About Me
              </h1>
              
              <div 
                class="prose prose-invert max-w-none space-y-6"
                in:fly={{ y: 20, duration: 300, delay: 450 }}
              >
                <p class="text-xl text-white/70">
                  I'm Giddel Wilson, a passionate designer and developer dedicated to creating exceptional digital experiences. 
                  With a keen eye for design and strong technical skills, I bridge the gap between aesthetics and functionality.
                </p>
                
                <p class="text-lg text-white/70">
                  My journey in web development started with a curiosity for creating beautiful, interactive experiences. 
                  Today, I specialize in building modern web applications using cutting-edge technologies like SvelteKit, 
                  React, and TypeScript, always focusing on performance, accessibility, and user experience.
                </p>
              </div>

              <!-- Stats Grid -->
              <div 
                class="grid grid-cols-2 gap-6 mt-12"
                in:fly={{ y: 20, duration: 300, delay: 600 }}
              >
                {#each stats as stat}
                  <div class="p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                    <p class="text-3xl font-bold text-white">{stat.value}</p>
                    <p class="text-sm text-white/70">{stat.label}</p>
                  </div>
                {/each}
              </div>
            </div>

            <!-- Image Section -->
            <div 
              class="relative aspect-square rounded-2xl overflow-hidden"
              in:fly={{ x: 20, duration: 300, delay: 750 }}
            >
              <img
                src={GW}
                alt="Giddel Wilson"
                class="object-cover w-full h-full rounded-2xl"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
          </div>
        {/if}
      </div>
    </div>
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
