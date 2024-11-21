const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Turno = sequelize.define(
  'Turno',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    restauranteId: { type: DataTypes.INTEGER, allowNull: false },
    fecha: { type: DataTypes.DATEONLY, allowNull: false },
    horaInicio: { type: DataTypes.TIME, allowNull: false },
    horaFin: { type: DataTypes.TIME, allowNull: false },
    plazasDisponiblesLoc1: { type: DataTypes.INTEGER },
    plazasDisponiblesLoc2: { type: DataTypes.INTEGER },
    plazasDisponibles: { type: DataTypes.INTEGER },
    maximoComensales: { type: DataTypes.INTEGER },
    estado: { type: DataTypes.STRING },
  },
  {
    timestamps: true, // Habilita createdAt y updatedAt automáticamente
  }
);

module.exports = Turno;
