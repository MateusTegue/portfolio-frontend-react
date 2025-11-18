import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaShieldAlt, FaFileAlt, FaSpinner, FaExclamationCircle } from "react-icons/fa";
import { getPerfil } from "../../../api/perfil";
import Imagen from "../../../images/PerfilImage.png";

const PerfilAdminComponent = () => {
    const [perfil, setPerfil] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const obtenerPerfil = async () => {
            try {
                const data = await getPerfil();
                setPerfil(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        obtenerPerfil();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full min-h-[400px]">
                <div className="text-center">
                    <FaSpinner className="animate-spin text-cyan-500 text-4xl mx-auto mb-4" />
                    <p className="text-gray-500 font-poppins">Cargando perfil...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-full min-h-[400px]">
                <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-md">
                    <div className="flex items-center gap-3 mb-2">
                        <FaExclamationCircle className="text-red-500 text-xl" />
                        <h3 className="text-red-800 font-bold font-poppins">Error</h3>
                    </div>
                    <p className="text-red-600 font-poppins">{error}</p>
                </div>
            </div>
        );
    }

    if (!perfil) {
        return (
            <div className="flex items-center justify-center h-full min-h-[400px]">
                <p className="text-gray-500 font-poppins">No se encontró información del perfil.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800 font-poppins">Mi Perfil</h1>
                <p className="text-gray-500 font-poppins mt-1">Información personal y de cuenta</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Tarjeta de Perfil Principal */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="lg:col-span-1 bg-white rounded-xl shadow-lg border border-gray-200 p-6"
                >
                    <div className="flex flex-col items-center">
                        <motion.div
                            className="relative mb-4"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-xl" />
                            <div className="relative bg-gradient-to-br from-cyan-500/30 to-cyan-600/30 p-1 rounded-full">
                                <img
                                    className="w-24 h-24 rounded-full border-4 border-cyan-500/50 object-cover"
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
                        <h2 className="text-xl font-bold text-gray-800 font-poppins mb-1">
                            {perfil.nombre}
                        </h2>
                        <div className="flex items-center gap-2 px-3 py-1 bg-cyan-500/10 rounded-full">
                            <FaShieldAlt className="text-cyan-500 text-sm" />
                            <span className="text-cyan-600 font-semibold text-sm font-poppins">
                                {perfil.usuario?.role || "Administrador"}
                            </span>
                        </div>
                    </div>
                </motion.div>

                {/* Información Detallada */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="lg:col-span-2 space-y-4"
                >
                    {/* Información Personal */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200">
                            <div className="p-2 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-lg">
                                <FaUser className="text-white text-sm" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-800 font-poppins">Información Personal</h3>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="flex-1">
                                    <label className="text-xs font-semibold text-gray-800 uppercase tracking-wide font-poppins mb-1 block">
                                        Nombre Completo
                                    </label>
                                    <p className="text-gray-600 font-medium font-poppins">
                                        {perfil.nombre || "No especificado"}
                                    </p>
                                </div>
                            </div>

                            {perfil.descripcion && (
                                <div className="flex items-start gap-4">
                                    <div className="flex-1">
                                        <label className="text-xs font-semibold text-gray-800 uppercase tracking-wide font-poppins mb-1 block">
                                            Descripción
                                        </label>
                                        <p className="text-gray-600 font-poppins leading-relaxed">
                                            {perfil.descripcion}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Información de Cuenta */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200">
                            <div className="p-2 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-lg">
                                <FaEnvelope className="text-white text-sm" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-800 font-poppins">Información de Cuenta</h3>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                                <div className="p-2 bg-cyan-500/10 rounded-lg">
                                    <FaEnvelope className="text-cyan-500" />
                                </div>
                                <div className="flex-1">
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide font-poppins mb-1 block">
                                        Email
                                    </label>
                                    <p className="text-gray-800 font-medium font-poppins">
                                        {perfil.usuario?.email || "No especificado"}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                                <div className="p-2 bg-cyan-500/10 rounded-lg">
                                    <FaShieldAlt className="text-cyan-500" />
                                </div>
                                <div className="flex-1">
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide font-poppins mb-1 block">
                                        Rol
                                    </label>
                                    <p className="text-gray-800 font-medium font-poppins">
                                        {perfil.usuario?.role || "Administrador"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default PerfilAdminComponent;
