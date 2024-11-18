require('dotenv').config(); // Carga las variables de entorno
const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parseo de JSON en el cuerpo de las solicitudes

// Ruta inicial para verificar que el servidor funciona
app.get('/', (req, res) => {
  res.send('¡Bienvenido a ReservasZalabarte!');
});

// Puerto y escucha
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
