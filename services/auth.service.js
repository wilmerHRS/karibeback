import prisma from "../config/prisma.js";
import { BadRequestError } from "../helpers/handleError.js";
import encrypt from "../helpers/encrypt.js";
import { generateJwt } from "../helpers/jwt.js";

const login = async (username = "", password = "") => {
  if (!username || typeof username !== "string")
    throw new BadRequestError("Error en el Nombre de Usuario");
  if (!password || typeof password !== "string")
    throw new BadRequestError("Error en la Contraseña");

  // Verificar si existe la cuenta
  const cuenta = await prisma.cuenta.findFirst({
    where: { usuario: username },
    select: {
      usuario: true,
      password: true,
      suspendido: true,
      empleado: {
        select: {
          id: true,
          nombre: true,
          ape_paterno: true,
          rol: {
            select: {
              titulo: true,
            },
          },
        },
      },
    },
  });

  if (!cuenta) throw new BadRequestError("Credenciales Incorrectas");

  // Verificar si la cuenta esta suspendida
  if (cuenta.suspendido) throw new BadRequestError("Cuenta Suspendida");

  // Verificar la contraseña
  const correctPassword = encrypt.comparePassword(password, cuenta.password);
  if (!correctPassword) throw new BadRequestError("Credenciales Incorrectas");

  const { usuario, empleado } = cuenta;
  const token = await generateJwt(empleado.id);
  const data = { usuario, ...empleado };

  return { token, data };
};

export default {
  login,
};
