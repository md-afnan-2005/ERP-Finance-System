

import express from "express";
import { getUsers, createUser, deleteUser, updateUser } from "./user.controller.js";
import { authenticate } from "../../middleware/authMiddleware.js";

const router = express.Router();

router.use(authenticate);

router.get("/", getUsers);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
