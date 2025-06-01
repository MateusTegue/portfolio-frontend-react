import axios from "axios";

const API_KEY = import.meta.env.VITE_API_URL;

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