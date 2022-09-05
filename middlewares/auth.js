const jwt = require('jsonwebtoken');
const { NOW_JWT_SECRET } = require('../config');
const ErrorUnauthorized = require('../errors/ErrorUnauthorized');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;

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
