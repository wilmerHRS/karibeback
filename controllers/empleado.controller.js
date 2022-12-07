import { request, response } from "express";
import { matchedData } from "express-validator";

import empleadoService from "../services/empleado.service.js";

const getAll = async (req = request, res = response, next) => {
  try {
    const data = await empleadoService.getAll();
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
    const data = await empleadoService.getById(id);
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

  if (!body.ape_materno) delete body.ape_materno;
  if (!body.correo) delete body.correo;

  const genero = body.genero.toUpperCase();

  let fecha_nacimiento = new Date(body.fecha_nacimiento);
  body = { ...body, fecha_nacimiento, genero };

  try {
    const data = await empleadoService.create(body);
    res.status(201).json({
      success: true,
      payload: data,
      message: "Empleado Creado con Éxito",
    });
  } catch (err) {
    next(err);
  }
};

const update = async (req = request, res = response, next) => {
  const { id } = matchedData(req);
  let { body } = req;

  try {
    if (body.fecha_nacimiento) {
      let fecha_nacimiento = new Date(body.fecha_nacimiento);
      body = { ...body, fecha_nacimiento };
    }

    const data = await empleadoService.update(id, body);
    res.status(200).json({
      success: true,
      payload: data,
      message: "Empleado Actualizado con Éxito",
    });
  } catch (err) {
    next(err);
  }
};

const _delete = async (req = request, res = response, next) => {
  const { id } = matchedData(req);

  try {
    await empleadoService.delete(id);
    res.status(200).json({
      success: true,
      message: "Empleado Eliminado con Éxito",
    });
  } catch (err) {
    next(err);
  }
};

export { getAll, getById, create, update, _delete };
