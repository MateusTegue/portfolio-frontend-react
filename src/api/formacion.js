import axios from "axios";

const API_KEY = import.meta.env.VITE_API_URL;

// Function to get all training programs
export const getAllFormacion = async () => {
    try {
        const response = await axios.get(`${API_KEY}/api/formacion`);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.message || "Failed to fetch training programs");
        } else if (error.request) {
            throw new Error("No response from server");
        } else {
            throw new Error("Error in fetching training programs: " + error.message);
        }
    }
};