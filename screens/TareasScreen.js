import { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from 'react-native';
import { getAllTasks, getTask, createTask, deleteTask } from '../services/tareasService';

export default function TareasScreen() {
  // Estados: lo que la pantalla "recuerda"
  const [tareas, setTareas] = useState([]);              // lista de tareas (Get)
  const [seleccionada, setSeleccionada] = useState(null); // tarea que vemos en detalle (GetById)
  const [titulo, setTitulo] = useState('');               // texto del formulario
  const [descripcion, setDescripcion] = useState('');
  const [error, setError] = useState('');

  // Get: trae todas las tareas de la API
  async function cargarTareas() {
    try {
      const datos = await getAllTasks();
      setTareas(datos);
      setError('');
    } catch (e) {
      setError('No se pudo conectar con la API. ¿Está corriendo dotnet run?');
    }
  }

  // GetById: trae una sola tarea por su id
  async function verTarea(id) {
    const tarea = await getTask(id);
    setSeleccionada(tarea);
  }

  // Crear: manda la tarea nueva y vuelve a cargar la lista
  async function agregarTarea() {
    if (titulo.trim() === '') return;
    await createTask({ titulo, descripcion, completada: false });
    setTitulo('');
    setDescripcion('');
    cargarTareas();
  }

  // Eliminar: borra la tarea y vuelve a cargar la lista
  async function eliminarTarea(id) {
    await deleteTask(id);
    if (seleccionada?.id === id) setSeleccionada(null);
    cargarTareas();
  }

  // Al abrir la pantalla, cargamos las tareas una vez
  useEffect(() => {
    cargarTareas();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.pantalla}>
      {/* Formulario para Crear */}
      <Text style={styles.titulo}>Nueva tarea</Text>
      <TextInput style={styles.input} placeholder="Título" value={titulo} onChangeText={setTitulo} />
      <TextInput style={styles.input} placeholder="Descripción" value={descripcion} onChangeText={setDescripcion} />
      <Button title="Agregar" onPress={agregarTarea} />

      {error !== '' && <Text style={styles.error}>{error}</Text>}

      {/* Detalle de la tarea seleccionada (GetById) */}
      {seleccionada && (
        <View style={styles.detalle}>
          <Text style={styles.titulo}>Detalle (id {seleccionada.id})</Text>
          <Text>Título: {seleccionada.titulo}</Text>
          <Text>Descripción: {seleccionada.descripcion || '(sin descripción)'}</Text>
          <Text>Estado: {seleccionada.completada ? 'Completada' : 'Pendiente'}</Text>
          <Button title="Cerrar" onPress={() => setSeleccionada(null)} />
        </View>
      )}

      {/* Lista de tareas (Get) */}
      <Text style={styles.titulo}>Mis tareas</Text>
      {tareas.map((tarea) => (
        <View key={tarea.id} style={styles.tarea}>
          <Text style={styles.nombre}>
            {tarea.completada ? '✔ ' : '○ '}{tarea.titulo}
          </Text>
          <View style={styles.botones}>
            <Button title="Ver" onPress={() => verTarea(tarea.id)} />
            <Button title="Eliminar" color="#d9534f" onPress={() => eliminarTarea(tarea.id)} />
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  pantalla: { padding: 16, gap: 8 },
  titulo: { fontSize: 18, fontWeight: 'bold', marginTop: 12 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 8, backgroundColor: '#fff' },
  error: { color: 'red', marginTop: 8 },
  detalle: { backgroundColor: '#e6f2ff', padding: 12, borderRadius: 8, gap: 4, marginTop: 8 },
  tarea: { backgroundColor: '#fff', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#eee' },
  nombre: { fontSize: 16, marginBottom: 8 },
  botones: { flexDirection: 'row', gap: 8 },
});
