const { Sequelize } = require('sequelize');
require('dotenv').config(); // Carga las variables del archivo .env

const sequelize = new Sequelize(
  process.env.DB_NAME,         // Nombre de la base de datos
  process.env.DB_USER,         // Usuario
  process.env.DB_PASSWORD,     // Contraseña
  {
    host: process.env.DB_HOST, // Host (localhost)
    dialect: 'postgres',       // Motor de la base de datos
    port: process.env.DB_PORT, // Puerto (5433)
    logging: console.log,      // Habilita los logs para ver consultas en consola
  }
);

module.exports = sequelize;
