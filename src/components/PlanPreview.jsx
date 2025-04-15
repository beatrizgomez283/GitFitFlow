export default function PlanPreview({ plan, onSelect }) {
    const totalSeries = Array.isArray(plan.sesiones)
        ? plan.sesiones.reduce(
            (sum, sesion) =>
                sum + (Array.isArray(sesion.ejercicios)
                    ? sesion.ejercicios.reduce((s, e) => s + (e.series?.length || 0), 0)
                    : 0),
            0
        )
        : 0;

    return (
        <div
            className="bg-white rounded-2xl shadow-md p-4 mb-4 cursor-pointer"
            onClick={() => onSelect(plan)}
        >
            <img
                src={plan.imagen}
                alt={plan.nombre}
                className="w-full h-40 object-cover rounded-xl mb-3"
            />
            <div className="font-bold text-lg text-gray-900 mb-1">{plan.nombre}</div>
            <p className="text-sm text-gray-600 line-clamp-2 mb-2">{plan.descripcion}</p>
            <div className="text-sm text-gray-500">
                {plan.sesiones.length} sesiones • {totalSeries} series
            </div>
        </div>
    );
}
