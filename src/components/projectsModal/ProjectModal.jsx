import React from "react";
import { getRandomColor }  from "../../colors/colorImages.js"


 export const ProjectModal = ({ project, isOpen, onClose}) => {
    if (!isOpen || !project) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
            <div className="bg-white p-4 w-full max-w-lg">
                <div>
                    {project.imagen?.data ? (
                      <div
                        className="h-48 lg:h-auto lg:w-48 flex-none bg-cover bg-center"
                        style={{
                          backgroundImage: `url(data:${project.imagen.contentType};base64,${Buffer.from(project.imagen.data).toString('base64')})`,
                        }}
                      ></div>
                    ) : (
                      <div className={`w-full  flex-none flex items-center justify-center text-white text-4xl font-bold ${getRandomColor()}`}>
                        {project.titulo?.charAt(0).toUpperCase()}
                      </div>
                    )}
                </div>
                <div>
                    <h2 className="text-2xl text-black font-bold mb-4">{project.titulo}</h2>
                    <p className="mb-2 text-gray-700">{project.descripcion}</p>
                    <p className="text-sm text-gray-500 mb-4">{new Date(project.fecha).toLocaleDateString()}</p>
                </div>
                <div className="flex gap-2">
                    <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-cyan-500 text-white px-2 py-2 rounded-lg hover:bg-cyan-600 transition"
                    >
                    Ver Proyecto
                    </a>
                    <button
                    onClick={onClose}
                    className="inline-block bg-cyan-500 text-white px-2 py-2 rounded-lg hover:bg-red-600 transition"
                    >
                    Cerrar
                    </button>
                </div>
            </div>
        </div>
    )
}