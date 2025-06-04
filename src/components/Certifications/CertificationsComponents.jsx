import React, { useState, useEffect } from 'react';
import { getAllFormacion } from '../../api/formacion.js';
import { getRandomColor } from '../../colors/colorImages.js';
import { format } from 'date-fns';


const CertificationsComponent = () => {
    const [certifications, setCertifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCertifications = async () => {
            try {
                const data = await getAllFormacion();
                setCertifications(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchCertifications();
    }, []);
 if (loading) {
        return <div className="text-center text-gray-500">Cargando certificaciones...</div>;
    }
    if (error) {
        return <div className="text-center text-red-500">Error: {error}</div>;
    }
    if (certifications.length === 0) {
        return <div className="text-center text-gray-500">No hay certificaciones disponibles.</div>;
    }

return (
    <section className="w-full px-4 py-8 mt-24">
         <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {certifications.map(certification => (
                    <div key={certification._id} className="flex justify-center rounded-lg">
                        <div className="w-full max-w-xs border border-blue-500 rounded-sm overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                            {certification.imagen?.data ? (
                                <img
                                    className="w-full h-48 object-cover"
                                    src={`data:${certification.imagen.contentType};base64,${Buffer.from(certification.imagen.data).toString('base64')}`}
                                    alt={certification.titulo} />
                            ) : (
                                <div className={`w-full h-48 ${getRandomColor()} text-white text-5xl font-bold flex items-center justify-center`}>
                                    {certification.titulo?.charAt(0).toUpperCase()}
                                </div>
                            )}
                            <div className="px-6 py-4">
                                <div className="font-bold text-2sm mb-2">{certification.titulo.slice(0, 15)}...</div>
                                <p className="text-gray-600">{certification.entidadEducativa}</p>
                                <p className="text-gray-600">{certification.descripcion.slice(0, 30)}...</p>
                                <p className="text-gray-600">
                                  {format(new Date(certification.fechaInicio), 'dd/MM/yyyy')} - {format(new Date(certification.fechaFin), 'dd/MM/yyyy')}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

}
export default CertificationsComponent;


           


