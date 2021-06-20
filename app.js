const express = require('express');
const mongoose = require('mongoose');
const { errors, celebrate, Joi } = require('celebrate');
const { isURL } = require('validator');
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const {
  createUser,
  login,
} = require('./controllers/users');

const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());

app.post('/signin', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    password: Joi.string().required(),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
    avatar: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
}), createUser);

app.use(auth);

app.use(routes);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});

app.listen(PORT);

/* (value, helpers) => {
      if (isURL(value)) {
        return value;
      }
      return helpers.error('any.invalid');
    } */
