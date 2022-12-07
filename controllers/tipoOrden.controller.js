import { request, response } from "express";
import { matchedData } from "express-validator";
import tipoOrdenService from "../services/tipoOrden.service.js";

const getAll = async (req = request, res = response, next) => {
  try {
    const data = await tipoOrdenService.getAll();
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
    const data = await tipoOrdenService.getById(Number(id));
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

  try {
    const data = await tipoOrdenService.create(body);
    res.status(201).json({
      success: true,
      payload: data,
      message: "Tipo Orden Creado con Éxito",
    });
  } catch (err) {
    next(err);
  }
};

const update = async (req = request, res = response, next) => {
  const { id } = matchedData(req);
  const { body } = req;
  try {
    const data = await tipoOrdenService.update(Number(id), body);
    res.status(200).json({
      success: true,
      payload: data,
      message: "Tipo Orden Actualizado con Éxito",
    });
  } catch (err) {
    next(err);
  }
};

const _delete = async (req = request, res = response, next) => {
  const { id } = matchedData(req);
  try {
    await tipoOrdenService.delete(Number(id));
    res.status(200).json({
      success: true,
      message: "Tipo Orden Eliminado con Éxito",
    });
  } catch (err) {
    next(err);
  }
};

export { getAll, getById, create, update, _delete };
