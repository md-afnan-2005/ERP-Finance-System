import { db } from "../../config/db.js";

// POST /api/finance/payments
export const createPayment = async (req, res) => {
    try {
        const { invoice_id, amount, payment_date, method } = req.body;

        await db.query(
            `INSERT INTO payments(invoice_id, amount, payment_date, method)
       VALUES($1,$2,$3,$4)`,
            [invoice_id, amount, payment_date, method]
        );

        // Mark invoice as paid if fully paid
        await db.query(
            `UPDATE invoices
       SET status = 'Paid'
       WHERE id = $1 AND amount <= (
         SELECT COALESCE(SUM(amount),0) FROM payments WHERE invoice_id = $1
       )`,
            [invoice_id]
        );

        res.json({ message: "Payment recorded" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET /api/finance/payments
export const getPayments = async (req, res) => {
    try {
        const result = await db.query(
            `SELECT p.id, p.amount, p.payment_date, p.method,
              i.id as invoice_id, i.project_id
       FROM payments p
       JOIN invoices i ON p.invoice_id = i.id
       ORDER BY p.payment_date DESC`
        );
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
