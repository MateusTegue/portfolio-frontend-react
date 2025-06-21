import React, { useEffect, useState} from "react";
import { getPerfil } from "../../../api/perfil";

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

    if(loading) return <p>Cargando Perfil...</p>;
    if(error) return <p>Error: {error}</p>;




    return (
        <div className="p-6 bg-white text-black rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Perfil</h2>
            <p><strong>Nombre:</strong> {perfil.nombre}</p>
            <p><strong>Descripcion:</strong> {perfil.descripcion}</p>
            <p><strong>Email:</strong> {perfil.usuario?.email}</p>
            <p><strong>Email:</strong> {perfil.usuario?.role}</p>
        </div>
    )
}

export default PerfilAdminComponent;