import React from "react";


 export const ProjectModal = ({ project, isOpen, onClose}) => {
    if (!isOpen || !project) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
            <div className="bg-white p-6 w-full max-w-lg rounded-lg shadow-lg">
                <div className=" p-2 m-2">
                    <h2 className="text-center text-2xl text-black font-bold mb-4">{project.titulo}</h2>
                    <p className="mb-2 text-gray-700">{project.descripcion}</p>
                    <p className="text-md text- text-gray-800 mb-4">{new Date(project.fecha).toLocaleDateString()}</p>
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