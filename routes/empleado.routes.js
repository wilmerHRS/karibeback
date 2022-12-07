import { Router } from "express";

import {
  getAll,
  getById,
  create,
  update,
  _delete,
} from "../controllers/empleado.controller.js";
import { notExistsDocumento } from "../middlewares/empleado.middlewares.js";
import {
  empleadoDataValidator,
  empleadoIdValidator,
  empleadoRLValidator,
} from "../validators/empleado.validators.js";
import { idValidator } from "../validators/global.validators.js";

const router = Router();

router.get("/", getAll);
router.post("/", empleadoDataValidator, notExistsDocumento, create);
router.get("/:id", idValidator, getById);
router.put(
  "/:id",
  empleadoIdValidator,
  notExistsDocumento,
  empleadoRLValidator,
  update
);
router.delete("/:id", empleadoIdValidator, _delete);

export default router;
