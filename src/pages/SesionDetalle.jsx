export default function SesionDetalle({ sesion }) {
    if (!sesion || !Array.isArray(sesion.sets)) {
        return <div className="p-4">Sesión no válida.</div>;
    }

    const renderEjercicio = (ejercicio, key) => {
        // 🛡️ Si tiene sets anidados, los renderizamos recursivamente
        if (Array.isArray(ejercicio.sets)) {
            return (
                <div key={key} className="p-3 bg-gray-100 rounded-md space-y-2">
                    <div className="font-semibold text-sm text-gray-800">{ejercicio.nombre}</div>
                    {ejercicio.descripcion && (
                        <p className="text-xs text-gray-500">{ejercicio.descripcion}</p>
                    )}
                    {ejercicio.sets.map((subSet, i) => {
                        const ejerciciosAnidados = Array.isArray(subSet.ejercicios)
                            ? subSet.ejercicios
                            : [];
                        return (
                            <div
                                key={`${key}-set-${i}`}
                                className="border-l-4 border-gray-300 pl-2 mt-2"
                            >
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

        // 🛡️ Si es un ejercicio con series
        const series = Array.isArray(ejercicio.series) ? ejercicio.series : [];

        return (
            <div key={key} className="border p-3 rounded-lg bg-gray-50">
                <div className="font-medium">{ejercicio.nombre}</div>
                <div className="text-sm text-gray-600">{series.length} series</div>
            </div>
        );
    };

    return (
        <div className="p-4 space-y-6">
            <h2 className="text-xl font-semibold">{sesion.nombre}</h2>
            {sesion.descripcion && (
                <p className="text-sm text-gray-600">{sesion.descripcion}</p>
            )}

            {sesion.sets.map((set, idxSet) => {
                const ejercicios = Array.isArray(set.ejercicios) ? set.ejercicios : [];
                return (
                    <div key={idxSet} className="space-y-2">
                        <h4 className="text-md font-semibold text-gray-800">
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
