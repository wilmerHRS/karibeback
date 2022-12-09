import { Router } from "express";
import {
  finalizarOrden,
  getAllCompletedOrden,
  getAllOrdenInProcess,
  getAllOrdenReceived,
  tomarOrden,
} from "../controllers/detalleOrden.controller.js";
import { detalleOIdValidator } from "../validators/detalleOrden.validators.js";

const router = Router();

//! agregar rutas al swagger

//* obtener por local
router.get("/recibidas", getAllOrdenReceived);
router.get("/en-proceso", getAllOrdenInProcess);
router.get("/concluidas", getAllCompletedOrden);
router.post("/:id/tomar-orden", detalleOIdValidator, tomarOrden);
router.post("/:id/finalizar-orden", detalleOIdValidator, finalizarOrden);

//* cambiar estado
// router.post("/:id/tomar-orden", mesaIdValidator, getById);
// router.post("/:id/finalizar-orden", mesaIdValidator, getById);

export default router;
