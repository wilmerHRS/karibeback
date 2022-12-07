import { check } from "express-validator";

import {
  validateIdResults
} from "../middlewares/handleValidator.js";

export const idValidator = [
  check("id").exists().notEmpty().isNumeric().isInt(),
  validateIdResults
];