import { handleSocketError } from "../helpers/handleError.js";
import rolService from "../services/rol.service.js";

const getAll = async () => {
  let response;

  try {
    const data = await rolService.getAll();
    response = {
      success: true,
      payload: data,
      message: "Operación Exitosa",
    };
  } catch (err) {
    response = handleSocketError(err);
  }

  return response;
};

export default {
  getAll,
};
