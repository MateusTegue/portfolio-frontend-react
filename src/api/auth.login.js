import axios from "axios";

const API_KEY = import.meta.env.VITE_API_URL;

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_KEY}/api/login`,
      {
        email,
        password,
      },
      {
        withCredentials: true, // solo si usas cookies
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Login failed");
    } else if (error.request) {
      throw new Error("No response from server");
    } else {
      throw new Error("Error in login request: " + error.message);
    }
  }
};