require('dotenv').config();

const {
  PORT = 3001,
  MONG_URL = 'mongodb://localhost:27017/moviesdb',
  JWT_SECRET = 'secret-key',
  NODE_ENV,
} = process.env;

const NOW_PORT = NODE_ENV === 'production' ? PORT : 3001;
const NOW_MONG_URL = NODE_ENV === 'production' ? MONG_URL : 'mongodb://localhost:27017/moviesdb';
const NOW_JWT_SECRET = NODE_ENV === 'production' ? JWT_SECRET : 'secret-key';

module.exports = {
  NOW_PORT,
  NOW_MONG_URL,
  NOW_JWT_SECRET,
};
