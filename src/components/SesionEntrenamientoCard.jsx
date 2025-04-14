export default function SesionEntrenamientoCard({ sesion }) {
    const totalSeries = sesion.sets.reduce((suma, set) => {
        return suma + set.ejercicios.reduce((acc, ej) => acc + ej.series.length, 0);
    }, 0);

    const totalEjercicios = sesion.sets.reduce((suma, set) => suma + set.ejercicios.length, 0);

    return (
        <div className="p-3 bg-gray-50 rounded-xl shadow-sm">
            <h4 className="text-base font-semibold text-gray-800">{sesion.nombre}</h4>
            <p className="text-sm text-gray-500 mt-1">{totalEjercicios} ejercicios • {totalSeries} series</p>
        </div>
    );
} 
