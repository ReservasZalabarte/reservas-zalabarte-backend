const express = require('express');
const router = express.Router();
const Reserva = require('../models/Reserva'); // Importa el modelo de Reserva

// Endpoint para obtener todas las reservas
router.get('/', async (req, res) => {
  try {
    const reservas = await Reserva.findAll(); // Obtén las reservas desde la base de datos
    res.json(reservas);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener reservas' });
  }
});

// Endpoint para crear una nueva reserva
router.post('/', async (req, res) => {
  const { nombreCliente, fecha, restauranteId } = req.body; // Datos enviados por el cliente
  try {
    const nuevaReserva = await Reserva.create({ nombreCliente, fecha, restauranteId }); // Crea la reserva
    res.status(201).json(nuevaReserva); // Devuelve la reserva creada
  } catch (err) {
    res.status(500).json({ error: 'Error al crear la reserva' });
  }
});

module.exports = router;
