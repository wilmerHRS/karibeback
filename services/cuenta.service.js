import prisma from "../config/prisma.js";
import { BadRequestError } from "../helpers/handleError.js";
import encrypt from "../helpers/encrypt.js";
import empleadoService from "../services/empleado.service.js";

const getAll = async () => {
  return await prisma.cuenta.findMany({
    select: {
      id: true,
      usuario: true,
      suspendido: true,
      createAt: true,
      empleado: {
        select: {
          id: true,
          nombre: true,
          ape_paterno: true,
        },
      },
    },
  });
};

const getById = async (id = 0) => {
  if (id <= 0) throw new BadRequestError(`El id "${id}" es inválido`);

  const cuenta = await prisma.cuenta.findUnique({
    where: { id: Number(id) },
    select: {
      id: true,
      usuario: true,
      suspendido: true,
      createAt: true,
      empleado: {
        select: {
          id: true,
          nombre: true,
          ape_paterno: true,
        },
      },
    },
  });

  if (!cuenta) throw new BadRequestError("Cuenta no Encontrado", 404);

  return cuenta;
};


// ? Función que realiza la busqueda del empleado por Id, con el fin de obtener los datos necesarios
// ? para crear la cuenta
const getByEmpleadoId = async (id = 0) => {
  if (id <= 0) throw new BadRequestError(`El id "${id}" es inválido`);

  const cuenta = await prisma.cuenta.findUnique({
    where: { empleado_id: Number(id) },
    select: {
      id: true,
      usuario: true,
      suspendido: true,
      createAt: true,
      empleado: {
        select: {
          id: true,
          nombre: true,
          ape_paterno: true,
        },
      },
    },
  });

  if (!cuenta) throw new BadRequestError("El empleado no tiene Cuenta", 404);

  return cuenta;
};

const create = async (id = 0) => {
  if (id <= 0) throw new BadRequestError(`El id "${id}" es inválido`);

  const {
    documento,
    telefono,
    rol: { titulo },
  } = await empleadoService.getById(id);

  //*Obteniendo las dos primeras letras del rol
  const firtsTwoLetters = titulo.toUpperCase().slice(0, 2);

  //* El nombre de usuario se obtiene de las dos primeras letras del rol mas el número de documento(DNI)
  const username = `${firtsTwoLetters}${documento}`;

  //* La contraseña inicialmente es el teléfono, pero en caso de no existir pasa a ser el número de documento
  const password = telefono || documento;
  const hashPassword = encrypt.cryptPassword(password);

  const body = {
    usuario: username,
    password: hashPassword,
    empleado_id: Number(id),
  };

  return await prisma.cuenta.create({
    data: { ...body },
    select: {
      id: true,
      usuario: true,
      suspendido: true,
      createAt: true,
      empleado: {
        select: {
          id: true,
          nombre: true,
          ape_paterno: true,
        },
      },
    },
  });
};

const update = async (id = 0, body = null) => {
  if (id <= 0) throw new BadRequestError(`El id "${id}" es inválido`);

  if ((typeof body === "object" && Object.keys(body).length === 0) || !body)
    throw new BadRequestError("No se ha enviado los datos correspondientes");

  const updateCuenta = prisma.cuenta.update({
    where: { empleado_id: Number(id) },
    data: { ...body },
  });

  const cuenta = prisma.cuenta.findUnique({
    where: { empleado_id: Number(id) },
    select: {
      id: true,
      usuario: true,
      suspendido: true,
      createAt: true,
      empleado: {
        select: {
          id: true,
          nombre: true,
          ape_paterno: true,
        },
      },
    },
  });

  await prisma.$transaction([updateCuenta, cuenta]);

  return cuenta;
};

const updatePassword = async (id = 0, oldPassword = "", newPassword = "") => {
  if (id <= 0) throw new BadRequestError(`El id "${id}" es inválido`);
  if (!oldPassword || typeof oldPassword !== "string")
    throw new BadRequestError("Error en la Contraseña Actual");
  if (!newPassword || typeof newPassword !== "string")
    throw new BadRequestError("Error en la Contraseña Nueva");

  const cuenta = await prisma.cuenta.findUnique({
    where: { empleado_id: Number(id) },
    select: {
      password: true,
    },
  });

  if (!cuenta)
    throw new BadRequestError("El Empleado no tiene una cuenta", 404);

  const correctPassword = encrypt.comparePassword(oldPassword, cuenta.password);

  if (!correctPassword)
    throw new BadRequestError("Contraseña Actual Incorrecta");

  const password = encrypt.cryptPassword(newPassword);

  return await prisma.cuenta.update({
    where: { empleado_id: Number(id) },
    data: { password },
  });
};

const _delete = async (id = 0) => {
  if (id <= 0) throw new BadRequestError(`El id "${id}" es inválido`);

  return await prisma.cuenta.delete({
    where: { id: Number(id) },
    select: {
      id: true,
      usuario: true,
      suspendido: true,
      createAt: true,
    },
  });
};

const deleteByEmpleadoId = async (id = 0) => {
  if (id <= 0) throw new BadRequestError(`El id "${id}" es inválido`);

  return await prisma.cuenta.delete({
    where: { empleado_id: Number(id) },
    select: {
      id: true,
      usuario: true,
      suspendido: true,
      createAt: true,
    },
  });
};

export default {
  getAll,
  getById,
  getByEmpleadoId,
  create,
  update,
  updatePassword,
  delete: _delete,
  deleteByEmpleadoId,
};
