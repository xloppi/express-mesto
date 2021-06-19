const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const JWT_KEY = '3drffvedtbh';

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка: ${err.message}` }));
};

const getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) {
        res.status(200).send(user);
      } else {
        res.status(404).send({ message: 'Пользователь с указанным _id не найден' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'ошибка валидации userId' });
      }
      return res.status(500).send({ message: `Произошла ошибка: ${err.message}` });
    });
};

const createUser = (req, res) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  if (!email || !password) {
    return res.status(400).send({ message: 'Не заполненно поле email или пароль' });
  }

  return bcrypt.hash(password, 10, (error, hash) => {
    User.findOne({ email })
      .then((userEmail) => {
        if (userEmail) {
          return res.status(409).send({ message: 'Такой пользователь уже существует' });
        }

        return User.create({
          name,
          about,
          avatar,
          email,
          password: hash,
        })
          .then((user) => res.status(200).send(user));
      })
      .catch((err) => {
        if (err.name === 'ValidationError' || err.name === 'CastError') {
          return res.status(400).send({ message: 'Переданы некорректные данные при обновлении профиля' });
        }
        return res.status(500).send({ message: `Произошла ошибка: ${err.message}` });
      });
  });
};

const updateProfile = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { name: req.body.name, about: req.body.about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (user) {
        res.status(200).send(user);
      } else {
        res.status(404).send({ message: 'Пользователь с указанным _id не найден' });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        return res.status(400).send({ message: 'Переданы некорректные данные при обновлении профиля' });
      }
      return res.status(500).send({ message: `Произошла ошибка: ${err.message}` });
    });
};

const updateAvatar = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { avatar: req.body.avatar },
    { new: true, runValidators: true },
  )
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Переданы некорректные данные при обновлении аватара' });
      }
      if (err.name === 'CastError') {
        return res.status(404).send({ message: 'Пользователь с указанным _id не найден' });
      }
      return res.status(500).send({ message: `Произошла ошибка: ${err.message}` });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ message: 'Не заполненно поле email или пароль' });
  }

  return User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return res.status(400).send({ message: 'Такого пользователя не существует' });
      }

      return bcrypt.compare(
        password,
        user.password,
        (error, isValid) => {
          if (!isValid) {
            return res.status(401).send({ message: 'Не правильная почта или  пароль' });
          }

          const token = jwt.sign({ _id: user._id }, JWT_KEY, { expiresIn: '7d' });
          return res
            .cookie('jwt', token, {
              maxAge: 3600000 * 24 * 7,
              httpOnly: true,
            })
            .end();
        },
      );
    })
    .catch(() => res.status(400).send({ message: 'ошибка' }));
};

const getMe = (req, res) => {
  User.findById(req.user._id)
    .then((user) => {
      if (user) {
        res.status(200).send(user);
      } else {
        res.status(404).send({ message: 'Пользователь с указанным _id не найден' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'ошибка валидации userId' });
      }
      return res.status(500).send({ message: `Произошла ошибка: ${err.message}` });
    });
};

module.exports = {
  getUsers,
  getUser,
  getMe,
  createUser,
  updateProfile,
  updateAvatar,
  login,
};
