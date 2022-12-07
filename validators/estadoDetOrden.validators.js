import { check } from "express-validator";

import { estadoDOrdenExistsById } from "../helpers/dbValidator.js";
import {
  validateIdResults,
  validateResults,
} from "../middlewares/handleValidator.js";

const estadoDOrdenIdValidator = [
  check("id").exists().notEmpty().custom(estadoDOrdenExistsById),
  validateIdResults,
];

const estadoDOrdenDataValidator = [
  check("titulo").exists().notEmpty(),
  validateResults,
];

export { estadoDOrdenIdValidator, estadoDOrdenDataValidator };
