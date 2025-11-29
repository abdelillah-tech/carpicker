import { drizzle } from 'drizzle-orm/node-postgres';

function getConnectionString() {
    return `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@localhost:5432/${process.env.POSTGRES_DB}`;
}

const db = drizzle(getConnectionString());

export default db;