import { useEffect, useState } from 'react';
import PlanEntrenamientoCard from './PlanEntrenamientoCard';
import SesionEntrenamientoCard from './SesionEntrenamientoCard';

export default function PlanDetalle({ plan, onClose, onSelectSesion }) {
    const [show, setShow] = useState(false);

    // Activamos animación cuando se monta el componente
    useEffect(() => {
        const timer = setTimeout(() => setShow(true), 10); // breve delay para que tailwind aplique las clases
        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setShow(false);
        setTimeout(onClose, 300); // esperar a que termine la animación
    };

    return (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4 bg-black bg-opacity-40 backdrop-blur-sm transition-opacity duration-300">
            <div
                className={`
                    bg-white rounded-2xl shadow-lg w-full max-w-md max-h-full overflow-y-auto transform transition-all duration-300
                    ${show ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'}
                `}
            >
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-semibold">{plan.nombre}</h2>
                    <button onClick={handleClose} className="text-gray-500 hover:text-gray-700 text-lg">✕</button>
                </div>

                {/* Contenido */}
                <div className="p-4 space-y-4">
                    <PlanEntrenamientoCard plan={plan} />

                    <div>
                        <h3 className="text-md font-semibold mb-2">Sesiones del plan</h3>
                        <div className="space-y-3">
                            {plan.sesiones.map((sesion, idx) => (
                                <SesionEntrenamientoCard
                                    key={idx}
                                    sesion={sesion}
                                    onClick={() => {
                                        onSelectSesion(sesion);
                                        onClose();
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
