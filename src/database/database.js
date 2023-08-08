// * Conectar a la Base de Datos
// Importaciones

import mongoose from 'mongoose';

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URI, { useNewUrlParser: true })
    .then((db) => console.log('Base de Datos conectada!'))
    .catch((err) => console.log('Error al conectar la Base de Datos'));
};

export default connectDatabase;
