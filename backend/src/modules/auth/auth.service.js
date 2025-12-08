import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { db } from "../../config/db.js";

dotenv.config();

export const registerUser = async ({ name, email, password, role }) => {
    const existing = await db.query("SELECT id FROM users WHERE email=$1", [email]);
    if (existing.rows.length > 0) {
        throw new Error("Email already registered");
    }

    const hashed = await bcrypt.hash(password, 10);

    await db.query(
        "INSERT INTO users(name, email, password, role) VALUES($1,$2,$3,$4)",
        [name, email, hashed, role]
    );

    return { message: "User Registered Successfully" };
};

export const loginUser = async ({ email, password }) => {
    const result = await db.query("SELECT * FROM users WHERE email=$1", [email]);
    if (result.rows.length === 0) {
        throw new Error("User not found");
    }

    const user = result.rows[0];

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw new Error("Invalid credentials");
    }

    const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );

    return {
        token,
        user: { id: user.id, name: user.name, email: user.email, role: user.role }
    };
};
