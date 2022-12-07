import { Router } from "express";

import {
  getAll,
  getById,
  create,
  update,
  _delete,
} from "../controllers/local.controller.js";
import { idValidator } from "../validators/global.validators.js";
import {
  localIdValidator,
  localDataValidator,
} from "../validators/local.validators.js";

const router = Router();

router.get("/", getAll);
router.post("/", localDataValidator, create);
router.get("/:id", idValidator, getById);
router.put("/:id", localIdValidator, update);
router.delete("/:id", localIdValidator, _delete);

export default router;
