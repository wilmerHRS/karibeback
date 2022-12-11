import { request, response } from "express";
import { matchedData } from "express-validator";

import cuentaService from "../services/cuenta.service.js";

const getAll = async (req = request, res = response, next) => {
  try {
    const data = await cuentaService.getAll();
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
    const data = await cuentaService.getByEmpleadoId(id);
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
  const { id } = matchedData(req);

  try {
    const dataResponse = await cuentaService.create(Number(id));
    const data = { ...dataResponse };

    res.status(201).json({
      success: true,
      payload: data,
      message: "Cuenta Creada con Éxito",
    });
  } catch (err) {
    next(err);
  }
};

const _delete = async (req = request, res = response, next) => {
  const { id } = matchedData(req);

  try {
    await cuentaService.deleteByEmpleadoId(id);
    res.status(200).json({
      success: true,
      message: "Cuenta Eliminada con Éxito",
    });
  } catch (err) {
    next(err);
  }
};

const suspendById = async (req = request, res = response, next) => {
  const { id } = matchedData(req);
  const suspendido = true;

  try {
    await cuentaService.update(id, { suspendido });
    res.status(200).json({
      success: true,
      message: "Se ha Supendida la Cuenta",
    });
  } catch (err) {
    next(err);
  }
};

const updateUsername = async (req = request, res = response, next) => {
  const { id, usuario } = matchedData(req);

  try {
    const data = await cuentaService.update(id, { usuario });
    res.status(200).json({
      success: true,
      payload: data,
      message: "Nombre de Usuario Actualizado",
    });
  } catch (err) {
    next(err);
  }
};

const updatePassword = async (req = request, res = response, next) => {
  const { id, password, newpasword } = matchedData(req);

  try {
    const data = await cuentaService.updatePassword(
      Number(id),
      password,
      newpasword
    );
    res.status(200).json({
      success: true,
      payload: data,
      message: "Contraseña Actualizado con Éxito",
    });
  } catch (err) {
    next(err);
  }
};

export { getAll, getById, create, suspendById, updateUsername, updatePassword };
