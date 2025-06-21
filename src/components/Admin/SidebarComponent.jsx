import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaUser, FaProjectDiagram, FaSignOutAlt, FaBook } from "react-icons/fa";
import { label } from "framer-motion/client";
import { usePerfil } from "../../hooks/usePerfil/Useperfil.jsx"; 
import Imagen from "../../images/PerfilImage.png"

const SidebarComponent = () => {
  const location = useLocation();
  const { perfil } = usePerfil();
  

  const navItems = [
    { label: "Inicio", path: "/admin", icon: <FaHome /> },
    { label: "Proyectos", path: "/admin/projects", icon: <FaProjectDiagram /> },
    { label: "Educacion", path: "/admin/educacion", icon: <FaBook />},
    { label: "Perfil", path: "/admin/perfil", icon: <FaUser /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <aside className="fixed top-0 left-0 bg-gray-900 text-white w-64 h-screen p-5 z-40 flex flex-col justify-between">
      <div>
        {/* <h2 className="text-2xl font-bold mb-8 text-center">Admin Panel</h2> */}
        {/* Usuario */}
          {perfil && (
          <div className="items-center">
              <img
              className="w-12 h-12 rounded-full border-2 mx-auto border-cyan-500 object-cover"
              src={
                  perfil.imagen?.data
                  ? `data:${perfil.imagen.contentType};base64,${btoa(
                      String.fromCharCode(...perfil.imagen.data.data)
                      )}`
                  : Imagen
              }
              alt={perfil.nombre}
              />
              <div className="font-bold m-4 mx-auto">
              <p className="text-white text-center leading-none">{perfil.nombre}</p>
              </div>
          </div>
          )}
          <hr/>
        <nav className="space-y-4 mt-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-700 transition ${
                location.pathname === item.path ? "bg-gray-700" : ""
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-2 bg-red-600 hover:bg-red-700 rounded transition w-full"
      >
        <FaSignOutAlt />
        Cerrar sesión
      </button>
    </aside>


  );
};

export default SidebarComponent;
