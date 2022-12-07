export function sendErrorResponse(err, req, res, _next) {
  let status = err.status ?? 500;
  let errors = err.errors ?? [];
  let message = err.message ?? "Ocurrio un Error";

  return res.status(status).json({ success: false, message, errors });
}
