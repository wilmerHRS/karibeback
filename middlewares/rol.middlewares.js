import { response, request } from "express";

import rolService from "../services/rol.service.js";

const rolExistsById = async (req = request, res = response, next) => {
  try {
    await rolService.getById(id);
    next();
  } catch (err) {
    next(err);
  }
};

export { rolExistsById };
