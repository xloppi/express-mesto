const router = require('express').Router();
const {
  getUsers,
  getUser,
  updateProfile,
  updateAvatar,
  getMe,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getMe);
router.patch('/me', updateProfile);
router.get('/:userId', getUser);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
