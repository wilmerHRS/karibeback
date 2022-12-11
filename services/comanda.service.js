import prisma from "../config/prisma.js";
import { BadRequestError } from "../helpers/handleError.js";

const getAll = async () => {
  return await prisma.comanda.findMany({
    select: {
      id: true,
      cliente: true,
      finalizado: true,
      orden: {
        select: {
          id: true,
          precio_total: true,
        },
      },
      mesa: {
        select: {
          id: true,
          nro_mesa: true,
        },
      },
      createAt: true,
    },
  });
};

//* Obtener comanda por ID
const getById = async (id = 0) => {
  if (id <= 0) throw new BadRequestError(`El id "${id}" es inválido`);

  const comanda = await prisma.comanda.findUnique({
    where: { id: Number(id) },
    select: {
      id: true,
      cliente: true,
      finalizado: true,
      orden: {
        select: {
          id: true,
          precio_total: true,
          Detalle_orden: {
            select: {
              id: true,
              cantidad: true,
              precio: true,
              precio_total: true,
              estado_detorden: {
                select: {
                  id: true,
                  titulo: true,
                },
              },
              opproducto_local: {
                select: {
                  id: true,
                  precio: true,
                  opcion: {
                    select: {
                      id: true,
                      titulo: true,
                      url: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
      mesa: {
        select: {
          id: true,
          nro_mesa: true,
        },
      },
      createAt: true,
    },
  });

  if (!comanda) throw new BadRequestError("Comanda no Encontrada", 404);

  return comanda;
};

//* Obtener Comandas por ID de Empleado (no finalizadas/ finalizadas)
const getAllByEmpleadoId = async (id_empleado = 0, type = "TODAS") => {
  if (id_empleado <= 0) throw new BadRequestError(`El id "${id}" es inválido`);

  const query = { id_empleado };

  if (type === "FINALIZADAS") query.finalizado = true;
  else if (type === "NO FINALIZADAS") query.finalizado = false;

  console.log(query);

  const comanda = await prisma.comanda.findMany({
    where: { ...query },
    select: {
      id: true,
      cliente: true,
      finalizado: true,
      orden: {
        select: {
          id: true,
          precio_total: true,
        },
      },
      mesa: {
        select: {
          id: true,
          nro_mesa: true,
        },
      },
      createAt: true,
    },
  });

  if (!comanda) throw new BadRequestError("Comanda no Encontrada", 404);

  return comanda;
};

//* Obtener Comandas por ID de Empleado (no pagadas/ pagadas)
const getAllPagoByEmpleadoId = async (id_empleado = 0, pagado = null) => {
  if (id_empleado <= 0) throw new BadRequestError(`El id "${id}" es inválido`);

  const query = { id_empleado };

  // obtener cuando este pagado o no, en todo caso no venga el "pagado" obtendrá todos
  if ([true, false].includes(pagado)) query.pagado = pagado;

  console.log(query);

  const comanda = await prisma.comanda.findMany({
    where: { ...query },
    select: {
      id: true,
      cliente: true,
      finalizado: true,
      orden: {
        select: {
          id: true,
          precio_total: true,
          Detalle_orden: {
            select: {
              id: true,
              cantidad: true,
              precio: true,
              precio_total: true,
              estado_detorden: {
                select: {
                  id: true,
                  titulo: true,
                },
              },
              opproducto_local: {
                select: {
                  id: true,
                  precio: true,
                  opcion: {
                    select: {
                      id: true,
                      titulo: true,
                      url: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
      mesa: {
        select: {
          id: true,
          nro_mesa: true,
        },
      },
      createAt: true,
    },
  });

  if (!comanda) throw new BadRequestError("Comanda no Encontrada", 404);

  return comanda;
};

//* Obtener Comanda y detalle por ID de Empleado (no finalizadas/ finalizadas)
const getByEmpleadoId = async (id_empleado = 0, id = 0, type = "TODAS") => {
  if (id_empleado <= 0)
    throw new BadRequestError(`El id "${id_empleado}" de Empleado es inválido`);

  if (id <= 0)
    throw new BadRequestError(`El id "${id}" de Comanda es inválido`);

  const query = { id_empleado, id };

  if (type === "FINALIZADAS") query.finalizado = true;
  else if (type === "NO FINALIZADAS") query.finalizado = false;

  console.log(query);

  const comanda = await prisma.comanda.findUnique({
    where: { ...query },
    select: {
      id: true,
      cliente: true,
      finalizado: true,
      orden: {
        select: {
          id: true,
          precio_total: true,
          Detalle_orden: {
            select: {
              id: true,
              cantidad: true,
              precio: true,
              precio_total: true,
              estado_detorden: {
                select: {
                  id: true,
                  titulo: true,
                },
              },
              opproducto_local: {
                select: {
                  id: true,
                  precio: true,
                  opcion: {
                    select: {
                      id: true,
                      titulo: true,
                      url: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
      mesa: {
        select: {
          id: true,
          nro_mesa: true,
        },
      },
      createAt: true,
    },
  });

  if (!comanda) throw new BadRequestError("Comanda no Encontrada", 404);

  return comanda;
};

//* Crear comanda
const create = async (body = null) => {
  if (!body)
    throw new BadRequestError("No se ha enviado los datos correspondientes");

  return await prisma.comanda.create({
    data: {
      cliente: body.cliente,
      mesa: {
        connect: {
          id: body.id_mesa,
        },
      },
      empleado: {
        connect: {
          id: body.id_empleado,
        },
      },
      orden: {
        create: {
          precio_total: 0,
          id_tipo_orden: body.id_tipo_orden,
          id_local: body.id_local,
        },
      },
    },
    select: {
      id: true,
      cliente: true,
      finalizado: true,
      orden: {
        select: {
          id: true,
          precio_total: true,
        },
      },
      mesa: {
        select: {
          id: true,
          nro_mesa: true,
        },
      },
      createAt: true,
    },
  });
};

//* Crear Detalle Comanda
const createDetalle = async (id_comanda = 0, body = null) => {
  if ((typeof body === "object" && Object.keys(body).length === 0) || !body)
    throw new BadRequestError("No se ha enviado los datos correspondientes");

  //? Obtener orden (id)
  const { id_orden } = await prisma.comanda.findUnique({
    where: {
      id: id_comanda,
      finalizado: false,
    },
    select: {
      id_orden: true,
    },
  });

  const bodyData = { ...body, id_orden };

  const data = await prisma.detalle_orden.create({
    data: bodyData,
    select: {
      id: true,
      cantidad: true,
      precio: true,
      precio_total: true,
      orden: {
        select: {
          id: true,
          tipo_orden: {
            select: {
              id: true,
              titulo: true,
            },
          },
          Comanda: {
            select: {
              id: true,
              cliente: true,
              empleado: {
                select: {
                  id: true,
                  nombre: true,
                  ape_paterno: true,
                },
              },
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
      opproducto_local: {
        select: {
          precio: true,
          opcion: {
            select: {
              id: true,
              titulo: true,
              descripcion: true,
              url: true,
            },
          },
        },
      },
    },
  });

  //! sumar todo los precio total de los detalles
  const {
    _sum: { precio_total },
  } = await prisma.detalle_orden.aggregate({
    where: {
      id_orden: id_orden,
      deleted: false,
    },
    _sum: {
      precio_total: true,
    },
  });

  await prisma.orden.update({
    where: { id: id_orden },
    data: { precio_total },
  });

  return data;
};

//* Actualizar comanda
const update = async (id = 0, body = null, finalizado = null) => {
  if (id <= 0) throw new BadRequestError(`El id "${id}" es inválido`);

  if ((typeof body === "object" && Object.keys(body).length === 0) || !body)
    throw new BadRequestError("No se ha enviado los datos correspondientes");

  const query = { id: Number(id) };

  // actualizar cuando este finalizado o no, en todo caso no venga el "finalizado" actualizara siempre
  if ([true, false].includes(finalizado)) query.finalizado = finalizado;

  const updateComanda = prisma.comanda.update({
    where: { ...query },
    data: { ...body },
  });

  const comanda = prisma.comanda.findUnique({
    where: { ...query },
    select: {
      id: true,
      cliente: true,
      finalizado: true,
      orden: {
        select: {
          id: true,
          precio_total: true,
        },
      },
      mesa: {
        select: {
          id: true,
          nro_mesa: true,
        },
      },
      createAt: true,
    },
  });

  await prisma.$transaction([updateComanda, comanda]);

  if (!(await comanda)) throw new BadRequestError("Comanda no Encontrada", 404);

  return comanda;
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
  getAllByEmpleadoId,
  getByEmpleadoId,
  getAllPagoByEmpleadoId,
  create,
  createDetalle,
  update,
  delete: _delete,
};
