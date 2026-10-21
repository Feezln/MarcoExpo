import { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, FlatList, Pressable, ActivityIndicator, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getPokemons, imagenPokemon } from '../../services/pokemonService';
import { colorClaro, ROJO_POKEDEX } from './colores';

// Convierte 25 en "#025"
function numero(id) {
  return '#' + String(id).padStart(3, '0');
}

export default function PokedexScreen({ navigation }) {
  const [pokemons, setPokemons] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  // Al abrir la pantalla traemos los primeros 151 Pokémon
  useEffect(() => {
    async function cargar() {
      try {
        setPokemons(await getPokemons(151));
      } catch (e) {
        setError('No se pudo cargar la Pokédex. Revisa tu conexión a internet.');
      } finally {
        setCargando(false);
      }
    }
    cargar();
  }, []);

  // Filtra por nombre o por número según lo que se escriba
  const texto = busqueda.trim().toLowerCase();
  const filtrados = pokemons.filter(
    (p) => p.nombre.includes(texto) || String(p.id) === texto
  );

  if (cargando) {
    return (
      <View style={styles.centrado}>
        <ActivityIndicator size="large" color={ROJO_POKEDEX} />
        <Text>Cargando Pokémon...</Text>
      </View>
    );
  }

  return (
    <View style={styles.pantalla}>
      {/* Buscador */}
      <View style={styles.buscador}>
        <Ionicons name="search" size={18} color="#888" />
        <TextInput
          style={styles.input}
          placeholder="Buscar por nombre o número (ej. pikachu, 25)"
          value={busqueda}
          onChangeText={setBusqueda}
          autoCapitalize="none"
        />
      </View>

      {error !== '' && <Text style={styles.error}>{error}</Text>}

      {/* Cuadrícula de 2 columnas */}
      <FlatList
        data={filtrados}
        keyExtractor={(p) => String(p.id)}
        numColumns={2}
        columnWrapperStyle={{ gap: 12 }}
        contentContainerStyle={{ gap: 12, paddingBottom: 20 }}
        renderItem={({ item }) => (
          <Pressable
            style={styles.tarjeta}
            onPress={() => navigation.navigate('PokemonDetalle', { id: item.id })}
          >
            <View style={[styles.circulo, { backgroundColor: colorClaro(item.tipo) }]}>
              <Image source={{ uri: imagenPokemon(item.id) }} style={styles.imagen} />
            </View>
            <Text style={styles.numero}>{numero(item.id)}</Text>
            <Text style={styles.nombre}>{item.nombre}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: '#f2f2f2', padding: 12 },
  centrado: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 8 },
  buscador: {
    flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#fff',
    borderWidth: 1, borderColor: '#ddd', borderRadius: 10, paddingHorizontal: 12, marginBottom: 12,
  },
  input: { flex: 1, paddingVertical: 10 },
  error: { color: 'red', marginBottom: 8 },
  tarjeta: { flex: 1, maxWidth: '48.5%', backgroundColor: '#fff', borderRadius: 14, padding: 12, alignItems: 'center' },
  circulo: { width: 96, height: 96, borderRadius: 48, justifyContent: 'center', alignItems: 'center' },
  imagen: { width: 80, height: 80 },
  numero: { color: '#666', marginTop: 8, fontSize: 12 },
  nombre: { fontSize: 16, fontWeight: 'bold', textTransform: 'capitalize' },
});
