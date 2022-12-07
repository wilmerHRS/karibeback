import express from "express";
import { hello } from "../controllers/users.controllers.js";

const router = express.Router();

router.get("/hello", hello);
// router.get("/" getAll);

export default router;
