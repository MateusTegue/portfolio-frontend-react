// src/api/newsApi.js
import axios from 'axios';

const API_KEY = import.meta.env.VITE_GNEWS_API_KEY;
const BASE_URL = 'https://newsdata.io/api/1/news';

export const getNoticias = async () => {
  if (!API_KEY) {
    console.error('❌ VITE_GNEWS_API_KEY no definida');
    return [];
  }

  try {
    const { data } = await axios.get(BASE_URL, {
      params: {
        apikey: API_KEY,
        country: 'co',
        language: 'es'
      }
    });
    // data.results es el array de noticias; cortamos los primeros 4
    return (data.results || []).slice(0, 2);
  } catch (error) {
    console.error("Error al obtener noticias:", error.response?.status, error.message);
    return [];
  }
};
