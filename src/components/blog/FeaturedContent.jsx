import React from "react";
import { motion } from "framer-motion";
import { FaStar, FaExternalLinkAlt } from "react-icons/fa";
import { getRandomColor } from "../../colors/colorImages.js";

const FeaturedContent = ({ blogs }) => {
  // Obtener los primeros 3 blogs como destacados
  const featuredBlogs = blogs.slice(0, 3);

  if (featuredBlogs.length === 0) return null;

  return (
    <div className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-sm rounded-2xl border border-cyan-500/20 p-6 shadow-xl mb-6">
      <div className="flex items-center gap-2 mb-4 pb-4 border-b border-cyan-500/20">
        <FaStar className="text-cyan-400 text-lg" />
        <h3 className="text-lg font-bold font-poppins text-white">
          Contenido <span className="text-cyan-400">Destacado</span>
        </h3>
      </div>

      <div className="space-y-3">
        {featuredBlogs.map((blog, index) => (
          <motion.a
            key={blog._id}
            href={`#blog-${blog._id}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="block group"
          >
            <div className="flex gap-3 p-3 bg-gray-800/50 rounded-lg border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:bg-gray-800/70">
              {/* Imagen pequeña */}
              {blog.imagen?.imageUrl ? (
                <div
                  className="w-16 h-16 flex-shrink-0 rounded-lg bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${blog.imagen.imageUrl})`,
                  }}
                ></div>
              ) : blog.imagen?.data ? (
                <div
                  className="w-16 h-16 flex-shrink-0 rounded-lg bg-cover bg-center"
                  style={{
                    backgroundImage: `url(data:${blog.imagen.contentType};base64,${btoa(
                      String.fromCharCode(...blog.imagen.data.data)
                    )})`,
                  }}
                ></div>
              ) : (
                <div 
                  className={`w-16 h-16 flex-shrink-0 rounded-lg flex items-center justify-center text-white text-lg font-bold ${getRandomColor()}`}
                >
                  {blog.titulo?.charAt(0).toUpperCase()}
                </div>
              )}

              {/* Contenido */}
              <div className="flex-1 min-w-0">
                <h4 className="text-white font-semibold font-poppins text-sm mb-1 line-clamp-2 group-hover:text-cyan-400 transition-colors">
                  {blog.titulo}
                </h4>
                <p className="text-gray-400 text-xs font-poppins line-clamp-2">
                  {blog.contenido}
                </p>
                <div className="mt-2 flex items-center gap-1 text-cyan-400 text-xs font-poppins opacity-0 group-hover:opacity-100 transition-opacity">
                  <FaExternalLinkAlt className="text-xs" />
                  <span>Leer más</span>
                </div>
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
};

export default FeaturedContent;

