import { authStore } from "$lib/auth";
import { redirect } from "@sveltejs/kit";

export async function GET() {
    authStore.logout()
    throw redirect(307, '/home');
}