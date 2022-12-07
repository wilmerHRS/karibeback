import { Router } from "express";
import { idValidator } from "../validators/id.validators.js";
import {
  getAllOpProductos,
  getOpProductoById,
  createOpProducto,
  updateOpProducto,
  deleteOpProducto,
} from "../controllers/opcionProducto.controller.js";
import {
  opProductoDataValidator,
  opProductoIdValidator,
} from "../validators/opcionProducto.validators.js";
import { productoIdValidator } from "../validators/producto.validators.js";

const router = Router();

//TODO: Opciones Productos
router.get("/", getAllOpProductos);
// router.get("/productos/:id", productoIdValidator, getOpProductoById);
router.post(
  "/productos/:id",
  productoIdValidator,
  opProductoDataValidator,
  createOpProducto
);
router.get("/:id", idValidator, getOpProductoById);
router.put("/:id", opProductoIdValidator, updateOpProducto);
router.delete("/:id", opProductoIdValidator, deleteOpProducto);

export default router;
