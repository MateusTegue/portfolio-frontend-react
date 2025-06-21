import axios from "axios";

const API_KEY = import.meta.env.VITE_API_URL;

// obtener todos los proyectos 
export const getAllProjects = async () => {
    try {
        const response = await axios.get(`${API_KEY}/api/proyecto`);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.message || "Failed to fetch projects");
        } else if (error.request) {
            throw new Error("No response from server");
        } else {
            throw new Error("Error in fetching projects: " + error.message);
        }
    }
}

// registrar proyectos
export const createProject = async ( data ) => {
  try {
    const token = localStorage.getItem('token'); 
    const response = await axios.post(`${API_KEY}/api/proyecto`, data, {
      headers: {
        Authorization: `Bearer ${token}`, // 👈 Aquí se envía el token
      },
      });
    console.log(data)
    return response;
  } catch (error) {
       console.error('Error al registrar el proyecto:', error);
       throw error;
  }
}



// obtener proyectos por id 
export const deleteProjectById = async (id) => {
  try {
    const response = await axios.delete(`${API_KEY}/api/proyecto/${id}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Error al eliminar el proyecto");
    } else {
      throw new Error("Error interno del servidor: " + error.message);
    }
  }
};
