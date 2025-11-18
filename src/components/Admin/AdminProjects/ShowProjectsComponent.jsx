import React, { useEffect, useState } from "react";
import { getAllProjects, createProject } from "../../../api/projects.js"; 
import { deleteProjectById } from "../../../api/projects.js";
import { getRandomColor }  from "../../../colors/colorImages.js"
import { usePerfil } from "../../../hooks/usePerfil/Useperfil.jsx";
import { motion } from "framer-motion";
import { toast } from 'react-toastify';
import { FaImage, FaCalendarAlt, FaLink, FaTrash, FaEdit, FaPlus, FaList } from "react-icons/fa";
import Imagen from "../../../images/PerfilImage.png"
import { ProjectModal } from "../../projectsModal/ProjectModal.jsx"

const ShowProjectsComponent = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [ error, setError ] = useState(null);
    const { perfil } = usePerfil();
    
    const [isModalOpen, setIsModalOpen ] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [showForm, setShowForm] = useState(false); // false = mostrar proyectos, true = mostrar formulario
    
    const [form, setForm] = useState({
            imagen: '',
            titulo: '',
            descripcion: '',
            fecha: '',
            url: ''
        });

        const handleChange = (e) => {
            setForm({
                ...form,
                usuario: perfil._id,
                [e.target.name]: e.target.value
            });
        };
 
    const openModal = (project) => {
      setSelectedProject(project);
      setIsModalOpen(true);
    }

    const closeModal = () => {
      setIsModalOpen(false);
      setSelectedProject(null);
    }

    const getAllProjectsData = async () => {
        try {
          const dataProjects = await getAllProjects();
          setProjects(dataProjects);
        } catch (err) {
          setError(err.message);
          toast.error('Error al cargar los proyectos: ' + err.message, {
            position: "top-right",
            autoClose: 3000,
          });
        } finally {
          setLoading(false);
        }
      };

    useEffect(() => {
      getAllProjectsData();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center text-gray-500 font-poppins">Cargando proyectos...</div>
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

    const handleSubmit = async () =>{
        // Validar campos requeridos
        if (!form.titulo || !form.descripcion || !form.fecha || !form.url) {
            toast.warning('Por favor, completa todos los campos requeridos', {
                position: "top-right",
                autoClose: 3000,
            });
            return;
        }

        try {
            await createProject(form);
            toast.success('¡Proyecto creado exitosamente!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            setForm({ imagen: '', titulo: '', descripcion: '', fecha: '', url: '' });
            setShowForm(false); // Volver a mostrar proyectos después de crear
            getAllProjectsData();
        } catch (error){
            const errorMessage = error.response?.data?.message || error.message || "Error al crear el proyecto";
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
    

    const handleDelete = async (projectId) => {
        if (window.confirm("¿Estás seguro de eliminar este proyecto?")) {
            try {
                await deleteProjectById(projectId);
                toast.success('Proyecto eliminado exitosamente', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                getAllProjectsData();
            } catch (error) {
                const errorMessage = error.response?.data?.message || error.message || "Error al eliminar el proyecto";
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
                    Ver Proyectos
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
                    Crear Proyecto
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
                                <h1 className="text-xl font-bold text-gray-800 font-poppins">Crear Nuevo Proyecto</h1>
                            </div>

                            <form className="space-y-4">
                                {/* Imagen */}
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2 font-poppins">
                                        <FaImage className="text-cyan-500" />
                                        Imagen
                                    </label>
                                    <input
                                        type="file"
                                        name="imagen"
                                        accept="image/*"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm font-poppins"
                                        onChange={(e) => setForm({ ...form, imagen: e.target.files[0] })}
                                    />
                                </div>

                                {/* Título */}
                                <div>
                                    <label htmlFor="titulo" className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">
                                        Título
                                    </label>
                                    <input
                                        type="text"
                                        name="titulo"
                                        id="titulo"
                                        placeholder="Título del proyecto"
                                        value={form.titulo}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm font-poppins"
                                    />
                                </div>

                                {/* Fecha y URL en fila */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label htmlFor="fecha" className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2 font-poppins">
                                            <FaCalendarAlt className="text-cyan-500" />
                                            Fecha
                                        </label>
                                        <input
                                            type="date"
                                            name="fecha"
                                            id="fecha"
                                            value={form.fecha}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm font-poppins"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="url" className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2 font-poppins">
                                            <FaLink className="text-cyan-500" />
                                            URL
                                        </label>
                                        <input
                                            type="text"
                                            name="url"
                                            id="url"
                                            placeholder="https://..."
                                            value={form.url}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm font-poppins"
                                        />
                                    </div>
                                </div>

                                {/* Descripción */}
                                <div>
                                    <label htmlFor="descripcion" className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">
                                        Descripción
                                    </label>
                                    <textarea
                                        name="descripcion"
                                        id="descripcion"
                                        rows="4"
                                        placeholder="Descripción del proyecto..."
                                        value={form.descripcion}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none text-sm font-poppins"
                                    />
                                </div>

                                {/* Botones */}
                                <div className="flex gap-3 pt-2">
                                    <motion.button
                                        type="button"
                                        onClick={() => {
                                            setForm({ imagen: '', titulo: '', descripcion: '', fecha: '', url: '' });
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
                                        onClick={() => setForm({ imagen: '', titulo: '', descripcion: '', fecha: '', url: '' })}
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
                                        Guardar Proyecto
                                    </motion.button>
                                </div>
                            </form>
                        </div>
                    </div>
                </motion.div>
            ) : (
                /* Lista de proyectos */
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex-1 overflow-hidden flex flex-col"
                >
                    {/* <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-gray-800 font-poppins">
                            Proyectos ({projects.length})
                        </h2>
                    </div> */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
                        {projects.length === 0 ? (
                            <div className="flex items-center justify-center h-full">
                                <p className="text-center text-gray-500 font-poppins">No hay proyectos para mostrar.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                                {projects.map((project, index) => (
                                    <motion.div
                                        key={project._id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200 flex flex-col"
                                    >
                                        {/* Imagen */}
                                        {project.imagen?.data ? (
                                            <div
                                                className="w-full h-20 bg-cover bg-center"
                                                style={{
                                                    backgroundImage: `url(data:${project.imagen.contentType};base64,${Buffer.from(project.imagen.data).toString("base64")})`,
                                                }}
                                            ></div>
                                        ) : (
                                            <div 
                                                className={`w-full h-20 flex items-center justify-center text-white text-2xl font-bold ${getRandomColor()}`}
                                            >
                                                {project.titulo?.charAt(0).toUpperCase()}
                                            </div>
                                        )}

                                        {/* Contenido */}
                                        <div className="p-3 flex flex-col flex-1">
                                            <div className="flex-1 mb-2">
                                                <h3 className="text-sm font-bold text-gray-800 font-poppins mb-1 line-clamp-1">
                                                    {project.titulo}
                                                </h3>
                                                <p className="text-gray-600 text-xs font-poppins mb-1.5 line-clamp-2">
                                                    {project.descripcion}
                                                </p>
                                                <div className="flex items-center gap-1 text-xs text-gray-500">
                                                    <FaCalendarAlt className="text-cyan-500 text-xs" />
                                                    <span className="font-poppins">
                                                        {new Date(project.fecha).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Usuario compacto */}
                                            {perfil && (
                                                <div className="flex items-center gap-1.5 mb-2 pb-2 border-b border-gray-100">
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
                                            <div className="flex gap-1.5">
                                                <motion.a
                                                    href={project.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex-1 flex items-center justify-center gap-1 bg-cyan-500 hover:bg-cyan-600 text-white py-1.5 rounded-md transition-colors text-xs font-semibold font-poppins"
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    <FaEdit className="text-xs" />
                                                    Editar
                                                </motion.a>
                                                <motion.button
                                                    onClick={() => handleDelete(project._id)}
                                                    className="flex-1 flex items-center justify-center gap-1 bg-red-500 hover:bg-red-600 text-white py-1.5 rounded-md transition-colors text-xs font-semibold font-poppins"
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

            {/* Modal */}
            <ProjectModal project={selectedProject} isOpen={isModalOpen} onClose={closeModal} />
        </div>
    )
}

export default ShowProjectsComponent;
