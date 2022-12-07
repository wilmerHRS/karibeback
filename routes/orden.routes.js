import { Router } from "express";

import { getAll, getById, _delete } from "../controllers/local.controller.js";
import { idValidator } from "../validators/global.validators.js";
import {
  ordenDataValidator,
  ordenIdValidator,
  ordenIdValidatorTwo,
} from "../validators/orden.validators.js";
import { tipoOrdenIdValidator } from "../validators/tipoOrden.validators.js";

const router = Router();

router.get("/", getAll);
router.get("/:id", idValidator, getById);

router.get("/tipos/:id", tipoOrdenIdValidator, getById);

router.get("/locales/:id", tipoOrdenIdValidator, getAll);

// * DETALLE
router.get("/:id/detalles", ordenIdValidator, getAll);
router.get(
  "/:id_orden/detalles/:id",
  ordenIdValidatorTwo,
  ordenDataValidator,
  getById
);

export default router;
