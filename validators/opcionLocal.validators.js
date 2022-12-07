import { check } from "express-validator";
import isBoolean from "validator/lib/isboolean.js";

import { opLocalExistsById } from "../helpers/dbValidator.js";
import {
  validateIdResults,
  validateResults,
} from "../middlewares/handleValidator.js";

const opLocalIdValidator = [
  check("id").exists().notEmpty().custom(opLocalExistsById),
  validateIdResults,
];

const opLocalDataValidator = [
  check("precio").exists().notEmpty().isDecimal(),
  check("activo").exists().notEmpty().isBoolean(),
  validateResults,
];

export { opLocalIdValidator, opLocalDataValidator };
