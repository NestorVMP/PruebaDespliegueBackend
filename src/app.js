const express = require('express');
const path = require('path');
const UserRoutes = require('./routes/userRoutes');
const errorHandler = require('./middlewares/errorMiddleware');
const notFoundHandler = require('./middlewares/notFoundHandler');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());
app.use(express.json());

/*app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true
}));*/
app.use(cors({
  origin: ['http://localhost:5173','https://pruebadesplieguebackend.onrender.com'],
  credentials: true
}));

app.use(helmet());
app.use(mongoSanitize());

const apiLimiter = rateLimit({ 
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Demasiadas peticiones desde esta IP'
});

app.use('/api', apiLimiter);

app.use('/user', UserRoutes);

app.get('/', (req, res) => {
  res.send('API de backend en funcionamiento');
});

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;