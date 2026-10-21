import { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import { getPokemon, imagenPokemon } from '../../services/pokemonService';
import { coloresTipo } from './colores';

// Nombres en español de cada estadística
const nombresStats = {
  hp: 'PS', attack: 'Ataque', defense: 'Defensa',
  'special-attack': 'At. Esp.', 'special-defense': 'Def. Esp.', speed: 'Velocidad',
};

// "lightning-rod" -> "Lightning-rod"
function capitalizar(texto) {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

export default function PokemonDetalleScreen({ route, navigation }) {
  const { id } = route.params; // el id llega desde la pantalla de la lista
  const [pokemon, setPokemon] = useState(null);

  // GetById: traemos el Pokémon por su número
  useEffect(() => {
    async function cargar() {
      const datos = await getPokemon(id);
      setPokemon(datos);
      navigation.setOptions({ title: datos.name.toUpperCase() });
    }
    cargar();
  }, [id]);

  if (!pokemon) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  const tipoPrincipal = pokemon.types[0].type.name;
  const color = coloresTipo[tipoPrincipal];

  return (
    <ScrollView style={{ backgroundColor: '#fff' }}>
      {/* Parte de arriba con el color del tipo */}
      <View style={[styles.cabecera, { backgroundColor: color }]}>
        <View style={styles.circulo}>
          <Image source={{ uri: imagenPokemon(pokemon.id) }} style={styles.imagen} />
        </View>
      </View>

      <View style={styles.contenido}>
        <Text style={styles.titulo}>#{pokemon.id} {capitalizar(pokemon.name)}</Text>

        {/* Tipos */}
        <View style={styles.tipos}>
          {pokemon.types.map((t) => (
            <Text key={t.type.name} style={[styles.badge, { backgroundColor: coloresTipo[t.type.name] }]}>
              {capitalizar(t.type.name)}
            </Text>
          ))}
        </View>

        {/* La API da altura en decímetros y peso en hectogramos: dividimos entre 10 */}
        <Text style={styles.dato}>Altura: {pokemon.height / 10} m · Peso: {pokemon.weight / 10} kg</Text>
        <Text style={styles.dato}>
          Habilidades: {pokemon.abilities.map((a) => capitalizar(a.ability.name)).join(', ')}
        </Text>

        {/* Estadísticas con barra */}
        <Text style={styles.subtitulo}>Estadísticas base</Text>
        {pokemon.stats.map((s) => (
          <View key={s.stat.name} style={styles.fila}>
            <Text style={styles.statNombre}>{nombresStats[s.stat.name]}</Text>
            <Text style={styles.statValor}>{s.base_stat}</Text>
            <View style={styles.barraFondo}>
              {/* 255 es el valor máximo posible de una estadística */}
              <View style={[styles.barra, { width: `${(s.base_stat / 255) * 100}%`, backgroundColor: color }]} />
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  cabecera: { alignItems: 'center', paddingVertical: 24 },
  circulo: {
    width: 200, height: 200, borderRadius: 100, backgroundColor: 'rgba(255,255,255,0.4)',
    justifyContent: 'center', alignItems: 'center',
  },
  imagen: { width: 170, height: 170 },
  contenido: { padding: 20, gap: 8 },
  titulo: { fontSize: 28, fontWeight: 'bold', textAlign: 'center' },
  tipos: { flexDirection: 'row', justifyContent: 'center', gap: 8 },
  badge: { paddingHorizontal: 14, paddingVertical: 4, borderRadius: 20, fontWeight: 'bold', overflow: 'hidden' },
  dato: { textAlign: 'center', color: '#333' },
  subtitulo: { fontSize: 20, fontWeight: 'bold', marginTop: 12 },
  fila: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  statNombre: { width: 80, color: '#333' },
  statValor: { width: 32, fontWeight: 'bold' },
  barraFondo: { flex: 1, height: 8, backgroundColor: '#eee', borderRadius: 4 },
  barra: { height: 8, borderRadius: 4 },
});
