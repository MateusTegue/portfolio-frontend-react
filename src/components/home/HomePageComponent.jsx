import React, { useState, useEffect } from "react";
import { motion } from 'framer-motion';
import Imagen from "../../images/PerfilImage.png"
import DataAnalitic from "../../images/DataAnalitic.png"
import DisenioGrafico from "../../images/DiseñoGrafico.jpg"
import DesarrolloWeb from "../../images/DesarrolloWeb.jpeg"
import { getNoticias } from "../../api/newsApi";
import { getPerfil } from "../../api/perfil";
import { ClimbingBoxLoader, PropagateLoader, PacmanLoader } from "react-spinners";
import { Typewriter } from "../../hooks/Typewriter/Typewriter.jsx"
import { FaExclamationTriangle } from "react-icons/fa";

const HomePageComponent = () => {
    const [loading, setLoading] = useState(true);
    const [noticias, setNoticias] = useState([]);
    const [perfil, setPerfil] = useState(null);
    const [error, setError] = useState(null);
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const truncateText = (text, maxLength) => {
      if (!text) return "";
      return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
    };

    // recargue automatico
    const fetchWithRetry = async (fn, retries = 3, delayMs = 1000) => {
      for (let i = 0; i < retries; i++) {
        try {
          return await fn();
        } catch (err) {
          if (i < retries - 1) {
            await new Promise(res => setTimeout(res, delayMs));
          } else {
            throw err;
          }
        }
      }
    };



 useEffect(() => {
    const getPerfilData = async () => {
      try {
        // const dataPerfil = await getPerfil();
        const dataPerfil = await fetchWithRetry(() => getPerfil(), 3, 1500);
        await delay(50)
        setPerfil(dataPerfil[0]);
      } catch (err) {
        console.error("Error al obtener perfil:", err);
        await delay(50);
        setError("No se pudo cargar el perfil.");
      } finally {
        setLoading(false);
      }
    };
    getPerfilData();
}, []);

if (loading) {
  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <PropagateLoader color="#36d7b7" />
    </div>
  );
}

