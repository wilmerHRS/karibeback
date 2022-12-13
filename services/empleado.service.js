import prisma from "../config/prisma.js";
import { BadRequestError } from "../helpers/handleError.js";

const getAll = async () => {
  return await prisma.empleado.findMany({
    select: {
      id: true,
      nombre: true,
      ape_paterno: true,
      ape_materno: true,
      documento: true,
      genero: true,
      fecha_nacimiento: true,
      telefono: true,
      correo: true,
      createAt: true,
      rol: {
        select: {
          id: true,
          titulo: true,
        },
      },
      local: {
        select: {
          id: true,
          descripcion: true,
        },
      },
    },
  });
};

const getByDni = async (dni = "") => {
  if (!dni) throw new BadRequestError("No se ha enviado el DNI");

  const empleado = await prisma.empleado.findUnique({
    where: {
      documento: dni,
    },
    select: {
      id: true,
      nombre: true,
      ape_paterno: true,
      ape_materno: true,
      documento: true,
      genero: true,
      fecha_nacimiento: true,
      telefono: true,
      correo: true,
      createAt: true,
      rol: {
        select: {
          id: true,
          titulo: true,
        },
      },
      local: {
        select: {
          id: true,
          descripcion: true,
        },
      },
    },
  });

  if (!empleado)
    throw new BadRequestError(
      `Empleado con Documento ${dni} no encontrado`,
      404
    );

  return empleado;
};

const getById = async (id = 0) => {
  if (id <= 0) throw new BadRequestError(`El id "${id}" es inválido`);

  const empleado = await prisma.empleado.findUnique({
    where: { id: Number(id) },
    select: {
      id: true,
      nombre: true,
      ape_paterno: true,
      ape_materno: true,
      documento: true,
      genero: true,
      fecha_nacimiento: true,
      telefono: true,
      correo: true,
      createAt: true,
      rol: {
        select: {
          id: true,
          titulo: true,
        },
      },
      local: {
        select: {
          id: true,
          descripcion: true,
        },
      },
    },
  });

  if (!empleado) throw new BadRequestError("Empleado no Encontrado", 404);

  return empleado;
};

const create = async (body = null) => {
  console.log("entro");
  if (!body)
    throw new BadRequestError("No se ha enviado los datos correspondientes");

  return await prisma.empleado.create({
    data: { ...body },
    select: {
      id: true,
      nombre: true,
      ape_paterno: true,
      ape_materno: true,
      documento: true,
      genero: true,
      fecha_nacimiento: true,
      telefono: true,
      correo: true,
      createAt: true,
      rol: {
        select: {
          id: true,
          titulo: true,
        },
      },
      local: {
        select: {
          id: true,
          descripcion: true,
        },
      },
    },
  });
};

const update = async (id = 0, body = null) => {
  if (id <= 0) throw new BadRequestError(`El id "${id}" es inválido`);

  if ((typeof body === "object" && Object.keys(body).length === 0) || !body)
    throw new BadRequestError("No se ha enviado los datos correspondientes");

  const updateEmpleado = prisma.empleado.update({
    where: { id: Number(id) },
    data: { ...body },
  });

  const empleado = prisma.empleado.findUnique({
    where: { id: Number(id) },
    select: {
      id: true,
      nombre: true,
      ape_paterno: true,
      ape_materno: true,
      documento: true,
      genero: true,
      fecha_nacimiento: true,
      telefono: true,
      correo: true,
      createAt: true,
      rol: {
        select: {
          id: true,
          titulo: true,
        },
      },
      local: {
        select: {
          id: true,
          descripcion: true,
        },
      },
    },
  });

  await prisma.$transaction([updateEmpleado, empleado]);

  return empleado;
};

const _delete = async (id = 0) => {
  if (id <= 0) throw new BadRequestError(`El id "${id}" es inválido`);

  const empleado = await prisma.empleado.delete({
    where: { id: Number(id) },
    select: {
      id: true,
      nombre: true,
      ape_paterno: true,
      ape_materno: true,
      documento: true,
      genero: true,
      fecha_nacimiento: true,
      telefono: true,
      correo: true,
      createAt: true,
      rol: {
        select: {
          id: true,
          titulo: true,
        },
      },
      local: {
        select: {
          id: true,
          descripcion: true,
        },
      },
    },
  });

  // const deleteCuenta = await prisma.cuenta.delete({
  //   where: { empleado_id: Number(id) },
  //   select: {
  //     id: true,
  //     usuario: true,
  //     createAt: true,
  //   },
  // });

  return empleado;
};

export default {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
  getByDni,
};
