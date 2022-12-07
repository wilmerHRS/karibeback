import opLocalService from "../services/opcionLocal.service.js";
import { matchedData } from "express-validator";
import { request, response } from "express";

//TODO: Opcion - Local

//* (GET) Obtener lista de Opciones de Producto de todos los Locales
const getAllOpLocal = async (req = request, res = response, next) => {
  try {
    let data = await opLocalService.getAllOpcionLocal();
    if (data.length > 0) {
      data = data.map((opl) => {
        //? Convirtir el precio a float porq prisma retorna su valor como tipo objeto
        return { ...opl, precio: parseFloat(opl.precio) };
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

//* (GET) Obtener Opción de producto de local por su ID
const getOpLocalById = async (req = request, res = response, next) => {
  const { id } = matchedData(req);
  try {
    const data = await opLocalService.getOpcionLocalById(Number(id));
    return res.status(200).json({
      success: true,
      payload: { ...data, precio: parseFloat(data.precio) },
      message: "Operación Exitosa",
    });
  } catch (err) {
    next(err);
  }
};

//* (POST) Crear una opción de producto para un determinado local
const createOpLocal = async (req = request, res = response, next) => {
  const { id, id_opproducto, ...body } = matchedData(req);

  try {
    const data = await opLocalService.createOpcionLocal(
      Number(id),
      Number(id_opproducto),
      body
    );
    return res.status(201).json({
      success: true,
      payload: { ...data, precio: parseFloat(data.precio) },
      message: "Opcion Local Creado con Exitoso",
    });
  } catch (err) {
    next(err);
  }
};

//* (PUT) Actualizar una opción de producto de un determinado local
const updateOpLocal = async (req = request, res = response, next) => {
  const { id, ...body } = matchedData(req);
  // const id = Number(req.params.id);
  try {
    const data = await opLocalService.updateOpcionLocal(Number(id), body);
    return res.status(200).json({
      success: true,
      payload: { ...data, precio: parseFloat(data.precio) },
      message: "Opcion Local Actualizado con Exitoso",
    });
  } catch (err) {
    next(err);
  }
};

//* (DELETE) Eliminar una opción de producto de un local
const deleteOpLocal = async (req = request, res = response, next) => {
  const { id } = matchedData(req);

  try {
    const data = await opLocalService.deleteOpcionLocal(Number(id));
    return res.status(200).json({
      success: true,
      payload: { ...data, precio: parseFloat(data.precio) },
      message: "Opcion Local Eliminado con Exitoso",
    });
  } catch (err) {
    next(err);
  }
};

export {
  getAllOpLocal,
  getOpLocalById,
  createOpLocal,
  updateOpLocal,
  deleteOpLocal,
};
