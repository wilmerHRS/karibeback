import { check } from "express-validator";

import { mesaExistsById } from "../helpers/dbValidator.js";
import {
  validateIdResults,
  validateResults,
} from "../middlewares/handleValidator.js";

const detalleOIdValidator = [
  check("id").exists().notEmpty().custom(mesaExistsById),
  validateIdResults,
];

const detalleOIdValidatorTwo = [
  check("id_detalle").exists().notEmpty().custom(mesaExistsById),
  validateIdResults,
];

const detalleODataValidator = [
  check("cantidad").exists().notEmpty().isNumeric(),
  // check("precio").exists().notEmpty().isDecimal(),
  check("id_opcion").exists().notEmpty().isNumeric(),
  // check("precio_total").exists().notEmpty().isDecimal(),
  // check("id_orden").exists().notEmpty().isNumeric(),
  // check("id_estado").exists().notEmpty().isNumeric(),
  validateResults,
];

export { detalleOIdValidator, detalleOIdValidatorTwo, detalleODataValidator };
