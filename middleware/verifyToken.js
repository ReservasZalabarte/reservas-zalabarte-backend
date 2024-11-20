const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(403).json({ error: 'Acceso denegado. Token no proporcionado.' });
  }

  try {
    const decoded = jwt.verify(token, 'secretkey'); // Usa la misma clave secreta que en `auth.js`
    req.user = decoded; // Almacena los datos del usuario decodificado en la solicitud
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token inválido.' });
  }
};

module.exports = verifyToken;
