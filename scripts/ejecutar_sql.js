const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

// Configuración de la base de datos
const client = new Client({
  user: 'tu_usuario',
  host: 'localhost',
  database: 'reservas_zalabarte',
  password: 'tu_contraseña',
  port: 5433, // Cambia al puerto que uses
});

// Leer el archivo SQL
const sqlPath = path.join(__dirname, 'actualizar_turnos.sql');
const script = fs.readFileSync(sqlPath, 'utf-8');

(async () => {
  try {
    await client.connect();
    console.log('Conexión a la base de datos establecida.');
    await client.query(script);
    console.log('Script ejecutado con éxito.');
  } catch (err) {
    console.error('Error al ejecutar el script:', err);
  } finally {
    await client.end();
  }
})();
