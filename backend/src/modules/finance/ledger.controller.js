import { db } from "../../config/db.js";

export const getLedger = async (req, res) => {
    try {
        const query = `
            SELECT 
                j.id,
                a.name AS account_name,
                j.debit,
                j.credit,
                j.description,
                j.created_at
            FROM journal_entries j
            JOIN accounts a ON j.account_id = a.id
            ORDER BY j.created_at DESC;
        `;

        const result = await db.query(query);

        res.json(result.rows);
    } catch (err) {
        console.error("Ledger Fetch Error:", err);
        res.status(500).json({ error: "Failed to load ledger" });
    }
};
