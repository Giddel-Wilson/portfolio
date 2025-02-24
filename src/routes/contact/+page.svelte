<script lang="ts">
  import Navbar from '$lib/components/Navbar.svelte';
  import { fade, fly } from 'svelte/transition';
  import { onMount } from 'svelte';

  let isVisible = false;
  onMount(() => {
    isVisible = true;
  });

  let formData = {
    name: '',
    email: '',
    message: ''
  };

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/Giddel-Wilson',
      icon: `<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"/>
            </svg>`,
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/giddel-wilson-346109253/',
      icon: `<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>`,
    },
    {
      name: 'Twitter',
      url: 'https://x.com/Giddel_Wilson',
      icon: `<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>`,
    }
  ];

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
  };
</script>

<div class="h-max md:h-[calc(100vh+theme(space.6))] lg:h-full relative flex items-center overflow-auto pb-20 pt-5 md:pt-14 lg:pt-28 2xl:pt-32 lg:pb-10 bg-black text-white">
  <Navbar />
  <main class="container px-3 md:px-10">
    <!-- Background Elements -->
    <div class="fixed inset-0 -z-10">
      <div class="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10"></div>
      <div class="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(white,transparent_85%)] opacity-20"></div>
    </div>

    <!-- Content -->
    {#if isVisible}
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
        <!-- Contact Form -->
        <div 
          class="h-full backdrop-blur-sm bg-white/5 p-8 rounded-2xl border border-white/10"
          in:fly={{ y: 20, duration: 300, delay: 300 }}
        >
          <div class="h-full flex flex-col">
            <div class="mb-8">
              <h1 class="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
                Get in Touch
              </h1>
              <p class="mt-4 text-white/70">
                Have a question or want to work together? Drop me a message!
              </p>
            </div>

            <form class="flex-1 flex flex-col" on:submit|preventDefault={handleSubmit}>
              <div class="space-y-6 flex-1">
                <div>
                  <label for="name" class="block text-sm font-medium text-white/70">Name</label>
                  <input
                    type="text"
                    id="name"
                    bind:value={formData.name}
                    class="mt-1 block w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent backdrop-blur-sm"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label for="email" class="block text-sm font-medium text-white/70">Email</label>
                  <input
                    type="email"
                    id="email"
                    bind:value={formData.email}
                    class="mt-1 block w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent backdrop-blur-sm"
                    placeholder="your@email.com"
                  />
                </div>

                <div class="flex-1">
                  <label for="message" class="block text-sm font-medium text-white/70">Message</label>
                  <textarea
                    id="message"
                    bind:value={formData.message}
                    rows="6"
                    class="mt-1 block w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent backdrop-blur-sm resize-none"
                    placeholder="Your message..."
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                class="mt-6 w-full px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        <!-- Map and Contact Info -->
        <div 
          class="space-y-8"
          in:fly={{ x: 20, duration: 300, delay: 450 }}
        >
          <!-- Map -->
          <div class="w-full h-[300px] rounded-2xl overflow-hidden backdrop-blur-sm bg-white/5 border border-white/10">
            <iframe
              title="Port Harcourt Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127183.58435131757!2d6.942435591796878!3d4.816565699999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1069cbd1ebf85e99%3A0x7564a0c4f1f8a19a!2sPort%20Harcourt%2C%20Rivers!5e0!3m2!1sen!2sng!4v1701569433599!5m2!1sen!2sng"
              width="100%"
              height="100%"
              style="border:0;"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              class="filter grayscale contrast-125"
            ></iframe>
          </div>

          <!-- Contact Info -->
          <div class="space-y-8 text-center lg:text-left backdrop-blur-sm bg-white/5 p-8 rounded-2xl border border-white/10">
            <div class="space-y-4">
              <h2 class="text-2xl font-semibold text-white">Location</h2>
              <p class="text-white/70">Port Harcourt, Rivers State, Nigeria</p>
            </div>

            <div class="space-y-4">
              <h2 class="text-2xl font-semibold text-white">Connect</h2>
              <div class="flex justify-center lg:justify-start space-x-6">
                {#each socialLinks as link}
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-white/70 hover:text-white transition-colors"
                    aria-label={link.name}
                  >
                    {@html link.icon}
                  </a>
                {/each}
              </div>
            </div>

            <div class="space-y-4">
              <h2 class="text-2xl font-semibold text-white">Email</h2>
              <a 
                href="mailto:your.giddel100@gmail.com"
                class="text-white/70 hover:text-white transition-colors"
              >
                giddel100@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    {/if}
  </main>
</div>

<style>
  :global(html) {
    background-color: black;
  }
</style>
