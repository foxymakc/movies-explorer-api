const jwt = require('jsonwebtoken');
const { NOW_JWT_SECRET } = require('../config');
const ErrorUnauthorized = require('../errors/ErrorUnauthorized');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new ErrorUnauthorized('Требуется авторизация');
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, NOW_JWT_SECRET);
  } catch (err) {
    throw new ErrorUnauthorized('Требуется авторизация');
  }

  req.user = payload;

  return next();
};

module.exports = { auth };
