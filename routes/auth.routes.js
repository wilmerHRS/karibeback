import { Router } from "express";
import { login } from "../controllers/auth.controller.js";
import { authDataValidator } from "../validators/auth.validators.js";

const router = Router();

router.post("/login", authDataValidator, login);

export default router;
