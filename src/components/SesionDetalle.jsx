import { useEffect, useState } from 'react';

export default function SesionDetalle({ sesion, onBack }) {
    const [semanaSeleccionada, setSemanaSeleccionada] = useState(1);
    const [ejercicioActivo, setEjercicioActivo] = useState(null);
    const [notaPersonal, setNotaPersonal] = useState('');
    const numSemanas = sesion.sets[0].ejercicios[0].series.length;
    const semanas = Array.from({ length: numSemanas }, (_, i) => ` ${i + 1}`);

    if (!sesion || !Array.isArray(sesion.sets)) {
        return <div className="p-4">Sesión no válida.</div>;
    }

    const getYoutubeThumbnail = (url) => {
        if (!url) return null;
        const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
        return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : null;
    };

    const getYoutubeEmbed = (url) => {
        if (!url) return null;
        const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
        return match ? `https://www.youtube.com/embed/${match[1]}` : null;
    };

    useEffect(() => {
        if (ejercicioActivo?.nombre) {
            const guardada = localStorage.getItem(`nota_${ejercicioActivo.nombre}`);
            setNotaPersonal(guardada || '');
        }
    }, [ejercicioActivo]);

    const renderEjercicio = (ejercicio, key) => {
        const series = Array.isArray(ejercicio.series) ? ejercicio.series : [];
        const serieSemana = series.find(s => s.semana === semanaSeleccionada) || {};
        console.log("serieSemana.reps: " + serieSemana.reps);
        const textoDetalle = [
            serieSemana.reps && `${serieSemana.reps} reps`,
            serieSemana.duracion && `${serieSemana.duracion}`,
            serieSemana.distancia && `${serieSemana.distancia}`,
            serieSemana.peso && `${serieSemana.peso}`,
            ejercicio.descanso && `${ejercicio.descanso}s de descanso`
        ].filter(Boolean).join(' · ');

        const notaGuardada = localStorage.getItem(`nota_${ejercicio.nombre}`) || '';

        return (
            <div
                key={key}
                onClick={() => setEjercicioActivo(ejercicio)}
                className="bg-white rounded-xl p-4 shadow-sm space-y-2 cursor-pointer transition hover:shadow-md"
            >
                <div className="flex items-center gap-3">
                    {ejercicio.url && (
                        <img
                            src={getYoutubeThumbnail(ejercicio.url)}
                            alt={ejercicio.nombre}
                            className="w-16 h-16 rounded-lg object-cover"
                        />
                    )}
                    <div className="flex-1">
                        <div className="font-semibold text-sm text-gray-900">{ejercicio.nombre}</div>
                        <div className="text-xs text-gray-600">{textoDetalle}</div>
                        {notaGuardada && (
                            <div className="text-xs text-gray-400 italic line-clamp-1 mt-1">“{notaGuardada}”</div>
                        )}
                    </div>
                </div>

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

            {/* Selector de semana */}
            <div className="space-y-2 mb-2">
                <h3 className="text-sm font-medium text-gray-800">Semana</h3>
                <div className="flex gap-2 overflow-x-auto pb-1">
                    {
                        semanas.map((semana) => (
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

                        <div className="text-xs text-gray-500">{set.ejercicios[0].series[semanaSeleccionada-1].series} rondas</div>
                    </h4>

                    {Array.isArray(set.ejercicios) && set.ejercicios.length > 0 ? (
                        set.ejercicios.map((ejercicio, idxEj) =>
                            renderEjercicio(ejercicio, `${idxSet}-${idxEj}`)
                        )
                    ) : (
                        <div className="text-sm text-gray-400">No hay ejercicios.</div>
                    )}
                    {(set.descanso>0) &&
                        (<div className="flex items-center gap-1 text-xs text-gray-500 pl-2">
                            ⏱️ {set.descanso} de descanso después de:   {set.titulo}
                        </div>
                        )
                    }
                  
                </div>
            ))}

            <div className="mt-6">
                <button className="w-full bg-gray-900 text-white py-3 rounded-xl text-sm font-medium shadow-md">
                    Iniciar sesión
                </button>
            </div>

            {/* Modal de ejercicio activo */}
            {ejercicioActivo && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center p-4"
                    onClick={() => {
                        if (ejercicioActivo?.nombre) {
                            localStorage.setItem(`nota_${ejercicioActivo.nombre}`, notaPersonal);
                        }
                        setEjercicioActivo(null);
                    }}
                >
                    <div
                        className="bg-white rounded-3xl shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto p-5 relative"
                        onClick={(e) => e.stopPropagation()} // 👈 evita que el clic dentro cierre el modal
                    >

                        <button
                            onClick={() => {
                                if (ejercicioActivo?.nombre) {
                                    localStorage.setItem(`nota_${ejercicioActivo.nombre}`, notaPersonal);
                                }
                                setEjercicioActivo(null);
                            }}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl"
                        >
                            ✕
                        </button>

                        <h2 className="text-lg font-bold text-center text-gray-800 mb-4">
                            {ejercicioActivo.nombre}
                        </h2>

                        {ejercicioActivo.url && (
                            <div className="aspect-video rounded-xl overflow-hidden mb-4">
                                <iframe
                                    src={getYoutubeEmbed(ejercicioActivo.url)}
                                    title={ejercicioActivo.nombre}
                                    frameBorder="0"
                                    allowFullScreen
                                    className="w-full h-full"
                                ></iframe>
                            </div>
                        )}

                        <div className="text-sm text-gray-500 mb-1">Nota del entrenador</div>
                        <p className="text-sm text-gray-700 mb-4">
                            {ejercicioActivo.nota || ejercicioActivo.notas || 'Sin nota.'}
                        </p>

                        <div className="text-sm text-gray-500 mb-1">Tu nota</div>
                        <textarea
                            rows={4}
                            value={notaPersonal}
                            onChange={(e) => setNotaPersonal(e.target.value)}
                            placeholder="Escribe una nota. Sólo tú puedes verla."
                            className="w-full border rounded-lg px-3 py-2 text-sm text-gray-700 placeholder-gray-400"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
