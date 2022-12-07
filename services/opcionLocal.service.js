// TODO: Servicio CRUD entidad Opción Producto por Local
import prisma from "../config/prisma.js";
import { BadRequestError } from "../helpers/handleError.js";

//* Obtener una lista de las opciones de local
const getAllOpcionLocal = async () => {
  const data = await prisma.opcion_local.findMany({
    where: {
      deleted: false,
    },
    select: {
      id: true,
      precio: true,
      activo: true,
      id_opcion: true,
      id_local: true,
    },
  });
  return data;
};

//* Obtener una opción de local por su id
const getOpcionLocalById = async (id = 0) => {
  if (id <= 0) throw new BadRequestError(`El id "${id}" es inválido`);

  const opLocal = await prisma.opcion_local.findFirst({
    where: {
      id: id,
    },
    select: {
      id: true,
      precio: true,
      activo: true,
      id_opcion: true,
      id_local: true,
    },
  });

  if (!opLocal) throw new BadRequestError("Opción Local no Encontrado", 404);

  return opLocal;
};

const getOpProductoLocalById = async (id = 0, id_local = 0) => {
  if (id <= 0) throw new BadRequestError(`El id "${id}" es inválido`);
  if (id_local <= 0)
    throw new BadRequestError(`El id "${id_local}"  de Local es inválido`);

  const opLocal = await prisma.opcion_local.findFirst({
    where: {
      id_opcion: id,
      id_local: id_local,
    },
    select: {
      id: true,
      precio: true,
      activo: true,
      id_opcion: true,
      id_local: true,
    },
  });

  if (!opLocal) throw new BadRequestError("Opción Local no Encontrado", 404);

  return opLocal;
};

//* Crear Opcion Local
const createOpcionLocal = async (id_local = 0, id_opcion = 0, body = null) => {
  if (id_local <= 0)
    throw new BadRequestError(`El id "${id}" del Local es inválido`);
  if (id_opcion <= 0)
    throw new BadRequestError(
      `El id "${id}" de la Opción de Producto es inválido`
    );

  if ((typeof body === "object" && Object.keys(body).length === 0) || !body)
    throw new BadRequestError("No se recibio datos del producto", 204);

  const data = await prisma.opcion_local.create({
    data: { ...body, id_local, id_opcion },
    select: {
      id: true,
      precio: true,
      activo: true,
      id_opcion: true,
      id_local: true,
    },
  });
  return data;
};

//* Actualizar una opcion de local
const updateOpcionLocal = async (id = 0, body = null) => {
  if (id <= 0) throw new BadRequestError(`El id "${id}" es inválido`);

  if ((typeof body === "object" && Object.keys(body).length === 0) || !body)
    throw new BadRequestError("No se recibio datos del producto", 204);

  const [update, data] = await prisma.$transaction([
    prisma.opcion_local.update({
      where: { id: id },
      data: { ...body },
    }),
    prisma.opcion_local.findFirst({
      where: { id: id },
      select: {
        id: true,
        precio: true,
        activo: true,
        id_opcion: true,
        id_local: true,
      },
    }),
  ]);
  return data;
};

//* Eliminar la opción de producto de un local
const deleteOpcionLocal = async (id = 0) => {
  if (id <= 0) throw new BadRequestError(`El id "${id}" es inválido`);

  const data = await prisma.opcion_local.delete({
    where: { id: id },
    select: {
      id: true,
      precio: true,
      activo: true,
      id_opcion: true,
      id_local: true,
    },
  });
  return data;
};

export default {
  getAllOpcionLocal,
  getOpcionLocalById,
  getOpProductoLocalById,
  createOpcionLocal,
  updateOpcionLocal,
  deleteOpcionLocal,
};
