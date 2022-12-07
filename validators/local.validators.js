import { check } from "express-validator";

import { localExistsById } from "../helpers/dbValidator.js";
import {
  validateIdResults,
  validateResults,
} from "../middlewares/handleValidator.js";

export const localIdValidator = [
  check("id").exists().notEmpty().custom(localExistsById),
  validateIdResults,
];

export const localIdValidatorTwo = [
  check("id_local").exists().notEmpty().custom(localExistsById),
  validateIdResults,
];

export const localDataValidator = [
  check("telefono")
    .exists()
    .notEmpty()
    .isLength({ min: 9, max: 9 })
    .matches("^\\d{9}$"),
  check("descripcion"),
  check("ruc")
    .exists()
    .notEmpty()
    .isLength({ min: 11, max: 11 })
    .matches("^\\d{11}$"),
  check("departamento").exists().notEmpty(),
  check("provincia").exists().notEmpty(),
  check("distrito").exists().notEmpty(),
  validateResults,
];
