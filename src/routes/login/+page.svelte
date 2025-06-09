<script lang="ts">
    import { goto } from "$app/navigation";
    import { authStore } from "$lib/auth";
    let username = $state("");
    let password = $state("");
    let error_message = $state("");
    let color_user = $state("border-white");
    let color_pass = $state("border-white");

    async function onSubmit(e: Event) {
        e.preventDefault();

        error_message = "";
        color_user = "border-white";
        color_pass = "border-white";

        if (username === "" || password === "") {
            error_message = "Please fill in all the fields.";
            if (username === "") color_user = "border-red-500";
            if (password === "") color_pass = "border-red-500";
            return;
        }

        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            });

            const data = await response.json();

            if (response.ok) {
                authStore.login(data.user);
                goto("/dashboard");
            } else {
                error_message = data.error || "Invalid username or password.";
                color_user = "border-red-500";
                color_pass = "border-red-500";
            }
        } catch (error) {
            error_message = "Connection error. Please try again.";
            console.error('Login error:', error);
        }
    }
</script>

<div class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex flex-col justify-center items-center h-screen">
    <h1 class="mb-4 text-white">Bank of Italy</h1>
    <form class="flex flex-col" onsubmit={onSubmit}>
        <label for="login-username" class="text-white">Username</label>
        <input bind:value={username} id="login-username" class="border-2 rounded-md {color_user} outline-0 p-1 text-white" type="text">
        <label for="login-password" class="text-white">Password</label>
        <input bind:value={password} id="login-password" type="password" class="border-2 {color_pass} outline-0 rounded-md p-1 text-white mb-5">
        <button class="cursor-pointer border-2 border-white outline-0  text-white rounded-md p-1 mt-2 hover:opacity-70">Login</button>
        <h4 class="text-white">{error_message}</h4>
    </form>
</div>
