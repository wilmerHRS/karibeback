// TODO: Servicios PRODUCTO
import prisma from "../config/prisma.js";
import { BadRequestError } from "../helpers/handleError.js";

//* Obtener lista con todos los productos
const getAllProductos = async () => {
  const productos = await prisma.producto.findMany({
    select: {
      id: true,
      titulo: true,
      descripcion: true,
      url: true,
      de_cocina: true,
      opcion: {
        select: {
          id: true,
          titulo: true,
          descripcion: true,
          url: true,
          precio_estandar: true,
        },
      },
    },
  });
  return productos;
};

//* Obtener un producto por ID
const getProductoById = async (id) => {
  if (Number(id) <= 0) throw new BadRequestError(`El id "${id}" es inválido`);

  const producto = await prisma.producto.findFirst({
    where: {
      id: Number(id),
    },
    select: {
      id: true,
      titulo: true,
      descripcion: true,
      url: true,
      de_cocina: true,
      opcion: {
        select: {
          id: true,
          titulo: true,
          descripcion: true,
          url: true,
          precio_estandar: true,
        },
      },
    },
  });
  if (producto === null)
    throw new BadRequestError("Producto no encontrado", 404);
  return producto;
};

//* Crear un producto
const createProducto = async (body) => {
  if (body === null || body === undefined)
    throw new BadRequestError("No se recibio datos del producto", 204);

  const producto = await prisma.producto.create({
    data: { ...body },
    select: {
      id: true,
      titulo: true,
      descripcion: true,
      url: true,
      de_cocina: true,
      opcion: {
        select: {
          id: true,
          titulo: true,
          descripcion: true,
          url: true,
          precio_estandar: true,
        },
      },
    },
  });

  return producto;
};

//* Actualizar un producto por ID
const updateProducto = async (id = 0, body = null) => {
  if (Number(id) <= 0) throw new BadRequestError(`El id "${id}" es inválido`);

  if ((typeof body === "object" && Object.keys(body).length === 0) || !body)
    throw new BadRequestError("No se recibio datos del producto", 204);

  //* actualizar producto
  const updateProduct = prisma.producto.update({
    where: { id: Number(id) },
    data: { ...body },
  });

  //* obtener producto
  const producto = prisma.producto.findFirst({
    where: { id: Number(id) },
    select: {
      id: true,
      titulo: true,
      descripcion: true,
      url: true,
      de_cocina: true,
      opcion: {
        select: {
          id: true,
          titulo: true,
          descripcion: true,
          url: true,
          precio_estandar: true,
        },
      },
    },
  });

  await prisma.$transaction([updateProduct, producto]);

  return producto;
};

//* Eliminar un Producto por ID
const deleteProducto = async (id = 0) => {
  if (Number(id) <= 0) throw new BadRequestError(`El id "${id}" es inválido`);

  return await prisma.producto.delete({
    where: {
      id: Number(id),
    },
    select: {
      id: true,
      titulo: true,
      descripcion: true,
      url: true,
      de_cocina: true,
    },
  });
};

export default {
  getAllProductos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto,
};
