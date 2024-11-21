const Restaurante = require('./Restaurante');
const Mesa = require('./Mesa');
const Turno = require('./Turno');
const Reserva = require('./Reserva');

// Relación Restaurante-Mesas
Restaurante.hasMany(Mesa, { foreignKey: 'restauranteId' });
Mesa.belongsTo(Restaurante, { foreignKey: 'restauranteId' });

// Relación Restaurante-Turnos
Restaurante.hasMany(Turno, { foreignKey: 'restauranteId' });
Turno.belongsTo(Restaurante, { foreignKey: 'restauranteId' });

// Relación Restaurante-Reservas
Restaurante.hasMany(Reserva, { foreignKey: 'restauranteId' });
Reserva.belongsTo(Restaurante, { foreignKey: 'restauranteId' });

// Relación Turno-Reservas
Turno.hasMany(Reserva, { foreignKey: 'turnoId' });
Reserva.belongsTo(Turno, { foreignKey: 'turnoId' });

// Relación Mesa-Reservas
Mesa.hasMany(Reserva, { foreignKey: 'mesaId' });
Reserva.belongsTo(Mesa, { foreignKey: 'mesaId' });

module.exports = { Restaurante, Mesa, Turno, Reserva };
