export interface Project {
	id: string;
	name: string;
	role: string;
	url: string;
	summary: string;
	details: string[];
	stack: string[];
	state: 'breach' | 'secure'; // which Core state this project is presented under
	year: string;
}

export const projects: Project[] = [
	{
		id: 'trikride',
		name: 'TrikRide',
		role: 'Full-stack · Founding build',
		url: 'https://trikride.vercel.app/',
		summary:
			'A campus tricycle ride-booking platform — live driver matching, real-time booking states, and a race-condition-safe acceptance flow so two riders can never claim the same ride.',
		details: [
			'Real-time booking, decline tracking and driver availability over Pusher Channels',
			'Race-condition prevention on ride acceptance, built to hold up under concurrent requests',
			'Paginated reviews and a map/panel layout tuned for one-handed use on campus routes'
		],
		stack: ['SvelteKit', 'Bun', 'Drizzle ORM', 'Neon Postgres', 'Tailwind CSS v4', 'Pusher'],
		state: 'breach',
		year: '2026'
	},
	{
		id: 'defensys',
		name: 'DefenSys',
		role: 'Final-year research project',
		url: 'https://defensys.vercel.app/',
		summary:
			'A web vulnerability scanner that scores real attack surfaces — OWASP-guided checks fed into a random forest classifier trained to separate genuine findings from noise.',
		details: [
			'Automated crawling and probing across the OWASP Top 10 categories',
			'Random forest model trained to reduce false positives against hand-labelled scan data',
			'Built as a DevSecOps tool — the aim is a scanner a team would actually keep in CI'
		],
		stack: ['Python', 'Scikit-learn', 'OWASP guidelines', 'Web crawling'],
		state: 'breach',
		year: '2026'
	},
	{
		id: 'endtoend',
		name: 'EndToEnd Encrypt',
		role: 'Full-stack · Security architecture',
		url: 'https://en2en.vercel.app/',
		summary:
			'Secure file storage where the server never sees plaintext files or keys — encryption happens entirely client-side before a byte leaves the browser.',
		details: [
			'AES-GCM and ChaCha20-Poly1305 for file payloads, RSA-OAEP and ECDH for key exchange',
			'Session auth (Argon2id + JWT) is cryptographically isolated from the client-side key-wrapping secret, therefore compromising the auth database exposes no path to decrypt stored files.',
			'Argon2id and PBKDF2 for key derivation, soft-delete and listing endpoints on Neon Postgres'
		],
		stack: ['SvelteKit', 'Web Crypto API', 'jose (JWT)', 'Neon Postgres'],
		state: 'secure',
		year: '2026'
	}
];
