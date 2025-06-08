interface User {
    username: string,
    hashedPassword: string
    transactions: Transaction[],
    balance: number,
}

interface Transaction {
    from: string,
    to: string,
    amount: number,
}

export type { User, Transaction }