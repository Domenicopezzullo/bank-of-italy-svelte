// src/routes/api/login/+server.ts
import { json } from '@sveltejs/kit';
import { mongoClient } from '$lib/db';
import { compare } from 'bcrypt-ts';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
    try {
        const { username, password } = await request.json();
        


        const db = mongoClient.db("bank-app");
        const users = db.collection("users");

        const userDoc = await users.findOne({ username });

        if (!userDoc) {
            console.log('User not found in database');
            return json({ error: 'Invalid credentials' }, { status: 401 });
        }

        
        const isValid = await compare(password, userDoc.hashedPassword);
        console.log('Password valid:', isValid);

        if (!isValid) {
            console.log('Password comparison failed');
            return json({ error: 'Invalid credentials' }, { status: 401 });
        }

        const user = {
            _id: userDoc._id.toString(),
            username: userDoc.username,
            balance: userDoc.balance
        };

        return json({ user }, { status: 200 });

    } catch (error) {
        console.error('Login error:', error);
        return json({ error: 'Internal server error' }, { status: 500 });
    }
};