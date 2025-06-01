import React, { useEffect, useState } from "react";
import { getAllProjects } from "../../api/projects.js"; 
import { getRandomColor }  from "../../colors/colorImages.js"

const ProjectsComponent = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [ error, setError ] = useState(null);

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
        <section className="w-full px-4 py-8 bg-gray-100 mt-32">
            <div className="mx-auto max-w-7xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {projects.map((project) => (
                  <div key={project._id} className="flex justify-center rounded-lg">
                    <div className="w-full max-w-xs rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                      {/* Si la imagen está en base64 o URL, muestra así: */}
                      {project.imagen?.data ? (
                        <img
                          className="w-full h-48 object-cover"
                          src={`data:${project.imagen.contentType};base64,${Buffer.from(project.imagen.data).toString('base64')}`}
                          alt={project.titulo}
                        />
                      ) : (
                        <div className={`w-full h-48 ${getRandomColor()} text-white text-5xl font-bold flex items-center justify-center`}>
                          {project.titulo?.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div className="px-6 py-4">
                        <div className="font-bold text-2sm mb-2">{project.titulo}</div>
                        <p className="text-gray-700 text-base">{project.descripcion.slice(0, 20)}...</p>
                        <p className="text-sm text-gray-500 mt-1">{new Date(project.fecha).toLocaleDateString()}</p>
                      </div>
                      <div className="flex-grow"></div>
                      <div className="text-center">
                          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-none transition-colors duration-300">
                              <a href={project.url} target="_blank" rel="noopener noreferrer" > Ver más</a>         
                          </button>
                      </div>
                    </div>
                  </div>
                ))}
                {projects.length === 0 && (
                  <p className="col-span-full text-center py-10">No hay proyectos para mostrar.</p>
                )}
              </div>
            </div>
          </section>
    )
}

export default ProjectsComponent;