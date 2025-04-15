export default function SesionDetalle({ sesion, onBack }) {
    return (
        <div className="space-y-6">
            <button
                onClick={onBack}
                className="text-sm text-pink-600 hover:underline"
            >
                ⬅ Volver al plan
            </button>

            <h2 className="text-2xl font-bold text-gray-800">{sesion.nombre}</h2>
            <p className="text-gray-600 mb-4">{sesion.descripcion}</p>

            {sesion.sets.map((set, idx) => (
                <div key={idx} className="bg-white p-4 rounded-xl shadow-md space-y-2">
                    {set.titulo && (
                        <h3 className="font-semibold text-pink-600 text-sm uppercase tracking-wide">
                            {set.titulo}
                        </h3>
                    )}

                    {set.ejercicios.map((ejercicio, i) => (
                        <div key={i} className="border-t pt-3">
                            <div className="flex justify-between items-center">
                                <h4 className="font-semibold text-gray-800">{ejercicio.nombre}</h4>
                                <span className="text-xs text-gray-500">
                                    {ejercicio.descanso}s descanso
                                </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{ejercicio.nota}</p>

                            <ul className="text-sm text-gray-700 mb-2">
                                {ejercicio.series.map((serie, idx) => (
                                    <li key={idx}>
                                        Semana {serie.semana}: {serie.reps} reps @ {serie.peso}kg
                                    </li>
                                ))}
                            </ul>

                            {ejercicio.media?.length > 0 && (
                                <div className="flex gap-2 overflow-x-auto pb-1">
                                    {ejercicio.media.map((url, i) => (
                                        <img
                                            key={i}
                                            src={url}
                                            alt={`media ${i}`}
                                            className="h-20 rounded-lg"
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}
