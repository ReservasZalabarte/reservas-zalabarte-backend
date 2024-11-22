const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Reserva = sequelize.define(
  'Reserva',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    restauranteId: { type: DataTypes.INTEGER, allowNull: false, field: 'restauranteid' },
    turnoId: { type: DataTypes.INTEGER, allowNull: false, field: 'turnoid' }, // Asegúrate de que coincida con la BD
    fecha: { type: DataTypes.DATEONLY, allowNull: false },
    horaInicio: { type: DataTypes.TIME, allowNull: false, field: 'horainicio' },
    numeroComensales: { type: DataTypes.INTEGER, allowNull: false, field: 'numerocomensales' },
    mesaId: { type: DataTypes.INTEGER, allowNull: false, field: 'mesaid' },
    localizacion: { type: DataTypes.STRING, allowNull: false },
    nombreCliente: { type: DataTypes.STRING, allowNull: false, field: 'nombrecliente' },
    email: { type: DataTypes.STRING },
    telefono: { type: DataTypes.STRING },
    estado: { type: DataTypes.STRING, defaultValue: 'pendiente' },
  },
  {
    timestamps: true, // Mantener los timestamps habilitados
    createdAt: 'createdat', // Indica que el campo `createdAt` corresponde a `createdat`
    updatedAt: 'updatedat', // Indica que el campo `updatedAt` corresponde a `updatedat`
    tableName: 'reservas', // Nombre exacto de la tabla
  }
);

module.exports = Reserva;
