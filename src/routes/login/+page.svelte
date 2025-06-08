<script lang="ts">
    import { goto } from "$app/navigation";
    import { genSalt, hash } from "bcrypt-ts";
    import type { Transaction } from "$lib/utils";
    let username = $state("");
    let password = $state("");
    let error_message = $state("");
    let color_user = $state("border-white");
    let color_pass = $state("border-white");

    async function onSubmit(e: Event) {
        e.preventDefault()

        error_message = "";
        color_user = "border-white";
        color_pass = "border-white";

        if (username === "" || password === "") {
            error_message = "Please fill in all the fields.";
        }
        if (username === "") {
            color_user = "border-red-500";
        }
        if (password === "") {
            color_pass = "border-red-500";
        }

        if (error_message === "") {
            let salt = await genSalt(10)
            hash(password, salt).then(async (hash) => {
                let response = await fetch("/api/login", {
                    method: "POST",
                    body: JSON.stringify({
                        username: username,
                        hashedPassword: hash,
                    })
                })
                if (response.status === 200) {
                    goto("/dashboard");
                } else {
                    error_message = "Invalid username or password.";
                    color_user = "border-red-500";
                    color_pass = "border-red-500";
                } 
            })
        }  
    }


</script>

<div class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex flex-col justify-center items-center h-screen">
    <h1 class="mb-4 text-white">Bank of Italy</h1>
    <form class="flex flex-col" onsubmit={onSubmit}>
        <label for="login-username" class="text-white">Username</label>
        <input bind:value={username} id="login-username" class="border-2 rounded-md outline-0 p-1 text-white" type="text">
        <label for="login-password" class="text-white">Password</label>
        <input bind:value={password} id="login-password" type="password" class="border-2 rounded-md p-1 text-white mb-5">
        <button class="cursor-pointer border-2 border-white outline-0  text-white rounded-md p-1 mt-2 hover:opacity-70">Login</button>
    </form>
</div>
