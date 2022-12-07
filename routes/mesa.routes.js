import { Router } from "express";
import {
  create,
  getAll,
  getById,
  update,
  _delete,
} from "../controllers/mesa.controller.js";
import { idValidator } from "../validators/global.validators.js";
import { localIdValidator } from "../validators/local.validators.js";
import {
  mesaDataValidator,
  mesaIdValidator,
} from "../validators/mesa.validators.js";

const router = Router();

router.get("/", getAll);
router.post("/local/:id", localIdValidator, mesaDataValidator, create);
router.get("/:id", idValidator, getById);
router.put("/:id", mesaIdValidator, update);
router.delete("/:id", mesaIdValidator, _delete);

export default router;
