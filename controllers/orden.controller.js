import { request, response } from "express";
import { matchedData } from "express-validator";

import rolService from "../services/local.service.js";

const getAll = async (req = request, res = response, next) => {
  try {
    const data = await rolService.getAll();
    res.status(200).json({
      success: true,
      payload: data,
      message: "Operación Exitosa",
    });
  } catch (err) {
    next(err);
  }
};

const getById = async (req = request, res = response, next) => {
  const { id } = matchedData(req);

  try {
    const data = await rolService.getById(id);
    res.status(200).json({
      success: true,
      payload: data,
      message: "Operación Exitosa",
    });
  } catch (err) {
    next(err);
  }
};

const create = async (req = request, res = response, next) => {
  let body = matchedData(req);
  if (!body.descripcion) delete body.descripcion;

  try {
    const data = await rolService.create(body);
    res.status(201).json({
      success: true,
      payload: data,
      message: "Local Creado con Éxito",
    });
  } catch (err) {
    next(err);
  }
};

const update = async (req = request, res = response, next) => {
  const { id } = matchedData(req);
  const { body } = req;

  try {
    const data = await rolService.update(id, body);
    res.status(200).json({
      success: true,
      payload: data,
      message: "Local Actualizado con Éxito",
    });
  } catch (err) {
    next(err);
  }
};

const _delete = async (req = request, res = response, next) => {
  const { id } = matchedData(req);

  try {
    await rolService.delete(id);
    res.status(200).json({
      success: true,
      message: "Local Eliminado con Éxito",
    });
  } catch (err) {
    next(err);
  }
};

export { getAll, getById, create, update, _delete };
