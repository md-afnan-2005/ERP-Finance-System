import express from "express";
import { authenticate } from "../../middleware/authMiddleware.js";
import { riskScore } from "./risk.service.js";
import { forecastCashFlow } from "./forecast.service.js";

const router = express.Router();

router.get("/risk/:project_id", authenticate, riskScore);
router.get("/cashflow/:project_id", authenticate, forecastCashFlow);

export default router;
