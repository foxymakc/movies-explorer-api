require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const { NOW_PORT, NOW_MONG_URL } = require('./config');
const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { errorHandler } = require('./assistants/errorHandler');
const limiter = require('./assistants/limiter');

const app = express();
app.use(helmet());

const corsOptions = {
  origin: ['http://localhost:3000', 'https://diplom.movies-explorer.nomorepartiesxyz.ru/', 'http://diplom.movies-explorer.nomorepartiesxyz.ru/'],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(cookieParser());

mongoose.connect(NOW_MONG_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  autoIndex: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(limiter);
app.use(router);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(NOW_PORT);
