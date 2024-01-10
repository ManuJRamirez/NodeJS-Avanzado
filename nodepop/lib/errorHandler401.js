function errorHandler401(err, req, res, next) {
  const statusCode = err.status || 500;

  if (statusCode === 401) {
    const errorMessage = err.message || 'No autorizado';
    return res.status(statusCode).json({ error: errorMessage });
  }

  next(err);
}

module.exports = errorHandler401;
