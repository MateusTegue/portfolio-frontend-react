import React from "react";
import { FaNewspaper } from "react-icons/fa";
import { PropagateLoader } from "react-spinners";
import NewsCard from "./NewsCard.jsx";

const NewsAside = ({ noticias, loading }) => {
  return (
    <div className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-sm rounded-2xl border border-cyan-500/20 p-6 shadow-xl">
          {/* Título del aside */}
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-cyan-500/20">
            <FaNewspaper className="text-cyan-400 text-xl" />
            <h3 className="text-xl font-bold font-poppins text-white">
              Noticias <span className="text-cyan-400">Destacadas</span>
            </h3>
          </div>

          {/* Contenido de noticias */}
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <PropagateLoader color="#06b6d4" size={10} />
            </div>
          ) : !noticias || noticias.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-400 font-poppins text-sm">
                No hay noticias disponibles
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {noticias.map((noticia, index) => (
                <NewsCard 
                  key={noticia.link || noticia.url || index} 
                  noticia={noticia} 
                  index={index} 
                />
              ))}
            </div>
          )}
    </div>
  );
};

export default NewsAside;

