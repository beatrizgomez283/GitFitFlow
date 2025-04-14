import { useState } from 'react';
import PlanEntrenamientoCard from './PlanEntrenamientoCard';

export default function PlanDetalle({ plan, onClose }) {
    const [mostrar, setMostrar] = useState(true);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-end md:items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-lg w-full max-w-md max-h-full overflow-y-auto">
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-semibold">{plan.nombre}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
                </div>

                <div className="p-4">
                    <PlanEntrenamientoCard plan={plan} />
                </div>
            </div>
        </div>
    );
}
