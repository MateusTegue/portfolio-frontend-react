import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaCalendarAlt, FaFolder, FaTag } from "react-icons/fa";

export const BlogModal = ({ blog, isOpen, onClose }) => {
    if (!isOpen || !blog) return null;

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
                    className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 w-full max-w-3xl rounded-2xl shadow-2xl border border-cyan-500/20 overflow-hidden max-h-[90vh] flex flex-col"
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
                                    className="text-3xl font-bold text-white mb-3 font-poppins tracking-tight"
                                >
                                    {blog.titulo}
                                </h2>
                                <div className="flex items-center gap-4 flex-wrap">
                                    <div className="flex items-center gap-2 text-cyan-400">
                                        <FaFolder className="text-sm" />
                                        <span className="text-sm font-medium">{blog.categoria || 'General'}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-400">
                                        <FaCalendarAlt className="text-sm" />
                                        <span className="text-sm">
                                            {new Date(blog.fecha).toLocaleDateString("es-ES", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric"
                                            })}
                                        </span>
                                    </div>
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

                    {/* Imagen si existe */}
                    {blog.imagen?.imageUrl ? (
                        <div className="w-full h-64 bg-cover bg-center"
                            style={{
                                backgroundImage: `url(${blog.imagen.imageUrl})`,
                            }}
                        ></div>
                    ) : blog.imagen?.data && (
                        <div className="w-full h-64 bg-cover bg-center"
                            style={{
                                backgroundImage: `url(data:${blog.imagen.contentType};base64,${btoa(
                                    String.fromCharCode(...blog.imagen.data.data)
                                )})`,
                            }}
                        ></div>
                    )}

                    {/* Contenido */}
                    <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar flex-1">
                        {/* Etiquetas */}
                        {blog.etiquetas && blog.etiquetas.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {blog.etiquetas.map((tag, idx) => (
                                    <span
                                        key={idx}
                                        className="px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-full text-xs font-semibold font-poppins border border-cyan-500/30 flex items-center gap-1"
                                    >
                                        <FaTag className="text-xs" />
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Contenido del blog */}
                        <div className="space-y-3">
                            <h3 className="text-lg font-semibold text-cyan-400 font-poppins flex items-center gap-2">
                                <span className="w-1 h-6 bg-gradient-to-b from-cyan-500 to-cyan-600 rounded-full"></span>
                                Contenido
                            </h3>
                            <div className="text-gray-300 leading-relaxed text-base font-poppins whitespace-pre-wrap">
                                {blog.contenido}
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="p-6 bg-gray-900/50 border-t border-gray-700/50">
                        <button
                            onClick={onClose}
                            className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-[1.02] font-poppins"
                            tabIndex={0}
                        >
                            Cerrar
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

