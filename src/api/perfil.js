import axios from "axios";

const API_KEY = import.meta.env.VITE_API_URL;



export const getPerfil = async () => {
    try {
        const token = localStorage.getItem("token");
        if(!token) {
            throw new Error("Token no encontrado")
        }
        const response = await axios.get(`${API_KEY}/api/perfil`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.message || "Failed to fetch profile");
        } else if (error.request) {
            throw new Error("No response from server");
        } else {
            throw new Error("Error in fetching profile: " + error.message);
        }
    }
};




export const getPerfilPublic = async () => {
    try {
        const response = await axios.get(`${API_KEY}/api/perfil/public`, 
            // {withCredentials: true, // solo si usas cookies}
            );
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.message || "Failed to fetch profile");
        } else if (error.request) {
            throw new Error("No response from server");
        } else {
            throw new Error("Error in fetching profile: " + error.message);
        }
    }
};