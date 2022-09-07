const { celebrate, Joi } = require('celebrate');
const mongoose = require('mongoose');
const validator = require('validator');

const customValidationId = (value) => {
  if (!mongoose.isValidObjectId(value)) {
    throw new Error('Не правльный формат id');
  }
  return value;
};
const customValidateUrl = (url) => {
  const result = validator.isURL(url);
  if (!result) {
    throw new Error('Не правльный формат URL');
  }
  return url;
};

const loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const createUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const idValidation = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().alphanum().custom(customValidationId),
  }),
});

const updateUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

const createMoviesValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(customValidateUrl),
    trailerLink: Joi.string().required().custom(customValidateUrl),
    thumbnail: Joi.string().required().custom(customValidateUrl),
    movieId: Joi.number().integer().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

module.exports = {
  loginValidation,
  createUserValidation,
  idValidation,
  updateUserValidation,
  createMoviesValidation,
};
