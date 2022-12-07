import { Router } from "express";
import {
  create,
  getAll,
  getById,
  update,
  _delete,
} from "../controllers/tipoOrden.controller.js";
import { idValidator } from "../validators/global.validators.js";
import {
  tipoOrdenDataValidator,
  tipoOrdenIdValidator,
} from "../validators/tipoOrden.validators.js";

const router = Router();

router.get("/", getAll);
router.post("/", tipoOrdenDataValidator, create);
router.get("/:id", idValidator, getById);
router.put("/:id", tipoOrdenIdValidator, update);
router.delete("/:id", tipoOrdenIdValidator, _delete);

export default router;
