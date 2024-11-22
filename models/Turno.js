const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Turno = sequelize.define(
  'Turno',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    restauranteId: { type: DataTypes.INTEGER, allowNull: false, field: 'restauranteid' },
    fecha: { type: DataTypes.DATEONLY, allowNull: false },
    horaInicio: { type: DataTypes.TIME, allowNull: false, field: 'horainicio' },
    horaFin: { type: DataTypes.TIME, allowNull: false, field: 'horafin' },
    idMesasDisponibles: {
      type: DataTypes.ARRAY(DataTypes.INTEGER), // Definir como un array de enteros
      allowNull: false,
      field: 'idmesasdisponibles',
    },
    plazasDisponiblesLoc1: { type: DataTypes.INTEGER, field: 'plazasdisponiblesloc1' },
    plazasDisponiblesLoc2: { type: DataTypes.INTEGER, field: 'plazasdisponiblesloc2' },
    plazasDisponibles: { type: DataTypes.INTEGER, field: 'plazasdisponibles' },
    maximoComensales: { type: DataTypes.INTEGER, field: 'maximocomensales' },
    estado: { type: DataTypes.STRING },
  },
  {
    timestamps: true,
    tableName: 'turnos', // Nombre exacto de la tabla en la base de datos
  }
);

module.exports = Turno;
