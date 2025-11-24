import React from "react";
import { motion } from "framer-motion";
import { FaExternalLinkAlt } from "react-icons/fa";

const NewsCard = ({ noticia, index }) => {
  // Asegurar que tenemos los datos necesarios
  if (!noticia || !noticia.title) {
    return null;
  }

  // Obtener la URL del enlace (NewsData.io usa 'link')
  const newsUrl = noticia.link || noticia.url || '#';
  
  return (
    <motion.a
      key={index}
      href={newsUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="block group"
    >
      <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:bg-gray-800/70">
        {/* Imagen de la noticia si existe */}
        {noticia.image_url && (
          <div className="w-full h-32 mb-3 rounded-lg overflow-hidden bg-gray-700/50">
            <img
              src={noticia.image_url}
              alt={noticia.title || 'Noticia'}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
        )}

        {/* Título */}
        <h4 className="text-white font-semibold font-poppins text-sm mb-2 line-clamp-2 group-hover:text-cyan-400 transition-colors">
          {noticia.title}
        </h4>

        {/* Descripción */}
        {noticia.description && (
          <p className="text-gray-400 text-xs font-poppins line-clamp-2 mb-3">
            {noticia.description}
          </p>
        )}

        {/* Fuente y fecha */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span className="font-poppins truncate">
            {noticia.source_name || noticia.source_id || 'Fuente'}
          </span>
          {noticia.pubDate && (
            <span className="font-poppins whitespace-nowrap ml-2">
              {new Date(noticia.pubDate).toLocaleDateString('es-ES', {
                month: 'short',
                day: 'numeric'
              })}
            </span>
          )}
        </div>

        {/* Icono de enlace externo */}
        <div className="mt-3 flex items-center gap-1 text-cyan-400 text-xs font-poppins opacity-0 group-hover:opacity-100 transition-opacity">
          <FaExternalLinkAlt className="text-xs" />
          <span>Leer más</span>
        </div>
      </div>
    </motion.a>
  );
};

export default NewsCard;

