import { check } from "express-validator";

import { rolExistsById } from "../helpers/dbValidator.js";
import {
  validateIdResults,
  validateResults,
} from "../middlewares/handleValidator.js";

const rolIdValidator = [
  check("id").exists().notEmpty().custom(rolExistsById),
  validateIdResults,
];

const rolDataValidator = [check("titulo").exists().notEmpty(), validateResults];

export { rolIdValidator, rolDataValidator };
