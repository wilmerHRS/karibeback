import { check } from "express-validator";

import {
  empleadoExistsById,
  localExistsById,
  rolExistsById,
} from "../helpers/dbValidator.js";
import {
  validateIdResults,
  validateResults,
} from "../middlewares/handleValidator.js";

const empleadoIdValidator = [
  check("id").exists().notEmpty().custom(empleadoExistsById),
  validateIdResults,
];

const empleadoRLValidator = [
  check("rol_id").custom(rolExistsById),
  check("local_id").custom(localExistsById),
  validateIdResults,
];

const empleadoDataValidator = [
  check("nombre").exists().notEmpty(),
  check("ape_paterno").exists().notEmpty(),
  check("ape_materno"),
  check("documento").exists().notEmpty(),
  check("genero").exists().notEmpty().isLength({ max: 1 }),
  check("fecha_nacimiento").exists().notEmpty().isDate(),
  check("telefono")
    .exists()
    .notEmpty()
    .isLength({ min: 9, max: 9 })
    .matches("^\\d{9}$"),
  check("correo"),
  check("rol_id").exists().notEmpty().custom(rolExistsById),
  check("local_id").exists().notEmpty().custom(localExistsById),
  validateResults,
];

export { empleadoIdValidator, empleadoDataValidator, empleadoRLValidator };
