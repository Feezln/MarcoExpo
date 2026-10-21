import { useState } from 'react';
import { View, Text, Image, Pressable, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getRecetaAleatoria } from '../../services/recetasService';
import { colorPastel, estilosComunes, ROJO_RECETARIO } from './estilos';

// Categorías que mostramos (son nombres que entiende la API)
const categorias = ['Beef', 'Chicken', 'Dessert', 'Pasta', 'Seafood', 'Vegetarian'];

export default function RecetarioScreen({ navigation }) {
  const [buscandoAzar, setBuscandoAzar] = useState(false);

  // Sorpréndeme: pide una receta al azar y abre su detalle
  async function sorprendeme() {
    setBuscandoAzar(true);
    const receta = await getRecetaAleatoria();
    setBuscandoAzar(false);
    navigation.navigate('RecetaDetalle', { id: receta.idMeal, titulo: receta.strMeal });
  }

  return (
    <View style={estilosComunes.pantalla}>
      {/* Botones de arriba */}
      <View style={styles.botones}>
        <Pressable style={styles.boton} onPress={() => navigation.navigate('BuscarReceta')}>
          <Ionicons name="search" size={18} color="#fff" />
          <Text style={styles.botonTexto}>Buscar</Text>
        </Pressable>
        <Pressable style={styles.boton} onPress={sorprendeme}>
          {buscandoAzar
            ? <ActivityIndicator color="#fff" />
            : <Ionicons name="shuffle" size={18} color="#fff" />}
          <Text style={styles.botonTexto}>Sorpréndeme</Text>
        </Pressable>
      </View>

      {/* Cuadrícula de categorías */}
      <FlatList
        data={categorias}
        keyExtractor={(c) => c}
        numColumns={2}
        columnWrapperStyle={{ gap: 12 }}
        contentContainerStyle={{ gap: 12, paddingHorizontal: 12, paddingBottom: 12 }}
        renderItem={({ item, index }) => (
          <Pressable
            style={estilosComunes.tarjeta}
            onPress={() => navigation.navigate('Categoria', { categoria: item })}
          >
            <View style={[styles.fondoImagen, { backgroundColor: colorPastel(index) }]}>
              <Image
                source={{ uri: `https://www.themealdb.com/images/category/${item}.png` }}
                style={styles.imagenCategoria}
                resizeMode="contain"
              />
            </View>
            <View style={estilosComunes.nombreCaja}>
              <Text style={estilosComunes.nombre}>{item}</Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  botones: { flexDirection: 'row', gap: 12, padding: 12 },
  boton: {
    flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8,
    backgroundColor: ROJO_RECETARIO, paddingVertical: 14, borderRadius: 10,
  },
  botonTexto: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  fondoImagen: { aspectRatio: 1.4, justifyContent: 'center', alignItems: 'center' },
  imagenCategoria: { width: '70%', height: '70%' },
});
