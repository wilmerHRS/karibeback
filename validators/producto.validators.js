import { check } from "express-validator";
import { productoExistsById } from "../helpers/dbValidator.js";

import {
  validateIdResults,
  validateResults,
} from "../middlewares/handleValidator.js";

const productoIdValidator = [
  check("id").exists().notEmpty().custom(productoExistsById),
  validateIdResults,
];

const productoDataValidator = [
  check("titulo").exists().notEmpty(),
  check("descripcion").exists().notEmpty().isLength({ min: 0, max: 300 }),
  check("url").exists().notEmpty(),
  check("de_cocina").exists().notEmpty(),
  validateResults,
];

export { productoDataValidator, productoIdValidator };
