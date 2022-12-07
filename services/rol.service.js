import prisma from "../config/prisma.js";
import { BadRequestError } from "../helpers/handleError.js";

const getAll = async () => {
  return await prisma.rol.findMany({
    select: {
      id: true,
      titulo: true,
      createAt: true,
    },
  });
};

const getById = async (id = 0) => {
  if (id <= 0) throw new BadRequestError(`El id "${id}" es inválido`);

  const rol = await prisma.rol.findUnique({
    where: { id: Number(id) },
    select: {
      id: true,
      titulo: true,
      createAt: true,
    },
  });

  if (!rol) throw new BadRequestError("Rol no Encontrado", 404);

  return rol;
};

const create = async (body = null) => {
  if (!body)
    throw new BadRequestError("No se ha enviado los datos correspondientes");

  return await prisma.rol.create({
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
  if (!body)
    throw new BadRequestError("No se ha enviado los datos correspondientes");

  const updateRol = prisma.rol.update({
    where: { id: Number(id) },
    data: { ...body },
  });

  const rol = prisma.rol.findUnique({
    where: { id: Number(id) },
    select: {
      id: true,
      titulo: true,
      createAt: true,
    },
  });

  await prisma.$transaction([updateRol, rol]);

  return rol;
};

const _delete = async (id = 0) => {
  if (id <= 0) throw new BadRequestError(`El id "${id}" es inválido`);

  return await prisma.rol.delete({
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
