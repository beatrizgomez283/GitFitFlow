// src/components/SesionDetalle.jsx

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SesionDetalle({ sesion, planId, onBack, onStart }) {
    const [semanaSeleccionada, setSemanaSeleccionada] = useState(1);
    const [ejercicioActivo, setEjercicioActivo] = useState(null);
    const [notaPersonal, setNotaPersonal] = useState('');

    const navigate = useNavigate();

    if (!sesion || !Array.isArray(sesion.sets)) {
        return <div className="p-4">❌ Sesión no válida.</div>;
    }

    const handleSeleccionarSesion = (sesion) => {
        setSesionSeleccionada(sesion);
        setModoVista('sesion');
    };

    const iniciarSesion = () => {
        onStart(semanaSeleccionada); // 👈 simplemente llamas la función que te pasó Entrenamientos.jsx
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
        const serieSemana = ejercicio.series?.find(s => Number(s.semana) === Number(semanaSeleccionada)) || {};

        const detalles = [
            serieSemana.n_series && `${serieSemana.n_series} series`,
            serieSemana.reps && `Reps: ${serieSemana.reps}`,
            serieSemana.duracion && `Duración: ${serieSemana.duracion}`,
            serieSemana.distancia && `Distancia: ${serieSemana.distancia}`,
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
                        <div className="text-xs text-gray-600">{detalles}</div>
                        {notaGuardada && (
                            <div className="text-xs text-pink-600 italic mt-1 line-clamp-1">
                                “{notaGuardada}”
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="p-4 space-y-6">
            {/* Botón volver */}
            <button onClick={onBack} className="text-sm text-blue-600 underline hover:text-blue-800">
                ← Volver al plan
            </button>

            {/* Selector de semana */}
            <div className="space-y-2 mb-4">
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

            {/* Nombre de la sesión */}
            <h2 className="text-xl font-semibold">{sesion.nombre}</h2>
            {sesion.descripcion && (
                <p className="text-sm text-gray-600">{sesion.descripcion}</p>
            )}

            {/* Sets de la sesión */}
            {sesion.sets.map((set, idxSet) => (
                <div key={idxSet} className="space-y-3">
                    <h4 className="text-md font-semibold text-gray-800">
                        {set.titulo || `Set ${idxSet + 1}`}
                        {set.ejercicios[0]?.series?.[semanaSeleccionada - 1]?.n_series && (
                            <div className="text-xs text-gray-500">
                                {set.ejercicios[0].series[semanaSeleccionada - 1].n_series} rondas
                            </div>
                        )}
                    </h4>

                    {Array.isArray(set.ejercicios) && set.ejercicios.length > 0 ? (
                        set.ejercicios.map((ejercicio, idxEj) =>
                            renderEjercicio(ejercicio, `${idxSet}-${idxEj}`)
                        )
                    ) : (
                        <div className="text-sm text-gray-400">No hay ejercicios.</div>
                    )}

                    {/* ⏱️ Mostrar descanso al final del set */}
                    {set.titulo  && (
                        <div className="text-xs text-gray-500 mt-1">
                            ⏱️ {set.descanso}s de descanso después de: {set.titulo || `Set ${idxSet + 1}`}
                        </div>
                    )}
                </div>
            ))}

            {/* Botón iniciar sesión */}
            <div className="mt-6">
                <button
                    onClick={iniciarSesion}
                    className="w-full bg-gray-900 text-white py-3 rounded-xl text-sm font-medium shadow-md"
                >
                    Iniciar sesión
                </button>
            </div>

            {/* Modal de nota personal */}
            {ejercicioActivo && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm px-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative space-y-4 animate-fade-in">
                        {/* Botón cerrar */}
                        <button
                            onClick={() => {
                                localStorage.setItem(`nota_${ejercicioActivo.nombre}`, notaPersonal);
                                setEjercicioActivo(null);
                            }}
                            className="absolute top-3 right-4 text-gray-400 hover:text-gray-700 text-xl"
                        >
                            &times;
                        </button>

                        <h2 className="text-lg font-semibold text-gray-900">{ejercicioActivo.nombre}</h2>

                        {/* Video embed */}
                        {getYoutubeEmbed(ejercicioActivo.url) && (
                            <div className="aspect-video w-full overflow-hidden rounded-lg border border-gray-200">
                                <iframe
                                    src={getYoutubeEmbed(ejercicioActivo.url)}
                                    title="Video del ejercicio"
                                    className="w-full h-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                        )}

                        {/* Nota */}
                        <div>
                            <label htmlFor="nota" className="block text-sm font-medium text-gray-700 mb-1">
                                Nota personal
                            </label>
                            <textarea
                                id="nota"
                                className="w-full p-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none resize-none"
                                rows={4}
                                placeholder="Escribe aquí tu nota sobre este ejercicio..."
                                value={notaPersonal}
                                onChange={(e) => {
                                    setNotaPersonal(e.target.value);
                                    localStorage.setItem(`nota_${ejercicioActivo.nombre}`, e.target.value);
                                }}
                            />
                        </div>

                        <button
                            onClick={() => {
                                localStorage.setItem(`nota_${ejercicioActivo.nombre}`, notaPersonal);
                                setEjercicioActivo(null);
                            }}
                            className="w-full bg-pink-600 hover:bg-pink-700 text-white font-medium py-2 rounded-lg transition"
                        >
                            Guardar y cerrar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
