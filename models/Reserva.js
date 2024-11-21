const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Reserva = sequelize.define(
  'Reserva',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    restauranteId: { type: DataTypes.INTEGER, allowNull: false },
    turnoId: { type: DataTypes.INTEGER, allowNull: false }, // Relación con Turnos
    fecha: { type: DataTypes.DATEONLY, allowNull: false },
    horaInicio: { type: DataTypes.TIME, allowNull: false }, // Turno seleccionado
    numeroComensales: { type: DataTypes.INTEGER, allowNull: false },
    mesaId: { type: DataTypes.INTEGER, allowNull: false }, // Mesa asignada
    localizacion: { type: DataTypes.STRING, allowNull: false },
    nombreCliente: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING },
    telefono: { type: DataTypes.STRING },
    estado: { type: DataTypes.STRING, defaultValue: 'pendiente' },
  },
  {
    timestamps: true, // Habilita createdAt y updatedAt automáticamente
  }
);

module.exports = Reserva;
