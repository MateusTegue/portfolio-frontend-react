import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaExternalLinkAlt, FaCalendarAlt, FaCode } from "react-icons/fa";

export const ProjectModal = ({ project, isOpen, onClose }) => {
    if (!isOpen || !project) return null;

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Escape") {
            onClose();
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                onClick={handleBackdropClick}
                onKeyDown={handleKeyDown}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
            >
                {/* Backdrop con blur */}
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
                
                {/* Modal */}
                <motion.div
                    className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 w-full max-w-2xl rounded-2xl shadow-2xl border border-cyan-500/20 overflow-hidden"
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-title"
                >
                    {/* Header con gradiente */}
                    <div className="relative bg-gradient-to-r from-cyan-500/20 via-cyan-600/20 to-cyan-500/20 p-6 border-b border-cyan-500/30">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <h2 
                                    id="modal-title"
                                    className="text-3xl font-bold text-white mb-2 font-poppins tracking-tight"
                                >
                                    {project.titulo}
                                </h2>
                                <div className="flex items-center gap-2 text-cyan-400">
                                    <FaCode className="text-sm" />
                                    <span className="text-sm font-medium">Proyecto</span>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="ml-4 p-2 rounded-lg bg-gray-800/50 hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-all duration-200 border border-gray-700/50 hover:border-red-500/50"
                                aria-label="Cerrar modal"
                                tabIndex={0}
                            >
                                <FaTimes className="text-xl" />
                            </button>
                        </div>
                    </div>

                    {/* Contenido */}
                    <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
                        {/* Descripción */}
                        <div className="space-y-3">
                            <h3 className="text-lg font-semibold text-cyan-400 font-poppins flex items-center gap-2">
                                <span className="w-1 h-6 bg-gradient-to-b from-cyan-500 to-cyan-600 rounded-full"></span>
                                Descripción
                            </h3>
                            <p className="text-gray-300 leading-relaxed text-base font-poppins">
                                {project.descripcion}
                            </p>
                        </div>

                        {/* Fecha */}
                        <div className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
                            <div className="p-2 bg-cyan-500/10 rounded-lg">
                                <FaCalendarAlt className="text-cyan-400 text-lg" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-400 font-poppins">Fecha de publicación</p>
                                <p className="text-white font-semibold font-poppins">
                                    {new Date(project.fecha).toLocaleDateString("es-ES", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric"
                                    })}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Footer con botones */}
                    <div className="p-6 bg-gray-900/50 border-t border-gray-700/50">
                        <div className="flex gap-3">
                            <a
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-[1.02] font-poppins"
                            >
                                <FaExternalLinkAlt className="text-sm" />
                                Ver Proyecto
                            </a>
                            <button
                                onClick={onClose}
                                className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white font-semibold rounded-lg transition-all duration-200 border border-gray-700/50 hover:border-gray-600 font-poppins"
                                tabIndex={0}
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};