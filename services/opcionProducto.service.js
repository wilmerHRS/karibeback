// TODO: Servicio OPCION de PRODUCTO
import prisma from "../config/prisma.js";
import { BadRequestError } from "../helpers/handleError.js";
import opcionLocalService from "./opcionLocal.service.js";

//* Obtener lista de opciones de productos
const getAllOpcionProducto = async () => {
  const opProductos = await prisma.opcion_producto.findMany({
    where: {
      deleted: false,
    },
    select: {
      id: true,
      titulo: true,
      descripcion: true,
      url: true,
      precio_estandar: true,
      id_producto: true,
    },
  });
  return opProductos;
};

//* Obtener todas las Opcion de Producto por ID de Producto
const getAllByProductoId = async (id = 0) => {
  if (id <= 0) throw new BadRequestError(`El id "${id}" es inválido`);

  const opProducto = await prisma.opcion_producto.findMany({
    where: { id_producto: Number(id) },
    select: {
      id: true,
      titulo: true,
      descripcion: true,
      url: true,
      precio_estandar: true,
      id_producto: true,
    },
  });

  if (opProducto === null)
    throw new BadRequestError("No se encontró la opción de producto", 404);

  return opProducto;
};

//* Obtener todas las Opcion de Producto por ID de Producto
const getByLocalAndProductoId = async (id_local = 0, id = 0) => {
  if (id <= 0) throw new BadRequestError(`El id "${id}" es inválido`);
  if (id_local <= 0)
    throw new BadRequestError(`El id "${id}" de Local es inválido`);

  const opProducto = await prisma.opcion_producto.findMany({
    where: {
      id_producto: id,
      op_local: {
        id_local: id_local,
        deleted: false,
      },
    },
    select: {
      id: true,
      titulo: true,
      descripcion: true,
      url: true,
      precio_estandar: true,
      id_producto: true,
      op_local: {
        select: {
          precio: true,
          activo: true,
        },
      },
    },
  });

  if (opProducto === null)
    throw new BadRequestError("No se encontró la opción de producto", 404);

  return opProducto;
};

//* Obtener una Opcion de Producto por ID
const getOpcionProductoById = async (id = 0) => {
  if (id <= 0) throw new BadRequestError(`El id "${id}" es inválido`);

  const opProducto = await prisma.opcion_producto.findFirst({
    where: { id: Number(id) },
    select: {
      id: true,
      titulo: true,
      descripcion: true,
      url: true,
      precio_estandar: true,
      id_producto: true,
    },
  });

  if (opProducto === null)
    throw new BadRequestError("No se encontró la opción de producto", 404);

  return opProducto;
};

//* Crear una opción de producto
const createOpcionProducto = async (
  id_producto = 0,
  body = null,
  id_local = null
) => {
  if (id_producto <= 0) throw new BadRequestError(`El id "${id}" es inválido`);

  if ((typeof body === "object" && Object.keys(body).length === 0) || !body)
    throw new BadRequestError("No se recibio datos del producto", 204);

  const opProducto = await prisma.opcion_producto.create({
    data: { id_producto, ...body },
    select: {
      id: true,
      titulo: true,
      descripcion: true,
      url: true,
      precio_estandar: true,
      id_producto: true,
    },
  });

  if (id_local) {
    const info = { precio: opProducto.precio_estandar, activo: true };
    await opcionLocalService.createOpcionLocal(
      Number(id_local),
      Number(opProducto.id),
      info
    );
  }

  return opProducto;
};

//* Actualizar una opción de producto por ID
const updateOpcionProducto = async (id = 0, body) => {
  if (id <= 0) throw new BadRequestError(`El id "${id}" es inválido`);

  if ((typeof body === "object" && Object.keys(body).length === 0) || !body)
    throw new BadRequestError(
      "No se ha enviado los datos correspondientes",
      204
    );

  //* Actualizar Opcion Producto
  const updateOpProducto = prisma.opcion_producto.update({
    where: { id: Number(id) },
    data: { ...body },
  });

  //* Obtener Opción de producto
  const opProducto = prisma.opcion_producto.findFirst({
    where: { id: Number(id) },
    select: {
      id: true,
      titulo: true,
      descripcion: true,
      url: true,
      precio_estandar: true,
      id_producto: true,
    },
  });

  await prisma.$transaction([updateOpProducto, opProducto]);

  return opProducto;
};

//* Eliminar una opción de producto por ID
const deleteOpcionProducto = async (id = 0) => {
  if (id <= 0) throw new BadRequestError(`El id "${id}" es inválido`);

  const data = await prisma.opcion_producto.delete({
    where: { id: Number(id) },
    select: {
      id: true,
      titulo: true,
      descripcion: true,
      url: true,
      precio_estandar: true,
      id_producto: true,
    },
  });

  return data;
};

export default {
  getAllOpcionProducto,
  getAllByProductoId,
  getByLocalAndProductoId,
  getOpcionProductoById,
  createOpcionProducto,
  updateOpcionProducto,
  deleteOpcionProducto,
};
