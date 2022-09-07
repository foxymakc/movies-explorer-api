const router = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { createMoviesValidation, idValidation } = require('../middlewares/validation');

router.get('/movies', getMovies);
router.post('/movies', createMoviesValidation, createMovie);
router.delete('/movies/:movieId', idValidation, deleteMovie);

module.exports = router;
