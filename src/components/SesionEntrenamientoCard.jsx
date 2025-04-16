export default function SesionEntrenamientoCard({ sesion, onClick }) {
    // Contar total de sets y ejercicios (a nivel más superficial)
    const totalSets = sesion.sets?.length || 0;
    const totalEjercicios = sesion.sets?.reduce((acc, set) => {
        return acc + (set.ejercicios?.length || 0);
    }, 0);

    // Detectar tipo por nombre/descripción
    const tipo = sesion.nombre?.toLowerCase().includes('tren inferior')
        ? 'Tren inferior'
        : sesion.nombre?.toLowerCase().includes('tren superior')
            ? 'Tren superior'
            : sesion.nombre?.toLowerCase().includes('core')
                ? 'Core'
                : sesion.nombre?.toLowerCase().includes('run') || sesion.descripcion?.toLowerCase().includes('carrera')
                    ? 'Cardio'
                    : 'General';

    return (
        <div
            onClick={onClick}
            className="p-4 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition cursor-pointer space-y-1"
        >
            <div className="flex justify-between items-center">
                <h4 className="text-sm font-semibold text-gray-800">{sesion.nombre}</h4>
                <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                    {tipo}
                </span>
            </div>

            {sesion.descripcion && (
                <p className="text-xs text-gray-500">{sesion.descripcion}</p>
            )}

            <div className="text-xs text-gray-600 mt-1 flex gap-4">
                <span>🧱 {totalSets} sets</span>
                <span>🏋️‍♀️ {totalEjercicios} ejercicios</span>
            </div>
        </div>
    );
}
