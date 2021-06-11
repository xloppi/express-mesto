const User = require('../models/user');

// возвращает всех пользователей
const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка: ${err.message}` }));
};

// возвращает пользователя по _id
const getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(404).send({ message: 'Запрашиваемый пользователь не найден' });
      }
      res.status(500).send({ message: `Произошла ошибка: ${err}` });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(200).send(user))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка: ${err}` }));
};

const updateProfile = (req, res) => {
  User.findByIdAndUpdate(req.user._id, { name: req.body.name, about: req.body.about })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => res.status(400).send({ message: `Произошла ошибка: ${err.message}` }));
};

const updateAvatar = (req, res) => {
  User.findByIdAndUpdate(req.user._id, { avatar: req.body.avatar })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => res.status(400).send({ message: `Произошла ошибка: ${err.message}` }));
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateProfile,
  updateAvatar,
};
