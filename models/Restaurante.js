const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Restaurante = sequelize.define(
  'Restaurante',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
    ubicacion: { type: DataTypes.STRING, allowNull: false },
  },
  {
    timestamps: true, // Habilita createdAt y updatedAt automáticamente
    createdAt: 'createdat', // Mapea `createdAt` al nombre en minúsculas
    updatedAt: 'updatedat', // Mapea `updatedAt` al nombre en minúsculas
    tableName: 'restaurantes', // Nombre exacto de la tabla
  }
);

module.exports = Restaurante;
