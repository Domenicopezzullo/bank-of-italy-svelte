import type { WithId } from "mongodb"

interface User {
    username: string,
    hashedPassword: string
    transactions: Transaction[],
    balance: number,
}

interface ClientUser {
    username: string,
    balance: number
    password: string,
}

interface Transaction {
    from: string,
    to: string,
    amount: number,
}

export type { User, Transaction, ClientUser }