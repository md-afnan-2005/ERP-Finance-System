import { db } from "../../config/db.js";

export const forecastCashFlow = async (req, res) => {
    try {
        const { project_id } = req.params;

        const result = await db.query(
            "SELECT amount FROM invoices WHERE project_id=$1 ORDER BY created_at DESC LIMIT 6",
            [project_id]
        );

        const amounts = result.rows.map(r => Number(r.amount));

        if (amounts.length === 0)
            return res.json({ forecast: 0 });

        const avg = amounts.reduce((a, b) => a + b) / amounts.length;

        res.json({ project_id, forecast_next_month: avg });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
