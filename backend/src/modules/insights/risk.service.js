import { db } from "../../config/db.js";

export const riskScore = async (req, res) => {
    try {
        const { project_id } = req.params;

        const projectData = await db.query(
            "SELECT budget, spent FROM projects WHERE id=$1",
            [project_id]
        );

        if (projectData.rows.length === 0)
            return res.status(404).json({ message: "Project not found" });

        const p = projectData.rows[0];
        let risk = 0;

        const spentPercent = (p.spent / p.budget) * 100;

        if (spentPercent > 80) risk += 40;
        if (spentPercent > 100) risk += 60;

        const riskLevel =
            risk >= 60 ? "High" : risk >= 30 ? "Medium" : "Low";

        res.json({ project_id, risk_score: risk, risk_level: riskLevel });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
