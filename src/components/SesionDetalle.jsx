export default function SesionDetalle({ sesion, onBack }) {
    console.log("Sesión recibida:", sesion);

    if (!sesion || !Array.isArray(sesion.sets)) {
        return <div className="p-4">Sesión no válida.</div>;
    }

    const renderEjercicio = (ejercicio, key) => {
        if (Array.isArray(ejercicio.sets)) {
            return (
                <div key={key} className="p-3 bg-gray-100 rounded-md space-y-2">
                    <div className="font-medium text-sm ">
                        {ejercicio.url ? (
                            <a
                                href={ejercicio.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline flex items-center gap-1"
                            >
                                <span>{ejercicio.nombre}</span>
                                <span role="img" aria-label="video">🎥</span>
                            </a>
                        ) : (
                            ejercicio.nombre 
                        )}

                    </div>
                    {ejercicio.descripcion && (
                        <p className="text-xs text-gray-500">{ejercicio.descripcion}</p>
                    )}
                    {ejercicio.sets.map((subSet, i) => {
                        const ejerciciosAnidados = Array.isArray(subSet.ejercicios)
                            ? subSet.ejercicios
                            : [];
                        return (
                            <div key={`${key}-set-${i}`} className="border-l-4 border-gray-300 pl-2 mt-2">
                                <div className="text-sm font-medium text-gray-700 mb-1">
                                    {subSet.titulo || `Set ${i + 1}`}
                                </div>
                                {ejerciciosAnidados.map((e, j) =>
                                    renderEjercicio(e, `${key}-nested-${i}-${j}`)
                                )}
                            </div>
                        );
                    })}
                </div>
            );
        }

        const series = Array.isArray(ejercicio.series) ? ejercicio.series : [];

        return (
            <div key={key} className="border p-3 rounded-lg bg-gray-50 space-y-2">
                <div className="font-medium text-sm">
                    {ejercicio.url ? (
                        <a
                            href={ejercicio.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline flex items-center gap-1"
                        >
                            <span>{ejercicio.nombre}</span>
                            <span role="img" aria-label="video">🎥</span>
                        </a>
                    ) : (
                        ejercicio.nombre
                    )}
                </div>

                <ul className="text-xs text-gray-600 space-y-1">
                    {series.map((s, i) => (
                        <li key={i} className="flex flex-col">
                            {s.reps && <span>Reps: {s.reps}</span>}
                            {s.duracion && <span>Duración: {s.duracion}</span>}
                            {s.distancia && <span>Distancia: {s.distancia}</span>}
                            {s.peso && <span>Peso: {s.peso}</span>}
                            {s.descanso && <span>Descanso: {s.descanso}</span>}
                        </li>
                    ))}
                </ul>

                {ejercicio.notas && (
                    <p className="text-xs italic text-gray-500">📝 {ejercicio.notas}</p>
                )}
                {ejercicio.nota && (
                    <p className="text-xs italic text-gray-500">📝 {ejercicio.nota}</p>
                )}
                {ejercicio.descansoDespues && (
                    <p className="text-xs text-gray-500">⏸️ Descanso después: {ejercicio.descansoDespues}</p>
                )}
                {Array.isArray(ejercicio.imagenes) && ejercicio.imagenes.length > 0 && (
                    <div className="flex gap-2 mt-2">
                        {ejercicio.imagenes.map((img, i) => (
                            <img
                                key={i}
                                src={`/assets/ejercicios/${img}`}
                                alt={`Imagen ${i + 1}`}
                                className="w-20 h-20 object-cover rounded-md"
                            />
                        ))}
                    </div>
                )}
                {Array.isArray(ejercicio.media) && ejercicio.media.length > 0 && (
                    <div className="flex gap-2 mt-2">
                        {ejercicio.media.map((img, i) => (
                            <img
                                key={i}
                                src={img}
                                alt={`Media ${i + 1}`}
                                className="w-20 h-20 object-cover rounded-md"
                            />
                        ))}
                    </div>
                )}
            </div>
        );
    };

    // 👇 ESTE RETURN FALTABA
    return (

        <div className="p-4 space-y-6">
            <button
                onClick={onBack}
                className="text-sm text-blue-600 underline hover:text-blue-800"
            >
                ← Volver al plan
            </button>

            <h2 className="text-xl font-semibold">{sesion.nombre}</h2>
            {sesion.descripcion && (
                <p className="text-sm text-gray-600">{sesion.descripcion}</p>
            )}

            {sesion.sets.map((set, idxSet) => {
                const ejercicios = Array.isArray(set.ejercicios) ? set.ejercicios : [];
                return (
                    <div key={idxSet} className="space-y-2">
                        <h4 className="text-md font-semibold text-gray-800 mt-4">
                            {set.titulo || `Set ${idxSet + 1}`}
                        </h4>
                        {ejercicios.length > 0 ? (
                            ejercicios.map((ejercicio, idxEj) =>
                                renderEjercicio(ejercicio, `${idxSet}-${idxEj}`)
                            )
                        ) : (
                            <div className="text-sm text-gray-400">No hay ejercicios.</div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
