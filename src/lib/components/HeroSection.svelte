<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { Application } from '@splinetool/runtime';
  import GiWi from '$lib/assets/me2.jpg';

  let canvas: HTMLCanvasElement | null = null; // Type declaration

  onMount(async () => {
    if (!canvas) {
      console.error("Canvas element not found");
      return;
    }

    const app = new Application(canvas);
    await app.load('https://prod.spline.design/YcysELBu-UOlzCK2/scene.splinecode');
  });

  
  let isVisible = false;
  
  onMount(() => {
    isVisible = true;
  });

  const technologies = [
    { name: 'SvelteKit', color: 'from-yellow-500 to-orange-700' },
    { name: 'React', color: 'from-cyan-500 to-blue-500' },
    { name: 'Vue', color: 'from-green-500 to-green-700' },
    { name: 'Astro', color: 'from-neutral-500 to-red-900' },
    { name: 'TypeScript', color: 'from-blue-500 to-blue-700' },
    { name: 'JavaScript', color: 'from-orange-300 to-yellow-700' }
  ];
</script>

<section class="h-max md:h-[calc(100vh+theme(space.6))] lg:h-[calc(100vh-theme(space.6))] relative flex items-center overflow-auto lg:overflow-hidden pt-4 md:pt-[13vh] lg:pt-0 pb-24 md:pb-32 lg:pb-0">
  <!-- Background Elements -->
  <div class="fixed inset-0 -z-10">
    <div class="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10"></div>
    <div class="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(white,transparent_85%)] opacity-20"></div>
  </div>

  <!-- Content -->
  <div class="relative w-full max-w-[90%] mx-auto">
    <div class="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
      <!-- Left Side -->
      {#if isVisible}
        <div class="flex-1 space-y-8" in:fly={{ y: 50, duration: 1000 }}>
          <!-- Status and Title -->
          <div class="space-y-6 flex flex-col items-center lg:items-start">
            <div 
              class="inline-flex items-center px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-white/70"
              in:fly={{ y: 20, duration: 1000, delay: 200 }}
            >
              <span class="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
              Available for freelance work
            </div>
            
            <h1 
              class="text-5xl lg:text-6xl font-bold leading-tight"
              in:fly={{ y: 20, duration: 1000, delay: 400 }}
            >
              <span class="text-white">Front-End</span>
              <br />
              <span class="bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text">Developer</span>
            </h1>

            <p 
              class="text-center lg:text-start md:text-lg text-white/70 max-w-2xl md:leading-relaxed md:w-96 lg:w-auto"
              in:fly={{ y: 20, duration: 1000, delay: 600 }}
            >
              Crafting exceptional digital experiences through clean code 
              and innovative design solutions.
            </p>
          </div>

          <!-- CTA Buttons -->
          <div 
            class="flex flex-wrap gap-4 justify-center lg:justify-start"
            in:fly={{ y: 20, duration: 1000, delay: 800 }}
          >
            <a 
              href="/projects" 
              class="group relative px-6 py-3 bg-white text-black font-medium rounded-lg overflow-hidden hover:text-white"
            >
              <span class="relative z-10">View My Work</span>
              <div class="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 translate-y-full transition-transform duration-300 group-hover:translate-y-0"></div>
              <span class="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"></span>
            </a>
            
            <a 
              href="/contact"
              class="px-6 py-3 bg-white/5 text-white font-medium rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
            >
              Contact Me
            </a>
          </div>

          <!-- Tech Stack -->
          <div 
            class="pt-6 border-t border-white/10 lg:w-max"
            in:fly={{ y: 20, duration: 1000, delay: 1000 }}
          >
            <h3 class="text-white/50 text-sm uppercase tracking-wider mb-4 text-center lg:text-left">Technologies I Work With</h3>
            <div class="flex flex-wrap gap-3 justify-center lg:justify-start">
              {#each technologies as tech}
                <div class="group relative hover:cursor-pointer">
                  <div class="absolute inset-0 bg-gradient-to-r {tech.color} rounded-lg blur-xl opacity-0 group-hover:opacity-50 transition-opacity"></div>
                  <div class="relative px-4 py-2 bg-white/5 rounded-lg border border-white/10 text-white/70 hover:text-white transition-colors">
                    {tech.name}
                  </div>
                </div>
              {/each}
            </div>
          </div>
        </div>
      {/if}

      <!-- Right Side -->
      {#if isVisible}
        <div 
          class="flex-1 relative"
          in:fly={{ x: 50, duration: 1000, delay: 200 }}
        >
          <!-- Main Image Container -->
          <div class="relative aspect-square max-h-[60vh] flex justify-center items-center">
            <!-- Gradient Background -->
            <div class="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-3xl blur-3xl"></div>
            
            <!-- Image -->
            <div class="aspect-square relative z-10 rounded-3xl overflow-hidden border border-white/10 shadow-2xl h-full">
              <img
                src="/src/lib/assets/me2.jpg"
                alt="Giddel Wilson"
                class="object-cover w-full h-full object-bottom inset-0"
              />
            </div>

            <!-- Floating Elements -->
            <div class="hidden md:block absolute -top-10 -right-10 w-32 h-32 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-float"></div>
            <div class="hidden md:block absolute -bottom-10 -left-10 w-32 h-32 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-float-delayed"></div>

            <!-- Stats Card -->
            <div class="absolute z-20 -bottom-6 md:-right-6 bg-white/5 backdrop-blur-xl p-4 rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <p class="text-2xl font-bold text-white">5+</p>
                  <p class="text-sm text-white/50">Years</p>
                </div>
                <div>
                  <p class="text-2xl font-bold text-white">50+</p>
                  <p class="text-sm text-white/50">Projects</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      {/if}
    </div>

    <!-- Scroll Indicator -->
    {#if isVisible}
      <div 
        class="hidden 2xl:block absolute bottom-4 left-1/2 -translate-x-1/2"
        in:fade={{ duration: 1000, delay: 1200 }}
      >
        <div class="w-5 h-8 rounded-full border-2 border-white/20 flex items-start justify-center p-1.5">
          <div class="w-1 h-2 bg-white/50 rounded-full animate-scroll"></div>
        </div>
      </div>
    {/if}
  </div>
</section>

<style>
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
  }

  @keyframes float-delayed {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(20px); }
  }

  @keyframes scroll {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(10px); }
  }

  :global(.animate-float) {
    animation: float 6s ease-in-out infinite;
  }

  :global(.animate-float-delayed) {
    animation: float-delayed 6s ease-in-out infinite;
  }

  :global(.animate-scroll) {
    animation: scroll 2s ease-in-out infinite;
  }
</style>
