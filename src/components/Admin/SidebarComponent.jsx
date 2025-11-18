import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHome, FaUser, FaProjectDiagram, FaSignOutAlt, FaBook } from "react-icons/fa";
import { usePerfil } from "../../hooks/usePerfil/Useperfil.jsx"; 
import Imagen from "../../images/PerfilImage.png"

const SidebarComponent = () => {
  const location = useLocation();
  const { perfil } = usePerfil();
  

  const navItems = [
    { label: "Perfil", path: "/admin/perfil", icon: <FaUser /> },
    { label: "Inicio", path: "/admin", icon: <FaHome /> },
    { label: "Proyectos", path: "/admin/projects", icon: <FaProjectDiagram /> },
    { label: "Educacion", path: "/admin/educacion", icon: <FaBook />},
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/Login";
  };

  const isActive = (path) => {
    if (path === "/admin") {
      return location.pathname === "/admin";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <aside className="fixed top-0 left-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white w-56 h-screen z-40 flex flex-col border-r border-gray-700/50 shadow-2xl">
      {/* Header con perfil */}
      <div className="p-6 border-b border-gray-700/50">
        {perfil && (
          <motion.div 
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="relative mb-3"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
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
            </motion.div>
            <div className="text-center">
              <p className="text-white font-bold text-sm font-poppins">{perfil.nombre}</p>
              <p className="text-gray-400 text-xs font-poppins mt-1">{perfil.rol}</p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Navegación */}
      <nav className="flex-1 p-3 space-y-1.5 overflow-y-auto">
        {navItems.map((item, index) => {
          const active = isActive(item.path);
          return (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={item.path}
                className={`relative flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all duration-200 group ${
                  active
                    ? "bg-gradient-to-r from-cyan-500/20 to-cyan-600/20 text-cyan-400 border-l-4 border-cyan-500"
                    : "text-gray-300 hover:bg-gray-800/50 hover:text-white"
                }`}
              >
                <span className={`text-base ${active ? "text-cyan-400" : "text-gray-400 group-hover:text-cyan-400"} transition-colors`}>
                  {item.icon}
                </span>
                <span className="font-medium font-poppins text-sm">{item.label}</span>
                {active && (
                  <motion.div
                    className="absolute right-0 w-1 h-6 bg-cyan-500 rounded-l-full"
                    layoutId="activeIndicator"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            </motion.div>
          );
        })}
      </nav>

      {/* Botón de logout */}
      <div className="p-3 border-t border-gray-700/50">
        <motion.button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2.5 px-3 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-lg transition-all duration-200 shadow-lg shadow-red-500/20 hover:shadow-red-500/30 font-poppins font-medium text-sm"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <FaSignOutAlt className="text-sm" />
          <span>Cerrar sesión</span>
        </motion.button>
      </div>
    </aside>
  );
};

export default SidebarComponent;
