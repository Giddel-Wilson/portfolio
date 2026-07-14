<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { getDeviceProfile } from '../utils/device';

	interface Props {
		text: string;
		as?: 'h1' | 'h2' | 'h3' | 'p';
		class?: string;
		trigger?: 'immediate' | 'scroll';
		delay?: number;
	}

	let { text, as = 'h2', class: klass = '', trigger = 'scroll', delay = 0 }: Props = $props();

	let root: HTMLElement;

	onMount(() => {
		const profile = getDeviceProfile();
		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reduce || profile.tier !== 'full') return; // plain text stays exactly as rendered

		const words = text.split(' ');
		root.innerHTML = words
			.map(
				(w) =>
					`<span class="inline-block overflow-hidden align-top"><span data-split-word class="inline-block will-change-transform">${w}&nbsp;</span></span>`
			)
			.join('');

		const wordEls = root.querySelectorAll<HTMLElement>('[data-split-word]');

		const anim = gsap.fromTo(
			wordEls,
			{ yPercent: 115, rotate: 3 },
			{
				yPercent: 0,
				rotate: 0,
				duration: 0.9,
				delay,
				stagger: 0.045,
				ease: 'expo.out',
				scrollTrigger:
					trigger === 'scroll'
						? { trigger: root, start: 'top 85%', toggleActions: 'play none none reverse' }
						: undefined
			}
		);

		return () => {
			anim.scrollTrigger?.kill();
			anim.kill();
		};
	});
</script>

<svelte:element this={as} bind:this={root} class={klass}>{text}</svelte:element>
