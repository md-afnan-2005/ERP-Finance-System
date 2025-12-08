import express from "express";
import { register, login } from "./auth.controller.js";

const router = express.Router();

router.get("/generate/:password", async (req, res) => {
    const bcrypt = (await import("bcryptjs")).default;
    const hash = await bcrypt.hash(req.params.password, 10);
    res.json({ password: req.params.password, hash });
});

router.post("/register", register);
router.post("/login", login);

export default router;
