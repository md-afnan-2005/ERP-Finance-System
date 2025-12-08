import { db } from "../../config/db.js";

export const createInvoice = async (req, res) => {
    try {
        const { project_id, vendor_id, amount, status } = req.body;

        await db.query(
            "INSERT INTO invoices(project_id, vendor_id, amount, status) VALUES($1,$2,$3,$4)",
            [project_id, vendor_id, amount, status]
        );

        res.json({ message: "Invoice Created" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getInvoices = async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM invoices");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
export const updateInvoiceStatus = async (req, res) => {
    try {
        const { status } = req.body;

        await db.query(
            "UPDATE invoices SET status=$1 WHERE id=$2",
            [status, req.params.id]
        );

        res.json({ message: "Invoice status updated" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

