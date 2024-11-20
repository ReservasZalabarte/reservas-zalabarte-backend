const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Endpoint de inicio de sesión
router.post('/login', (req, res) => {
  const { usuario, contraseña } = req.body;

  // Simulación de validación
  if (usuario === 'admin' && contraseña === '123456') {
    const token = jwt.sign({ id: 1, role: 'admin' }, 'secretkey', { expiresIn: '24h' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Credenciales inválidas' });
  }
});

module.exports = router;
