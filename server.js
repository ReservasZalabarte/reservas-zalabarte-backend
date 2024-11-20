require('dotenv').config(); // Carga las variables de entorno
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db'); // Conexión con la base de datos

const app = express();

// Middleware global
app.use(cors());
app.use(express.json()); // Parseo de JSON en el cuerpo de las solicitudes

// Probar la conexión a la base de datos
sequelize.authenticate()
  .then(() => console.log('Conexión a la base de datos establecida.'))
  .catch((err) => console.error('Error al conectar con la base de datos:', err));

// Sincronizar modelos
const Reserva = require('./models/Reserva');
const Restaurante = require('./models/Restaurante');

Reserva.sync({ alter: true });
Restaurante.sync({ alter: true });

// Ruta inicial para verificar que el servidor funciona
app.get('/', (req, res) => {
  res.send('¡Bienvenido a ReservasZalabarte!');
});

// Rutas públicas
const reservasRoutes = require('./routes/reservas');
app.use('/api/reservas', reservasRoutes); // Endpoints públicos para reservas

const restaurantesRoutes = require('./routes/restaurantes');
app.use('/api/restaurantes', restaurantesRoutes); // Endpoints públicos para restaurantes

// Rutas de autenticación
const authRoutes = require('./routes/auth'); // Importa las rutas de autenticación
app.use('/api', authRoutes); // Registra las rutas bajo el prefijo /api

// Rutas privadas (administración)
const adminRoutes = require('./routes/admin'); // Archivo que agrupa endpoints privados
app.use('/api/admin', adminRoutes); // Middleware verifyToken se usa dentro de admin.js

// Puerto y escucha
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
