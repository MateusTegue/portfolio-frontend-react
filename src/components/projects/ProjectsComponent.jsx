import React, { useEffect, useState } from "react";
import { getAllProjects } from "../../api/projects.js"; 
import { getRandomColor }  from "../../colors/colorImages.js"
import { usePerfil } from "../../hooks/usePerfil/Useperfil.jsx";
import Imagen from "../../images/PerfilImage.png"
import { ProjectModal } from "../projectsModal/ProjectModal.jsx"
const ProjectsComponent = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [ error, setError ] = useState(null);
    const { perfil } = usePerfil();
    
    const [isModalOpen, setIsModalOpen ] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);

    const openModal = (project) => {
      setSelectedProject(project);
      setIsModalOpen(true);
    }

    const closeModal = () => {
      setIsModalOpen(false);
      setSelectedProject(null);
    }

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

    if (loading) {
        return <div className="text-center text-gray-500">Cargando proyectos...</div>;
    }
    if (error) {
        return <div className="text-center text-red-500">Error: {error}</div>;
    }
    if (projects.length === 0) {
        return <div className="text-center text-gray-500">No hay proyectos disponibles.</div>;
    }
    
    return (
        <section className="mx-auto max-w-7xl px-4 py-8  shadow-lg  mt-32">
              <div className="grid grid-cols-1 sm:grid-cols-2  gap-6 w-full">
                {projects.map((project) => (
                  <div key={project._id} className="w-full">
                    <div className="flex flex-col lg:flex-row bg-white shadow-lg rounded-lg overflow-hidden w-full h-full">
                      {/* Imagen */}
                      {project.imagen?.data ? (
                        <div
                          className="h-48 lg:h-auto lg:w-48 flex-none bg-cover bg-center"
                          style={{
                            backgroundImage: `url(data:${project.imagen.contentType};base64,${Buffer.from(project.imagen.data).toString('base64')})`,
                          }}
                        ></div>
                      ) : (
                        <div className={`h-48 lg:h-auto lg:w-48 flex-none flex items-center justify-center text-white text-4xl font-bold ${getRandomColor()}`}>
                          {project.titulo?.charAt(0).toUpperCase()}
                        </div>
                      )}

                      {/* Contenido */}
                      <div className="p-4 flex flex-col justify-between w-full">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">{project.titulo}</h3>
                          <p className="text-gray-600 text-sm">{project.descripcion.slice(0, 60)}...</p>
                          <p className="text-xs text-gray-500 mt-1">{new Date(project.fecha).toLocaleDateString()}</p>
                        </div>
                        <div class="flex items-center">
                         {perfil && (
                          <div className="flex items-center">
                            <div className="flex justify-center items-center">
                              {perfil.imagen?.data ? (
                                <img
                                  className="w-12 h-12 rounded-full border-2 border-cyan-500 object-cover"
                                  src={`data:${perfil.imagen.contentType};base64,${btoa(
                                    String.fromCharCode(...perfil.imagen.data.data)
                                  )}`}
                                  alt={perfil.nombre}
                                />
                              ) : (
                                <img
                                  className="w-12 h-12 rounded-full border-2 border-cyan-500 object-cover"
                                  src={Imagen}
                                  alt="Imagen por defecto"
                                />
                              )}
                            </div>
                            <div className="text-sm ml-4">
                              <p className="text-gray-900 leading-none">{perfil.nombre}</p>
                              <p className="text-gray-600">{perfil.correo}</p>
                            </div>
                          </div>
                        )}
                        </div>
                        <div className="mt-4 flex gap-2 ">
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-1/2 text-center bg-cyan-500 text-white py-2 rounded-md hover:bg-cyan-600 transition-colors"
                          >
                            codigo
                          </a>
                          <button
                          onClick={() => openModal(project)}
                          className="w-full text-center bg-cyan-500 text-white py-2 rounded-md hover:bg-cyan-600 transition-colors"
                        >
                          Leer más
                        </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {projects.length === 0 && (
                  <p className="col-span-full text-center py-10">No hay proyectos para mostrar.</p>
                )}
              </div>
              <ProjectModal project={selectedProject} isOpen={isModalOpen} onClose={closeModal} />
          </section>
    )
}

export default ProjectsComponent;

