import React, { useState, useEffect } from "react";
import { motion } from 'framer-motion';
import Imagen from "../../images/PerfilImage.png"
import DataAnalitic from "../../images/DataAnalitic.png"
import DisenioGrafico from "../../images/DiseñoGrafico.jpg"
import DesarrolloWeb from "../../images/DesarrolloWeb.jpeg"
import { getNoticias } from "../../api/newsApi";
import { getPerfil } from "../../api/perfil";
const HomePageComponent = () => {
    const [loading, setLoading] = useState(true);
    const [noticias, setNoticias] = useState([]);
    const [perfil, setPerfil] = useState(null);

    
    // useEffect para el carge del perfil
 useEffect(() => {
    const getPerfilData = async () => {
      try {
        const dataPerfil = await getPerfil();
        console.log("Perfil recibido:", dataPerfil); // 👉 LOG IMPORTANTE
        setPerfil(dataPerfil[0]);
      } catch (err) {
        console.error("Error fetching perfil:", err);
      } finally {
        setLoading(false);
      }
    };
    getPerfilData();
}, []);


    // useEfeect para el carge de las noticias
    useEffect(() => {
        (async () => {
          const lista = await getNoticias();
          setNoticias(lista);
        })();
      }, []);
    
      if (noticias === null) {
        return (
          <aside className="w-1/4 bg-white p-4 border-l border-gray-300 space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded-lg animate-pulse" />
            ))}
          </aside>
        );
      }

      useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 2000);
        return () => clearTimeout(timer);
      }, []);



    const getRandomColor = () => {
    const colors = [
    'bg-blue-400'
    ];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };



    return (
        <main className="container mx-auto mt-20 flex">
            <section className="w-[80%]  p-4 rounded-lg">
                <article className=" p-4 rounded-lg mb-4">
                    {loading ? (
                    <div className="animate-pulse">
                        <div className="h-24 bg-gray-300 rounded-md mb-4" />
                        <div className="h-6 bg-gray-300 rounded w-1/2 mb-2" />
                        <div className="h-4 bg-gray-300 rounded w-full mb-1" />
                        <div className="h-4 bg-gray-300 rounded w-5/6" />
                    </div>
                    ) : (
                    <>
                        <div>
                           {perfil.imagen && perfil.imagen.data ? (
                              <img
                                className="w-[150px] h-[150px] object-cover rounded-lg grayscale-50"
                                src={`data:${perfil.imagen.contentType};base64,${Buffer.from(perfil.imagen.data).toString('base64')}`}
                                alt={perfil.nombre}
                              />
                            ) : (
                              <div
                                className={`w-[150px] h-[150px] flex items-center justify-center rounded-full text-white text-3xl font-bold ${getRandomColor()}`}
                              >
                                {perfil.nombre?.slice(0, 1).toUpperCase() || "NA"}
                              </div>
                            )}
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold">{perfil.nombre}</h1>
                            <p className="text-x">{perfil.descripcion}</p>
                        </div>
                    </>)}
                </article>
                <article className="p-4 rounded-lg mb-4 grid grid-flow-col grid-rows-3 gap-4 ">
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
                </article>
            </section>
            <aside className="w-[20%] bg-white p-4 border-l border-gray-300">
                {noticias.map((n, i) => (
                    <motion.div key={i} className="mb-4 bg-gray-50 p-4 " initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1, duration: 0.3 }}>
                    <a href={n.link} target="_blank" rel="noopener noreferrer" className="block">{n.image_url && (
                        <img src={n.image_url} alt={n.title} className="w-full h-20 object-cover  mb-2" /> )}
                        <hr />
                        <h2 className="font-semibold">{n.title}</h2>
                        <p className="text-sm line-clamp-2">{n.description}</p>
                    </a>
                    </motion.div>
                ))}
            </aside>
        </main>
    );
};

export default HomePageComponent;

