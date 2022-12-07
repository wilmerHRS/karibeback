import { Router } from "express";

import {
  getAll,
  getById,
  create,
  update,
  _delete,
} from "../controllers/rol.controller.js";
import { idValidator } from "../validators/global.validators.js";
import {
  rolDataValidator,
  rolIdValidator,
} from "../validators/rol.validators.js";

const router = Router();

router.get("/", getAll);
router.post("/", rolDataValidator, create);
router.get("/:id", idValidator, getById);
router.put("/:id", rolIdValidator, rolDataValidator, update);
router.delete("/:id", rolIdValidator, _delete);

export default router;
