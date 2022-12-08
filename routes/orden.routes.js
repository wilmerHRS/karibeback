import { Router } from "express";
import {
  getAllCompletedOrden,
  getAllOrdenInProcess,
  getAllOrdenReceived,
} from "../controllers/detalleOrden.controller.js";

const router = Router();

//! agregar rutas al swagger

//* obtener por local
router.get("/recibidas", getAllOrdenReceived);
router.get("/en-proceso", getAllOrdenInProcess);
router.get("/concluidas", getAllCompletedOrden);

//* cambiar estado
// router.post("/:id/tomar-orden", mesaIdValidator, getById);
// router.post("/:id/finalizar-orden", mesaIdValidator, getById);

export default router;
