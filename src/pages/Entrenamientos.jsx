// src/pages/Entrenamientos.jsx

import { useState } from 'react';
import PlanPreview from '../components/PlanPreview';
import PlanDetalle from '../components/PlanDetalle';
import SesionDetalle from '../components/SesionDetalle';
import SesionEjecutar from '../components/SesionEjecutar';
import { planes } from '../data/planesEntrenamiento';

export default function Entrenamientos() {
    const [planSeleccionado, setPlanSeleccionado] = useState(null);
    const [sesionSeleccionada, setSesionSeleccionada] = useState(null);
    const [modoEjecutar, setModoEjecutar] = useState(false);
    const [semanaSeleccionada, setSemanaSeleccionada] = useState(1);
    const [modoVista, setModoVista] = useState('inicio');

    const handleSeleccionarPlan = (plan) => {
        setPlanSeleccionado(plan);
        setModoVista('plan');
    };

    const handleSeleccionarSesion = (sesion) => {   // 👈  AHORA ESTÁ AQUÍ ARRIBA
        setSesionSeleccionada(sesion);
        setModoVista('sesion');
    };

    planes.forEach(plan => {
        plan.sesiones.forEach((sesion, index) => {
            sesion.id = `sesion_${index}`;
        });
    });

    const handleVolverPlan = () => {
        setSesionSeleccionada(null);
        setModoEjecutar(false);
    };

    const iniciarSesion = (semana) => {
        setSemanaSeleccionada(semana);
        setModoEjecutar(true);
    };
    if (modoEjecutar && sesionSeleccionada) {
        return (
            <SesionEjecutar
                sesion={sesionSeleccionada}
                planId={planSeleccionado?.id}
                semanaSeleccionada={semanaSeleccionada}
                onFinish={handleVolverPlan} // 👈 al terminar o volver, regresamos
            />
        );
    }

    if (sesionSeleccionada) {
        return (
            <SesionDetalle
                sesion={sesionSeleccionada}
                planId={planSeleccionado?.id}
                onBack={handleVolverPlan}
                onStart={iniciarSesion} // 👈 nuevo para lanzar ejecución
            />
        );
    }

    if (planSeleccionado) {
        return (
            <PlanDetalle
                plan={planSeleccionado}
                onClose={() => setPlanSeleccionado(null)}
                onSelectSesion={handleSeleccionarSesion}
            />
        );
    }

    const planActivo = planes[0];


    if (modoVista === 'ejecutar') {
        return (
            <SesionEjecutar
                sesion={sesionSeleccionada}
                planId={planSeleccionado?.id}
                onFinish={() => setModoVista('sesion')}
            />
        );
    }

    if (modoVista === 'sesion') {
        return (
            <SesionDetalle
                sesion={sesionSeleccionada}
                planId={planSeleccionado?.id}
                onBack={() => setModoVista('plan')}
                onIniciarSesion={() => setModoVista('ejecutar')}
            />
        );
    }

    if (modoVista === 'plan') {
        return (
            <PlanDetalle
                plan={planSeleccionado}
                onClose={() => setModoVista('inicio')}
                onSelectSesion={handleSeleccionarSesion}
            />
        );
    }



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
