import { request, response } from "express";
import { matchedData } from "express-validator";
import mesaService from "../services/mesa.service.js";

const getAll = async (req = request, res = response, next) => {
  try {
    let data = await mesaService.getAll();
    if (data.length > 0) {
      data = data.map((mesa) => {
        //? Convirtir el precio_reserva a float porq prisma retorna su valor como tipo objeto
        return { ...mesa, precio_reserva: parseFloat(mesa.precio_reserva) };
      });
    }
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
    const data = await mesaService.getById(Number(id));
    res.status(200).json({
      success: true,
      payload: { ...data, precio_reserva: parseFloat(data.precio_reserva) },
      message: "Operación Exitosa",
    });
  } catch (err) {
    next(err);
  }
};

const create = async (req = request, res = response, next) => {
  const { id, ...body } = matchedData(req);

  try {
    const data = await mesaService.create(Number(id), body);
    res.status(201).json({
      success: true,
      payload: { ...data, precio_reserva: parseFloat(data.precio_reserva) },
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
    const data = await mesaService.update(Number(id), body);
    res.status(200).json({
      success: true,
      payload: { ...data, precio_reserva: parseFloat(data.precio_reserva) },
      message: "Tipo Orden Actualizado con Éxito",
    });
  } catch (err) {
    next(err);
  }
};

const _delete = async (req = request, res = response, next) => {
  const { id } = matchedData(req);
  try {
    await mesaService.delete(Number(id));
    res.status(200).json({
      success: true,
      message: "Mesa Eliminado con Éxito",
    });
  } catch (err) {
    next(err);
  }
};

export { getAll, getById, create, update, _delete };
