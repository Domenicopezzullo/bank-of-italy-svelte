import type { User } from "./utils";
import { MongoClient } from "mongodb";
import { config } from "dotenv";


async function addUser(mongo: MongoClient, user: User): Promise<number> {
    let result = await mongo.db("bank-app").collection("users").findOne({ username: user.username });
    if (result) {
        return 409;
    }
    mongo.db("bank-app").collection("users").insertOne(user);
    return 200;
}

async function getUser(mongo: MongoClient, user: string) {
    return await mongo.db("bank-app").collection("users").findOne({ username: user });
}

config()
let mongoClient = await MongoClient.connect(process.env.MONGODB_URI!);

export { mongoClient, addUser, getUser }