if (error) {
  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "2rem",
        color: "#ff4d4f",
        fontSize: "1.2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem"
      }}
    >
      <FaExclamationTriangle size={40} />
      <span>{error}</span>
      <button onClick={() => window.location.reload()} className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-full">
        Reintentar
      </button>
    </div>
  );
}
  //   // useEfeect para el carge de las noticias
  //   useEffect(() => {
  //       (async () => {
  //         const lista = await getNoticias();
  //         setNoticias(lista);
  //       })();
  //     }, []);

  //     if (noticias === null) {
  //       return (
  //         <aside className="w-1/4 bg-white p-4 border-l border-gray-300 space-y-4">
  //           {[...Array(4)].map((_, i) => (
  //             <div key={i} className="h-24 bg-gray-200 rounded-lg animate-pulse" />
  //           ))}
  //         </aside>
  //       );
  //     }

  //   const getRandomColor = () => {
  //   const colors = [
  //   'bg-blue-900'
  //   ];
  //   const randomIndex = Math.floor(Math.random() * colors.length);
  //   return colors[randomIndex];
  // };



    return (
        <main className="ontainer mx-auto overflow-x-hidden">
            {/* <div className="absolute top-0 left-0 -translate-x-1/3 -translate-y-1/3">
                <div className="w-[45vw] sm:w-[25vw] md:w-[20vw] lg:w-[30vw] aspect-square  rounded-full bg-cyan-500 "></div>
            </div> */}
            <div className="absolute top-0 left-0 translate-x-[-50%] translate-y-[-40%]">
              <div className="w-[45vw] sm:w-[30vw] md:w-[25vw] aspect-square rounded-full bg-cyan-500" />
            </div>
           <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <article className="flex flex-col-reverse md:flex-row  items-center gap-4 rounded-lg shadow-md justify-between">
                    {loading || !perfil ? (
                        <div className="animate-pulse w-full">
                          <div className="h-24 bg-gray-300 rounded-md mb-4" />
                          <div className="h-6 bg-gray-300 rounded w-1/2 mb-2" />
                          <div className="h-4 bg-gray-300 rounded w-full mb-1" />
                          <div className="h-4 bg-gray-300 rounded w-5/6" />
                        </div>
                      ) : (
                        <>
                          <div className="w-full max-w-xl px-4 sm:px-6 md:w-1/2 text-center md:text-left">
                            <h1 className="text-3xl sm:text-4xl font-bold font-poppins text-white">
                             {!loading && perfil?.nombre && (
                                   <Typewriter text={`${perfil.nombre}`} />
                                )}
                            </h1>
                            <p title={perfil.descripcion} className="text-base sm:text-lg font-sans text-white mt-2" >
                              {truncateText(perfil.descripcion, 400)}
                            </p>
                            <a
                              href="/cv.pdf"
                              download="cv.pdf"
                              className="mt-4 px-4 py-2 bg-cyan-500 text-white rounded-3xl hover:bg-cyan-600 transition-colors inline-block"
                            >
                              Descargar CV
                            </a>
                          </div>
                          <div className="flex justify-center items-center">
                            {perfil.imagen?.data ? (
                              <img
                                className="w-[180px] h-[250px] sm:w-[200px] sm:h-[300px] md:w-[350px] md:h-[500px] max-w-[90vw] object-cover rounded-lg border-4 border-cyan-500"
                                src={`data:${perfil.imagen.contentType};base64,${btoa(
                                  String.fromCharCode(...perfil.imagen.data.data)
                                )}`}
                                alt={perfil.nombre}
                              />
                            ) : (
                              <img
                                className="w-[180px] h-[250px] sm:w-[200px] sm:h-[300px] md:w-[350px] md:h-[500px] max-w-[50vw] object-cover rounded-lg border-b-4 border-cyan-500"
                                src={Imagen}
                                alt="Imagen por defecto"
                              />
                            )}
                          </div>

                        </>
                      )}
                </article>
                {/* <article className="p-4 rounded-lg mb-4 grid grid-flow-col grid-rows-3 gap-4 ">
                    {loading ? (
                    <div className="animate-pulse space-y-2">
                        <div className="h-6 bg-gray-300 rounded w-3/4" />
                        <div className="h-4 bg-gray-300 rounded w-5/6" />
                    </div>
                    ) : (
                    <>
                      <div className=" p-2 row-span-3 ... rounded-lg  shadow-xl ... h-[425px] ">
                        <img src={DataAnalitic} alt="Imagen de interes" className="w-full h-full object-cover rounded-lg " />
                      </div>
                      <div className=" p-2 col-span-2 ... rounded-lg shadow-xl ... justify-end">
                        <img src={DisenioGrafico} alt="Imagen de interes" className="w-full h-full object-cover rounded-lg " />
                      </div>
                      <div className=" p-2 col-span-2 row-span-2 h-64 rounded-lg shadow-xl">
                        <img src={DesarrolloWeb} alt="Imagen de interes" className="w-full h-full object-cover rounded-lg " />
                      </div>
                    </>
                    )}
                </article> */}
            </section>
            {/* <aside className="w-[20%] p-4 border-l border-blue-500">
                {noticias.map((n, i) => (
                    <motion.div key={i} className="mb-4  p-4 bg-gray-900 text-white  " initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1, duration: 0.3 }}>
                    <a href={n.link} target="_blank" rel="noopener noreferrer" className="block">{n.image_url && (
                        <img src={n.image_url} alt={n.title} className="w-full h-20 object-cover  mb-2" /> )}
                        <hr />
                        <h2 className="font-semibold">{n.title}</h2>
                        <p className="text-sm line-clamp-2">{n.description}</p>
                    </a>
                    </motion.div>
                ))}
            </aside> */}
        </main>
    );
};

export default HomePageComponent;

