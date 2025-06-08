import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import type { ClientUser } from '$lib/utils';

export const currentUser = writable<ClientUser | null>(null);

export const authStore = {
    subscribe: currentUser.subscribe,
    login: (user: ClientUser) => {
        currentUser.set(user);
        if (browser) {
            localStorage.setItem('currentUser', JSON.stringify(user));
        }
    },
    logout: () => {
        currentUser.set(null);
        if (browser) {
            localStorage.removeItem('currentUser');
        }
    },
    init: () => {
        if (browser) {
            const stored = localStorage.getItem('currentUser');
            if (stored) {
                try {
                    currentUser.set(JSON.parse(stored));
                } catch (error) {
                    console.error('Error parsing stored user:', error);
                    localStorage.removeItem('currentUser');
                }
            }
        }
    }
};