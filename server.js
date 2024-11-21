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

// Importar modelos
const Restaurante = require('./models/Restaurante');
const Mesa = require('./models/Mesa');
const Reserva = require('./models/Reserva');
const Turno = require('./models/Turno'); // Importa el modelo Turno

// Definir relaciones entre los modelos
// Restaurante y Mesas
Restaurante.hasMany(Mesa, { foreignKey: 'restauranteId' });
Mesa.belongsTo(Restaurante, { foreignKey: 'restauranteId' });

// Restaurante y Reservas
Restaurante.hasMany(Reserva, { foreignKey: 'restauranteId' });
Reserva.belongsTo(Restaurante, { foreignKey: 'restauranteId' });

// Restaurante y Turnos
Restaurante.hasMany(Turno, { foreignKey: 'restauranteId' });
Turno.belongsTo(Restaurante, { foreignKey: 'restauranteId' });

// Sincronizar todos los modelos y sus relaciones
sequelize.sync({ alter: true }) // Usa alter para evitar la pérdida de datos
  .then(() => console.log('Tablas sincronizadas correctamente'))
  .catch((err) => console.error('Error al sincronizar tablas:', err));

// Ruta inicial para verificar que el servidor funciona
app.get('/', (req, res) => {
  res.send('¡Bienvenido a ReservasZalabarte!');
});

// Rutas públicas
const reservasRoutes = require('./routes/reservas');
app.use('/api/reservas', reservasRoutes); // Endpoints públicos para reservas

const turnosRoutes = require('./routes/turnos'); // Importa las rutas de turnos
app.use('/api/turnos', turnosRoutes); // Registra las rutas bajo /api/turnos

const restaurantesRoutes = require('./routes/restaurantes');
app.use('/api/restaurantes', restaurantesRoutes); // Endpoints públicos para restaurantes

const mesasRoutes = require('./routes/mesa'); // Importa las rutas de mesas
app.use('/api/mesas', mesasRoutes); // Registra las rutas de mesas

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
