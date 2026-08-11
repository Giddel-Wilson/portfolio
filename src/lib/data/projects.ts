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
    id: 'redline',
    name: 'Redline',
    role: 'Full-stack · Browser extension + dashboard',
    url: 'https://redlinesuite.vercel.app/',
    summary:
        'A browser extension and dashboard for authorized penetration testing and bug bounty work — a payload library that reads the page you\'re on, passive recon over certificate-transparency logs, and severity-sorted PDF reports ready to submit.',
    details: [
        'Context-aware payload suggestions, the extension reads the live page and ranks categories against it instead of listing all ten',
        'Passive recon via certificate-transparency lookups and header/markup fingerprinting, with SSRF guards on every server-side fetch of a user-supplied URL',
        'Auth built on Better Auth for email verification, password reset, and rate-limited endpoints, hardened for real users rather than left on defaults'
    ],
    stack: ['SvelteKit', 'TypeScript', 'Drizzle ORM', 'Neon Postgres', 'Better Auth', 'Manifest V3', 'Brevo'],
    state: 'breach',
    year: '2026'
},
	{
		id: 'defensys',
		name: 'DefenSys',
		role: 'Final-year project · Full-stack · Security scanning platform',
		url: 'https://defensys.fly.dev/',
		summary:
			'A web vulnerability scanner that runs real OWASP Top 10-guided checks (nmap, sqlmap, nikto, sslscan, gobuster, whatweb) and feeds the results through an AI triage layer that clusters and scores findings to cut out noise.',
		details: [
			'Automated scan pipeline across OWASP Top 10 categories: SQL injection, XSS, auth testing, header analysis, SSL/TLS, port scanning, API discovery, tech fingerprinting',
			'AI triage layer (Qwen models via DashScope) clusters and scores raw findings, generating remediation guidance and cutting false positives',
			'Full-stack platform with auth, per-scan dashboards, and exportable PDF reports — built as a tool a team could actually run in CI, not just a scan-and-print script'
		],
		stack: ['SvelteKit', 'TypeScript', 'Bun', 'Prisma', 'Neon PostgreSQL', 'Qwen / DashScope'],
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
