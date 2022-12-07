import { check } from "express-validator";

import {
  cuentaExistsById,
  empleadoExistsById,
} from "../helpers/dbValidator.js";
import {
  validateIdResults,
  validateResults,
} from "../middlewares/handleValidator.js";

const cuentaIdValidator = [
  check("id").exists().notEmpty().custom(cuentaExistsById),
  validateIdResults,
];

const cuentaDataValidator = [
  check("usuario").exists().notEmpty(),
  check("password").exists().notEmpty(),
  validateResults,
];

const cuentaUsernameValidator = [
  check("usuario").exists().notEmpty(),
  validateResults,
];

const cuentaPasswordValidator = [
  check("password").exists().notEmpty(),
  check("newpasword").exists().notEmpty(),
  validateResults,
];

export {
  cuentaIdValidator,
  cuentaDataValidator,
  cuentaUsernameValidator,
  cuentaPasswordValidator,
};
