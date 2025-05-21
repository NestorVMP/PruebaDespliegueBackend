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
//app.set('trust proxy', 1); // ⬅️ AÑADE ESTA LÍNEA AQUÍ
app.set('trust proxy', true);

app.use(cookieParser());
app.use(express.json());

/*app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true
}));*/
/*app.use(cors({
  origin: ['http://localhost:5173','https://pruebadesplieguebackend.onrender.com','http://192.168.1.136:3000','http://localhost:3000',
    'https://prueba-despliegue-frontend-3xiih9qlp-nestor-vmps-projects.vercel.app','https://pruebadesplieguebackendseparado.onrender.com',
    'https://prueba-despliegue-frontend.vercel.app' ],
  credentials: true
}));*/

const corsOptions = {
  origin: function (origin, callback) {
    console.log('Origin recibido:', origin);
    const allowedOrigins = [
      'https://prueba-despliegue-frontend.vercel.app',
      'http://localhost:5173'
    ];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
console.log('CORS aplicado')
app.options('*', cors(corsOptions));


//app.use(helmet());
app.use(mongoSanitize());

const apiLimiter = rateLimit({ 
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Demasiadas peticiones desde esta IP'
});

//app.use('/api', apiLimiter);

app.use('/user', UserRoutes);

app.get('/', (req, res) => {
  res.send('API de backend en funcionamiento');
});

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;