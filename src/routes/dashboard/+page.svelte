<script lang="ts">
	import { goto } from '$app/navigation';
	import { authStore } from '$lib/auth';
	import { User, Coins } from 'lucide-svelte';
	import { onDestroy } from 'svelte';

	export let data: { username: string; balance: number };

	let collapsed = 'display: none;';
	let username = data.username;
	let balance = data.balance;

	const toggleCollapsingAccount = () => {
		collapsed = collapsed === 'display: flex;' ? 'display: none;' : 'display: flex;';
	};

	const handleLogout = async () => {
		try {
			await fetch('/api/logout', { method: 'POST' });
		} catch (err) {
			console.error('Logout failed:', err);
		} finally {
			authStore.logout();
			goto('/home');
		}
	};
</script>

{#if data}
    <div class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex flex-col h-screen">
        <nav class="items-center flex flex-row border-b-4 border-b-white">
            <a class="hover:opacity-70 border-2 p-2 rounded-md m-5 text-white" href="/dashboard">Dashboard</a>
            <a class="hover:opacity-70 border-2 p-2 rounded-md m-5 text-white" href="/investments">Investments</a>
            <a class="hover:opacity-70 border-2 p-2 rounded-md m-5 text-white" href="/transactions">Transactions</a>
            <div class="flex-1"></div>
            <div class="flex flex-row items-center ml-auto mr-5">
                <h1 class="text-white scale-110 mr-2">{balance}</h1>
                <Coins color="white" size={32} class="scale-110"/>
            </div>
        <User onclick={toggleCollapsingAccount} size={32} color="white" class="scale-110 hover:scale-120 cursor-pointer ml-auto mr-5"/>
        </nav>
            <div style="{collapsed}" class="flex flex-col text-center bg-white p-5 ml-auto mt-3 mr-5  rounded-md">
                <h3 class="mb-5">{username}</h3>
                <a class="m-5" href="/profile">Profile</a>
                <a class="m-5" href="/settings">Settings</a>
                <button class="m-5 hover:text-red-600 cursor-pointer" onclick={handleLogout}>Logout</button>
            </div>
    </div>
{/if}
