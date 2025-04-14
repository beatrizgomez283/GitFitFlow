// src/pages/Entrenamientos.jsx
import { useState } from 'react';
import PlanPreview from '@/components/PlanPreview';
import PlanDetalle from '@/components/PlanDetalle';
import { planes } from '@/data/planesEntrenamiento';

export default function Entrenamientos() {
    const [planActivo, setPlanActivo] = useState(null);

    return (
        <div className="space-y-6">
            {planActivo ? (
                <PlanDetalle plan={planActivo} onBack={() => setPlanActivo(null)} />
            ) : (
                <>
                    <section>
                        <h2 className="text-lg font-semibold mb-2">Entrenamiento activo</h2>
                        {/* Aquí puedes mostrar el plan activo real, si hay uno */}
                        {planes.length > 0 && (
                            <PlanPreview plan={planes[0]} onClick={() => setPlanActivo(planes[0])} />
                        )}
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold mb-2">Todos los planes</h2>
                        <div className="space-y-4">
                            {planes.map((plan, index) => (
                                <PlanPreview key={index} plan={plan} onClick={() => setPlanActivo(plan)} />
                            ))}
                        </div>
                    </section>
                </>
            )}
        </div>
    );
}