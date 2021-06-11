const User = require('../models/user');

// возвращает всех пользователей
function getUsers() {
  User.find({});
}

// возвращает пользователя по _id
function getUser() {
  console.log('get user');
}

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })

    .then((user) => res.send({ data: user }))

    .catch((err) => res.status(500).send({ message: `Произошла ошибка: ${err.message}` }));
};

const updateProfile = (req, res) => {
  User.findByIdAndUpdate(req.params.id, { name:  })
};

module.exports = {
  getUsers,
  getUser,
  createUser,
};
