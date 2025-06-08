<script lang="ts">
    import type { Transaction } from "$lib/utils"; 
    import { goto } from "$app/navigation";
    import { error } from "@sveltejs/kit";
    import { hash, genSalt } from "bcrypt-ts";

    let username = $state("");
    let password = $state("");
    let error_message = $state("");
    let color_user = $state("border-white");
    let color_pass = $state("border-white");

    function onChange(e: Event) {
        if (username !== "") {
            color_user = "border-white";
        }
        if (password !== "") {
            color_pass = "border-white";
        }
    }


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
            let salt = await genSalt(10);
            hash(password, salt).then(async (hash) => {
                let response = await fetch("/api/register", {
                    method: "POST",
                    body: JSON.stringify({
                        username: username,
                        hashedPassword: hash,
                        balance: 100,
                        transactions: [] as Transaction[]
                    })
                })
                if (response.status === 200) {
                    goto("/login");
                } else {
                    error_message = "Username already exists.";
                }
            });
        }  
    }


</script>

<div class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex flex-col justify-center items-center h-screen">
    <h1 class="mb-4 text-white">Bank of Italy</h1>
    <form onsubmit={onSubmit} class="flex flex-col">
        <label for="register-username" class="text-white">Username</label>
        <input onchange={onChange} bind:value={username} id="register-username" class="outline-0 border-2 text-white {color_user} rounded-md p-1" type="text">
        <label for="register-password" class="text-white">Password</label>
        <input onchange={onChange} bind:value={password} id="register-password" type="password" class="text-white outline-0 border-2 {color_pass} rounded-md p-1 mb-5">
        <button class="cursor-pointer border-2 border-white text-white rounded-md p-1 mt-2 hover:opacity-70">Register</button>
        <h4 class="text-white mt-2">{error_message}</h4>
    </form>
</div>
