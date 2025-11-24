import axios from "axios";

const API_KEY = import.meta.env.VITE_API_URL;

// obtener todos los blogs 
export const getAllBlogs = async () => {
    try {
        const response = await axios.get(`${API_KEY}/api/blog`);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.message || "Failed to fetch blogs");
        } else if (error.request) {
            throw new Error("No response from server");
        } else {
            throw new Error("Error in fetching blogs: " + error.message);
        }
    }
}

// registrar blogs
export const createBlog = async (data) => {
  try {
    const token = localStorage.getItem('token'); 
    const formData = new FormData();
    
    // Agregar campos al FormData
    Object.keys(data).forEach(key => {
      if (key !== 'imagen' && data[key] !== undefined && data[key] !== null) {
        if (key === 'etiquetas' && Array.isArray(data[key])) {
          formData.append(key, JSON.stringify(data[key]));
        } else {
          formData.append(key, data[key]);
        }
      }
    });
    
    // Agregar imagen si existe
    if (data.imagen) {
      formData.append('imagen', data.imagen);
    }

    const response = await axios.post(`${API_KEY}/api/blog`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response;
  } catch (error) {
       console.error('Error al registrar el blog:', error);
       throw error;
  }
}

// obtener blog por id 
export const getBlogById = async (id) => {
  try {
    const response = await axios.get(`${API_KEY}/api/blog/${id}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Error al obtener el blog");
    } else {
      throw new Error("Error interno del servidor: " + error.message);
    }
  }
};

// actualizar blog
export const updateBlog = async (id, data) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.put(`${API_KEY}/api/blog/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Error al actualizar el blog");
    } else {
      throw new Error("Error interno del servidor: " + error.message);
    }
  }
};

// eliminar blog por id 
export const deleteBlogById = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${API_KEY}/api/blog/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Error al eliminar el blog");
    } else {
      throw new Error("Error interno del servidor: " + error.message);
    }
  }
};

