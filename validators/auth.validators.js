import { check } from "express-validator";

import { validateResults } from "../middlewares/handleValidator.js";

const authDataValidator = [
  check("usuario").exists().notEmpty(),
  check("password").exists().notEmpty(),
  validateResults,
];

export { authDataValidator };
