import { check } from "express-validator";

import { opProductoExistsById } from "../helpers/dbValidator.js";
import {
  validateIdResults,
  validateResults,
} from "../middlewares/handleValidator.js";

const opProductoIdValidator = [
  check("id").exists().notEmpty().custom(opProductoExistsById),
  validateIdResults,
];

const opProductoIdValidatorTwo = [
  check("id_opproducto").exists().notEmpty().custom(opProductoExistsById),
  validateIdResults,
];

const opProductoIdValidatorThree = [
  check("id_opcion").exists().notEmpty().custom(opProductoExistsById),
  validateIdResults,
];

const opProductoDataValidator = [
  check("titulo").exists().notEmpty(),
  check("descripcion").exists().notEmpty().isLength({ min: 0, max: 300 }),
  check("url").exists().notEmpty().isURL(),
  check("precio_estandar").exists().notEmpty().isDecimal(),
  validateResults,
];

export {
  opProductoIdValidator,
  opProductoIdValidatorTwo,
  opProductoIdValidatorThree,
  opProductoDataValidator,
};
