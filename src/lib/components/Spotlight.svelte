<script lang="ts">
	interface Props {
		class?: string;
		fill?: string;
	}
	let { class: klass = '', fill = 'white' }: Props = $props();
</script>

<svg
	class="spotlight {klass}"
	xmlns="http://www.w3.org/2000/svg"
	viewBox="0 0 3787 2842"
	fill="none"
	aria-hidden="true"
>
	<g filter="url(#spotlight-blur)">
		<ellipse
			cx="1924.71"
			cy="273.501"
			rx="1924.71"
			ry="273.501"
			transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
			{fill}
			fill-opacity="0.16"
		/>
	</g>
	<defs>
		<filter
			id="spotlight-blur"
			x="0.860352"
			y="0.838989"
			width="3785.16"
			height="2840.26"
			filterUnits="userSpaceOnUse"
			color-interpolation-filters="sRGB"
		>
			<feFlood flood-opacity="0" result="BackgroundImageFix" />
			<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
			<feGaussianBlur stdDeviation="151" result="effect1_foregroundBlur" />
		</filter>
	</defs>
</svg>

<style>
	.spotlight {
		pointer-events: none;
		position: absolute;
		z-index: 1;
		height: 169%;
		width: 138%;
		opacity: 0;
		animation: spotlight-fade 2.2s ease 0.4s 1 forwards;
	}
	@keyframes spotlight-fade {
		0% {
			opacity: 0;
			transform: translate(-72%, -62%) scale(0.5);
		}
		100% {
			opacity: 1;
			transform: translate(0%, 0%) scale(1);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.spotlight {
			animation: none;
			opacity: 1;
			transform: none;
		}
	}
</style>
