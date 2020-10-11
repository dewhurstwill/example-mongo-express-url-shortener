const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

if (process.env.NODE_ENV === 'development') require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');

const app = express();

app.use(morgan('tiny'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
