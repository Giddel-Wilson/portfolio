<script lang="ts">
  import Navbar from '$lib/components/Navbar.svelte';
  import { fade, fly } from 'svelte/transition';
  import { onMount } from 'svelte';
  import whatc0untry from '$lib/assets/whatc0untry.png'
  import ip from '$lib/assets/ip.png'
  import exclusive from '$lib/assets/exclusive.png' 
  import yt from '$lib/assets/yt.png' 

  let isVisible = false;
  onMount(() => {
    isVisible = true;
  });

  const projects = [
    {
      title: "REST Countries API",
      description: " REST Countries API to pull country data and display it as well as provide basic information on each country",
      tech: ["SvelteKit", "TypeScript", "Bun", "Shadcn-svelte", "REST Countries API"],
      image: whatc0untry,
      link: "https://whatc0untry.vercel.app/"
    },
    {
      title: "E-commerce Platform",
      description: "Modern e-commerce platform with real-time inventory and payment processing.",
      tech: ["React", "Node.js", "PostgreSQL", "Stripe"],
      image: exclusive,
      link: "https://github.com/yourusername/ecommerce"
    },
    {
      title: "IP Address Tracker",
      description: "IP Address Tracker app to get the IP Address locations and generate the maps from the location.",
      tech: ["SvelteKit", "TailwindCSS", "TypeScript", "Shadcn-svelte", "Leaflet.js", "IPify API"], 
      image: ip,
      link: "https://itracku.vercel.app/"
    },
    {
      title: "YouTube Clone",
      description: "YouTube clone built with SvelteKit, featuring a responsive design, video grid, and integrated Shorts functionality using the official YouTube API.",
      tech: ["SvelteKit", "Svelte", "TypeScript", "Tailwind CSS", "shadcn-svelte", "YouTube Data API", "Node.js"],
      image: yt,
      link: "https://ut00b.vercel.app/"
    },
    {
      title: "E-commerce Platform",
      description: "Modern e-commerce platform with real-time inventory and payment processing.",
      tech: ["React", "Node.js", "PostgreSQL", "Stripe"],
      image: "/images/projects/ecommerce.jpg",
      link: "https://github.com/yourusername/ecommerce"
    },
    {
      title: "Portfolio Website",
      description: "Personal portfolio website showcasing projects and skills with modern design.",
      tech: ["SvelteKit", "TailwindCSS", "TypeScript"],
      image: "/images/projects/portfolio.jpg",
      link: "https://github.com/yourusername/portfolio"
    }
  ];

  let containerRef: HTMLDivElement;
  let currentIndex = 0;
  let totalSlides = Math.ceil(projects.length / 3);

  function scrollToIndex(index: number) {
    if (containerRef) {
      const slideWidth = containerRef.offsetWidth;
      containerRef.scrollTo({
        left: slideWidth * index,
        behavior: 'smooth'
      });
    }
  }

  function handleScroll() {
    if (containerRef) {
      const slideWidth = containerRef.offsetWidth;
      currentIndex = Math.round(containerRef.scrollLeft / slideWidth);
    }
  }

  function nextSlide() {
    if (currentIndex < totalSlides - 1) {
      scrollToIndex(currentIndex + 1);
    }
  }

  function prevSlide() {
    if (currentIndex > 0) {
      scrollToIndex(currentIndex - 1);
    }
  }

  $: visibleProjects = projects.concat(projects.slice(0, 3));
  //$: snapPoints = visibleProjects.map((_, index) => index * itemWidth);
  //$: currentSnapIndex = Math.round(scrollPosition / itemWidth);
</script>

