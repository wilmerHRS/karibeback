import { check } from "express-validator";

import { tipoOrdenExistsById } from "../helpers/dbValidator.js";
import {
  validateIdResults,
  validateResults,
} from "../middlewares/handleValidator.js";

const tipoOrdenIdValidator = [
  check("id").exists().notEmpty().custom(tipoOrdenExistsById),
  validateIdResults,
];

const tipoOrdenDataValidator = [
  check("titulo").exists().notEmpty(),
  validateResults,
];

export { tipoOrdenIdValidator, tipoOrdenDataValidator };
