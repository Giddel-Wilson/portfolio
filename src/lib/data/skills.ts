export interface SkillGroup {
	id: string;
	title: string;
	note: string;
	items: string[];
}

export const skillGroups: SkillGroup[] = [
	{
		id: 'build',
		title: 'Build',
		note: 'What ships',
		items: [
			'SvelteKit / Svelte 5',
			'React.js',
			'TypeScript',
			'Tailwind CSS',
			'Node.js / Bun',
			'PostgreSQL (Neon & Supabase)',
			'NoSQL (MongoDB & Redis)',
			'Drizzle ORM',
			'Vercel / Railway'
		]
	},
	{
		id: 'defend',
		title: 'Defend',
		note: 'What holds',
		items: [
			'OWASP Top 10 methodology',
			'Web application penetration testing',
			'Applied cryptography (AES-GCM, RSA-OAEP, ECDH)',
			'Zero-knowledge auth design',
			'DevSecOps / CI security tooling',
			'Random forest classification (scikit-learn)',
			'Web crawling & automated scanning',
			'Security architecture & threat modeling'
		]
	}
];
