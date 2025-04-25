import React from 'react';

export default function SesionEntrenamientoCard({ sesion }) {
    if (!sesion) return null;
    console.log("PlanEntrenamientoCard: ", planId);
    const sets = Array.isArray(sesion.sets) ? sesion.sets : [];

    const totalEjercicios = sets.reduce((sum, set) => {
        const ejercicios = Array.isArray(set.ejercicios) ? set.ejercicios : [];
        return sum + ejercicios.length;
    }, 0);

    const totalSeries = sets.reduce((sum, set) => {
        const ejercicios = Array.isArray(set.ejercicios) ? set.ejercicios : [];
        return sum + ejercicios.reduce((s, e) => s + (e.series?.length || 0), 0);
    }, 0);

    return (
        <div className="relative bg-white p-4 rounded-xl shadow space-y-4">
            {/* Título */}
            <h4 className="text-lg font-semibold text-gray-800">{sesion.nombre}</h4>

            {/* Resumen */}
            <div className="text-sm text-gray-600">{totalEjercicios} ejercicios · {totalSeries} series</div>

            {/* Sets */}
            <div className="space-y-4">
                {sets.map((set, idxSet) => (
                    <div key={idxSet}>
                        <div className="text-sm font-semibold text-gray-700 mb-2">
                            Superserie {idxSet + 1} {set.rondas && `· ${set.rondas} rondas`}
                        </div>

                        <div className="space-y-2">
                            {Array.isArray(set.ejercicios) && set.ejercicios.map((ejercicio, idxEj) => (
                                <div key={idxEj} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                                    <div className="flex items-center space-x-2">
                                        <img
                                            src={ejercicio.media?.[0] || '/assets/default.jpg'}
                                            alt={ejercicio.nombre}
                                            className="w-10 h-10 object-cover rounded-md"
                                        />
                                        <div>
                                            <div className="text-sm font-medium text-gray-800 line-clamp-1">{ejercicio.nombre}</div>
                                            <div className="text-xs text-gray-500">
                                                {(ejercicio.series?.[0]?.reps || ejercicio.series?.[0]?.tiempo || '-') +
                                                    (ejercicio.series?.[0]?.peso ? ` · ${ejercicio.series[0].peso} kg` : '')}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-xs text-gray-500 font-semibold">
                                        {String.fromCharCode(65 + idxEj)} {/* A, B, C... */}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

       
        </div>
    );
}
