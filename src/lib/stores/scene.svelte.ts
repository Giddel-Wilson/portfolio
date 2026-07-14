export type SectionId = 'hero' | 'about' | 'stack' | 'projects' | 'security' | 'contact';

export const SECTIONS: { id: SectionId; label: string; readout: string }[] = [
	{ id: 'hero', label: 'Index', readout: 'INIT' },
	{ id: 'about', label: 'Profile', readout: 'RECON' },
	{ id: 'stack', label: 'Stack', readout: 'TOOLING' },
	{ id: 'projects', label: 'Work', readout: 'DEPLOY' },
	{ id: 'security', label: 'Security', readout: 'HARDEN' },
	{ id: 'contact', label: 'Contact', readout: 'HANDSHAKE' }
];

class SceneState {
	/** 0-1 across the entire document. Drives the camera path + Core morph. */
	progress = $state(0);
	/** 0 = fully "breach" (exposed/amber), 1 = fully "secure" (hardened/cyan). */
	morph = $state(0);
	activeSection = $state<SectionId>('hero');
	navVisible = $state(false);
	navTarget = $state<SectionId | null>(null);
	ready = $state(false);
	reduceMotion = $state(false);
	robotSettled = $state(false);

	// Sections register their own element on mount — this guarantees the
	// reference exists by the time anything reads it (no blind
	// document.getElementById() call racing against component mount order).
	heroEl = $state<HTMLElement | null>(null);
	aboutEl = $state<HTMLElement | null>(null);

	setProgress(p: number) {
		this.progress = p;
	}
	setMorph(m: number) {
		this.morph = m;
	}
	setActiveSection(id: SectionId) {
		this.activeSection = id;
		this.navVisible = id !== 'hero';
	}
	beginNavTo(id: SectionId) {
		this.navTarget = id;
		this.activeSection = id;
		this.navVisible = id !== 'hero';
	}
	setActiveSectionFromScroll(id: SectionId) {
		if (this.navTarget && this.navTarget !== id) return;
		this.activeSection = id;
		this.navVisible = id !== 'hero';
		if (this.navTarget === id) this.navTarget = null;
	}
	setRobotSettled() {
		this.robotSettled = true;
	}
	setHeroEl(el: HTMLElement) {
		this.heroEl = el;
	}
	setAboutEl(el: HTMLElement) {
		this.aboutEl = el;
	}
}

export const scene = new SceneState();
