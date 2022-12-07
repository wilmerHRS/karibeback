const handleSocketError = (err) => {
  let status = err.status ?? 500;
  let errors = err.errors ?? [];
  let message = err.message ?? "Ocurrio un Error";

  const response = { success: false, status, message, errors };

  return response;
};

class BadRequestError {
  constructor(message = "Ocurrio un Error", status = 400) {
    this.status = status;
    this.message = message;
  }
}

export { handleSocketError, BadRequestError };
