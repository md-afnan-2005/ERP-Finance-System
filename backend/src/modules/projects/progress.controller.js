import { db } from "../../config/db.js";

// POST /api/projects/:project_id/progress
export const addProjectProgress = async (req, res) => {
    try {
        const { project_id } = req.params;
        const { planned_percent, actual_percent, as_of_date } = req.body;

        await db.query(
            `INSERT INTO project_progress(project_id, planned_percent, actual_percent, as_of_date)
       VALUES($1,$2,$3,$4)`,
            [project_id, planned_percent, actual_percent, as_of_date]
        );

        res.json({ message: "Project progress updated" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET /api/projects/:project_id/progress
export const getProjectProgress = async (req, res) => {
    try {
        const { project_id } = req.params;

        const result = await db.query(
            `SELECT planned_percent, actual_percent, as_of_date
       FROM project_progress
       WHERE project_id = $1
       ORDER BY as_of_date DESC`,
            [project_id]
        );

        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
