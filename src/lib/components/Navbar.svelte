<script>
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';
	import { Home, Info, Briefcase, Code, MessageCircle } from 'lucide-svelte';

	const navItems = [
		{ href: '/', label: 'Home', icon: Home },
		{ href: '/about', label: 'About', icon: Info },
		{ href: '/projects', label: 'Projects', icon: Briefcase },
		{ href: '/skills', label: 'Skills', icon: Code },
		{ href: '/contact', label: 'Contact', icon: MessageCircle }
	];

	let isOpen = false;
</script>

<nav class="fixed left-1/2 top-6 z-50 -translate-x-1/2">
	<div
		class="hidden rounded-full border border-white/10 bg-white/5 px-6 py-3 backdrop-blur-md lg:block"
	>
		<ul class="flex items-center gap-6">
			{#each navItems as item}
				<li>
					<a
						href={item.href}
						class="text-sm text-white/70 transition-colors hover:text-white"
						class:text-white={$page.url.pathname === item.href}
					>
						{item.label}
					</a>
				</li>
			{/each}
		</ul>
	</div>
</nav>

<nav class="fixed bottom-4 left-1/2 z-50 -translate-x-1/2">
	<div class="rounded-full border border-white/10 bg-white/5 px-6 py-2 backdrop-blur-md lg:hidden">
		<ul class="flex items-center gap-6">
			{#each navItems as item}
				<a
					href={item.href}
					class="text-2xl text-white/70 transition-colors hover:scale-125 hover:text-white"
					class:text-white={$page.url.pathname === item.href}
				>
					<item.icon class="mr-1 inline-block h-4 w-4 hover:scale-105" />
				</a>
			{/each}
		</ul>
	</div>
</nav>
