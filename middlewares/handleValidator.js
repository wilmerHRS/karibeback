import { validationResult } from "express-validator";

const validateResults = (req, res, next) => {
  try {
    validationResult(req).throw();
    return next();
  } catch (err) {
    err.status = 400;
    return next(err);
  }
};

const validateIdResults = (req, res, next) => {
  try {
    validationResult(req).throw();
    return next();
  } catch (err) {
    err.status = 404;
    err.message = err.errors[0].msg ?? "Ocurrio un Error";

    return next(err);
  }
};

export { validateResults, validateIdResults };
