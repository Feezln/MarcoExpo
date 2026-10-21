import { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { buscarRecetas } from '../../services/recetasService';
import { estilosComunes } from './estilos';
import ListaRecetas from './ListaRecetas';

export default function BuscarRecetaScreen({ navigation }) {
  const [texto, setTexto] = useState('');
  const [recetas, setRecetas] = useState([]);
  const [buscado, setBuscado] = useState(false);

  // Se ejecuta al presionar Enter en el teclado
  async function buscar() {
    if (texto.trim() === '') return;
    setRecetas(await buscarRecetas(texto.trim()));
    setBuscado(true);
  }

  return (
    <View style={estilosComunes.pantalla}>
      <View style={styles.buscador}>
        <Ionicons name="search" size={18} color="#888" />
        <TextInput
          style={styles.input}
          placeholder="Buscar receta (ej. salmon, pasta)"
          value={texto}
          onChangeText={setTexto}
          onSubmitEditing={buscar}
          returnKeyType="search"
          autoFocus
        />
      </View>

      {buscado && recetas.length === 0 && (
        <Text style={styles.vacio}>No se encontraron recetas.</Text>
      )}

      <ListaRecetas
        recetas={recetas}
        onPress={(r) => navigation.navigate('RecetaDetalle', { id: r.idMeal, titulo: r.strMeal })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  buscador: {
    flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#fff', margin: 12, marginBottom: 0,
    borderWidth: 1, borderColor: '#ddd', borderRadius: 10, paddingHorizontal: 12,
  },
  input: { flex: 1, paddingVertical: 10 },
  vacio: { textAlign: 'center', marginTop: 20, color: '#666' },
});
