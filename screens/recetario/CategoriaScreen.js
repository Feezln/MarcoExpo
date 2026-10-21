import { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { getRecetasPorCategoria } from '../../services/recetasService';
import { estilosComunes } from './estilos';
import ListaRecetas from './ListaRecetas';

export default function CategoriaScreen({ route, navigation }) {
  const { categoria } = route.params; // llega desde RecetarioScreen
  const [recetas, setRecetas] = useState(null);

  // Traemos las recetas de la categoría al abrir la pantalla
  useEffect(() => {
    async function cargar() {
      setRecetas(await getRecetasPorCategoria(categoria));
    }
    cargar();
  }, [categoria]);

  if (!recetas) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  return (
    <View style={estilosComunes.pantalla}>
      <ListaRecetas
        recetas={recetas}
        onPress={(r) => navigation.navigate('RecetaDetalle', { id: r.idMeal, titulo: r.strMeal })}
      />
    </View>
  );
}
