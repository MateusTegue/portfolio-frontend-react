import React from "react";
import { motion } from "framer-motion";
import { BsLinkedin, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { usePerfil } from "../../hooks/usePerfil/Useperfil.jsx";
import Imagen from "../../images/PerfilImage.png";

const SocialProfile = () => {
  const { perfil } = usePerfil();

  const socialLinks = [
    { 
      href: "https://www.linkedin.com/in/mateus-tegue/", 
      icon: <BsLinkedin />, 
      label: "LinkedIn",
      color: "hover:text-blue-500"
    },
    { 
      href: "https://github.com/MateusTegue", 
      icon: <BsGithub />, 
      label: "GitHub",
      color: "hover:text-gray-300"
    },
    { 
      href: "#", 
      icon: <BsInstagram />, 
      label: "Instagram",
      color: "hover:text-pink-500"
    },
    { 
      href: "#", 
      icon: <BsTwitter />, 
      label: "Twitter",
      color: "hover:text-blue-400"
    },
  ];

  return (
    <div className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-sm rounded-2xl border border-cyan-500/20 p-6 shadow-xl mb-6">
      <div className="flex items-center gap-2 mb-4 pb-4 border-b border-cyan-500/20">
        <FaUser className="text-cyan-400 text-lg" />
        <h3 className="text-lg font-bold font-poppins text-white">
          Perfil <span className="text-cyan-400">Social</span>
        </h3>
      </div>

      {perfil && (
        <div className="flex flex-col items-center mb-4">
          <div className="relative mb-3">
            <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-xl" />
            <div className="relative bg-gradient-to-br from-cyan-500/30 to-cyan-600/30 p-1 rounded-full">
              <img
                className="w-16 h-16 rounded-full border-2 border-cyan-500/50 object-cover"
                src={
                  perfil.imagen?.data
                    ? `data:${perfil.imagen.contentType};base64,${btoa(
                        String.fromCharCode(...perfil.imagen.data.data)
                      )}`
                    : Imagen
                }
                alt={perfil.nombre}
              />
            </div>
          </div>
          <h4 className="text-white font-bold text-sm font-poppins">{perfil.nombre}</h4>
          {perfil.correo && (
            <p className="text-gray-400 text-xs font-poppins mt-1">{perfil.correo}</p>
          )}
        </div>
      )}

      <div className="flex flex-wrap gap-2 justify-center">
        {socialLinks.map((social, index) => (
          <motion.a
            key={social.label}
            href={social.href}
            target={social.href !== "#" ? "_blank" : undefined}
            rel={social.href !== "#" ? "noopener noreferrer" : undefined}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`w-10 h-10 flex items-center justify-center bg-gray-800/50 border border-gray-700/50 rounded-lg text-gray-400 ${social.color} transition-all duration-200 hover:border-cyan-500/50 hover:bg-gray-800`}
            aria-label={social.label}
          >
            {social.icon}
          </motion.a>
        ))}
      </div>
    </div>
  );
};

export default SocialProfile;

