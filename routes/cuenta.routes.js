import { Router } from "express";

import {
  getAll,
  getById,
  create,
  suspendById,
  updatePassword,
  updateUsername,
} from "../controllers/cuenta.controller.js";
import {
  cuentaPasswordValidator,
  cuentaUsernameValidator,
} from "../validators/cuenta.validators.js";
import { empleadoIdValidator } from "../validators/empleado.validators.js";

const router = Router();

router.get("/", getAll);
router.get("/empleado/:id", empleadoIdValidator, getById);
router.post("/empleado/:id", empleadoIdValidator, create);
router.post("/empleado/:id/suspender", empleadoIdValidator, suspendById);
router.put(
  "/empleado/:id/username",
  empleadoIdValidator,
  cuentaUsernameValidator,
  updateUsername
);
router.put(
  "/empleado/:id/password",
  empleadoIdValidator,
  cuentaPasswordValidator,
  updatePassword
);

export default router;
