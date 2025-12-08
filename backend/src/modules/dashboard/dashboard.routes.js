import express from "express";
import { authenticate } from "../../middleware/authMiddleware.js";
import { dashboardData } from "./dashboard.controller.js";

const router = express.Router();

router.get("/", authenticate, dashboardData);

export default router;
