import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
    FaProjectDiagram, 
    FaUser, 
    FaBook, 
    FaChartLine, 
    FaPlus, 
    FaEdit, 
    FaHome,
    FaEnvelope,
    FaCalendarAlt,
    FaArrowRight,
    FaSpinner
} from "react-icons/fa";
import { getAllProjects } from "../../api/projects.js";
import { usePerfil } from "../../hooks/usePerfil/Useperfil.jsx";
import Imagen from "../../images/PerfilImage.png";

const DashboarComponent = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const { perfil } = usePerfil();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dataProjects = await getAllProjects();
                setProjects(dataProjects);
            } catch (err) {
                console.error("Error al cargar proyectos:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const statsCards = [
        {
            title: "Total Proyectos",
            value: loading ? "..." : projects.length,
            icon: <FaProjectDiagram />,
            color: "from-cyan-500 to-cyan-600",
            link: "/admin/projects"
        },
        {
            title: "Mi Perfil",
            value: perfil?.nombre ? "Activo" : "Cargando...",
            icon: <FaUser />,
            color: "from-blue-500 to-blue-600",
            link: "/admin/perfil"
        },
        {
            title: "Educación",
            value: "Gestionar",
            icon: <FaBook />,
            color: "from-purple-500 to-purple-600",
            link: "/admin/educacion"
        },
        {
            title: "Estadísticas",
            value: "Ver más",
            icon: <FaChartLine />,
            color: "from-green-500 to-green-600",
            link: "/admin/projects"
        }
    ];

    const quickActions = [
        {
            title: "Crear Nuevo Proyecto",
            description: "Agregar un proyecto al portafolio",
            icon: <FaPlus />,
            link: "/admin/projects",
            color: "bg-gradient-to-br from-cyan-500 to-cyan-600"
        },
        {
            title: "Editar Proyectos",
            description: "Gestionar proyectos existentes",
            icon: <FaEdit />,
            link: "/admin/projects",
            color: "bg-gradient-to-br from-blue-500 to-blue-600"
        },
        {
            title: "Ver Portafolio",
            description: "Ver el portafolio público",
            icon: <FaHome />,
            link: "/Home",
            color: "bg-gradient-to-br from-purple-500 to-purple-600",
            external: true
        },
        {
            title: "Mi Perfil",
            description: "Editar información personal",
            icon: <FaUser />,
            link: "/admin/perfil",
            color: "bg-gradient-to-br from-green-500 to-green-600"
        }
    ];

    const recentProjects = projects.slice(0, 3);

    return (
        <div className="space-y-2">
            {/* Header */}
            <div >
                <h1 className="text-2xl font-bold text-gray-800 font-poppins">Dashboard</h1>
                <p className="text-gray-500 font-poppins mt-1">Bienvenido al panel de administración</p>
            </div>

            {/* Tarjetas de Estadísticas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {statsCards.map((stat, index) => (
                    <motion.div
                        key={stat.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Link to={stat.link}>
                            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-5 hover:shadow-xl transition-shadow cursor-pointer group">
                                <div className="flex items-center justify-between mb-3">
                                    <div className={`p-3 bg-gradient-to-br ${stat.color} rounded-lg text-white group-hover:scale-110 transition-transform`}>
                                        {stat.icon}
                                    </div>
                                    <FaArrowRight className="text-gray-400 group-hover:text-cyan-500 group-hover:translate-x-1 transition-all" />
                                </div>
                                <h3 className="text-gray-500 text-sm font-poppins mb-1">{stat.title}</h3>
                                <p className="text-2xl font-bold text-gray-800 font-poppins">{stat.value}</p>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Accesos Rápidos */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="lg:col-span-2 bg-white rounded-xl shadow-lg border border-gray-200 p-6"
                >
                    <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-200">
                        <div className="p-2 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-lg">
                            <FaChartLine className="text-white text-sm" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-800 font-poppins">Accesos Rápidos</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {quickActions.map((action, index) => (
                            <motion.div
                                key={action.title}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.5 + index * 0.1 }}
                            >
                                {action.external ? (
                                    <a
                                        href={action.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className={`p-2 ${action.color} rounded-lg text-white group-hover:scale-110 transition-transform`}>
                                                {action.icon}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-gray-800 font-poppins mb-1 group-hover:text-cyan-600 transition-colors">
                                                    {action.title}
                                                </h3>
                                                <p className="text-sm text-gray-500 font-poppins">{action.description}</p>
                                            </div>
                                        </div>
                                    </a>
                                ) : (
                                    <Link
                                        to={action.link}
                                        className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className={`p-2 ${action.color} rounded-lg text-white group-hover:scale-110 transition-transform`}>
                                                {action.icon}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-gray-800 font-poppins mb-1 group-hover:text-cyan-600 transition-colors">
                                                    {action.title}
                                                </h3>
                                                <p className="text-sm text-gray-500 font-poppins">{action.description}</p>
                                            </div>
                                        </div>
                                    </Link>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Información del Usuario */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
                >
                    <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-200">
                        <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
                            <FaUser className="text-white text-sm" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-800 font-poppins">Mi Cuenta</h2>
                    </div>
                    {perfil ? (
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <img
                                    className="w-12 h-12 rounded-full border-2 border-cyan-500 object-cover"
                                    src={
                                        perfil.imagen?.data
                                            ? `data:${perfil.imagen.contentType};base64,${btoa(
                                                String.fromCharCode(...perfil.imagen.data.data)
                                            )}`
                                            : Imagen
                                    }
                                    alt={perfil.nombre}
                                />
                                <div>
                                    <p className="font-semibold text-gray-800 font-poppins">{perfil.nombre}</p>
                                    <p className="text-sm text-gray-500 font-poppins">Administrador</p>
                                </div>
                            </div>
                            <div className="space-y-2 pt-4 border-t border-gray-200">
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <FaEnvelope className="text-cyan-500" />
                                    <span className="font-poppins">{perfil.usuario?.email || "No disponible"}</span>
                                </div>
                                <Link
                                    to="/admin/perfil"
                                    className="flex items-center gap-2 text-sm text-cyan-600 hover:text-cyan-700 font-poppins font-medium mt-3"
                                >
                                    Ver perfil completo
                                    <FaArrowRight className="text-xs" />
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center py-8">
                            <FaSpinner className="animate-spin text-cyan-500 text-2xl" />
                        </div>
                    )}
                </motion.div>
            </div>

            {/* Proyectos Recientes */}
            {!loading && recentProjects.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
                >
                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                        <div className="flex items-center gap-2">
                            <div className="p-2 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg">
                                <FaProjectDiagram className="text-white text-sm" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-800 font-poppins">Proyectos Recientes</h2>
                        </div>
                        <Link
                            to="/admin/projects"
                            className="text-sm text-cyan-600 hover:text-cyan-700 font-poppins font-medium flex items-center gap-1"
                        >
                            Ver todos
                            <FaArrowRight className="text-xs" />
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {recentProjects.map((project, index) => (
                            <motion.div
                                key={project._id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.8 + index * 0.1 }}
                                className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                <h3 className="font-semibold text-gray-800 font-poppins mb-2 line-clamp-1">
                                    {project.titulo}
                                </h3>
                                <p className="text-sm text-gray-600 font-poppins mb-2 line-clamp-2">
                                    {project.descripcion}
                                </p>
                                <div className="flex items-center gap-1 text-xs text-gray-500">
                                    <FaCalendarAlt className="text-cyan-500" />
                                    <span className="font-poppins">
                                        {new Date(project.fecha).toLocaleDateString()}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default DashboarComponent;
