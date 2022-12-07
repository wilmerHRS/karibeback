import { Router } from "express";
import {
  create,
  getAll,
  getById,
  update,
  _delete,
} from "../controllers/estadoDetOrden.controller.js";
import {
  estadoDOrdenIdValidator,
  estadoDOrdenDataValidator,
} from "../validators/estadoDetOrden.validators.js";
import { idValidator } from "../validators/global.validators.js";

const router = Router();

router.get("/", getAll);
router.post("/", estadoDOrdenDataValidator, create);
router.get("/:id", idValidator, getById);
router.put("/:id", estadoDOrdenIdValidator, update);
router.delete("/:id", estadoDOrdenIdValidator, _delete);

export default router;
