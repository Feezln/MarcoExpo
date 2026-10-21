import { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import { getReceta, obtenerIngredientes, obtenerPasos } from '../../services/recetasService';
import { ROJO_RECETARIO, FONDO_RECETARIO } from './estilos';

export default function RecetaDetalleScreen({ route }) {
  const { id } = route.params; // el id llega desde la lista
  const [receta, setReceta] = useState(null);

  // GetById: traemos la receta completa
  useEffect(() => {
    async function cargar() {
      setReceta(await getReceta(id));
    }
    cargar();
  }, [id]);

  if (!receta) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  const ingredientes = obtenerIngredientes(receta);
  const pasos = obtenerPasos(receta);

  return (
    <ScrollView style={{ backgroundColor: '#fff' }}>
      <Image source={{ uri: receta.strMealThumb }} style={styles.imagen} />

      <View style={styles.contenido}>
        <Text style={styles.titulo}>{receta.strMeal}</Text>
        <Text style={styles.info}>{receta.strCategory} · {receta.strArea ?? receta.strCountry}</Text>

        {/* Ingredientes con su imagen y cantidad */}
        <Text style={styles.subtitulo}>Ingredientes</Text>
        {ingredientes.map((ing, i) => (
          <View key={i} style={styles.ingrediente}>
            <Image
              source={{ uri: `https://www.themealdb.com/images/ingredients/${ing.nombre}-small.png` }}
              style={styles.ingImagen}
            />
            <Text style={styles.ingNombre}>{ing.nombre}</Text>
            <Text style={styles.ingCantidad}>{ing.cantidad}</Text>
          </View>
        ))}

        {/* Pasos numerados */}
        <Text style={styles.subtitulo}>Preparación</Text>
        {pasos.map((paso, i) => (
          <Text key={i} style={styles.paso}>{i + 1}. {paso}</Text>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  imagen: { width: '100%', aspectRatio: 1.3, backgroundColor: '#F2D7CF' },
  contenido: { padding: 20 },
  titulo: { fontSize: 26, fontWeight: 'bold', color: '#2b1d16' },
  info: { color: '#777', marginTop: 4 },
  subtitulo: { fontSize: 20, fontWeight: 'bold', marginTop: 20, marginBottom: 8, color: '#2b1d16' },
  ingrediente: {
    flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 8,
    borderBottomWidth: 1, borderBottomColor: '#eee',
  },
  ingImagen: { width: 36, height: 36, borderRadius: 8, backgroundColor: FONDO_RECETARIO },
  ingNombre: { flex: 1, fontSize: 15 },
  ingCantidad: { color: ROJO_RECETARIO, fontWeight: 'bold' },
  paso: { fontSize: 15, lineHeight: 22, marginBottom: 8 },
});
