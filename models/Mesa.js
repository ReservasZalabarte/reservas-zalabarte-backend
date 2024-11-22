const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Mesa = sequelize.define(
  'Mesa',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    capacidad: { type: DataTypes.INTEGER, allowNull: false },
    localizacion: { type: DataTypes.STRING, allowNull: false, field: 'localizacion' },
    restauranteId: { type: DataTypes.INTEGER, allowNull: false, field: 'restauranteid' },
  },
  {
    timestamps: false, // Desactiva completamente los timestamps
    tableName: 'mesas', // Nombre exacto de la tabla
  }
);

module.exports = Mesa;
