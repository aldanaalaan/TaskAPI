// * Punto de acceso que inicia la aplicación
// Importaciones

import app from './src/app.js';
import connectDatabase from './src/database/database.js';
import dotenv from 'dotenv';

// Configurar variables de entorno
dotenv.config();

// Conectar la BD
connectDatabase();

// Puerto del servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
  console.log(`Local: http://localhost:${PORT}`);
});
