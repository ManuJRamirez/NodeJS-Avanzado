const createError = require('http-errors');
const jwt = require('jsonwebtoken');

async function jwsAuthMiddleware(req, res, next) {
  try {
    const apiJwsToken = req.get('Authorization') || req.query.jwt;

    if (!apiJwsToken) {
      next(createError(401, 'No autorizado. No dispone de token'));
      return;
    }

    jwt.verify(apiJwsToken, process.env.JWT_SECRET, (error, payload) => {
      if (error) {
        if (error.name === 'TokenExpiredError') {
          next(createError(401, 'No autorizado. Token caducado'));
        } else {
          next(createError(401, 'No autorizado. Token no válido'));
        }
        return;
      }

      req.usuarioApiConectado = payload._id;
      next();
    });
  } catch (error) {
    next(error);
  }
}

module.exports = jwsAuthMiddleware;
//cambio en el nombre del archivo