<div class="h-full overflow-auto lg:overflow-x-hidden"> 
  <Navbar />
  <main class="container mx-auto px-4 pt-5 md:pt-14 pb-20 lg:py-36">
    <!-- Background Elements -->
    <div class="fixed inset-0 -z-10">
      <div class="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10"></div>
      <div class="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(white,transparent_85%)] opacity-20"></div>
    </div>

    <!-- Content -->
    <div class="relative">
      <div class="w-full max-w-7xl mx-auto px-4">
        {#if isVisible}
          <!-- Header -->
          <div class="mb-12" in:fade={{ duration: 300, delay: 150 }}>
            <h1 
              class="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600"
              in:fly={{ y: 20, duration: 300, delay: 300 }}
            >
              Featured Projects
            </h1>
            <p 
              class="mt-4 text-lg text-white/70"
              in:fly={{ y: 20, duration: 300, delay: 450 }}
            >
              A collection of my latest work and experiments
            </p>
          </div>

          <!-- Mobile Projects Grids -->
          <div class="grid lg:hidden grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 overflow-y-auto pr-4 snap-y snap-mandatory">
            {#each projects as project, i}
              <div 
                class="group relative rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 overflow-hidden snap-start"
                in:fly={{ y: 20, duration: 300, delay: 450 + i * 150 }}
              >
                <!-- Project Image -->
                <div class="aspect-video relative overflow-hidden">
                  <img 
                    src={project.image || "/placeholder.svg"} 
                    alt={project.title}
                    class="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <!-- Project Info -->
                <div class="p-6 space-y-4">
                  <h3 class="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <p class="text-white/70 text-sm line-clamp-2">
                    {project.description}
                  </p>
                  
                  <!-- Tech Stack -->
                  <div class="flex flex-wrap gap-2">
                    {#each project.tech as tech}
                      <span class="px-2 py-1 text-xs rounded-full bg-white/10 text-white/70">
                        {tech}
                      </span>
                    {/each}
                  </div>

                  <!-- View Project Link -->
                  <a 
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center space-x-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <span>View Project</span>
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </a>
                </div>
              </div>
            {/each}
          </div>

          <!-- Desktop Projects Grids -->
          <div class="hidden lg:block relative">
            <!-- Previous Arrow -->
            <button
              class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10 disabled:opacity-50 disabled:cursor-not-allowed"
              on:click={prevSlide}
              disabled={currentIndex === 0}
            >
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <!-- Next Arrow -->
            <button
              class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10 disabled:opacity-50 disabled:cursor-not-allowed"
              on:click={nextSlide}
              disabled={currentIndex === totalSlides - 1}
            >
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <!-- Projects Container -->
            <div 
              class="relative w-full overflow-x-auto snap-x snap-mandatory"
              bind:this={containerRef}
              on:scroll={handleScroll}
            >
              <div class="flex gap-8 pb-4">
                {#each projects as project, i}
                  <div 
                    class="group relative rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 overflow-hidden snap-start flex-shrink-0"
                    style="width: calc(33.333% - 1.5rem);"
                    in:fly={{ y: 20, duration: 300, delay: 150 * i }}
                  >
                    <!-- Project Image -->
                    <div class="aspect-video relative overflow-hidden">
                      <img 
                        src={project.image || "/placeholder.svg"} 
                        alt={project.title}
                        class="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                      />
                      <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    <!-- Project Info -->
                    <div class="p-6 space-y-4">
                      <h3 class="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
                        {project.title}
                      </h3>
                      <p class="text-white/70 text-sm line-clamp-2">
                        {project.description}
                      </p>
                      
                      <!-- Tech Stack -->
                      <div class="flex flex-wrap gap-2">
                        {#each project.tech as tech}
                          <span class="px-2 py-1 text-xs rounded-full bg-white/10 text-white/70">
                            {tech}
                          </span>
                        {/each}
                      </div>

                      <!-- View Project Link -->
                      <a 
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="inline-flex items-center space-x-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        <span>View Project</span>
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                {/each}
              </div>
            </div>

            <!-- Pagination Dots -->
            <div class="flex justify-center items-center gap-2 mt-8">
              {#each Array(totalSlides) as _, i}
                <button
                  class="group"
                  on:click={() => scrollToIndex(i)}
                >
                  <span class="block w-8 h-2 rounded-full transition-colors duration-300 relative overflow-hidden">
                    <span 
                      class="absolute inset-0 bg-white/20 group-hover:bg-white/40 transition-colors"
                    ></span>
                    <span 
                      class="absolute inset-0 bg-blue-500 transition-transform duration-300"
                      style="transform: scaleX({currentIndex === i ? 1 : 0})"
                    ></span>
                  </span>
                </button>
              {/each}
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

  /* Custom Scrollbar */
  .overflow-y-auto {
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.1) transparent;
  }

  .overflow-y-auto::-webkit-scrollbar {
    width: 6px;
  }

  .overflow-y-auto::-webkit-scrollbar-track {
    background: transparent;
  }

  .overflow-y-auto::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
  }

  .overflow-y-auto::-webkit-scrollbar-thumb:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }

  /* Hide horizontal scrollbar for the snap Marquee */
  .overflow-x-auto::-webkit-scrollbar {
    display: none;
  }

  .overflow-x-auto {
    -ms-overflow-style: none;
    scrollbar-width: none;
    -webkit-overflow-scrolling: touch;
  }

  .snap-x {
    scroll-padding: 1rem;
  }

  /* Add smooth transition for pagination dots */
  .pagination-dot {
    transition: transform 0.3s ease-in-out;
  }
</style>

