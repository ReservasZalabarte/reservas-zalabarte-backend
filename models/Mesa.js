const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Mesa = sequelize.define(
  'Mesa',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    capacidad: { type: DataTypes.INTEGER, allowNull: false },
    localizacion: { type: DataTypes.STRING, allowNull: false },
    restauranteId: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    timestamps: true, // Habilita createdAt y updatedAt automáticamente
  }
);

module.exports = Mesa;
