import { db } from "../../config/db.js";
import bcrypt from "bcryptjs";

export const getUsers = async (req, res) => {
    try {
        const result = await db.query("SELECT id, name, email, role FROM users ORDER BY id");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const createUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const hashed = await bcrypt.hash(password, 10);

        await db.query(
            "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4)",
            [name, email, hashed, role]
        );

        res.json({ message: "User created successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { name, role, password } = req.body;

        let query = "UPDATE users SET name=$1, role=$2 WHERE id=$3";
        let params = [name, role, req.params.id];

        if (password) {
            const hashed = await bcrypt.hash(password, 10);
            query = "UPDATE users SET name=$1, role=$2, password=$3 WHERE id=$4";
            params = [name, role, hashed, req.params.id];
        }

        await db.query(query, params);
        res.json({ message: "User updated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        await db.query("DELETE FROM users WHERE id=$1", [req.params.id]);
        res.json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
