import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "../../config/db.js";

export const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const hashed = await bcrypt.hash(password, 10);

        await db.query(
            "INSERT INTO users(name, email, password, role) VALUES($1,$2,$3,$4)",
            [name, email, hashed, role]
        );

        res.json({ message: "User Registered Successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const login = async (req, res) => {
    try {
        console.log("-------- BACKEND LOGIN DEBUG --------");
        console.log("Backend Request Body:", req.body);

        const { email, password } = req.body;

        const result = await db.query("SELECT * FROM users WHERE email=$1", [email]);
        console.log("DB Result:", result.rows);

        if (result.rows.length === 0)
            return res.status(404).json({ message: "User not found" });

        const user = result.rows[0];
        console.log("Stored hash:", user.password);

        const match = await bcrypt.compare(password, user.password);
        console.log("Password Match:", match);

        if (!match) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        console.log("Login Successful.");
        res.json({ token, role: user.role, name: user.name });
    } catch (err) {
        console.error("LOGIN ERROR:", err);
        res.status(500).json({ error: err.message });
    }
};

