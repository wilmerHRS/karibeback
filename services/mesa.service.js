import prisma from "../config/prisma.js";
import { BadRequestError } from "../helpers/handleError.js";

//* (GET) Obtener Tipos de Orden
const getAll = async () => {
  return await prisma.mesa.findMany({
    select: {
      id: true,
      nro_mesa: true,
      capacidad: true,
      precio_reserva: true,
      ocupado: true,
      local: {
        select: {
          id: true,
          descripcion: true,
          departamento: true,
          provincia: true,
          distrito: true,
        },
      },
      createAt: true,
    },
  });
};

//* (GET) Obtener Mesa por ID
const getById = async (id = 0) => {
  if (id <= 0) throw new BadRequestError(`El id "${id}" es inválido`);

  const mesa = await prisma.mesa.findUnique({
    where: { id: Number(id) },
    select: {
      id: true,
      nro_mesa: true,
      capacidad: true,
      precio_reserva: true,
      ocupado: true,
      local: {
        select: {
          id: true,
          descripcion: true,
          departamento: true,
          provincia: true,
          distrito: true,
        },
      },
      createAt: true,
    },
  });

  if (!mesa) throw new BadRequestError("Mesa no Encontrada", 404);

  return mesa;
};

//* (POST) Crear Mesa por Local
const create = async (id_local = 0, body = null) => {
  if (id_local <= 0)
    throw new BadRequestError(`El id "${id}" de Local es inválido`);

  if ((typeof body === "object" && Object.keys(body).length === 0) || !body)
    throw new BadRequestError("No se recibio datos correspondientes", 204);

  return await prisma.mesa.create({
    data: { ...body, id_local },
    select: {
      id: true,
      nro_mesa: true,
      capacidad: true,
      precio_reserva: true,
      ocupado: true,
      local: {
        select: {
          id: true,
          descripcion: true,
          departamento: true,
          provincia: true,
          distrito: true,
        },
      },
      createAt: true,
    },
  });
};

const update = async (id = 0, body = null) => {
  if (id <= 0) throw new BadRequestError(`El id "${id}" es inválido`);

  if ((typeof body === "object" && Object.keys(body).length === 0) || !body)
    throw new BadRequestError("No se ha enviado los datos correspondientes");

  const updateMesa = prisma.mesa.update({
    where: { id: Number(id) },
    data: { ...body },
  });

  const mesa = prisma.mesa.findUnique({
    where: { id: Number(id) },
    select: {
      id: true,
      nro_mesa: true,
      capacidad: true,
      precio_reserva: true,
      ocupado: true,
      local: {
        select: {
          id: true,
          descripcion: true,
          departamento: true,
          provincia: true,
          distrito: true,
        },
      },
      createAt: true,
    },
  });

  await prisma.$transaction([updateMesa, mesa]);

  return mesa;
};

const _delete = async (id = 0) => {
  if (id <= 0) throw new BadRequestError(`El id "${id}" es inválido`);

  return await prisma.mesa.delete({
    where: { id: Number(id) },
    select: {
      id: true,
      nro_mesa: true,
      capacidad: true,
      precio_reserva: true,
      ocupado: true,
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
