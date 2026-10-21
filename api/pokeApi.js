import axios from 'axios';

// API pública de Pokémon: https://pokeapi.co
const pokeApi = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
  timeout: 10000,
});

export default pokeApi;
