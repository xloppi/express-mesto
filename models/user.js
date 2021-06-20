const mongoose = require('mongoose');
const { Joi } = require('celebrate');
const { isEmail, isURL } = require('validator');

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
    validate: {
      validator: (v) => {
        const regex = /^https?:\/\/(www\.)?[0-9a-z-]{2,63}.[0-9a-z]{2,63}.[0-9a-z]{2,63}[0-9a-zA-Z-._~:/?#[\]@!$&'()*+,;=]*/m;
        return regex.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    required: [true, 'User phone number required'],
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
