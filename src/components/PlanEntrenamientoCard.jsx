import { useState } from 'react';
import SesionEntrenamientoCard from './SesionEntrenamientoCard';

export default function PlanEntrenamientoCard({ plan }) {
    const [expandir, setExpandir] = useState(false);

    const totalSeries = plan.sesiones.reduce(
        (sum, s) => sum + s.ejercicios.reduce((a, e) => a + e.series.length, 0),
        0
    );

    return (
        <div className="bg-white p-4 rounded-xl shadow-md space-y-4">
            <img
                src={plan.imagen}
                alt={plan.nombre}
                className="w-full h-48 object-cover rounded-lg"
            />

            <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-1">{plan.nombre}</h3>
                <p className={`text-sm text-gray-600 ${expandir ? '' : 'line-clamp-3'}`}>{plan.descripcion}</p>
                <button
                    onClick={() => setExpandir(!expandir)}
                    className="text-pink-600 text-sm font-medium mt-1"
                >
                    {expandir ? 'Mostrar menos' : 'Mostrar más'}
                </button>
            </div>

            <div className="space-y-2">
                {plan.sesiones.map((sesion, i) => (
                    <SesionEntrenamientoCard key={i} sesion={sesion} />
                ))}
            </div>

            <div className="text-sm text-gray-500">
                {plan.sesiones.length} sesiones • {totalSeries} series
            </div>
        </div>
    );
}
