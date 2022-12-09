import { request, response } from "express";
import { matchedData } from "express-validator";

import comandaService from "../services/comanda.service.js";
import opLocalService from "../services/opcionLocal.service.js";

// * (GET) Obtener comandas
const getAll = async (req = request, res = response, next) => {
  try {
    const data = await comandaService.getAll();
    res.status(200).json({
      success: true,
      payload: data,
      message: "Operación Exitosa",
    });
  } catch (err) {
    next(err);
  }
};

// * (GET) Obtener comandas no finalizadas
const getNotFinalizedByMeseroId = async (
  req = request,
  res = response,
  next
) => {
  // obtener id de token
  const id_empleado = 1;

  // tipo
  const type = "NO FINALIZADAS";

  try {
    const data = await comandaService.getAllByEmpleadoId(id_empleado, type);
    res.status(200).json({
      success: true,
      payload: data,
      message: "Operación Exitosa",
    });
  } catch (err) {
    next(err);
  }
};

// * (GET) Obtener comandas finalizadas
const getFinalizedByMeseroId = async (req = request, res = response, next) => {
  // obtener id de token
  const id_empleado = 1;

  // tipo
  const type = "FINALIZADAS";

  try {
    const data = await comandaService.getAllByEmpleadoId(id_empleado, type);
    res.status(200).json({
      success: true,
      payload: data,
      message: "Operación Exitosa",
    });
  } catch (err) {
    next(err);
  }
};

const getByMeseroId = async (req = request, res = response, next) => {
  const { id } = matchedData(req);

  // obtener id de token
  const id_empleado = 1;

  //type
  const type = "NO FINALIZADAS";

  try {
    const data = await comandaService.getByEmpleadoId(
      Number(id_empleado),
      Number(id),
      type
    );
    res.status(200).json({
      success: true,
      payload: data,
      message: "Operación Exitosa",
    });
  } catch (err) {
    next(err);
  }
};

// Obtener comanda por ID
const getById = async (req = request, res = response, next) => {
  const { id } = matchedData(req);

  try {
    const data = await comandaService.getById(Number(id));
    res.status(200).json({
      success: true,
      payload: data,
      message: "Operación Exitosa",
    });
  } catch (err) {
    next(err);
  }
};

// * (POST) Crear comanda
const create = async (req = request, res = response, next) => {
  let body = matchedData(req);
  const id_empleado = 1;
  const id_tipo_orden = 2;
  const id_local = 1;

  body = {
    ...body,
    id_mesa: Number(body.id_mesa),
    id_empleado,
    id_tipo_orden,
    id_local,
  };

  try {
    const data = await comandaService.create(body);
    res.status(201).json({
      success: true,
      payload: data,
      message: "Comanda Creada con Éxito",
    });
  } catch (err) {
    next(err);
  }
};

// * (POST) Crear detalle de Comanda
const createDetalle = async (req = request, res = response, next) => {
  let { id, ...body } = matchedData(req);

  try {
    const id_local = 1;
    //? estado del detalle en cocina (recibido, en proceso, terminado, cancelado)
    const id_estado_detorden = 1; //* recibido

    //? Obtener Opcion de Producto / Local (precio)
    let { precio, id: id_oppro_local } =
      await opLocalService.getOpProductoLocalById(
        Number(body.id_opcion),
        Number(id_local)
      );

    //? Generar precio total (precio * cantidad)
    precio = parseFloat(precio);
    const cantidad = parseInt(body.cantidad);
    const precio_total = precio * cantidad;

    body = {
      id_oppro_local,
      id_estado_detorden,
      cantidad,
      precio,
      precio_total,
    };

    const data = await comandaService.createDetalle(Number(id), body);
    console.log(data.precio_total);
    res.status(201).json({
      success: true,
      payload: {
        ...data,
        precio: parseFloat(data.precio),
        precio_total: parseFloat(data.precio_total),
      },
      message: "Local Creado con Éxito",
    });
  } catch (err) {
    next(err);
  }
};

// ! (POST) Crear comanda
const finalizar = async (req = request, res = response, next) => {
  const { id } = matchedData(req);
  const body = { finalizado: true };

  try {
    const data = await comandaService.update(Number(id), body);
    res.status(201).json({
      success: true,
      payload: data,
      message: "Comanda Finalizada con Éxito",
    });
  } catch (err) {
    next(err);
  }
};

const update = async (req = request, res = response, next) => {
  const { id } = matchedData(req);
  const { body } = req;

  try {
    const data = await comandaService.update(id, body);
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
    await comandaService.delete(id);
    res.status(200).json({
      success: true,
      message: "Local Eliminado con Éxito",
    });
  } catch (err) {
    next(err);
  }
};

export {
  getAll,
  getById,
  getNotFinalizedByMeseroId,
  getFinalizedByMeseroId,
  getByMeseroId,
  create,
  createDetalle,
  finalizar,
  update,
  _delete,
};
