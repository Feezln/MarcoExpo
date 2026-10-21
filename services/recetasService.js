import mealApi from '../api/mealApi';

// Recetas de una categoría -> GET /filter.php?c=Seafood
export async function getRecetasPorCategoria(categoria) {
  const res = await mealApi.get(`/filter.php?c=${categoria}`);
  return res.data.meals ?? [];
}

// Buscar recetas por nombre -> GET /search.php?s=salmon
export async function buscarRecetas(texto) {
  const res = await mealApi.get(`/search.php?s=${texto}`);
  return res.data.meals ?? [];
}

// GetById: una receta por su id -> GET /lookup.php?i=52959
export async function getReceta(id) {
  const res = await mealApi.get(`/lookup.php?i=${id}`);
  return res.data.meals[0];
}

// Sorpréndeme: una receta al azar -> GET /random.php
export async function getRecetaAleatoria() {
  const res = await mealApi.get('/random.php');
  return res.data.meals[0];
}

// La API guarda los ingredientes en strIngredient1..20 y strMeasure1..20.
// Esta función los junta en una lista fácil de usar.
export function obtenerIngredientes(receta) {
  const ingredientes = [];
  for (let i = 1; i <= 20; i++) {
    const nombre = receta[`strIngredient${i}`];
    const cantidad = receta[`strMeasure${i}`];
    if (nombre && nombre.trim() !== '') {
      ingredientes.push({ nombre, cantidad });
    }
  }
  return ingredientes;
}

// Separa las instrucciones en pasos (una línea = un paso)
export function obtenerPasos(receta) {
  return receta.strInstructions
    .split(/\r?\n/)
    .map((linea) => linea.trim())
    .filter((linea) => linea !== '' && !/^step\s*\d+$/i.test(linea));
}
