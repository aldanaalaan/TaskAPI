/*
  * Esquema de Tarea
  - Titulo: Un texto corto que describe de manera corta.
  - Descripción: Una descripción mas extensa sobre la tarea.
  - Completado: Booleano indicando el estado de la tarea, que por defecto es false.
  - ID del usuario: Relaciona una tarea con el usuario que la crea.
*/

// Importaciones
import { Schema, model } from 'mongoose';

// Definición del esquema de tarea
const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: false,
    minlength: 4,
    maxlength: 50,
  },
  description: {
    type: String,
    required: false,
    unique: false,
    minlength: 4,
    maxlength: 200,
  },
  completed: {
    type: Boolean,
    required: true,
    default: false,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

// Modelo de tareas
const Task = model('Task', taskSchema);

// Exportar esquema y modelo
export { taskSchema, Task };
