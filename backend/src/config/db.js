import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Pool } = pkg;

export const db = new Pool({
    connectionString: process.env.DB_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

db.connect()
    .then(() => console.log("✅ Connected to Render PostgreSQL"))
    .catch(err => console.error("❌ DB Connection Error:", err));
