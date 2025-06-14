import { useEffect, useState } from "react";
import { getPerfil } from "../../api/perfil"; // ajusta esto según tu ruta

export const usePerfil = () => {
  const [perfil, setPerfil] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


      // recargue automatico
      const fetchWithRetry = async (fn, retries = 3, delayMs = 1000) => {
        for (let i = 0; i < retries; i++) {
          try {
            return await fn();
          } catch (err) {
            if (i < retries - 1) {
              await new Promise(res => setTimeout(res, delayMs));
            } else {
              throw err;
            }
          }
        }
      };
  
  
  
   useEffect(() => {
      const getPerfilData = async () => {
        try {
          const dataPerfil = await fetchWithRetry(() => getPerfil(), 3, 1500);
          await delay(50)
          setPerfil(dataPerfil[0]);
        } catch (err) {
          console.error("Error al obtener perfil:", err);
          await delay(50);
          setError("No se pudo cargar el perfil.");
        } finally {
          setLoading(false);
        }
      };
      getPerfilData();
  }, []);
  
    return { perfil, loading, error };
};