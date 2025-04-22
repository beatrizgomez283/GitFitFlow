import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

export default function SesionEjecutar({ sesion, onFinish }) {
    const [progreso, setProgreso] = useState(0);
    const [data, setData] = useState({});
    const [completadas, setCompletadas] = useState(0);
    const [mensaje, setMensaje] = useState('');

    const rondasPorSet = sesion.sets.map(set =>
        Math.max(...(set.ejercicios?.map(ej => ej.series?.length || 1) || [1]))
    );

    const totalSeries = rondasPorSet.reduce((acc, rondas, idx) =>
        acc + rondas * (sesion.sets[idx].ejercicios?.length || 0), 0
    );

    const getYoutubeThumbnail = (url) => {
        if (!url) return null;
        const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
        return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : null;
    };

    useEffect(() => {
        const inicial = {};
        sesion.sets.forEach((set, idxSet) => {
            const rondas = rondasPorSet[idxSet];
            inicial[idxSet] = [];
            for (let r = 0; r < rondas; r++) {
                inicial[idxSet][r] = set.ejercicios.map((ej, idxEj) => {
                    const ultima = ej.historico?.[ej.historico.length - 1] || {};
                    return {
                        reps: ultima.reps || '',
                        peso: ultima.peso || '',
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
                const timer = setTimeout(() => alert(`¡Fin del descanso (${descanso}s)!`), segundos * 1000);
                return () => clearTimeout(timer);
            }
        }
    };

    const handleCompletar = () => {
        const hoy = dayjs().format('YYYY-MM-DD');
        sesion.sets.forEach((set, idxSet) => {
            set.ejercicios.forEach((ejercicio, idxEj) => {
                const historico = ejercicio.historico || [];
                const nuevos = data[idxSet].flatMap((ronda) => ronda[idxEj]);
                nuevos.forEach(e => {
                    if (e.done) historico.push({ fecha: hoy, reps: e.reps, peso: e.peso, nota: '' });
                });
                ejercicio.historico = historico;
            });
        });
        setMensaje('✅ Sesión guardada correctamente');
        setTimeout(() => {
            setMensaje('');
            onFinish();
        }, 1500);
    };

    return (
        <div className="p-4 space-y-6">
            {mensaje && <div className="text-sm text-green-600 font-medium">{mensaje}</div>}

            <div className="text-sm text-gray-600">{progreso}% Series completadas</div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-green-500" style={{ width: `${progreso}%` }}></div>
            </div>

            {sesion.sets.map((set, idxSet) => (
                <div key={idxSet} className="bg-white rounded-xl shadow-sm p-4 space-y-4">
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
                                    <img
                                        src={getYoutubeThumbnail(ej.url)}
                                        alt={ej.nombre}
                                        className="w-16 h-16 rounded-lg object-cover"
                                    />
                                )}
                            </div>
                        ))}
                    </div>

                    {Array.from({ length: rondasPorSet[idxSet] }).map((_, idxRonda) => (
                        <div key={idxRonda} className="bg-gray-50 rounded-lg p-3 space-y-2">
                            <h4 className="text-sm font-semibold text-gray-700">Ronda {idxRonda + 1}</h4>
                            {set.ejercicios.map((ej, idxEj) => {
                                const entrada = data[idxSet]?.[idxRonda]?.[idxEj] || {};
                                return (
                                    <div key={idxEj + '-input'} className="grid grid-cols-6 items-center gap-2 text-sm">
                                        <span className="col-span-1">{String.fromCharCode(65 + idxEj)}</span>
                                        <input
                                            className="p-1 rounded col-span-1"
                                            value={entrada.reps}
                                            onChange={(e) => {
                                                const nuevo = { ...data };
                                                nuevo[idxSet][idxRonda][idxEj].reps = e.target.value;
                                                setData(nuevo);
                                            }}
                                        />
                                        <span className=" rounded col-span-1">reps</span>
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
                                        <span className=" rounded col-span-1">kg</span>
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
                    ))}
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