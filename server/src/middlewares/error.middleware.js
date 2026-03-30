function errorMiddleware(error, _req, res, _next) {
  const status = error.status || 500;
  const message = error.message || 'Error interno del servidor';
  return res.status(status).json({ message });
}

module.exports = errorMiddleware;
