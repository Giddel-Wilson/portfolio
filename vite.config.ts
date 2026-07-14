import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	optimizeDeps: {
		include: ['gsap', 'gsap/ScrollTrigger', 'lenis', '@splinetool/runtime']
	},
	build: {
		target: 'es2022'
	}
});
