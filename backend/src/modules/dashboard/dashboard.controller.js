import { db } from "../../config/db.js";

export const dashboardData = async (req, res) => {
    try {
        const totalProjects = await db.query("SELECT COUNT(*) FROM projects");
        const totalInvoices = await db.query("SELECT COUNT(*) FROM invoices");
        const paidInvoices = await db.query("SELECT SUM(amount) FROM invoices WHERE status='Paid'");

        res.json({
            totalProjects: totalProjects.rows[0].count,
            totalInvoices: totalInvoices.rows[0].count,
            revenue: paidInvoices.rows[0].sum || 0
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
