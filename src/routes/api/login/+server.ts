import { getUser, mongoClient } from "$lib/db";
import type { User } from "$lib/utils";

export async function POST(event: any) {
    const body: { username: string, hashedPassword: string } = await event.request.json();
    const user = await getUser(mongoClient, body.username);
    if (user != null) {
        return new Response(JSON.stringify(user), { status: 200 });
    }
    else {
        return new Response('404', { status: 404 });
    }
    
}