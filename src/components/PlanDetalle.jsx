// src/components/PlanDetalle.jsx

import { useState } from 'react';
import PlanEntrenamientoCard from './PlanEntrenamientoCard';
import SesionEntrenamientoCard from './SesionEntrenamientoCard';

export default function PlanDetalle({ plan, onClose, onSelectSesion }) {
    const [refrescoNotas, setRefrescoNotas] = useState(0); // aquí sí se define
    const [ejercicioActivo, setEjercicioActivo] = useState(null);

    if (!plan) return <div className="p-4">Plan no encontrado.</div>;

    return (
        <section className="p-4 space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">{plan.nombre}</h2>
                <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-xl">
                    ✕
                </button>
            </div>

            {/* Tarjeta del plan */}
            <PlanEntrenamientoCard
                plan={plan}
                onClose={() => {
                    setRefrescoNotas(prev => prev + 1);
                    setEjercicioActivo(null);
                }}
            />

            {/* Lista de sesiones */}
            {plan.sesiones?.length > 0 && (
                <div className="space-y-2">
                    <h3 className="text-lg font-semibold">Sesiones</h3>
                    {plan.sesiones.map((sesion, index) => (
                        <div
                            key={index}
                            className="cursor-pointer"
                            onClick={() => {
                                onSelectSesion(sesion, plan);
                                // NO cierres aquí el plan, porque quieres navegar dentro del detalle de la sesión
                            }}
                        >
                            <SesionEntrenamientoCard sesion={sesion} />
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}
