import { Router } from "express";

import {
  getAll,
  getById,
  create,
  update,
  _delete,
  createDetalle,
  getByMeseroId,
  getNotFinalizedByMeseroId,
  getFinalizedByMeseroId,
  finalizar,
} from "../controllers/comanda.controller.js";
import {
  comandaIdValidator,
  comandaDataValidator,
} from "../validators/comanda.validators.js";
import {
  detalleODataValidator,
  detalleOIdValidator,
  detalleOIdValidatorTwo,
} from "../validators/detalleOrden.validators.js";
import { empleadoIdValidator } from "../validators/empleado.validators.js";
import { idValidator } from "../validators/global.validators.js";
import { localIdValidator } from "../validators/local.validators.js";

const router = Router();

// * (GET) Obtener
router.get("/", getAll);
router.get("/:id", idValidator, getById); // hecho
router.get("/local", getAll);
router.get("/locales/:id", localIdValidator, getById);
router.get("/meseros/:id", empleadoIdValidator, getById);
router.get("/no-finalizadas/mesero", getNotFinalizedByMeseroId); // hecho
router.get("/finalizadas/mesero", getFinalizedByMeseroId); // hecho
router.get("/:id/no-finalizadas/mesero", comandaIdValidator, getByMeseroId); // hecho
router.get("/:id/detalles", comandaIdValidator, getById);

// * (POST) Crear
router.post("/", comandaDataValidator, create); // hecho
router.post(
  "/:id/detalles",
  comandaIdValidator,
  detalleODataValidator,
  createDetalle
); // hecho

// * (POST) Finalizar Comanda
router.post("/:id/finalizar", comandaIdValidator, finalizar); //! hacer

// * (PUT) Actualizar
router.put("/:id", comandaIdValidator, update);
router.put("/detalles/:id", detalleOIdValidator, update);

// * (DELETE) Eliminar
router.delete("/:id", comandaIdValidator, _delete);
router.delete("/detalles/:id", detalleOIdValidator, _delete);

export default router;
