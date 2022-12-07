import YAML from "yamljs";
import * as OpenApiValidator from "express-openapi-validator";

import { __dirname } from "../utilsGlobal.js";

const yamlSpecFile = `${__dirname}swagger.yml`;
const apiDefinition = YAML.load(yamlSpecFile);
// const apiSummary = summarise(apiDefinition);
// console.info(apiSummary);

const validatorOptions = {
  coerceTypes: true,
  apiSpec: yamlSpecFile,
  validateRequests: true,
  validateResponses: true,
};

const validateInputs = OpenApiValidator.middleware(validatorOptions);

export { apiDefinition, validateInputs };
