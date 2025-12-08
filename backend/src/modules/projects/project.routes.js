import express from "express";
import { getProjects, updateProgress, updateBudget } from "./project.controller.js";
import { authenticate } from "../../middleware/authMiddleware.js";

const router = express.Router();

router.use(authenticate);

router.get("/", getProjects);
router.put("/:id/progress", updateProgress);   // PM updates progress
router.put("/:id/budget", updateBudget);       // Finance updates budget

export default router;
