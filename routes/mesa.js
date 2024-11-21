const express = require('express');
const router = express.Router();
const Mesa = require('../models/Mesa');

// Obtener todas las mesas de un restaurante
router.get('/:restauranteId', async (req, res) => {
  const { restauranteId } = req.params;
  try {
    const mesas = await Mesa.findAll({ where: { restauranteId } });
    res.json(mesas);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener mesas' });
  }
});

// Crear una nueva mesa
router.post('/', async (req, res) => {
  const { capacidad, restauranteId, localizacion } = req.body;
  try {
    const nuevaMesa = await Mesa.create({ capacidad, restauranteId, localizacion });
    res.status(201).json(nuevaMesa);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear mesa' });
  }
});

module.exports = router;
