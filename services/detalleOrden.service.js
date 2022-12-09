import prisma from "../config/prisma.js";
import { BadRequestError } from "../helpers/handleError.js";

//? obtener ordenes recibidas
const getAllOrdenByStatusId = async (id_estado = 0) => {
  return await prisma.detalle_orden.findMany({
    where: {
      id_estado_detorden: id_estado,
    },
    select: {
      id: true,
      cantidad: true,
      precio: true,
      precio_total: true,
      orden: {
        select: {
          id: true,
          Comanda: {
            select: {
              cliente: true,
              mesa: {
                select: {
                  id: true,
                  nro_mesa: true,
                },
              },
            },
          },
        },
      },
      opproducto_local: {
        select: {
          opcion: {
            select: {
              id: true,
              titulo: true,
              url: true,
            },
          },
        },
      },
      estado_detorden: {
        select: {
          id: true,
          titulo: true,
        },
      },
      createAt: true,
    },
  });
};

const getAll = async () => {
  return await prisma.orden.findMany({
    select: {
      id: true,
      precio_total: true,
      tipo_orden: {
        select: {
          id: true,
          titulo: true,
        },
      },
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

const getById = async (id = 0) => {
  if (id <= 0) throw new BadRequestError(`El id "${id}" es inválido`);

  const detalle = await prisma.detalle_orden.findUnique({
    where: { id: Number(id) },
    select: {
      id: true,
      cantidad: true,
      precio: true,
      precio_total: true,
      orden: {
        select: {
          id: true,
          Comanda: {
            select: {
              cliente: true,
              mesa: {
                select: {
                  id: true,
                  nro_mesa: true,
                },
              },
            },
          },
        },
      },
      opproducto_local: {
        select: {
          opcion: {
            select: {
              id: true,
              titulo: true,
              url: true,
            },
          },
        },
      },
      estado_detorden: {
        select: {
          id: true,
          titulo: true,
        },
      },
      createAt: true,
    },
  });

  if (!detalle) throw new BadRequestError("Orden no Encontrada", 404);

  return detalle;
};

//! cambiar a actualizar pero para orden
const update = async (id = 0, body = null) => {
  if (id <= 0) throw new BadRequestError(`El id "${id}" es inválido`);

  if ((typeof body === "object" && Object.keys(body).length === 0) || !body)
    throw new BadRequestError("No se ha enviado los datos correspondientes");

  const updateDetOrden = prisma.detalle_orden.update({
    where: { id: Number(id) },
    data: { ...body },
  });

  const detOrden = prisma.detalle_orden.findUnique({
    where: { id: Number(id) },
    select: {
      id: true,
      cantidad: true,
      precio: true,
      precio_total: true,
      orden: {
        select: {
          id: true,
          Comanda: {
            select: {
              cliente: true,
              mesa: {
                select: {
                  id: true,
                  nro_mesa: true,
                },
              },
            },
          },
        },
      },
      opproducto_local: {
        select: {
          opcion: {
            select: {
              id: true,
              titulo: true,
              url: true,
            },
          },
        },
      },
      estado_detorden: {
        select: {
          id: true,
          titulo: true,
        },
      },
      createAt: true,
    },
  });

  await prisma.$transaction([updateDetOrden, detOrden]);

  return detOrden;
};

export default {
  getAllOrdenByStatusId,
  getById,
  getAll,
  update,
};
