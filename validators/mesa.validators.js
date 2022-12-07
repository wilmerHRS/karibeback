import { check } from "express-validator";

import { mesaExistsById } from "../helpers/dbValidator.js";
import {
  validateIdResults,
  validateResults,
} from "../middlewares/handleValidator.js";

const mesaIdValidator = [
  check("id").exists().notEmpty().custom(mesaExistsById),
  validateIdResults,
];

const mesaDataValidator = [
  check("nro_mesa").exists().notEmpty(),
  check("capacidad").exists().notEmpty().isNumeric(),
  check("precio_reserva").exists().notEmpty().isDecimal(),
  check("ocupado").exists().notEmpty().isBoolean(),
  validateResults,
];

export { mesaIdValidator, mesaDataValidator };
