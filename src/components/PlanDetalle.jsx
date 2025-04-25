import { useState } from 'react';
import PlanEntrenamientoCard from './PlanEntrenamientoCard';
import SesionEntrenamientoCard from './SesionEntrenamientoCard';

export default function PlanDetalle({ plan, onClose, onSelectSesion }) {
    const [mostrar, setMostrar] = useState(true);

    return (
        <section className="p-4 space-y-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">{plan.nombre}</h2>
                <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
            </div>

            <PlanEntrenamientoCard plan={plan}
                onClose={() => { 
                    setRefrescoNotas(prev => prev + 1); // fuerza rerender
                    setEjercicioActivo(null);}
                    }
                />

            {plan.sesiones?.length > 0 && (
                <div className="space-y-2">
                    <h3 className="text-lg font-semibold">Sesiones</h3>
                    {plan.sesiones.map((sesion, index) => (
                        <div
                            key={index}
                            className="cursor-pointer"
                            onClick={() => {
                                onSelectSesion(sesion, plan);
                                //onClose();
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
