import { db } from "../../config/db.js";

export const getProjects = async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM projects ORDER BY id");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const updateProgress = async (req, res) => {
    const { progress } = req.body;
    await db.query(
        "UPDATE projects SET progress=$1 WHERE id=$2",
        [progress, req.params.id]
    );
    res.json({ message: "Updated" });
};


export const updateBudget = async (req, res) => {
    try {
        const { spent } = req.body;

        await db.query(
            "UPDATE projects SET spent=$1 WHERE id=$2",
            [spent, req.params.id]
        );

        res.json({ message: "Budget updated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
