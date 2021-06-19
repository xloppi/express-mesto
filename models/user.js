const mongoose = require('mongoose');
const { isEmail } = require('validator');
// const { celebrate, Joi } = require('celebrate');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxLength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxLength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
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
    select: false,
  },
});

module.exports = mongoose.model('user', userSchema);

/* Joi.string().required().unique().custom((value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("invalid e"); */
