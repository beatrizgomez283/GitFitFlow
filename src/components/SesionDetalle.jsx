import { useState } from 'react';

export default function SesionDetalle({ sesion, onBack }) {
    const [semanaSeleccionada, setSemanaSeleccionada] = useState(1);

    if (!sesion || !Array.isArray(sesion.sets)) {
        return <div className="p-4">Sesión no válida.</div>;
    }

    const renderEjercicio = (ejercicio, key) => {
        const series = Array.isArray(ejercicio.series) ? ejercicio.series : [];
        const serieSemana = series.find(s => s.semana === semanaSeleccionada) || {};

        const textoDetalle = [
            serieSemana.reps && `${serieSemana.reps} reps`,
            serieSemana.duracion && `${serieSemana.duracion}`,
            serieSemana.distancia && `${serieSemana.distancia}`,
            serieSemana.peso && `${serieSemana.peso}`,
            ejercicio.descanso && `${ejercicio.descanso}s de descanso`
        ].filter(Boolean).join(' · ');

        return (
            <div key={key} className="bg-white rounded-xl p-4 shadow-sm space-y-2">
                <div className="flex items-center gap-3">
                    {Array.isArray(ejercicio.media) && ejercicio.media.length > 0 && (
                        <img
                            src={ejercicio.media[0]}
                            alt={ejercicio.nombre}
                            className="w-12 h-12 rounded-full object-cover"
                        />
                    )}
                    <div className="flex-1">
                        <div className="font-semibold text-sm text-gray-900">
                            {ejercicio.url ? (
                                <a
                                    href={ejercicio.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:underline text-blue-600 flex items-center gap-1"
                                >
                                    {ejercicio.nombre} <span>🎥</span>
                                </a>
                            ) : (
                                ejercicio.nombre
                            )}
                        </div>
                        <div className="text-xs text-gray-600">{textoDetalle}</div>
                    </div>
                </div>
                {ejercicio.descansoDespues && (
                    <div className="flex items-center gap-1 text-xs text-gray-500 pl-2">
                        ⏱️ {ejercicio.descansoDespues} de descanso después de: ejercicio
                    </div>
                )}
            </div>

        );
    };

    return (
        <div className="p-4 space-y-6">
            <button
                onClick={onBack}
                className="text-sm text-blue-600 underline hover:text-blue-800"
            >
                ← Volver al plan
            </button>

            {/* Selector de semana con estilo tipo píldora */}
            <div className="space-y-2 mb-2">
                <h3 className="text-sm font-medium text-gray-800">Semana</h3>
                <div className="flex gap-2 overflow-x-auto pb-1">
                    {[1, 2, 3, 4].map((semana) => (
                        <button
                            key={semana}
                            onClick={() => setSemanaSeleccionada(semana)}
                            className={`px-3 py-1 rounded-full border text-sm whitespace-nowrap transition ${semanaSeleccionada === semana
                                    ? 'bg-pink-600 text-white'
                                    : 'border-gray-300 text-gray-700'
                                }`}
                        >
                            Semana {semana}
                        </button>
                    ))}
                </div>
            </div>

            <h2 className="text-xl font-semibold">{sesion.nombre}</h2>
            {sesion.descripcion && (
                <p className="text-sm text-gray-600">{sesion.descripcion}</p>
            )}

            {sesion.sets.map((set, idxSet) => (
                <div key={idxSet} className="space-y-3">
                    <h4 className="text-md font-semibold text-gray-800">
                        {set.titulo || `Set ${idxSet + 1}`}
                        < div className="text-xs text-gray-500">{set.ejercicios.length} rondas</div>
                    </h4>

                    {Array.isArray(set.ejercicios) && set.ejercicios.length > 0 ? (
                        set.ejercicios.map((ejercicio, idxEj) =>
                            renderEjercicio(ejercicio, `${idxSet}-${idxEj}`)
                        )

                    ) : (
                        <div className="text-sm text-gray-400">No hay ejercicios.</div>
                    )}
                    < div className="text-xs text-gray-500">⏱️{sesion.descanso}s de descanso después de: {set.titulo}</div>

                </div>
            ))}

            <div className="mt-6">
                <button className="w-full bg-gray-900 text-white py-3 rounded-xl text-sm font-medium shadow-md">
                    Iniciar sesión
                </button>
            </div>
        </div>
    );
}
