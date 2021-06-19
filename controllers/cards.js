const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка: ${err.message}` }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Переданы некорректные данные при создании карточки' });
      }
      return res.status(500).send({ message: `Произошла ошибка: ${err.message}` });
    });
};

const deleteCard = (req, res) => {
  const userId = req.user._id;

  Card.findOne(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Карточка с указанным _id не найдена' });
      }

      if (!userId === card.owner) {
        res.status(403).send({ message: 'Пользователь не является владельцем карточки' });
      }

      return Card.remove(req.params.cardId)
        .then((deletedCard) => res.status(200).send(deletedCard));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'ошибка валидации cardID' });
      }
      return res.status(500).send({ message: `Произошла ошибка: ${err.message}` });
    });
};

/* Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (card) {
        res.status(200).send(card);
      } else {
        res.status(404).send({ message: 'Карточка с указанным _id не найдена' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'ошибка валидации cardID' });
      }
      return res.status(500).send({ message: `Произошла ошибка: ${err.message}` });
    }); */

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.status(200).send(card);
      } else {
        res.status(404).send({ message: 'Карточка с указанным _id не найдена' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Переданы некорректные данные для постановки лайка' });
      }
      return res.status(500).send({ message: `Произошла ошибка: ${err.message}` });
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.status(200).send(card);
      } else {
        res.status(404).send({ message: 'Карточка с указанным _id не найдена' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Переданы некорректные данные для снятии лайка' });
      }
      return res.status(500).send({ message: `Произошла ошибка: ${err.message}` });
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
