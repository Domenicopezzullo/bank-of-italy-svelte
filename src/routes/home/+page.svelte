<script lang="ts">
    import { goto } from "$app/navigation";
    import { browser } from "$app/environment";
    if (browser && localStorage.getItem("currentUser")) {
        goto("/dashboard");
    }
</script>

<div class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex flex-col justify-center items-center h-screen">
    <h1 class="mb-4 text-white">Bank of Italy</h1>
    <button on:click={() => goto("/register")} class="cursor-pointer text-white border-white border-2 rounded-md p-1 hover:opacity-70">Register</button>
    <button on:click={() => goto("/login")} class="cursor-pointer border-2 border-white text-white rounded-md p-1 mt-2 hover:opacity-70">Login</button>
</div>