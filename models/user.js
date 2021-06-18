const mongoose = require('mongoose');
const { isEmail } = require('validator');
// const { celebrate, Joi } = require('celebrate');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxLength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxLength: 30,
  },
  avatar: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [isEmail, 'invalid email'],
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('user', userSchema);

/* Joi.string().required().unique().custom((value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("invalid e"); */
