import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SesionDetalle({ sesion, onBack }) {
    const [semanaSeleccionada, setSemanaSeleccionada] = useState(1);
    const [ejercicioActivo, setEjercicioActivo] = useState(null);
    const [notaPersonal, setNotaPersonal] = useState('');
    const navigate = useNavigate();

    if (!sesion || !Array.isArray(sesion.sets)) {
        return <div className="p-4">Sesión no válida.</div>;
    }

    const iniciarSesion = () => {
        navigate('/ejecutar', { state: { sesion } });
    };

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

    useEffect(() => {
        if (ejercicioActivo) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [ejercicioActivo]);

    const renderEjercicio = (ejercicio, key) => {
        const series = Array.isArray(ejercicio.series) ? ejercicio.series : [];
        const serieSemana = series.find(s => Number(s.semana) === Number(semanaSeleccionada)) || {};

        const textoDetalle = [
            serieSemana.n_series && `${serieSemana.n_series} series`,
            serieSemana.reps && `Reps: ${serieSemana.reps}`,
            serieSemana.duracion && `Duración: ${serieSemana.duracion}`,
            serieSemana.distancia && `Distancia: ${serieSemana.distancia}`,
            serieSemana.peso && `Peso: ${serieSemana.peso}`,
            ejercicio.descanso && `${ejercicio.descanso}s descanso`
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

            {/* Selector de semana */}
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
                        <div className="text-xs text-gray-500">{set.ejercicios[0].series[semanaSeleccionada-1].n_series} rondas</div>
                    </h4>

                    {Array.isArray(set.ejercicios) && set.ejercicios.length > 0 ? (
                        set.ejercicios.map((ejercicio, idxEj) =>
                            renderEjercicio(ejercicio, `${idxSet}-${idxEj}`)
                        )
                    ) : (
                        <div className="text-sm text-gray-400">No hay ejercicios.</div>
                    )}

                    <div className="text-xs text-gray-500">
                        ⏱️ {set.descanso}s de descanso después de: {set.titulo}
                    </div>
                </div>
            ))}

            <div className="mt-6">
                <button
                    onClick={iniciarSesion}
                    className="w-full bg-gray-900 text-white py-3 rounded-xl text-sm font-medium shadow-md"
                >
                    Iniciar sesión
                </button>
            </div>
        </div>
    );
}