import React from "react";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaFolder, FaTag, FaExternalLinkAlt } from "react-icons/fa";
import { getRandomColor } from "../../colors/colorImages.js";

const BlogCard = ({ blog, index, onReadMore }) => {
  const handleClick = () => {
    onReadMore(blog);
  };

  return (
    <motion.div
      key={blog._id}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative"
    >
      <div className="h-full bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-sm rounded-2xl overflow-hidden border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-cyan-500/20 flex flex-col">
        {/* Efecto de brillo en hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Imagen */}
        {blog.imagen?.imageUrl ? (
          <div
            className="w-full h-48 bg-cover bg-center"
            style={{
              backgroundImage: `url(${blog.imagen.imageUrl})`,
            }}
          ></div>
        ) : blog.imagen?.data ? (
          <div
            className="w-full h-48 bg-cover bg-center"
            style={{
              backgroundImage: `url(data:${blog.imagen.contentType};base64,${btoa(
                String.fromCharCode(...blog.imagen.data.data)
              )})`,
            }}
          ></div>
        ) : (
          <div 
            className={`w-full h-48 flex items-center justify-center text-white text-4xl font-bold ${getRandomColor()}`}
          >
            {blog.titulo?.charAt(0).toUpperCase()}
          </div>
        )}

        <div className="relative p-5 flex flex-col justify-between flex-1">
          <div className="space-y-3 flex-1">
            {/* Categoría y Fecha */}
            <div className="flex items-center gap-3 text-xs text-gray-400">
              <div className="flex items-center gap-1">
                <FaFolder className="text-cyan-400" />
                <span className="font-poppins">{blog.categoria || 'General'}</span>
              </div>
              <div className="flex items-center gap-1">
                <FaCalendarAlt className="text-cyan-400" />
                <span className="font-poppins">
                  {new Date(blog.fecha).toLocaleDateString('es-ES', { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
            </div>

            {/* Título */}
            <h3 className="text-xl font-bold font-poppins text-white mb-2 group-hover:text-cyan-400 transition-colors line-clamp-2">
              {blog.titulo}
            </h3>

            {/* Contenido preview */}
            <p className="text-gray-300 text-sm leading-relaxed line-clamp-3 font-poppins">
              {blog.contenido}
            </p>

            {/* Etiquetas */}
            {blog.etiquetas && blog.etiquetas.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-2">
                {blog.etiquetas.slice(0, 3).map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-cyan-500/10 text-cyan-400 rounded-md text-xs font-poppins border border-cyan-500/20"
                  >
                    <FaTag className="inline mr-1 text-xs" />
                    {tag}
                  </span>
                ))}
                {blog.etiquetas.length > 3 && (
                  <span className="px-2 py-1 bg-gray-800/50 text-gray-400 rounded-md text-xs font-poppins">
                    +{blog.etiquetas.length - 3}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Botón de acción */}
          <button
            onClick={handleClick}
            className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-semibold rounded-lg hover:from-cyan-400 hover:to-cyan-500 transition-all duration-300 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-105 text-sm font-poppins"
          >
            <FaExternalLinkAlt className="text-xs" />
            Leer más
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogCard;

