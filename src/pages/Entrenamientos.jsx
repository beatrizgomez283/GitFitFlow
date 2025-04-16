import { useState } from 'react';
import PlanPreview from '../components/PlanPreview';
import PlanDetalle from '../components/PlanDetalle';
import SesionDetalle from '../components/SesionDetalle';
import { planes } from '../data/planesEntrenamiento';

export default function Entrenamientos() {
  const [planSeleccionado, setPlanSeleccionado] = useState(null);
  const [sesionSeleccionada, setSesionSeleccionada] = useState(null);

    const handleSeleccionarSesion = (sesion) => {
        console.log('Sesión seleccionada:', sesion); // para debug
        setSesionSeleccionada(sesion);
    };


  const handleVolverPlan = () => {
    setSesionSeleccionada(null);
  };

    if (sesionSeleccionada) {
        return (
            <SesionDetalle
                sesion={sesionSeleccionada}
                onBack={handleVolverPlan}
            />
        );
    }


    if (planSeleccionado) {
        return (
            <PlanDetalle
                plan={planSeleccionado}
                onClose={() => setPlanSeleccionado(null)}
                onSelectSesion={handleSeleccionarSesion} // 👈 esto es necesario
            />
        );
    }

  const planActivo = planes[0];

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Entrenamiento activo</h2>
        <PlanPreview plan={planActivo} onSelect={setPlanSeleccionado} />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Todos los planes</h2>
        <div className="space-y-4">
          {planes.map((plan) => (
            <PlanPreview key={plan.id} plan={plan} onSelect={setPlanSeleccionado} />
          ))}
        </div>
      </div>
    </section>
  );
}
