import pokeApi from '../api/pokeApi';

// Imagen oficial de cada Pokémon a partir de su número
export function imagenPokemon(id) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

// Get: trae un Pokémon por nombre o número -> GET /pokemon/{nombre o id}
export async function getPokemon(nombreOId) {
  const res = await pokeApi.get(`/pokemon/${nombreOId}`);
  return res.data;
}

// Trae la lista de los primeros Pokémon con su tipo (para el color de la tarjeta)
export async function getPokemons(cantidad = 151) {
  const res = await pokeApi.get(`/pokemon?limit=${cantidad}`);

  // Pedimos el detalle de cada uno al mismo tiempo
  const detalles = await Promise.all(res.data.results.map((p) => getPokemon(p.name)));

  return detalles.map((p) => ({
    id: p.id,
    nombre: p.name,
    tipo: p.types[0].type.name,
  }));
}
