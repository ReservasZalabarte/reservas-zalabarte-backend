const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken'); // Middleware para proteger rutas
const Reserva = require('../models/Reserva'); // Modelo de Reserva

// Aplicar middleware global para todas las rutas de este archivo
router.use(verifyToken);

// Endpoint para obtener reservas del restaurante autenticado
router.get('/reservas', async (req, res) => {
  try {
    // Obtiene las reservas filtradas por el ID del restaurante del usuario autenticado
    const reservas = await Reserva.findAll({ where: { restauranteId: req.user.id } });
    res.json(reservas);
  } catch (err) {
    console.error('Error al obtener reservas:', err);
    res.status(500).json({ error: 'Error al obtener reservas' });
  }
});

// Endpoint para actualizar una reserva específica
router.put('/reservas/:id', async (req, res) => {
  const { id } = req.params; // ID de la reserva
  const { estado } = req.body; // Estado actualizado de la reserva

  try {
    // Busca la reserva por ID
    const reserva = await Reserva.findByPk(id);
    if (!reserva) {
      return res.status(404).json({ error: 'Reserva no encontrada' });
    }

    // Verifica si la reserva pertenece al restaurante autenticado
    if (reserva.restauranteId !== req.user.id) {
      return res.status(403).json({ error: 'No autorizado para actualizar esta reserva' });
    }

    // Actualiza el estado de la reserva
    reserva.estado = estado;
    await reserva.save();

    res.json({ message: 'Reserva actualizada', reserva });
  } catch (err) {
    console.error('Error al actualizar reserva:', err);
    res.status(500).json({ error: 'Error al actualizar reserva' });
  }
});

module.exports = router;
