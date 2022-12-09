import { request, response } from "express";
import { matchedData } from "express-validator";

import detalleOrdenService from "../services/detalleOrden.service.js";

//? obtener ordenes recibidas
const getAllOrdenReceived = async (req = request, res = response, next) => {
  //! obtener estado "Recibido"
  const id = 1;

  try {
    const data = await detalleOrdenService.getAllOrdenByStatusId(Number(id));
    res.status(200).json({
      success: true,
      payload: data,
      message: "Operación Exitosa",
    });
  } catch (err) {
    next(err);
  }
};

//? obtener ordenes en proceso
const getAllOrdenInProcess = async (req = request, res = response, next) => {
  //! obtener estado en "Proceso"
  const id = 2;

  try {
    const data = await detalleOrdenService.getAllOrdenByStatusId(Number(id));
    res.status(200).json({
      success: true,
      payload: data,
      message: "Operación Exitosa",
    });
  } catch (err) {
    next(err);
  }
};

//? obtener ordenes concluidas
const getAllCompletedOrden = async (req = request, res = response, next) => {
  //! obtener estado "concluidas" - cambiar nombre desde el servicio
  const id = 3;

  try {
    const data = await detalleOrdenService.getAllOrdenByStatusId(Number(id));
    res.status(200).json({
      success: true,
      payload: data,
      message: "Operación Exitosa",
    });
  } catch (err) {
    next(err);
  }
};

//! Cambiar estado "en proceso"
const tomarOrden = async (req = request, res = response, next) => {
  const { id } = matchedData(req);
  //! Cambiar estado "en proceso"
  const body = { id_estado_detorden: 2 };

  try {
    const data = await detalleOrdenService.update(Number(id), body);
    res.status(200).json({
      success: true,
      payload: data,
      message: "Detalle Orden Actualizado con Éxito",
    });
  } catch (err) {
    next(err);
  }
};

//! Cambiar estado terminado
const finalizarOrden = async (req = request, res = response, next) => {
  const { id } = matchedData(req);
  //! Cambiar estado terminado
  const body = { id_estado_detorden: 3 };

  try {
    const data = await detalleOrdenService.update(Number(id), body);
    res.status(200).json({
      success: true,
      payload: data,
      message: "Detalle Orden Actualizado con Éxito",
    });
  } catch (err) {
    next(err);
  }
};

const create = async (req = request, res = response, next) => {
  let body = matchedData(req);
  if (!body.descripcion) delete body.descripcion;

  try {
    const data = await detalleOrdenService.create(body);
    res.status(201).json({
      success: true,
      payload: data,
      message: "Local Creado con Éxito",
    });
  } catch (err) {
    next(err);
  }
};

export {
  getAllOrdenReceived,
  getAllOrdenInProcess,
  getAllCompletedOrden,
  tomarOrden,
  finalizarOrden,
  create,
};
