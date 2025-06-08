import { authStore } from '$lib/auth';
import { redirect } from '@sveltejs/kit';

export async function load() {
    authStore.init();
    throw redirect(307, '/home');
}
