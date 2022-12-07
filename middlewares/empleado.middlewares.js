import { request, response } from "express";
import { BadRequestError } from "../helpers/handleError.js";
import empleadoService from "../services/empleado.service.js";

const notExistsDocumento = async (req = request, res = response, next) => {
  const {
    body: { documento },
  } = req;

  try {
    await empleadoService.getByDni(documento);
    throw new BadRequestError(`Empleado con Documento ${documento} ya existe`);
  } catch (err) {
    if (err.status === 404) return next();
    next(err);
  }
};

export { notExistsDocumento };
