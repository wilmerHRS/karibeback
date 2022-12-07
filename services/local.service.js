import prisma from "../config/prisma.js";
import { BadRequestError } from "../helpers/handleError.js";

const getAll = async () => {
  return await prisma.local.findMany({
    select: {
      id: true,
      telefono: true,
      descripcion: true,
      ruc: true,
      departamento: true,
      provincia: true,
      distrito: true,
      createAt: true,
    },
  });
};

const getById = async (id = 0) => {
  if (id <= 0) throw new BadRequestError(`El id "${id}" es inválido`);

  const local = await prisma.local.findUnique({
    where: { id: Number(id) },
    select: {
      id: true,
      telefono: true,
      descripcion: true,
      ruc: true,
      departamento: true,
      provincia: true,
      distrito: true,
      createAt: true,
    },
  });

  if (!local) throw new BadRequestError("Local no Encontrado", 404);

  return local;
};

const create = async (body = null) => {
  if (!body)
    throw new BadRequestError("No se ha enviado los datos correspondientes");

  return await prisma.local.create({
    data: { ...body },
    select: {
      id: true,
      telefono: true,
      descripcion: true,
      ruc: true,
      departamento: true,
      provincia: true,
      distrito: true,
      createAt: true,
    },
  });
};

const update = async (id = 0, body = null) => {
  if (id <= 0) throw new BadRequestError(`El id "${id}" es inválido`);

  if ((typeof body === "object" && Object.keys(body).length === 0) || !body)
    throw new BadRequestError("No se ha enviado los datos correspondientes");

  const updateLocal = prisma.local.update({
    where: { id: Number(id) },
    data: { ...body },
  });

  const local = prisma.local.findUnique({
    where: { id: Number(id) },
    select: {
      id: true,
      telefono: true,
      descripcion: true,
      ruc: true,
      departamento: true,
      provincia: true,
      distrito: true,
      createAt: true,
    },
  });

  await prisma.$transaction([updateLocal, local]);

  return local;
};

const _delete = async (id = 0) => {
  if (id <= 0) throw new BadRequestError(`El id "${id}" es inválido`);

  return await prisma.local.delete({
    where: { id: Number(id) },
    select: {
      id: true,
      telefono: true,
      descripcion: true,
      ruc: true,
      departamento: true,
      provincia: true,
      distrito: true,
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
