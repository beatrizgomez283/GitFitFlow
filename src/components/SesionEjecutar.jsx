import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

export default function SesionEjecutar({ sesion, semanaActual, onFinish }) {
    const [progreso, setProgreso] = useState(0);
    const [data, setData] = useState({});
    const [completadas, setCompletadas] = useState(0);
    const [mensaje, setMensaje] = useState('');
    const [temporizador, setTemporizador] = useState(null);
    const [parpadeo, setParpadeo] = useState(false);

    const getYoutubeThumbnail = (url) => {
        if (!url) return null;
        const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
        return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : null;
    };
    const rondasPorSet = sesion.sets.map(set =>
        Math.max(
            ...(set.ejercicios?.map(ej => {
                const serieSemana = ej.series?.find(s => s.semana === semanaActual);
                return parseInt(serieSemana?.n_series) || 1;
            }) || [1])
        )
    );

    const totalSeries = rondasPorSet.reduce((acc, rondas, idx) =>
        acc + rondas * (sesion.sets[idx].ejercicios?.length || 0), 0
    );

    useEffect(() => {
        const historial = JSON.parse(localStorage.getItem('historico_global') || '[]');
        const entradaAnterior = historial
            .slice()
            .reverse()
            .find(e => e.sesionNombre.trim().toLowerCase() === sesion.nombre.trim().toLowerCase());
        console.log('👉 Última sesión encontrada:', entradaAnterior);
        console.log('👉 semana seleccionada:', semanaActual);

        const inicial = {};
        sesion.sets.forEach((set, idxSet) => {
            const rondas = rondasPorSet[idxSet];
            inicial[idxSet] = [];
            for (let r = 0; r < rondas; r++) {
                inicial[idxSet][r] = set.ejercicios.map((ej, idxEj) => {
                    const ult = entradaAnterior?.ejercicios?.find(e => e.nombre === ej.nombre)?.series?.[r] || {};
                    return {
                        reps: ult.reps || '',
                        peso: ult.peso || '',
                        nota: ult.nota || '',
                        done: false
                    };
                });
            }
        });
        setData(inicial);
    }, [sesion]);

    useEffect(() => {
        let timer;
        if (temporizador && temporizador > 0) {
            timer = setTimeout(() => setTemporizador(temporizador - 1), 1000);
        } else if (temporizador === 0) {
            new Audio('/assets/sounds/Beep-mp3.mp3').play();
            setParpadeo(true);
            setTimeout(() => {
                setParpadeo(false);
                setTemporizador(null);
            }, 1500);
        }
        return () => clearTimeout(timer);
    }, [temporizador]);

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
            planId: sesion.planId || 'sin_id',
            sesionNombre: sesion.nombre,
            ejercicios: []
        };

        sesion.sets.forEach((set, idxSet) => {
            set.ejercicios.forEach((ejercicio, idxEj) => {
                const series = data[idxSet]
                    .map((ronda) => {
                        const registro = ronda[idxEj];
                        return registro.done ? {
                            reps: registro.reps || '',
                            peso: registro.peso || '',
                            nota: registro.nota || ''
                        } : null;
                    })
                    .filter(Boolean); // elimina nulls

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
            onFinish();
        }, 1500);
    };


    return (
  

        <div className="p-4 space-y-6 relative">
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
                <div key={idxSet} className="bg-white rounded-xl shadow-md shadow-white p-4 space-y-4">
                    <div>
                        <h3 className="text-md font-bold text-gray-800 mb-1">{set.titulo || `Set ${idxSet + 1}`}</h3>
                        <p className="text-xs text-gray-500">{rondasPorSet[idxSet]} rondas</p>
                    </div>

                    <div className="space-y-2">
                        {set.ejercicios.map((ej, idxEj) => (
                            <div key={idxEj} className="flex items-center justify-between gap-2">
                                <div className="flex-1">
                                    <div className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                                        <span className="bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center text-xs">
                                            {String.fromCharCode(65 + idxEj)}
                                        </span>
                                        {ej.nombre}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        Asignados: {ej.series?.[0]?.reps || '-'} · {ej.descanso || '-'}s descanso
                                    </div>
                                </div>
                                {ej.url && (
                                    <a
                                        href={ej.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="shrink-0"
                                    >
                                        <img
                                            src={getYoutubeThumbnail(ej.url)}
                                            alt={ej.nombre}
                                            className="w-14 h-14 rounded-lg object-cover transition hover:brightness-90"
                                        />
                                    </a>
                                )}

                            </div>
                        ))}
                    </div>

                    <hr className="my-2 border-t border-gray-200" />

                    {Array.from({ length: rondasPorSet[idxSet] }).map((_, idxRonda) => {
                        const totalEj = set.ejercicios.length;
                        const hechos = data[idxSet]?.[idxRonda]?.filter(e => e.done).length || 0;

                        return (
                            <div key={idxRonda} className={`rounded-lg p-3 space-y-2 transition ${hechos === totalEj ? 'bg-green-50 border border-green-200' : 'bg-gray-50'}`}>
                                <div className="flex items-center justify-between">
                                    <h4 className="text-sm font-semibold text-gray-700">
                                        Ronda {idxRonda + 1} {hechos === totalEj && <span className="text-green-500 ml-2">✅</span>}
                                    </h4>
                                    <span className="text-xs text-green-600 font-medium">{hechos} / {totalEj}</span>
                                </div>
                                <hr className="border-t border-gray-200" />
                                {set.ejercicios.map((ej, idxEj) => {
                                    const entrada = data[idxSet]?.[idxRonda]?.[idxEj] || {};
                                    return (
                                        <div key={idxEj + '-input'} className="grid grid-cols-6 items-center gap-2 text-sm">
                                            <span className="col-span-1">{String.fromCharCode(65 + idxEj)}</span>
                                            <input
                                                className="border p-1 rounded col-span-1"
                                                value={entrada.reps}
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
                </div>
            ))}

            <button
                onClick={handleCompletar}
                className="w-full bg-gray-900 text-white py-3 rounded-xl text-sm font-medium shadow-md"
            >
                Completar sesión
            </button>
        </div>
    );
}
