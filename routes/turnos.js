const express = require('express');
const router = express.Router();
const Turno = require('../models/Turno');

// Endpoint para obtener todos los turnos
router.get('/', async (req, res) => {
  try {
    const turnos = await Turno.findAll();
    res.json(turnos);
  } catch (error) {
    console.error('Error al obtener los turnos:', error);
    res.status(500).json({ error: 'Error al obtener los turnos' });
  }
});

// Endpoint para obtener turnos de un restaurante específico
router.get('/:restauranteId', async (req, res) => {
  const { restauranteId } = req.params;
  try {
    const turnos = await Turno.findAll({ where: { restauranteId } });
    res.json(turnos);
  } catch (error) {
    console.error('Error al obtener los turnos del restaurante:', error);
    res.status(500).json({ error: 'Error al obtener los turnos del restaurante' });
  }
});

module.exports = router;
