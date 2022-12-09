import { check } from "express-validator";

import { detOrdenExistsById } from "../helpers/dbValidator.js";
import {
  validateIdResults,
  validateResults,
} from "../middlewares/handleValidator.js";

const detalleOIdValidator = [
  check("id").exists().notEmpty().custom(detOrdenExistsById),
  validateIdResults,
];

const detalleOIdValidatorTwo = [
  check("id_detalle").exists().notEmpty().custom(detOrdenExistsById),
  validateIdResults,
];

const detalleODataValidator = [
  check("cantidad").exists().notEmpty().isNumeric(),
  check("id_opcion").exists().notEmpty().isNumeric(),
  validateResults,
];

export { detalleOIdValidator, detalleOIdValidatorTwo, detalleODataValidator };
