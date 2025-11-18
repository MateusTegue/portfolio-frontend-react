import React from "react";
import Imagen from "../../images/PerfilImage.png";
import { PropagateLoader } from "react-spinners";
import { Typewriter } from "../../hooks/Typewriter/Typewriter.jsx";
import { FaExclamationTriangle } from "react-icons/fa";
import { usePerfil } from "../../hooks/usePerfil/Useperfil.jsx";
import { motion } from "framer-motion";
import { FaDownload, FaCode, FaLinkedin, FaGithub } from "react-icons/fa";

const HomePageComponent = () => {
    const { perfil, loading, error } = usePerfil();
    
    const truncateText = (text, maxLength) => {
      if (!text) return "";
      return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
    };

    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <PropagateLoader color="#06b6d4" size={15} />
            <p className="mt-4 text-cyan-400 font-poppins">Cargando perfil...</p>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex items-center justify-center min-h-[60vh]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md mx-auto p-8 bg-red-500/10 border border-red-500/30 rounded-2xl backdrop-blur-sm"
          >
            <FaExclamationTriangle className="mx-auto mb-4 text-red-500" size={40} />
            <p className="text-red-400 font-poppins mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-semibold rounded-full hover:from-cyan-400 hover:to-cyan-500 transition-all duration-300 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50"
            >
              Reintentar
            </button>
          </motion.div>
        </div>
      );
    }

    return (
        <main className="relative min-h-screen overflow-hidden pt-20">
            {/* Gradientes de fondo animados */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-3xl" />
            </div>

            {/* Grid pattern de fondo */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-30" />

            <section className="relative sm:w-full md:w-full lg:w-full xl:w-[80%] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
                <article className="flex flex-col-reverse lg:flex-row items-center gap-2 lg:gap-10 justify-between">
                    {loading || !perfil ? (
                        <div className="animate-pulse w-full">
                          <div className="h-24 bg-gray-300 rounded-md mb-4" />
                          <div className="h-6 bg-gray-300 rounded w-1/2 mb-2" />
                          <div className="h-4 bg-gray-300 rounded w-full mb-1" />
                          <div className="h-4 bg-gray-300 rounded w-5/6" />
                        </div>
                      ) : (
                        <>
                          <motion.div 
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="w-full lg:w-1/2 text-center lg:text-left space-y-6 z-10"
                          >
                            <div className="space-y-4">
                              <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                              >
                                <p className="text-cyan-400 font-poppins font-semibold text-lg mb-2">
                                  👋 Hola
                                </p>
                                <h1 className="text-4xl sm:text-3xl lg:text-4xl font-bold font-poppins text-white mb-4 leading-tight">
                                  {!loading && perfil?.nombre && (
                                    <Typewriter text={`${perfil.nombre}`} />
                                  )}
                                </h1>
                              </motion.div>

                              <motion.p 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                title={perfil.descripcion} 
                                className="text-base sm:text-lg lg:text-xl font-sans text-gray-300 leading-relaxed"
                              >
                                {truncateText(perfil.descripcion, 400)}
                              </motion.p>
                            </div>

                            <motion.div 
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.6 }}
                              className="flex flex-col sm:flex-row gap-4 pt-4"
                            >
                              <a
                                href="/CV_MateusTegue.pdf"
                                download="CV_MateusTegue.pdf"
                                className="group relative px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-semibold rounded-full hover:from-cyan-400 hover:to-cyan-500 transition-all duration-300 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-105 flex items-center justify-center gap-2"
                              >
                                <FaDownload className="group-hover:animate-bounce" />
                                Descargar CV
                              </a>
                              <a
                                href="https://github.com/MateusTegue"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-8 py-3.5 border-2 border-cyan-500 text-cyan-400 font-semibold rounded-full hover:bg-cyan-500/10 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                              >
                                <FaGithub />
                                GitHub
                              </a>
                            </motion.div>

                            {/* Redes sociales */}
                            <motion.div 
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.8 }}
                              className="flex gap-4 pt-4"
                            >
                              <a
                                href="https://www.linkedin.com/in/mateus-tegue/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 hover:bg-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 hover:scale-110"
                                aria-label="LinkedIn"
                              >
                                <FaLinkedin size={20} />
                              </a>
                              <a
                                href="https://github.com/MateusTegue"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 hover:bg-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 hover:scale-110"
                                aria-label="GitHub"
                              >
                                <FaGithub size={20} />
                              </a>
                            </motion.div>
                          </motion.div>

                          <motion.div 
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="flex justify-center items-center relative z-10"
                          >
                            <div className="relative">
                              {/* Efecto de brillo alrededor de la imagen */}
                              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-2xl blur-2xl opacity-30 animate-pulse" />
                              
                              {perfil.imagen?.data ? (
                                <motion.img
                                  initial={{ scale: 0.8, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  transition={{ duration: 0.6, delay: 0.5 }}
                                  className="relative w-[250px] h-[350px] sm:w-[300px] sm:h-[420px] lg:w-[400px] lg:h-[560px] max-w-[70vw] object-cover rounded-2xl border-4 border-cyan-500/50 shadow-2xl shadow-cyan-500/20"
                                  src={`data:${perfil.imagen.contentType};base64,${btoa(
                                    String.fromCharCode(...perfil.imagen.data.data)
                                  )}`}
                                  alt={perfil.nombre}
                                />
                              ) : (
                                <motion.img
                                  initial={{ scale: 0.8, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  transition={{ duration: 0.6, delay: 0.5 }}
                                  className="relative w-[230px] h-[350px] sm:w-[300px] sm:h-[420px] lg:w-[400px] lg:h-[560px] max-w-[70vw] object-cover rounded-2xl border-4 border-cyan-500/50 shadow-2xl shadow-cyan-500/20"
                                  src={Imagen}
                                  alt="Imagen por defecto"
                                />
                              )}
                            </div>
                          </motion.div>
                        </>
                      )}
                </article>
            </section>
        </main>
    );
};

export default HomePageComponent;
