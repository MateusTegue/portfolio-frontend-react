import React, { useEffect, useState } from "react";
import { getAllProjects, createProject } from "../../../api/projects.js"; 
import { deleteProjectById } from "../../../api/projects.js";
import { getRandomColor }  from "../../../colors/colorImages.js"
import { usePerfil } from "../../../hooks/usePerfil/Useperfil.jsx";
import Imagen from "../../../images/PerfilImage.png"
import { ProjectModal } from "../../projectsModal/ProjectModal.jsx"

const ShowProjectsComponent = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [ error, setError ] = useState(null);
    const { perfil } = usePerfil();
    
    const [isModalOpen, setIsModalOpen ] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    
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
        } finally {
          setLoading(false);
        }
      };

    useEffect(() => {
      getAllProjectsData();
    }, []);

    if (loading) {
        return <div className="text-center text-gray-500">Cargando proyectos...</div>;
    }
    if (error) {
        return <div className="text-center text-red-500">Error: {error}</div>;
    }
    {projects.length === 0 && (
        <p className="text-center text-gray-500">No hay proyectos disponibles.</p>
    )}


    
    
    const handleSubmit = async () =>{
        try {
            await createProject(form);
            alert("Proyecto Creado")
            setForm({ imagen: '', titulo: '', descripcion: '', fecha: '', url: '' });
            getAllProjectsData();
        } catch (error){
            alert("Error al crear el proyecro")
        }
    }
    

    const handleDelete = async (projectId) => {
        try {
            await deleteProjectById(projectId);
            getAllProjectsData();
        } catch (error) {
            console.error(error.message);
        }
    };

    
    return (
        <section className="mx-auto px-4 py-8  w-[90%] ">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
                {/* Formulario */}
                <div className="col-span-1">
                <form className="bg-white text-black shadow-3xl rounded-xl border-2 p-6 max-w-md w-full space-y-5">
                    <div>
                        <h1 className="text-black text-center font-bold text-xl">Crear Nuevo Proyecto</h1>
                    </div>

                    {/* Imagen */}
                    <div className="m-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Imagen</label>
                        <input
                        type="file"
                        name="imagen"
                        accept="image/*"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"                        onChange={(e) => setForm({ ...form, imagen: e.target.files[0] })}
                        />
                    </div>

                    {/* Título */}
                    <div className="m-4">
                        <label htmlFor="titulo" className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                        <input
                        type="text"
                        name="titulo"
                        id="titulo"
                        placeholder="Título del proyecto"
                        value={form.titulo}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    

                    {/* Fecha */}
                    <div className="m-4">
                        <label htmlFor="fecha" className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
                        <input
                        type="date"
                        name="fecha"
                        id="fecha"
                        value={form.fecha}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* URL */}
                    <div className="m-4">
                        <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">URL</label>
                        <input
                        type="text"
                        name="url"
                        id="url"
                        value={form.url}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Descripción */}
                    <div className="m-4">
                    <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-1">
                        Descripción
                    </label>
                    <textarea
                        name="descripcion"
                        id="descripcion"
                        rows="4"  // puedes ajustar el número de filas visibles
                        placeholder="Descripción"
                        value={form.descripcion}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                    </div>


                    {/* Botón */}
                    <div className="m-4  flex justify-end gap-2">
                        <button
                        type="button"
                        onClick={() => setForm({ imagen: '', titulo: '', descripcion: '', fecha: '', url: '' })}
                        className=" bg-cyan-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
                        >
                        Limpiar
                        </button>
                        <button
                        type="button"
                        onClick={handleSubmit}
                        className=" bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
                        >
                        Guardar Proyecto
                        </button>
                    </div>
                    </form>
        
                 </div>
                {/* Lista de proyectos */}
                <div className="lg:col-span-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
                        {projects.map((project) => (
                        <div
                            key={project._id}
                            className="w-full text-black shadow-lg border rounded-lg overflow-hidden flex flex-col"
                        >
                             {/* Imagen */}
                                    {project.imagen?.data ? (
                                    <div
                                        className="w-full h-28 bg-cover bg-center"  
                                        style={{
                                        backgroundImage: `url(data:${project.imagen.contentType};base64,${Buffer.from(project.imagen.data).toString("base64")})`,
                                        }}
                                    ></div>
                                    ) : (
                                    <div 
                                        className={`w-full h-28 flex items-center justify-center text-white text-4xl font-bold ${getRandomColor()}`}
                                    >
                                        {project.titulo?.charAt(0).toUpperCase()}
                                    </div>
                                    )}
                                {/* Contenido */}
                                <div className="p-4 flex flex-col justify-between w-full">
                                    <div>
                                    <h3 className="text-lg font-semibold text-gray-800">{project.titulo}</h3>
                                    <p className="text-gray-600 text-sm">{project.descripcion.slice(0, 160)}...</p>
                                    <p className="text-xs text-gray-500 mt-1">{new Date(project.fecha).toLocaleDateString()}</p>
                                    </div>

                                    {/* Usuario */}
                                    {perfil && (
                                    <div className="flex items-center mt-4">
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
                                        <div className="text-sm ml-4">
                                        <p className="text-gray-900 leading-none">{perfil.nombre}</p>
                                        <p className="text-gray-600">{perfil.correo}</p>
                                        </div>
                                    </div>
                                    )}

                                    {/* Botones */}
                                    <div className="mt-4 flex gap-2">
                                    <a
                                        href={project.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-1/2 text-center bg-cyan-500 text-white py-2 rounded-md hover:bg-yellow-600 transition-colors"
                                    >
                                        Editar
                                    </a>
                                    <button
                                        onClick={() => handleDelete(project._id)}
                                        className="w-full text-center bg-cyan-500 text-white py-2 rounded-md hover:bg-red-600 transition-colors"
                                    >
                                        Eliminar
                                    </button>
                                    </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {projects.length === 0 && (
                        <p className="text-center text-gray-500">No hay proyectos para mostrar.</p>
                    )}
                </div>
            {/* Modal */}
            <ProjectModal project={selectedProject} isOpen={isModalOpen} onClose={closeModal} />
            </section>

    )
}

export default ShowProjectsComponent;