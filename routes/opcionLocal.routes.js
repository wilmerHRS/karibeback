import { Router } from "express";
import { idValidator } from "../validators/id.validators.js";
import {
  opLocalIdValidator,
  opLocalDataValidator,
} from "../validators/opcionLocal.validators.js";
import {
  getAllOpLocal,
  getOpLocalById,
  createOpLocal,
  updateOpLocal,
  deleteOpLocal,
} from "../controllers/opcionLocal.controller.js";
import {
  opProductoIdValidatorThree,
  opProductoIdValidatorTwo,
} from "../validators/opcionProducto.validators.js";
import {
  localIdValidator,
  localIdValidatorTwo,
} from "../validators/local.validators.js";

const router = Router();

//TODO: Opciones Productos por Local
router.get("/", getAllOpLocal);
// router.get("/locales/opciones-productos/:id_opproducto", idValidator, getOpLocalById);
router.post(
  "/locales/:id/opciones-productos/:id_opproducto",
  localIdValidator,
  opProductoIdValidatorTwo,
  opLocalDataValidator,
  createOpLocal
);
router.get("/:id", idValidator, getOpLocalById);
router.put(
  "/:id",
  opLocalIdValidator,
  opLocalDataValidator,
  localIdValidatorTwo,
  opProductoIdValidatorThree,
  updateOpLocal
);
router.delete("/:id", opLocalIdValidator, deleteOpLocal);

export default router;
