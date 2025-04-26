// src/components/SesionEjecutar.jsx

import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import dayjs from 'dayjs';

export default function SesionEjecutar({ sesion, planId, semanaSeleccionada, onFinish }) {
    const [progreso, setProgreso] = useState(0);
    const [data, setData] = useState({});
    const [completadas, setCompletadas] = useState(0);
    const [mensaje, setMensaje] = useState('');
    const [temporizador, setTemporizador] = useState(null);
    const [parpadeo, setParpadeo] = useState(false);
    const [historialActivo, setHistorialActivo] = useState(null);


    const { state } = useLocation();
    const navigate = useNavigate();

    if (!sesion || !planId) {
        return <div className="p-4 text-red-600">❌ Datos de sesión no disponibles.</div>;
    }

    const getYoutubeThumbnail = (url) => {
        if (!url) return null;
        const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
        return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : null;
    };

    const rondasPorSet = sesion.sets.map(set =>
        Math.max(
            ...(set.ejercicios?.map(ej => {
                const serieSemana = ej.series?.find(s => Number(s.semana) === Number(semanaSeleccionada));
                return parseInt(serieSemana?.n_series) || 1;
            }) || [1])
        )
    );

    const totalSeries = rondasPorSet.reduce((acc, rondas, idx) =>
        acc + rondas * (sesion.sets[idx].ejercicios?.length || 0), 0
    );

    useEffect(() => {
        if (historialActivo) {
            document.body.style.overflow = 'hidden'; // bloquea el scroll
        } else {
            document.body.style.overflow = ''; // lo libera
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [historialActivo]);

    useEffect(() => {
        const historial = JSON.parse(localStorage.getItem('historico_global') || '[]');
        const entradaAnterior = historial
            .slice()
            .reverse()
            .find(h => h.sesionNombre.trim().toLowerCase() === sesion.nombre.trim().toLowerCase());

        const inicial = {};

        sesion.sets.forEach((set, idxSet) => {
            const rondas = rondasPorSet[idxSet];
            inicial[idxSet] = [];

            for (let r = 0; r < rondas; r++) {
                inicial[idxSet][r] = set.ejercicios.map((ej, idxEj) => {
                    let reps = '';
                    let peso = '';

                    if (entradaAnterior) {
                        const ejercicioAnterior = entradaAnterior.ejercicios.find(e => e.nombre === ej.nombre);
                        const serieAnterior = ejercicioAnterior?.series?.find(s => s.ronda === r + 1);

                        reps = serieAnterior?.reps || '';
                        peso = serieAnterior?.peso || '';
                    }

                    return {
                        reps,
                        peso,
                        nota: '',
                        done: false
                    };
                });
            }
        });

        setData(inicial);
    }, [sesion]);



    const handleCheck = (idxSet, idxRonda, idxEj, descanso) => {
        const actualizado = { ...data };
        const registro = actualizado[idxSet][idxRonda][idxEj];
        registro.done = !registro.done;
        setData(actualizado);

        const todas = Object.values(actualizado).flat().flat().filter(e => e.done).length;
        setCompletadas(todas);
        setProgreso(Math.round((todas / totalSeries) * 100));

        if (registro.done && descanso) {
            const segundos = parseInt(descanso);
            if (!isNaN(segundos)) {
                setTemporizador(segundos);
            }
        }
    };

    const handleCompletar = () => {
        const hoy = dayjs().format('YYYY-MM-DD');
        const entrada = {
            fecha: hoy,
            planId: planId,
            sesionNombre: sesion.nombre,
            ejercicios: []
        };

        sesion.sets.forEach((set, idxSet) => {
            set.ejercicios.forEach((ejercicio, idxEj) => {
            const series = data[idxSet]
                .map((ronda, idxRonda) => {
                    const registro = ronda[idxEj];
                    return registro.done ? {
                        ronda: idxRonda + 1,    // 👈 Guardamos la ronda
                        reps: registro.reps || '',
                        peso: registro.peso || '',
                        nota: registro.nota || ''
                    } : null;
                })
                .filter(Boolean);



                if (series.length > 0) {
                    entrada.ejercicios.push({
                        nombre: ejercicio.nombre,
                        series
                    });
                }
            });
        });

        const historico = JSON.parse(localStorage.getItem('historico_global') || '[]');
        historico.push(entrada);
        localStorage.setItem('historico_global', JSON.stringify(historico));

        setMensaje('✅ Sesión guardada correctamente');
        setTimeout(() => {
            setMensaje('');
            onFinish(); // 👈 no navigate, solo volvemos limpio
        }, 1500);
    };

    return (
        <div className="p-4 space-y-6 relative">
            <button
                onClick={onFinish}
                className="mb-4 text-sm text-blue-500 hover:underline"
            >
                ← Volver a la sesión
            </button>

            {mensaje && <div className="text-sm text-green-600 font-medium">{mensaje}</div>}

            {temporizador !== null && (
                <div className={`fixed bottom-6 right-6 px-5 py-3 text-white text-2xl font-bold rounded-full z-50 transition duration-300 ${parpadeo ? 'bg-green-600 animate-pulse' : 'bg-black'}`}>
                    {temporizador > 0 ? temporizador : '¡0!'}
                </div>
            )}

            <div className="text-sm text-gray-600">{progreso}% Series completadas</div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-green-500" style={{ width: `${progreso}%` }}></div>
            </div>

            {sesion.sets.map((set, idxSet) => (
                <div key={idxSet} className="bg-white rounded-xl shadow-md p-4 space-y-4">

                    {/* 1. Nombre del set */}
                    <div>
                        <h3 className="text-md font-bold text-gray-800 mb-1">{set.titulo || `Set ${idxSet + 1}`}</h3>
                        <p className="text-xs text-gray-500">{rondasPorSet[idxSet]} rondas</p>
                    </div>

                    {/* 2. Listado de ejercicios al principio */}
                    <div className="space-y-3">
                        {set.ejercicios.map((ej, idxEj) => {
                            const serieSemana = ej.series?.find(s => Number(s.semana) === Number(semanaSeleccionada));
                            return (
                                <div key={idxEj} className="flex items-center gap-3">
                                    {ej.url && (
                                        <img
                                            src={getYoutubeThumbnail(ej.url)}
                                            alt={ej.nombre}
                                            className="w-16 h-16 rounded-lg object-cover"
                                        />
                                    )}
                                    <div className="flex-1">
                                        <div className="font-semibold text-sm">{ej.nombre}</div>
                                        <div className="text-xs text-gray-600">
                                            {serieSemana?.n_series ? `${serieSemana.n_series} series · ` : ''}
                                            {serieSemana?.reps ? `${serieSemana.reps} reps · ` : ''}
                                            {serieSemana?.duracion ? `Duración: ${serieSemana.duracion} · ` : ''}
                                            {ej.descanso ? `${ej.descanso}s descanso` : ''}
                                        </div>
                                        {/* Botón para abrir el historial */}
                                        <button
                                            className="text-blue-500 text-xs underline mt-1"
                                            onClick={() => setHistorialActivo(ej.nombre)}
                                        >
                                            Ver histórico
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* 3. Inputs por ronda */}
                    {Array.from({ length: rondasPorSet[idxSet] }).map((_, idxRonda) => {
                        const totalEjercicios = set.ejercicios.length;
                        const hechos = data[idxSet]?.[idxRonda]?.filter(e => e.done).length || 0;

                        return (
                            <div key={idxRonda} className={`rounded-lg p-3 space-y-2 transition ${hechos === totalEjercicios ? 'bg-green-50 border border-green-200' : 'bg-gray-50'}`}>
                                <div className="flex items-center justify-between">
                                    <h4 className="text-sm font-semibold text-gray-700">
                                        Ronda {idxRonda + 1} {hechos === totalEjercicios && <span className="text-green-500 ml-2">✅</span>}
                                    </h4>
                                    <span className="text-xs text-green-600 font-medium">{hechos} / {totalEjercicios}</span>
                                </div>

                                <hr className="border-t border-gray-200" />

                                {/* Inputs */}
                                {set.ejercicios.map((ej, idxEj) => {
                                    const entrada = data[idxSet]?.[idxRonda]?.[idxEj] || {};
                                    return (
                                        <div key={idxEj} className="grid grid-cols-6 items-center gap-2 text-sm">
                                            <span className="col-span-1">{String.fromCharCode(65 + idxEj)}</span>
                                            <input
                                                className="border p-1 rounded col-span-1"
                                                value={entrada.reps}
                                                placeholder="-"
                                                onChange={(e) => {
                                                    const nuevo = { ...data };
                                                    nuevo[idxSet][idxRonda][idxEj].reps = e.target.value;
                                                    setData(nuevo);
                                                }}
                                            />
                                            <span className="col-span-1">reps</span>
                                            <input
                                                className="border p-1 rounded col-span-1"
                                                value={entrada.peso}
                                                placeholder="-"
                                                onChange={(e) => {
                                                    const nuevo = { ...data };
                                                    nuevo[idxSet][idxRonda][idxEj].peso = e.target.value;
                                                    setData(nuevo);
                                                }}
                                            />
                                            <span className="col-span-1">kg</span>
                                            <input
                                                type="checkbox"
                                                className="col-span-1"
                                                checked={entrada.done || false}
                                                onChange={() => handleCheck(idxSet, idxRonda, idxEj, ej.descanso)}
                                            />
                                        </div>

                                    );
                                })}
                            </div>

                        );
                    })}

                    {/* 4. Descanso entre sets */}
                    {set.descanso && (
                        <div className="text-xs text-gray-500 text-center mt-2">
                            ⏱️ Descanso entre sets: {set.descanso} segundos
                        </div>
                    )}
                </div>

            ))}
            {historialActivo && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm px-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative space-y-4 animate-fade-in">
                        {/* Botón de cerrar */}
                        <button
                            onClick={() => setHistorialActivo(null)}
                            className="absolute top-3 right-4 text-gray-400 hover:text-gray-700 text-xl"
                        >
                            &times;
                        </button>

                        <h2 className="text-lg font-semibold text-gray-900">Histórico de {historialActivo}</h2>

                        {/* Listado de entradas del historial */}
                        <div className="space-y-2 max-h-80 overflow-y-auto">
                            {JSON.parse(localStorage.getItem('historico_global') || '[]')
                                .filter(h => h.ejercicios.some(e => e.nombre === historialActivo))
                                .sort((a, b) => new Date(b.fecha) - new Date(a.fecha)) // más reciente primero
                                .map((h, idx) => {
                                    const ejercicio = h.ejercicios.find(e => e.nombre === historialActivo);
                                    return (
                                        <div key={idx} className="border-b border-gray-200 pb-2">
                                            <div className="text-sm font-medium">{h.fecha}</div>
                                            {ejercicio.series.map((serie, idxSerie) => (
                                                <div key={idxSerie} className="text-xs text-gray-600 ml-2">
                                                    Ronda {serie.ronda}: {serie.reps} reps · {serie.peso} kg
                                                </div>
                                            ))}
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                </div>
            )}


            <button
                onClick={handleCompletar}
                className="w-full bg-gray-900 text-white py-3 rounded-xl text-sm font-medium shadow-md"
            >
                Completar sesión
            </button>
        </div>

    );
}
