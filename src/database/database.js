// * Conectar a la Base de Datos
// Importaciones

import mongoose from 'mongoose';

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URI, { useNewUrlParser: true })
    .then(() => console.log('Base de Datos conectada!'))
    .catch(() => console.log('Error al conectar la Base de Datos'));
};

export default connectDatabase;
