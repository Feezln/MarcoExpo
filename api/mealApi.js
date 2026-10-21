import axios from 'axios';

// API pública de recetas: https://www.themealdb.com
const mealApi = axios.create({
  baseURL: 'https://www.themealdb.com/api/json/v1/1',
  timeout: 10000,
});

export default mealApi;
