const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
require('dotenv').config(); // 👈 Asegúrate de que esté aquí
////npm install helmet express-rate-limit
//Helmet protege tu app configurando cabeceras HTTP como Content-Security-Policy, X-Powered-By, X-Frame-Options, etc.
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');


const app = express();

// 🔐 Configurar CORS dinámico
const allowedOrigins = [
  'http://localhost:5173',
  'https://rio-mauve-five.vercel.app'
];

const corsOptions = {
  origin: function (origin, callback) {
    // Permitir si no hay origin (como Postman) o si está en la lista
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS: ' + origin));
    }
  },
  credentials: true
};

app.use(cors(corsOptions));


// Middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(helmet());
//app.use('/api/auth', authRoutes);
app.use('/api/auth', require('./routes/auth.routes'));


const limiter = rateLimit({ windowMs: 60000, max: 60 });
app.use(limiter);

// 🛣️ Rutas
const usuariosRoutes = require('./routes/usuarios.routes');
app.use('/api/usuarios', usuariosRoutes);

// 🧯 Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ mensaje: 'Error interno del servidor' });
});

app.listen(process.env.PORT || 4000, () => {
  console.log(`Servidor backend corriendo en http://localhost:${process.env.PORT || 4000}`);
});

