//TODO: Controlador OPCION PRODUCTO
import { matchedData } from "express-validator";
import { request, response } from "express";

import opProductoService from "../services/opcionProducto.service.js";

//* (GET) Obtener lista de opciones de producto
const getAllOpProductos = async (req = request, res = response, next) => {
  try {
    let data = await opProductoService.getAllOpcionProducto();
    if (data.length > 0) {
      data = data.map((op) => {
        //? Convertimos el precio_estandar a tipo float ya que prisma nos lo devuelve como objeto
        return { ...op, precio_estandar: parseFloat(op.precio_estandar) };
      });
    }
    return res.status(200).json({
      success: true,
      payload: [...data],
      message: "Operación Exitosa",
    });
  } catch (err) {
    next(err);
  }
};

//* (GET) Obtener Opción de Producto por ID
const getOpProductoById = async (req = request, res = response, next) => {
  const { id } = matchedData(req);
  try {
    const data = await opProductoService.getOpcionProductoById(Number(id));
    return res.status(200).json({
      success: true,
      payload: { ...data, precio_estandar: parseFloat(data.precio_estandar) },
      message: "Operación Exitosa",
    });
  } catch (err) {
    next(err);
  }
};

//* (GET) Obtener Opción de Producto por ID de Producto
const getAllByProductoId = async (req = request, res = response, next) => {
  const { id } = matchedData(req);
  try {
    const data = await opProductoService.getAllByProductoId(Number(id));
    return res.status(200).json({
      success: true,
      payload: data,
      message: "Operación Exitosa",
    });
  } catch (err) {
    next(err);
  }
};

//* (POST) Crear Opción de Producto
const createOpProducto = async (req = request, res = response, next) => {
  const { id, ...body } = matchedData(req);
  try {
    const data = await opProductoService.createOpcionProducto(Number(id), body);

    return res.status(201).json({
      success: true,
      payload: { ...data, precio_estandar: parseFloat(data.precio_estandar) },
      message: "Opción de Producto Creado con Éxito",
    });
  } catch (err) {
    next(err);
  }
};

//* (PUT) Actualizar Opcion de Producto
const updateOpProducto = async (req = request, res = response, next) => {
  const { id } = matchedData(req);
  const { body } = req;

  try {
    const data = await opProductoService.updateOpcionProducto(id, body);
    return res.status(200).json({
      success: true,
      payload: { ...data, precio_estandar: parseFloat(data.precio_estandar) },
      message: "Opción de Producto Actualizado con Éxito",
    });
  } catch (err) {
    next(err);
  }
};

//* (DELETE) Eliminar Opcion de Producto
const deleteOpProducto = async (req = request, res = response, next) => {
  const { id } = matchedData(req);
  try {
    const data = await opProductoService.deleteOpcionProducto(Number(id));
    return res.status(200).json({
      success: true,
      payload: { ...data, precio_estandar: parseFloat(data.precio_estandar) },
      message: "Opción de Producto Eliminado con Éxito",
    });
  } catch (err) {
    next(err);
  }
};

export {
  getAllOpProductos,
  getOpProductoById,
  getAllByProductoId,
  createOpProducto,
  updateOpProducto,
  deleteOpProducto,
};
