<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import CanvasStage from '$lib/components/CanvasStage.svelte';
	import FilmLayer from '$lib/components/FilmLayer.svelte';
	import LoadingScreen from '$lib/components/LoadingScreen.svelte';
	import HUD from '$lib/components/HUD.svelte';
	import Nav from '$lib/components/Nav.svelte';
	import MobilePortrait from '$lib/components/MobilePortrait.svelte';
	import Hero from '$lib/components/sections/Hero.svelte';
	import About from '$lib/components/sections/About.svelte';
	import Stack from '$lib/components/sections/Stack.svelte';
	import Projects from '$lib/components/sections/Projects.svelte';
	import Security from '$lib/components/sections/Security.svelte';
	import Contact from '$lib/components/sections/Contact.svelte';
	import { initLenis, destroyLenis } from '$lib/scroll/lenis';
	import { setupMasterScroll } from '$lib/scroll/timeline';
	import { scene } from '$lib/stores/scene.svelte';
	import { getDeviceProfile } from '$lib/utils/device';

	let scrollRoot: HTMLElement;
	let loadProgress = $state(0);
	let sceneReady = $state(false);
	let masterTrigger: ReturnType<typeof setupMasterScroll> | null = null;

	function handleProgress(p: number) {
		loadProgress = p;
	}

	function handleReady() {
		sceneReady = true;
		scene.ready = true;
	}

	onMount(() => {
		const profile = getDeviceProfile();
		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		scene.reduceMotion = reduce;
		if (profile.tier === 'full') {
			initLenis(reduce);
		}
		masterTrigger = setupMasterScroll(scrollRoot);

		return () => {
			masterTrigger?.kill();
			destroyLenis();
		};
	});
</script>

<svelte:head>
	<title>Wilson — Full-stack Developer &amp; Web Security Analyst</title>
</svelte:head>

<LoadingScreen progress={loadProgress} visible={!sceneReady} />

<CanvasStage onProgress={handleProgress} onReady={handleReady} />
<MobilePortrait />
<FilmLayer />

<HUD />
<Nav />
 
<main bind:this={scrollRoot} class="relative z-10">
	<Hero />
	<About />
	<Stack />
	<Projects />
	<Security />
	<Contact />
</main>
