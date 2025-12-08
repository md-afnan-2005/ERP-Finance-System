import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();
console.log("💬 Loaded ENV Variables:");
console.log("DB_HOST =", process.env.DB_HOST);
console.log("DB_USER =", process.env.DB_USER);
console.log("DB_PASSWORD =", process.env.DB_PASSWORD);
console.log("DB_NAME =", process.env.DB_NAME);
console.log("DB_PORT =", process.env.DB_PORT);
const { Pool } = pkg;

export const db = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

db.connect()
    .then(() => console.log("✅ PostgreSQL Connected"))
    .catch(err => console.log("❌ DB Error:", err));
