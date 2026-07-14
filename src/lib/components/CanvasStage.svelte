<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { getDeviceProfile, type DeviceProfile } from '../utils/device';
	import { setupCanvasScroll } from '../spline/canvasScroll';
	import { scene } from '../stores/scene.svelte';

	interface Props {
		onProgress: (p: number) => void;
		onReady: () => void;
	}
	let { onProgress, onReady }: Props = $props();

	const SCENE_URL = 'https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode';
	const DEV = import.meta.env.DEV;

	let canvas: HTMLCanvasElement = $state()!;
	let profile: DeviceProfile | null = $state(null);
	let canvasScrollHandle: ReturnType<typeof setupCanvasScroll> | null = null;
	let wiredChoreography = false;
	let loadTimer: ReturnType<typeof setTimeout> | null = null;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let app: any = null;

	// --- Dev diagnostics only (stripped from production builds) ------------
	// Purely exploratory now — nothing in the core right/center/sink/fade
	// choreography depends on finding a specific named object anymore, since
	// that whole class of bug (wrong name, unknown scene scale) is exactly
	// what moving the *canvas* instead of a 3D object was meant to remove.
	// This stays around only in case you want to target the robot
	// specifically later (e.g. an idle rotation independent of the canvas).
	let activeName = $state('Robot');
	let robotFound: boolean | null = $state(null);
	let allObjectNames = $state<string[]>([]);
	let filterText = $state('');
	let identifyMode = $state(false);
	let clickListener: ((e: { target?: { name?: string } }) => void) | null = null;

	let filteredNames = $derived(
		filterText
			? allObjectNames.filter((n) => n.toLowerCase().includes(filterText.toLowerCase()))
			: allObjectNames
	);

	function checkObjectName(name: string) {
		activeName = name;
		robotFound = !!app?.findObjectByName(name);
	}

	function finishLoading(progress = 1) {
		if (loadTimer) {
			clearTimeout(loadTimer);
			loadTimer = null;
		}
		onProgress(progress);
		onReady();
	}

	// Wires the canvas choreography as soon as both sections have registered
	// themselves — reactive, so it doesn't matter whether this fires before
	// or after the Spline scene has finished loading.
	$effect(() => {
		if (wiredChoreography) return;
		if (!canvas || !scene.heroEl || !scene.aboutEl || !profile || profile.tier !== 'full') return;

		wiredChoreography = true;
		canvasScrollHandle = setupCanvasScroll({
			canvas,
			heroEl: scene.heroEl,
			aboutEl: scene.aboutEl,
			onSettled: () => scene.setRobotSettled(),
			reducedMotion: profile.prefersReducedMotion
		});
	});

	onMount(() => {
		profile = getDeviceProfile();

		if (profile.tier !== 'full') {
			finishLoading(1);
			return;
		}

		let cancelled = false;
		loadTimer = setTimeout(() => {
			if (cancelled) return;
			console.warn('Spline scene load timed out; continuing without it.');
			finishLoading(1);
		}, 10000);

		(async () => {
			try {
				const { Application } = await import('@splinetool/runtime');
				if (cancelled) return;

				onProgress(0.15);
				app = new Application(canvas);
				await app.load(SCENE_URL);
				if (cancelled) return;
				onProgress(0.85);
				app.setGlobalEvents?.(true);

				// The scene may paint its own background onto the canvas — CSS
				// background-color on the page underneath won't override that.
				app.setBackgroundColor?.('#000000');

				if (DEV) {
					allObjectNames = app.getAllObjects().map((o: { name: string }) => o.name);
					checkObjectName(activeName);
					clickListener = (e) => {
						if (!identifyMode || !e.target?.name) return;
						filterText = e.target.name;
						identifyMode = false;
					};
					app.addEventListener('mouseDown', clickListener);
				}

				finishLoading(1);
			} catch (error) {
				if (cancelled) return;
				console.warn('Spline scene failed to load; continuing without it.', error);
				finishLoading(1);
			}
		})();

		return () => {
			cancelled = true;
			if (loadTimer) {
				clearTimeout(loadTimer);
				loadTimer = null;
			}
		};
	});

	onDestroy(() => {
		canvasScrollHandle?.destroy();
		if (clickListener) app?.removeEventListener?.('mouseDown', clickListener);
		app?.dispose?.();
	});
</script>

<div class="pointer-events-none fixed inset-0 z-0 opacity-0 xl:opacity-100" aria-hidden="true">
	{#if profile?.tier !== 'full'}
		<div class="h-full w-full bg-canvas-fallback"></div>
	{:else}
		<canvas
			bind:this={canvas}
			class="block h-full w-full will-change-transform"
		></canvas>
	{/if}
</div>

{#if DEV && allObjectNames.length > 0}
	<div
		class="fixed bottom-4 left-4 z-90 flex w-[min(20rem,calc(100vw-2rem))] flex-col gap-1.5 border border-line bg-void/90 p-2.5 font-mono text-[0.7rem] text-muted"
		role="status"
	>
		<p class="text-secure">canvas-transform choreography active (not object-dependent)</p>
		<details>
			<summary class="mt-1 cursor-pointer text-faint">
				optional: target a specific object ({allObjectNames.length} found)
			</summary>
			<div class="mt-2 flex items-center justify-between gap-2">
				{#if robotFound !== null}
					<p class={robotFound ? 'text-secure' : 'text-breach'}>
						{robotFound ? '✓' : '✗'} "{activeName}"
					</p>
				{/if}
				<button
					class="cursor-pointer border border-transparent px-2 py-1 text-left text-[0.68rem] text-muted hover:border-secure hover:text-secure"
					onclick={() => (identifyMode = !identifyMode)}
				>
					{identifyMode ? 'click a part…' : 'click to filter'}
				</button>
			</div>
			<input
				class="mt-1.5 w-full border border-line bg-void-2 px-2 py-1.5 font-mono text-[0.7rem] text-ink"
				type="text"
				placeholder="filter {allObjectNames.length} objects…"
				bind:value={filterText}
			/>
			<ul class="mt-1.5 flex max-h-32 flex-col gap-0.5 overflow-y-auto">
				{#each filteredNames as name (name)}
					<li>
						<button
							class="w-full cursor-pointer border border-transparent px-2 py-1 text-left text-[0.68rem] text-muted hover:border-secure hover:text-secure"
							class:bg-panel={name === activeName}
							class:border-line={name === activeName}
							class:text-ink={name === activeName}
							onclick={() => checkObjectName(name)}
						>
							{name}
						</button>
					</li>
				{/each}
			</ul>
		</details>
	</div>
{/if}
