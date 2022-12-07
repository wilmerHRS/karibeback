import prisma from "../config/prisma.js";
import { BadRequestError } from "../helpers/handleError.js";

//* (GET) Obtener Tipos de Orden
const getAll = async () => {
  return await prisma.estado_detalle_orden.findMany({
    select: {
      id: true,
      titulo: true,
      createAt: true,
    },
  });
};

//* (GET) Obtener Tipo de Orden por ID
const getById = async (id = 0) => {
  if (id <= 0) throw new BadRequestError(`El id "${id}" es inválido`);

  const tipoOrden = await prisma.estado_detalle_orden.findUnique({
    where: { id: Number(id) },
    select: {
      id: true,
      titulo: true,
      createAt: true,
    },
  });

  if (!tipoOrden)
    throw new BadRequestError("Estado Detalle no Encontrado", 404);

  return tipoOrden;
};

const create = async (body = null) => {
  if ((typeof body === "object" && Object.keys(body).length === 0) || !body)
    throw new BadRequestError("No se recibio datos correspondientes", 204);

  return await prisma.estado_detalle_orden.create({
    data: { ...body },
    select: {
      id: true,
      titulo: true,
      createAt: true,
    },
  });
};

const update = async (id = 0, body = null) => {
  if (id <= 0) throw new BadRequestError(`El id "${id}" es inválido`);

  if ((typeof body === "object" && Object.keys(body).length === 0) || !body)
    throw new BadRequestError("No se ha enviado los datos correspondientes");

  const updateTipoOrden = prisma.estado_detalle_orden.update({
    where: { id: Number(id) },
    data: { ...body },
  });

  const tipoOrden = prisma.estado_detalle_orden.findUnique({
    where: { id: Number(id) },
    select: {
      id: true,
      titulo: true,
      createAt: true,
    },
  });

  await prisma.$transaction([updateTipoOrden, tipoOrden]);

  return tipoOrden;
};

const _delete = async (id = 0) => {
  if (id <= 0) throw new BadRequestError(`El id "${id}" es inválido`);

  return await prisma.estado_detalle_orden.delete({
    where: { id: Number(id) },
    select: {
      id: true,
      titulo: true,
      createAt: true,
    },
  });
};

export default {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};
