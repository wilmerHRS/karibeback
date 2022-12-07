//TODO: Controlador PRODUCTO
import productoService from "../services/producto.service.js";
import { matchedData } from "express-validator";

//* (GET) Obtener lista de todos los productos
const getAllProductos = async (req, res, next) => {
  try {
    const data = await productoService.getAllProductos();

    res.status(200).json({
      success: true,
      payload: data,
      message: "Operación Exitosa",
    });
  } catch (err) {
    next(err);
  }
};

//* (GET) Obtener productos por ID
const getProductoById = async (req, res, next) => {
  const { id } = matchedData(req);
  try {
    const data = await productoService.getProductoById(Number(id));
    return res.status(200).json({
      success: true,
      payload: data,
      message: "Operación Exitosa",
    });
  } catch (err) {
    next(err);
  }
};

//* (POST) Crear un producto
const createProducto = async (req, res, next) => {
  const body = matchedData(req);
  try {
    const data = await productoService.createProducto(body);
    return res.status(201).json({
      success: true,
      payload: data,
      message: "Producto Creado con Éxito",
    });
  } catch (err) {
    next(err);
  }
};

//* (PUT) Actualizar un producto por ID
const updateProducto = async (req, res, next) => {
  const { id } = matchedData(req);
  const { body } = req;
  try {
    const data = await productoService.updateProducto(id, body);
    return res.status(200).json({
      success: true,
      payload: data,
      message: "Producto Actualizado con Éxito",
    });
  } catch (err) {
    next(err);
  }
};

//* (DELETE) Eliminar un producto por ID
const deleteProducto = async (req, res, next) => {
  const id = req.params.id;
  try {
    const data = await productoService.deleteProducto(id);
    return res.status(200).json({
      success: true,
      payload: data,
      message: "Producto Eliminado con Éxito",
    });
  } catch (err) {
    next(err);
  }
};

export {
  getAllProductos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto,
};
