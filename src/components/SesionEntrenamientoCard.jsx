export default function SesionEntrenamientoCard({ sesion }) {
    if (!sesion) return null;

    const sets = Array.isArray(sesion.sets) ? sesion.sets : [];

    const totalEjercicios = sets.reduce((sum, set) => {
        const ejercicios = Array.isArray(set.ejercicios) ? set.ejercicios : [];
        return sum + ejercicios.length;
    }, 0);

    const totalSeries = sets.reduce((sum, set) => {
        const ejercicios = Array.isArray(set.ejercicios) ? set.ejercicios : [];
        return sum + ejercicios.reduce((s, e) => s + (Array.isArray(e.series) ? e.series.length : 0), 0);
    }, 0);

    return (
        <div className="border border-gray-200 p-4 rounded-lg bg-white">
            <h4 className="font-semibold text-gray-800 mb-1">{sesion.nombre}</h4>
            {sesion.descripcion && (
                <p className="text-sm text-gray-600 mb-2">{sesion.descripcion}</p>
            )}
            <div className="text-sm text-gray-500">
                {sets.length} sets · {totalEjercicios} ejercicios · {totalSeries} series
            </div>
        </div>
    );
}
