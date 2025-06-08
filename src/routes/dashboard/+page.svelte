<script lang="ts">
    import { User } from "lucide-svelte";
    let collapsed: "display: flex;" | "display: none;" = $state("display: none;");
  
    const toggleCollapsingAccount = () => {
        collapsed = collapsed === "display: flex;" ? "display: none;" : "display: flex;"; 
    }

</script>

<div class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex flex-col h-screen">
    <nav class="items-center flex flex-row border-b-4 border-b-white">
        <a class="hover:opacity-70 border-2 p-2 rounded-md m-5 text-white" href="/dashboard">Dashboard</a>
        <a class="hover:opacity-70 border-2 p-2 rounded-md m-5 text-white" href="/investments">Investments</a>
        <a class="hover:opacity-70 border-2 p-2 rounded-md m-5 text-white" href="/transactions">Transactions</a>
        <User onclick={toggleCollapsingAccount} size={32} color="white" class="hover:scale-110 cursor-pointer ml-auto mr-5"/>
    </nav>
        <div style="{collapsed}" class="flex flex-col text-center bg-white ml-auto mt-4 mr-5  rounded-md">
            <a class="m-5" href="/profile">Profile</a>
            <a class="m-5" href="/settings">Settings</a>
            <a class="m-5" href="/logout">Logout</a>
        </div>
</div>

