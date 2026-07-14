import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { mapRange, smoothstep } from '../utils/math';
import { scene, type SectionId } from '../stores/scene.svelte';
import { getDeviceProfile } from '../utils/device';

gsap.registerPlugin(ScrollTrigger);

/**
 * The master trigger spans the whole scroll root. Its progress (0-1) drives
 * both the camera path and the Core's breach→secure morph. Morph ramps
 * between the end of the hero and the start of the security section, so the
 * hardening completes right as the copy talks about hardening.
 */
export function setupMasterScroll(rootEl: HTMLElement) {
	const trigger = ScrollTrigger.create({
		trigger: rootEl,
		start: 'top top',
		end: 'bottom bottom',
		scrub: 0.4,
		onUpdate: (self) => {
			scene.setProgress(self.progress);
			const morph = smoothstep(mapRange(self.progress, 0.16, 0.8, 0, 1));
			scene.setMorph(morph);
		}
	});
	return trigger;
}

export function registerSectionTrigger(sectionEl: HTMLElement, id: SectionId) {
	return ScrollTrigger.create({
		trigger: sectionEl,
		start: 'top 55%',
		end: 'bottom 45%',
		onEnter: () => scene.setActiveSectionFromScroll(id),
		onEnterBack: () => scene.setActiveSectionFromScroll(id)
	});
}

interface RevealOptions {
	y?: number;
	stagger?: number;
	duration?: number;
	delay?: number;
}

/**
 * Entrance reveal for a group of elements as they cross into view.
 * The elements must already be visible by default in markup/CSS (opacity is
 * only animated from a *slightly* reduced state) so nothing ships blank if
 * the trigger never fires (hidden tab, reduced motion, headless render).
 */
export function revealOnEnter(elements: Element[], opts: RevealOptions = {}) {
	const profile = getDeviceProfile();
	if (profile.tier !== 'full') {
		gsap.set(elements, { y: 0, opacity: 1, filter: 'none' });
		return {
			kill: () => {},
			scrollTrigger: { kill: () => {} }
		} as unknown as gsap.core.Tween;
	}

	const { y = 28, stagger = 0.06, duration = 0.9, delay = 0 } = opts;
	return gsap.fromTo(
		elements,
		{ y, opacity: 0, filter: 'blur(6px)' },
		{
			y: 0,
			opacity: 1,
			filter: 'blur(0px)',
			duration,
			delay,
			stagger,
			ease: 'power3.out',
			scrollTrigger: {
				trigger: elements[0],
				start: 'top 85%',
				toggleActions: 'play none none reverse'
			}
		}
	);
}
