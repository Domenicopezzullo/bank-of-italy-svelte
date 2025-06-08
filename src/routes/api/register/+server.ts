import { addUser, mongoClient } from "$lib/db";
import type { User } from "$lib/utils";
import { config } from "dotenv"; 

export async function POST(event: any) {
    config()


    const body: User  = await event.request.json();
    if(await addUser(mongoClient, body) == 200) {
        
        return new Response('200', { status: 200 });
    } else {
        return new Response('409', { status: 409 });
    }
}