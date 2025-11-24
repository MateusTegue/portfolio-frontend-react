import React, { useEffect, useState } from "react";
import { getAllBlogs, createBlog, deleteBlogById } from "../../../api/blog.js"; 
import { getRandomColor } from "../../../colors/colorImages.js"
import { usePerfil } from "../../../hooks/usePerfil/Useperfil.jsx";
import { motion } from "framer-motion";
import { toast } from 'react-toastify';
import { FaImage, FaCalendarAlt, FaTag, FaTrash, FaEdit, FaPlus, FaList, FaFolder } from "react-icons/fa";
import Imagen from "../../../images/PerfilImage.png"

const ShowBlogsComponent = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { perfil } = usePerfil();
    
    const [showForm, setShowForm] = useState(false); // false = mostrar blogs, true = mostrar formulario
    
    const [form, setForm] = useState({
        imagen: '',
        titulo: '',
        contenido: '',
        fecha: '',
        categoria: 'General',
        etiquetas: ''
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            usuario: perfil._id,
            [e.target.name]: e.target.value
        });
    };

    const getAllBlogsData = async () => {
        try {
          const dataBlogs = await getAllBlogs();
          setBlogs(dataBlogs);
        } catch (err) {
          setError(err.message);
          toast.error('Error al cargar los blogs: ' + err.message, {
            position: "top-right",
            autoClose: 3000,
          });
        } finally {
          setLoading(false);
        }
    };

    useEffect(() => {
      getAllBlogsData();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center text-gray-500 font-poppins">Cargando blogs...</div>
            </div>
        );
    }
    if (error) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center text-red-500 font-poppins">Error: {error}</div>
            </div>
        );
    }

    const handleSubmit = async () => {
        // Validar campos requeridos
        if (!form.titulo || !form.contenido || !form.fecha) {
            toast.warning('Por favor, completa todos los campos requeridos', {
                position: "top-right",
                autoClose: 3000,
            });
            return;
        }

        try {
            // Convertir etiquetas de string a array
            const blogData = {
                ...form,
                etiquetas: form.etiquetas ? form.etiquetas.split(',').map(tag => tag.trim()).filter(tag => tag) : []
            };

            await createBlog(blogData);
            toast.success('¡Blog creado exitosamente!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            setForm({ imagen: '', titulo: '', contenido: '', fecha: '', categoria: 'General', etiquetas: '' });
            setShowForm(false); // Volver a mostrar blogs después de crear
            getAllBlogsData();
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || "Error al crear el blog";
            toast.error(errorMessage, {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    }

    const handleDelete = async (blogId) => {
        if (window.confirm("¿Estás seguro de eliminar este blog?")) {
            try {
                await deleteBlogById(blogId);
                toast.success('Blog eliminado exitosamente', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                getAllBlogsData();
            } catch (error) {
                const errorMessage = error.response?.data?.message || error.message || "Error al eliminar el blog";
                toast.error(errorMessage, {
                    position: "top-right",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            }
        }
    };

    
    return (
        <div className="flex flex-col h-full">
            {/* Botones de navegación */}
            <div className="mb-6 flex gap-3">
                <motion.button
                    onClick={() => setShowForm(false)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-sm font-poppins transition-all ${
                        !showForm
                            ? "bg-gradient-to-r from-cyan-500 to-cyan-600 text-white shadow-lg shadow-cyan-500/30"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <FaList />
                    Ver Blogs
                </motion.button>
                <motion.button
                    onClick={() => setShowForm(true)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-sm font-poppins transition-all ${
                        showForm
                            ? "bg-gradient-to-r from-cyan-500 to-cyan-600 text-white shadow-lg shadow-cyan-500/30"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <FaPlus />
                    Crear Blog
                </motion.button>
            </div>

            {/* Contenido según la opción seleccionada */}
            {showForm ? (
                /* Formulario de creación */
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex-1 overflow-y-auto custom-scrollbar"
                >
                    <div className="max-w-2xl mx-auto">
                        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-200">
                                <div className="p-2 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-lg">
                                    <FaPlus className="text-white text-sm" />
                                </div>
                                <h1 className="text-xl font-bold text-gray-800 font-poppins">Crear Nuevo Blog</h1>
                            </div>

                            <form className="space-y-4">
                                {/* Imagen */}
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2 font-poppins">
                                        <FaImage className="text-cyan-500" />
                                        Imagen (máx. 5MB)
                                    </label>
                                    <input
                                        type="file"
                                        name="imagen"
                                        accept="image/*"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm font-poppins"
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            if (file) {
                                                // Validar tamaño (5MB máximo para optimizar espacio gratuito)
                                                const MAX_SIZE = 5 * 1024 * 1024; // 5MB
                                                if (file.size > MAX_SIZE) {
                                                    toast.warning('La imagen debe ser menor a 5MB. Por favor, optimiza la imagen antes de subirla.', {
                                                        position: "top-right",
                                                        autoClose: 4000,
                                                    });
                                                    e.target.value = ''; // Limpiar el input
                                                    return;
                                                }
                                                setForm({ ...form, imagen: file });
                                            }
                                        }}
                                    />
                                    <p className="text-xs text-gray-500 mt-1 font-poppins">
                                        Recomendado: Optimiza la imagen antes de subir para ahorrar espacio
                                    </p>
                                </div>

                                {/* Título */}
                                <div>
                                    <label htmlFor="titulo" className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">
                                        Título *
                                    </label>
                                    <input
                                        type="text"
                                        name="titulo"
                                        id="titulo"
                                        placeholder="Título del blog"
                                        value={form.titulo}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm font-poppins"
                                        required
                                    />
                                </div>

                                {/* Fecha y Categoría en fila */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label htmlFor="fecha" className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2 font-poppins">
                                            <FaCalendarAlt className="text-cyan-500" />
                                            Fecha *
                                        </label>
                                        <input
                                            type="date"
                                            name="fecha"
                                            id="fecha"
                                            value={form.fecha}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm font-poppins"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="categoria" className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2 font-poppins">
                                            <FaFolder className="text-cyan-500" />
                                            Categoría
                                        </label>
                                        <input
                                            type="text"
                                            name="categoria"
                                            id="categoria"
                                            placeholder="General"
                                            value={form.categoria}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm font-poppins"
                                        />
                                    </div>
                                </div>

                                {/* Etiquetas */}
                                <div>
                                    <label htmlFor="etiquetas" className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2 font-poppins">
                                        <FaTag className="text-cyan-500" />
                                        Etiquetas (separadas por comas)
                                    </label>
                                    <input
                                        type="text"
                                        name="etiquetas"
                                        id="etiquetas"
                                        placeholder="React, Next.js, TypeScript"
                                        value={form.etiquetas}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm font-poppins"
                                    />
                                </div>

                                {/* Contenido */}
                                <div>
                                    <label htmlFor="contenido" className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">
                                        Contenido *
                                    </label>
                                    <textarea
                                        name="contenido"
                                        id="contenido"
                                        rows="8"
                                        placeholder="Escribe el contenido del blog aquí..."
                                        value={form.contenido}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none text-sm font-poppins"
                                        required
                                    />
                                </div>

                                {/* Botones */}
                                <div className="flex gap-3 pt-2">
                                    <motion.button
                                        type="button"
                                        onClick={() => {
                                            setForm({ imagen: '', titulo: '', contenido: '', fecha: '', categoria: 'General', etiquetas: '' });
                                            setShowForm(false);
                                        }}
                                        className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2.5 px-4 rounded-lg transition-colors text-sm font-poppins"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        Cancelar
                                    </motion.button>
                                    <motion.button
                                        type="button"
                                        onClick={() => setForm({ imagen: '', titulo: '', contenido: '', fecha: '', categoria: 'General', etiquetas: '' })}
                                        className="px-4 bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2.5 rounded-lg transition-colors text-sm font-poppins"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        Limpiar
                                    </motion.button>
                                    <motion.button
                                        type="button"
                                        onClick={handleSubmit}
                                        className="flex-1 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-all shadow-lg shadow-cyan-500/30 text-sm font-poppins"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        Guardar Blog
                                    </motion.button>
                                </div>
                            </form>
                        </div>
                    </div>
                </motion.div>
            ) : (
                /* Lista de blogs */
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex-1 overflow-hidden flex flex-col"
                >
                    <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
                        {blogs.length === 0 ? (
                            <div className="flex items-center justify-center h-full">
                                <p className="text-center text-gray-500 font-poppins">No hay blogs para mostrar.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {blogs.map((blog, index) => (
                                    <motion.div
                                        key={blog._id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200 flex flex-col"
                                    >
                                        {/* Imagen */}
                                        {blog.imagen?.imageUrl ? (
                                            <div
                                                className="w-full h-32 bg-cover bg-center"
                                                style={{
                                                    backgroundImage: `url(${blog.imagen.imageUrl})`,
                                                }}
                                            ></div>
                                        ) : blog.imagen?.data ? (
                                            <div
                                                className="w-full h-32 bg-cover bg-center"
                                                style={{
                                                    backgroundImage: `url(data:${blog.imagen.contentType};base64,${btoa(
                                                        String.fromCharCode(...blog.imagen.data.data)
                                                    )})`,
                                                }}
                                            ></div>
                                        ) : (
                                            <div 
                                                className={`w-full h-32 flex items-center justify-center text-white text-3xl font-bold ${getRandomColor()}`}
                                            >
                                                {blog.titulo?.charAt(0).toUpperCase()}
                                            </div>
                                        )}

                                        {/* Contenido */}
                                        <div className="p-4 flex flex-col flex-1">
                                            <div className="flex-1 mb-3">
                                                <h3 className="text-lg font-bold text-gray-800 font-poppins mb-2 line-clamp-2">
                                                    {blog.titulo}
                                                </h3>
                                                <p className="text-gray-600 text-sm font-poppins mb-3 line-clamp-3">
                                                    {blog.contenido}
                                                </p>
                                                
                                                {/* Categoría y Fecha */}
                                                <div className="flex items-center gap-3 mb-2 text-xs text-gray-500">
                                                    <div className="flex items-center gap-1">
                                                        <FaFolder className="text-cyan-500" />
                                                        <span className="font-poppins">{blog.categoria || 'General'}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <FaCalendarAlt className="text-cyan-500" />
                                                        <span className="font-poppins">
                                                            {new Date(blog.fecha).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Etiquetas */}
                                                {blog.etiquetas && blog.etiquetas.length > 0 && (
                                                    <div className="flex flex-wrap gap-1 mb-3">
                                                        {blog.etiquetas.slice(0, 3).map((tag, idx) => (
                                                            <span
                                                                key={idx}
                                                                className="px-2 py-1 bg-cyan-100 text-cyan-700 rounded-md text-xs font-poppins"
                                                            >
                                                                <FaTag className="inline mr-1" />
                                                                {tag}
                                                            </span>
                                                        ))}
                                                        {blog.etiquetas.length > 3 && (
                                                            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-poppins">
                                                                +{blog.etiquetas.length - 3}
                                                            </span>
                                                        )}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Usuario */}
                                            {perfil && (
                                                <div className="flex items-center gap-2 mb-3 pb-3 border-b border-gray-100">
                                                    <img
                                                        className="w-6 h-6 rounded-full border border-cyan-500 object-cover"
                                                        src={
                                                            perfil.imagen?.data
                                                                ? `data:${perfil.imagen.contentType};base64,${btoa(
                                                                    String.fromCharCode(...perfil.imagen.data.data)
                                                                )}`
                                                                : Imagen
                                                        }
                                                        alt={perfil.nombre}
                                                    />
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-xs font-semibold text-gray-900 leading-none font-poppins truncate">
                                                            {perfil.nombre}
                                                        </p>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Botones */}
                                            <div className="flex gap-2">
                                                <motion.button
                                                    className="flex-1 flex items-center justify-center gap-1 bg-cyan-500 hover:bg-cyan-600 text-white py-2 rounded-md transition-colors text-xs font-semibold font-poppins"
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    <FaEdit className="text-xs" />
                                                    Editar
                                                </motion.button>
                                                <motion.button
                                                    onClick={() => handleDelete(blog._id)}
                                                    className="flex-1 flex items-center justify-center gap-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-md transition-colors text-xs font-semibold font-poppins"
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    <FaTrash className="text-xs" />
                                                    Eliminar
                                                </motion.button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </motion.div>
            )}
        </div>
    )
}

export default ShowBlogsComponent;

