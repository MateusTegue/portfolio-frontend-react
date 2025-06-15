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


// obtener proyectos por id 

export const getProjectId = async () => {
    try {
        const response = await axios.get(`${API_KEY}/api/proyecto/:id`);
        return response.data;
    } catch (error) {
        if(error.response){
            throw new Error(error.response.data.message || "Error al obtener el proyecto")
        } else {
            throw new Error("Error interno del servidor:" + error.message)
        }
    }
}