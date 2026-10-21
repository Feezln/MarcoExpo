import { FlatList, Pressable, Image, Text, View } from 'react-native';
import { colorPastel, estilosComunes } from './estilos';

// Cuadrícula de recetas. La usan CategoriaScreen y BuscarRecetaScreen.
// onPress recibe la receta que se tocó.
export default function ListaRecetas({ recetas, onPress }) {
  return (
    <FlatList
      data={recetas}
      keyExtractor={(r) => r.idMeal}
      numColumns={2}
      columnWrapperStyle={{ gap: 12 }}
      contentContainerStyle={{ gap: 12, padding: 12 }}
      renderItem={({ item, index }) => (
        <Pressable style={estilosComunes.tarjeta} onPress={() => onPress(item)}>
          <Image
            source={{ uri: item.strMealThumb }}
            style={[estilosComunes.imagen, { backgroundColor: colorPastel(index) }]}
          />
          <View style={estilosComunes.nombreCaja}>
            <Text style={estilosComunes.nombre} numberOfLines={2}>{item.strMeal}</Text>
          </View>
        </Pressable>
      )}
    />
  );
}
