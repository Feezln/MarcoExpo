import client from '../api/client';

// Cada función llama a una ruta de la API (TareasAPI/Endpoints/TareasEndpoints.cs)

// Get -> GET /api/tareas
export async function getAllTasks() {
  const res = await client.get('/api/tareas');
  return res.data;
}

// GetById -> GET /api/tareas/{id}
export async function getTask(id) {
  const res = await client.get(`/api/tareas/${id}`);
  return res.data;
}

// Crear -> POST /api/tareas
export async function createTask(tarea) {
  const res = await client.post('/api/tareas', tarea);
  return res.data;
}

// Eliminar -> DELETE /api/tareas/{id}
export async function deleteTask(id) {
  await client.delete(`/api/tareas/${id}`);
}
