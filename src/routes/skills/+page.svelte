<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import { fade, fly } from 'svelte/transition';
	import { onMount } from 'svelte';

	let isVisible = false;
	onMount(() => {
		isVisible = true;
	});

	const skills = [
		{
			category: 'Frontend Development',
			icon: '🎨',
			items: [
				{ name: 'SvelteKit', level: 80 },
				{ name: 'Vue', level: 70 },
				{ name: 'Astro', level: 70 },
				{ name: 'React', level: 65 },
				// core fundamentals
				{ name: 'JavaScript (ES6+)', level: 85 },
				{ name: 'TypeScript', level: 70 },
				// Styling enhancements
				{ name: 'TailwindCSS', level: 90 },
				{ name: 'Bootstrap', level: 85 },
				{ name: 'CSS3/SCSS', level: 88 },
			]
		},
		{
			category: 'Tools & Others',
			icon: '🛠️',
			items: [
				{ name: 'Git', level: 70 },
				{ name: 'GitHub', level: 80 },
				{ name: 'Vite', level: 85 },
				{ name: 'bun', level: 80 },
				// Added collaboration tools
				{ name: 'Figma', level: 75 },
				// debugging/profiling
				{ name: 'Chrome DevTools', level: 85 }
			]
		}
	];
</script>

<div class="min-h-screen bg-black">
	<Navbar />
	<main
		class="container mx-auto overflow-auto px-4 pb-20 pt-5 md:pt-14 lg:pt-28 2xl:pt-32 lg:pb-10"
	>
		<!-- Background Elements -->
		<div class="fixed inset-0 -z-10">
			<div class="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10"></div>
			<div
				class="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20 [mask-image:radial-gradient(white,transparent_85%)]"
			></div>
		</div>

		<!-- Content -->
		<div class="relative">
			{#if isVisible}
				<!-- Header -->
				<div class="mb-12" in:fade={{ duration: 300, delay: 150 }}>
					<h1
						class="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-4xl font-bold text-transparent md:text-5xl"
						in:fly={{ y: 20, duration: 300, delay: 300 }}
					>
						Skills & Expertise
					</h1>
					<p class="mt-4 text-lg text-white/70" in:fly={{ y: 20, duration: 300, delay: 450 }}>
						A comprehensive overview of my technical skills and proficiencies
					</p>
				</div>

				<!-- Skills Grid -->
				<div class="grid grid-cols-1 gap-8 md:grid-cols-2">
					{#each skills as category, i}
						<div
							class="snap-start rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
							in:fly={{ y: 20, duration: 300, delay: 450 + i * 150 }}
						>
							<!-- Category Header -->
							<div class="mb-6 flex items-center space-x-3">
								<span class="text-2xl">{category.icon}</span>
								<h2 class="text-xl font-semibold text-white">{category.category}</h2>
							</div>

							<!-- Skills List -->
							<div class="space-y-4">
								{#each category.items as skill}
									<div class="space-y-2">
										<div class="flex items-center justify-between">
											<span class="text-white/70">{skill.name}</span>
											<span class="text-sm text-white/50">{skill.level}%</span>
										</div>
										<div class="h-2 rounded-full bg-white/10">
											<div
												class="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-1000"
												style="width: {skill.level}%"
											></div>
										</div>
									</div>
								{/each}
							</div>
						</div>
					{/each}
				</div>
			{/if}
		</div>
	</main>
</div>

<style>
	:global(html) {
		scroll-behavior: smooth;
		height: 100%;
	}

  /* @media (min-width: 1024px) {
    :global(html) {
      overflow: hidden;
    }
  } */

	:global(body) {
		margin: 0;
		padding: 0;
		height: 100%;
		/* overflow: hidden; */
		font-family:
			system-ui,
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			Roboto,
			'Helvetica Neue',
			Arial,
			sans-serif;
	}
</style>
