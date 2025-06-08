import { browser } from '$app/environment';
import { error } from '@sveltejs/kit';

export function load() {
	if (!browser) return;

	const storedUser = localStorage.getItem('currentUser');

	if (!storedUser) {
		throw error(404, 'User not found');
	}

	try {
		const parsed = JSON.parse(storedUser);
		return {
			username: parsed.username,
			balance: parsed.balance
		};
	} catch (err) {
		console.error('Error parsing user from localStorage:', err);
		throw error(500, 'Corrupt user data');
	}
}
