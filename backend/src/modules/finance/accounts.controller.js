import { db } from "../../config/db.js";

export const createAccount = async (req, res) => {
    try {
        const { name, type } = req.body;
        await db.query(
            "INSERT INTO accounts(name, type) VALUES ($1,$2)",
            [name, type]
        );
        res.json({ message: "Account Created" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const listAccounts = async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM accounts");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
