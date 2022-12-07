import { check } from "express-validator";

import { comandaExistsById } from "../helpers/dbValidator.js";
import {
  validateIdResults,
  validateResults,
} from "../middlewares/handleValidator.js";

const comandaIdValidator = [
  check("id").exists().notEmpty().isNumeric().custom(comandaExistsById),
  validateIdResults,
];

const comandaDataValidator = [
  check("cliente").exists().notEmpty(),
  check("id_mesa").exists().notEmpty().isNumeric(),
  validateResults,
];

export { comandaIdValidator, comandaDataValidator };
