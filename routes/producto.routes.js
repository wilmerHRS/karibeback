import { Router } from "express";
import {
  productoDataValidator,
  productoIdValidator,
} from "../validators/producto.validators.js";
import { idValidator } from "../validators/id.validators.js";
import {
  getAllProductos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto,
} from "../controllers/producto.controller.js";

const router = Router();

//TODO: Productos
router.get("/", getAllProductos);
router.post("/", productoDataValidator, createProducto);
router.get("/:id", idValidator, getProductoById);
router.put("/:id", productoIdValidator, updateProducto);
router.delete("/:id", productoIdValidator, deleteProducto);

export default router;
