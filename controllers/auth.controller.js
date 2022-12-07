import { request, response } from "express";
import { matchedData } from "express-validator";

import authService from "../services/auth.service.js";

const login = async (req = request, res = response, next) => {
  const { usuario, password } = matchedData(req);

  try {
    const data = await authService.login(usuario, password);
    res.status(200).json({
      success: true,
      payload: data,
      message: "Operación Exitosa",
    });
  } catch (err) {
    next(err);
  }
};

export { login };
