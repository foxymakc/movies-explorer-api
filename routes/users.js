const router = require('express').Router();
const { updateUser, getInfoUser } = require('../controllers/users');
const { updateUserValidation } = require('../middlewares/validation');

router.get('/users/me', getInfoUser);
router.patch('/users/me', updateUserValidation, updateUser);

module.exports = router;
