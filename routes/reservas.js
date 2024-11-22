const express = require('express');
const router = express.Router();
const { Mesa, Reserva, Turno } = require('../models');
const { Op } = require('sequelize');

// Endpoint para obtener todas las reservas
router.get('/', async (req, res) => {
  try {
    const reservas = await Reserva.findAll({
      include: [
        { model: Mesa, attributes: ['id', 'capacidad', 'localizacion'] },
        { model: Turno, attributes: ['nombre', 'horaInicio', 'horaFin'] },
      ],
    });
    res.json(reservas);
  } catch (error) {
    console.error('Error al obtener reservas:', error);
    res.status(500).json({ mensaje: 'Error al obtener reservas.' });
  }
});

// Endpoint para verificar los turnos disponibles
router.post('/verificar-turnos', async (req, res) => {
  const { fecha, numeroComensales, restauranteId } = req.body;

  try {
    console.log('Datos recibidos:', { fecha, numeroComensales, restauranteId });

    // Buscar turnos del mismo restaurante y fecha, y con maximoComensales mayor o igual que numeroComensales
    const turnos = await Turno.findAll({
      where: {
        restauranteId,
        fecha,
        maximoComensales: { [Op.gte]: numeroComensales },
      },
    });

    console.log('Turnos encontrados:', turnos);

    if (turnos.length === 0) {
      return res.status(404).json({ mensaje: 'No hay turnos disponibles para esta fecha y número de comensales.' });
    }

    // Preparar respuesta con turnos disponibles
    const disponibilidad = turnos.map((turno) => ({
      turno: turno.nombre,
      horaInicio: turno.horaInicio,
      horaFin: turno.horaFin,
      disponible: true,
    }));

    res.json(disponibilidad);
  } catch (error) {
    console.error('Error al verificar disponibilidad:', error);
    res.status(500).json({ mensaje: 'Error al verificar disponibilidad.' });
  }
});

// Endpoint para crear una reserva
router.post('/crear', async (req, res) => {
  const {
    restauranteId,
    fecha,
    numeroComensales,
    horaInicio,
    localizacion,
    nombreCliente,
    telefono,
    email,
  } = req.body;

  try {
    // Buscar el turno seleccionado
    const turno = await Turno.findOne({
      where: { restauranteId, fecha, horaInicio },
    });

    if (!turno) {
      return res.status(404).json({ mensaje: 'Turno no encontrado.' });
    }

    console.log('Turno encontrado:', turno);

    // Verificar mesas disponibles en la localización seleccionada
    const mesasDisponibles = await Mesa.findAll({
      where: {
        restauranteId,
        id: { [Op.in]: turno.idMesasDisponibles || [] },
        localizacion,
        capacidad: { [Op.gte]: numeroComensales },
      },
      order: [['capacidad', 'ASC']],
    });

    console.log('Mesas disponibles encontradas:', mesasDisponibles);

    if (mesasDisponibles.length === 0) {
      return res.status(400).json({ mensaje: 'No hay mesas disponibles en esta localización.' });
    }

    // Seleccionar la mesa con menor capacidad
    const mesaAsignada = mesasDisponibles[0];
    console.log('Mesa asignada:', mesaAsignada);

    // Crear la reserva
    const nuevaReserva = await Reserva.create({
      restauranteId,
      turnoId: turno.id,
      mesaId: mesaAsignada.id,
      fecha: turno.fecha,
      horaInicio,
      localizacion,
      numeroComensales,
      nombreCliente,
      telefono,
      email,
      estado: 'confirmado',
    });

    // Actualizar los datos del turno
    turno.idMesasDisponibles = turno.idMesasDisponibles.filter((id) => id !== mesaAsignada.id);
    if (localizacion === 'loc1') {
      turno.plazasDisponiblesLoc1 -= mesaAsignada.capacidad;
    } else if (localizacion === 'loc2') {
      turno.plazasDisponiblesLoc2 -= mesaAsignada.capacidad;
    }
    turno.plazasDisponibles -= mesaAsignada.capacidad;
    turno.maximoComensales = Math.max(turno.plazasDisponiblesLoc1, turno.plazasDisponiblesLoc2);
    turno.estado = turno.plazasDisponibles > 0 ? 'plazas disponibles' : 'lleno';
    await turno.save();

    res.status(201).json({ mensaje: 'Reserva creada con éxito.', reserva: nuevaReserva });
  } catch (error) {
    console.error('Error al crear reserva:', error);
    res.status(500).json({ mensaje: 'Error al crear reserva.' });
  }
});

module.exports = router;
