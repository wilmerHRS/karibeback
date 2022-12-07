import { check } from "express-validator";

import { validateResults } from "../middlewares/handleValidator.js";

const idValidator = [check("id").exists().notEmpty(), validateResults];

export { idValidator };
