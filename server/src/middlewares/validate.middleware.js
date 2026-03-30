const { createHttpError } = require('../utils/httpError');

function requireFields(fields) {
  return (req, _res, next) => {
    const missing = fields.filter((field) => req.body[field] === undefined || req.body[field] === null || req.body[field] === '');

    if (missing.length > 0) {
      return next(createHttpError(400, `Faltan campos obligatorios: ${missing.join(', ')}`));
    }

    return next();
  };
}

module.exports = { requireFields };
