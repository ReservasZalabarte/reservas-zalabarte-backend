const express = require('express');
const router = express.Router();

// Supongamos que tienes un modelo Restaurante
const Restaurante = require('../models/Restaurante');

// Endpoint para obtener información de un restaurante
router.get('/:nombre', async (req, res) => {
  const { nombre } = req.params;
  try {
    const restaurante = await Restaurante.findOne({ where: { nombre } });
    if (!restaurante) {
      return res.status(404).json({ error: 'Restaurante no encontrado' });
    }
    res.json(restaurante);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener información del restaurante' });
  }
});

module.exports = router;
