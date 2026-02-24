// Resolve API base from either NEXT_PUBLIC_API_URL or NEXT_PUBLIC_API_BASE_URL
// Fallback to localhost in dev if none are provided
const resolvedApiBase = (() => {
	const direct = process.env.NEXT_PUBLIC_API_URL;
	if (direct && direct.trim()) return direct.trim();
	const base = process.env.NEXT_PUBLIC_API_BASE_URL;
	if (base && base.trim()) return `${base.replace(/\/$/, '')}/api`;
	return 'http://127.0.0.1:8000/api';
})();

export const API_BASE = resolvedApiBase;
export const OFFICIAL_EMAIL = 'hello@triplesrtravelers.com';
