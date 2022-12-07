import { request, response } from "express";
import { matchedData } from "express-validator";

import rolService from "../services/rol.service.js";
import { io } from "../config/server.js";

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
  const body = matchedData(req);

  try {
    const data = await rolService.create(body);
    io.emit("socket-rol", { type: "created", data });

    res.status(201).json({
      success: true,
      payload: data,
      message: "Rol Creado con Éxito",
    });
  } catch (err) {
    next(err);
  }
};

const update = async (req = request, res = response, next) => {
  const { id, ...body } = matchedData(req);

  try {
    const data = await rolService.update(id, body);
    io.emit("socket-rol", { type: "updated", data });

    res.status(200).json({
      success: true,
      payload: data,
      message: "Rol Actualizado con Éxito",
    });
  } catch (err) {
    next(err);
  }
};

const _delete = async (req = request, res = response, next) => {
  const { id } = matchedData(req);

  try {
    await rolService.delete(id);
    io.emit("socket-rol", { type: "deleted", data: { id: Number(id) } });

    res.status(200).json({
      success: true,
      message: "Rol Eliminado con Éxito",
    });
  } catch (err) {
    next(err);
  }
};

export { getAll, getById, create, update, _delete };
