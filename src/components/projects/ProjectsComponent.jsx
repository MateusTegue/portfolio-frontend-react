import React, { useEffect, useState } from "react";
import { getAllProjects } from "../../api/projects.js"; 
import { usePerfil } from "../../hooks/usePerfil/Useperfil.jsx";
import Imagen from "../../images/PerfilImage.png";
import { ProjectModal } from "../projectsModal/ProjectModal.jsx";
import { motion } from "framer-motion";
import { FaCode, FaExternalLinkAlt, FaCalendarAlt, FaUser } from "react-icons/fa";
import { PropagateLoader } from "react-spinners";

const ProjectsComponent = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { perfil } = usePerfil();
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [projectsPerPage, setProjectsPerPage] = useState(4);

    const openModal = (project) => {
      setSelectedProject(project);
      setIsModalOpen(true);
    };

    const closeModal = () => {
      setIsModalOpen(false);
      setSelectedProject(null);
    };

    useEffect(() => {
      const getAllProjectsData = async () => {
        try {
          const dataProjects = await getAllProjects();
          setProjects(dataProjects);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      getAllProjectsData();
    }, []);

    useEffect(() => {
      const updateProjectsPerPage = () => {
        if (window.innerWidth < 640) {
          setProjectsPerPage(2); 
        } else {
          setProjectsPerPage(4); 
        }
      };

      updateProjectsPerPage(); 
      window.addEventListener('resize', updateProjectsPerPage);
      return () => window.removeEventListener('resize', updateProjectsPerPage);
    }, []);

    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);

    const totalPages = Math.ceil(projects.length / projectsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (loading) {
        return (
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <PropagateLoader color="#06b6d4" size={15} />
              <p className="mt-4 text-cyan-400 font-poppins">Cargando proyectos...</p>
            </div>
          </div>
        );
    }

    if (error) {
        return (
          <div className="flex items-center justify-center min-h-[60vh]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-md mx-auto p-8 bg-red-500/10 border border-red-500/30 rounded-2xl backdrop-blur-sm"
            >
              <p className="text-red-400 font-poppins">Error: {error}</p>
            </motion.div>
          </div>
        );
    }

    if (projects.length === 0) {
        return (
          <div className="flex items-center justify-center min-h-[60vh]">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center p-8"
            >
              <p className="text-gray-400 font-poppins text-lg">No hay proyectos disponibles.</p>
            </motion.div>
          </div>
        );
    }
    
    return (
        <section className="relative mx-auto max-w-7xl px-4 py-12 lg:py-20 ">
            {/* Título de la sección */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl font-bold font-poppins text-white mb-4">
                Mis <span className="text-cyan-400">Proyectos</span>
              </h2>
            </motion.div>

            <div className="w-[80%] mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4  ">
                {currentProjects.map((project, index) => (
                  <motion.div
                    key={project._id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative"
                  >
                    <div className=" h-full  bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-sm rounded-2xl overflow-hidden border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-cyan-500/20">
                      {/* Efecto de brillo en hover */}
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      <div className="relative p-4 flex flex-col justify-between h-full min-h-[220px]">
                        <div className="space-y-2.5">
                          <div>
                            <h3 className="text-lg font-bold font-poppins text-white mb-1.5 group-hover:text-cyan-400 transition-colors">
                              {project.titulo}
                            </h3>
                            <p className="text-gray-300 text-xs leading-relaxed line-clamp-3">
                              {project.descripcion.slice(0, 100)}...
                            </p>
                          </div>

                          <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                            <FaCalendarAlt className="text-cyan-400 text-xs" />
                            <span>{new Date(project.fecha).toLocaleDateString('es-ES', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}</span>
                          </div>
                        </div>

                        {/* Información del autor */}
                        {perfil && (
                          <div className="flex items-center gap-2 pt-3 border-t border-gray-700/50">
                            <div className="flex items-center justify-center">
                              {perfil.imagen?.data ? (
                                <img
                                  className="w-10 h-10 rounded-full border-2 border-cyan-500/50 object-cover"
                                  src={`data:${perfil.imagen.contentType};base64,${btoa(
                                    String.fromCharCode(...perfil.imagen.data.data)
                                  )}`}
                                  alt={perfil.nombre}
                                />
                              ) : (
                                <img
                                  className="w-10 h-10 rounded-full border-2 border-cyan-500/50 object-cover"
                                  src={Imagen}
                                  alt="Imagen por defecto"
                                />
                              )}
                            </div>
                            <div className="flex-1">
                              <p className="text-white font-semibold text-xs leading-none">{perfil.nombre}</p>
                              <p className="text-gray-400 text-xs mt-0.5">{perfil.correo}</p>
                            </div>
                          </div>
                        )}

                        {/* Botones de acción */}
                        <div className="flex gap-2 mt-4">
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-semibold rounded-lg hover:from-cyan-400 hover:to-cyan-500 transition-all duration-300 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-105 text-sm"
                          >
                            <FaCode className="text-xs" />
                            Código
                          </a>
                          <button
                            onClick={() => openModal(project)}
                            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-gray-800/50 border border-cyan-500/30 text-cyan-400 font-semibold rounded-lg hover:bg-cyan-500/10 hover:border-cyan-500/50 transition-all duration-300 hover:scale-105 text-sm"
                          >
                            <FaExternalLinkAlt className="text-xs" />
                            Ver más
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>

            {/* Paginación mejorada */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-12">
                <nav className="inline-flex gap-2 bg-gray-900/50 backdrop-blur-sm p-2 rounded-full border border-cyan-500/20">
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => paginate(index + 1)}
                      className={`px-4 py-2 rounded-full font-semibold font-poppins transition-all duration-300 ${
                        currentPage === index + 1
                          ? "bg-gradient-to-r from-cyan-500 to-cyan-600 text-white shadow-lg shadow-cyan-500/30 scale-105"
                          : "text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </nav>
              </div>
            )}

            <ProjectModal project={selectedProject} isOpen={isModalOpen} onClose={closeModal} />
        </section>
    );
};

export default ProjectsComponent;
