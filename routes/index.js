const router = require('express').Router();
const moviesRouter = require('./movies');
const usersRouter = require('./users');
const { auth } = require('../middlewares/auth');
const { login, createUser } = require('../controllers/users');
const { loginValidation, createUserValidation } = require('../middlewares/validation');
const ErrorNotFound = require('../errors/ErrorNotFound');

router.post('/signin', loginValidation, login);
router.post('/signup', createUserValidation, createUser);

router.use('/', auth, moviesRouter);
router.use('/', auth, usersRouter);

router.use('*', auth, () => {
  throw new ErrorNotFound('Запрашиваемый ресурс не найден');
});

module.exports = router;
