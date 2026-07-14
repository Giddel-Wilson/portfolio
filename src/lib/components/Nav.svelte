<script lang="ts">
	import { Home, UserRound, BriefcaseBusiness, Mail } from 'lucide-svelte';
	import { SECTIONS, scene, type SectionId } from '../stores/scene.svelte';
	import { getLenis } from '../scroll/lenis';

	const home = SECTIONS.find((s) => s.id === 'hero')!;
	const navLinks = SECTIONS.filter((s) => s.id !== 'hero');
	const mobileLinks = SECTIONS.filter((s) => ['hero', 'about', 'projects', 'contact'].includes(s.id));

	const mobileIcons: Partial<Record<SectionId, typeof Home>> = {
		hero: Home,
		about: UserRound,
		projects: BriefcaseBusiness,
		contact: Mail
	};

	let navRef: HTMLElement;
	let pillStyle = $state({ x: 0, w: 0, opacity: 0 });

	function syncPillStyle(next: typeof pillStyle) {
		if (
			pillStyle.x === next.x &&
			pillStyle.w === next.w &&
			pillStyle.opacity === next.opacity
		) {
			return;
		}

		pillStyle = next;
	}

	$effect(() => {
		// Hide the pill only while the nav is explicitly parked on home.
		if (!scene.navVisible) {
			syncPillStyle({ ...pillStyle, opacity: 0 });
			return;
		}

		// Find the active link element to measure it
		const activeEl = navRef?.querySelector(`[data-id="${scene.activeSection}"]`) as HTMLElement;
		if (activeEl) {
			syncPillStyle({
				x: activeEl.offsetLeft,
				w: activeEl.offsetWidth,
				opacity: 1
			});
		}
	});

	function go(e: MouseEvent, id: string) {
		const target = document.getElementById(id);
		if (!target) return;
		e.preventDefault();
		scene.beginNavTo(id as SectionId);
		const lenis = getLenis();
		if (lenis) {
			lenis.scrollTo(target, { duration: 1.4 });
			return;
		}

		target.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}
</script>

<header class="pointer-events-none fixed inset-x-0 top-0 z-50 hidden justify-center md:flex">
	<div
		class="notch-ears glass-reflection pointer-events-auto relative flex items-center gap-1 rounded-b-2xl border-x border-b border-line bg-void/90 py-1.5 pl-4 pr-2 shadow-lg shadow-black/50 backdrop-blur-md"
	>
		<!-- Brand / Home -->
		<a
			href="#{home.id}"
			onclick={(e) => go(e, home.id)}
			class="group mr-3 flex items-center gap-2 no-underline transition-opacity hover:opacity-70"
		>
			<span class="flex justify-center items-center gap-1 font-mono text-base font-bold tracking-widest text-ink uppercase">
				GW<span>.</span>
			</span>
		</a>

		<!-- Navigation -->
		<nav bind:this={navRef} class="relative flex items-center" aria-label="Section navigation">
			<!-- The Liquid Pill (Indicator) -->
			<div
				class="liquid-pill animate-fluid-stretch absolute top-0 bottom-0 -z-10 rounded-full"
				style:transform="translateX({pillStyle.x}px)"
				style:width="{pillStyle.w}px"
				style:opacity={pillStyle.opacity}
			></div>

			{#each navLinks as s (s.id)}
				<a
					href="#{s.id}"
					data-id={s.id}
					class="rounded-full px-3.5 py-1.5 font-mono text-[0.72rem] tracking-[0.06em] uppercase no-underline transition-colors duration-300"
					class:text-ink={scene.activeSection === s.id}
					class:text-faint={scene.activeSection !== s.id}
					onclick={(e) => go(e, s.id)}
				>
					{s.label}
				</a>
			{/each}
		</nav>
	</div>
</header>

<div class="pointer-events-none fixed inset-x-0 bottom-3 z-50 flex justify-center px-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] xl:hidden">
	<div class="glass-nav-container pointer-events-auto w-fit max-w-[min(calc(100vw-1rem),24rem)] rounded-full border border-line/70 px-2 py-1.5 shadow-2xl shadow-black/50 backdrop-blur-xl">
		<nav class="grid grid-cols-4 items-center gap-1.5" aria-label="Section navigation">
			{#each mobileLinks as s (s.id)}
				{@const Icon = mobileIcons[s.id]}
				{@const MobileIcon = Icon ?? Home}
				<a
					href={`#${s.id}`}
					data-id={s.id}
					class="flex flex-col items-center justify-center gap-0.5 rounded-full px-2 py-1.5 text-center no-underline transition-colors duration-300"
					class:text-ink={scene.activeSection === s.id}
					class:text-faint={scene.activeSection !== s.id}
					class:bg-panel={scene.activeSection === s.id}
					onclick={(e) => go(e, s.id)}
					aria-label={s.label}
				>
					<MobileIcon class="h-5 w-5" stroke-width={2.1} aria-hidden="true" />
					<span class="sr-only">{s.label}</span>
				</a>
			{/each}
		</nav>
	</div>
</div>