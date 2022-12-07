import { check } from "express-validator";

import { mesaExistsById } from "../helpers/dbValidator.js";
import {
  validateIdResults,
  validateResults,
} from "../middlewares/handleValidator.js";

const ordenIdValidator = [
  check("id").exists().notEmpty().custom(mesaExistsById),
  validateIdResults,
];

const ordenIdValidatorTwo = [
  check("id_orden").exists().notEmpty().custom(mesaExistsById),
  validateIdResults,
];

const ordenDataValidator = [
  check("precio_total").exists().notEmpty().isDecimal(),
  validateResults,
];

export { ordenIdValidator, ordenIdValidatorTwo, ordenDataValidator };
