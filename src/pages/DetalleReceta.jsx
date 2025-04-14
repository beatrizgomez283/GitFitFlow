import { useParams, Link } from 'react-router-dom';
import recetas from '../data/recetas';

export default function DetalleReceta() {
    const { id } = useParams();
    const receta = recetas.find(r => r.id === id);

    if (!receta) return <div className="p-4">Receta no encontrada</div>;

    return (
        <div className="max-w-md mx-auto p-4">
            <Link to="/recetas" className="text-sm text-pink-600">← Volver</Link>
            <img src={receta.imagen} alt={receta.nombre} className="rounded-xl w-full h-48 object-cover my-4" />
            <h1 className="text-2xl font-bold text-pink-700 mb-1">{receta.nombre}</h1>
            <p className="text-gray-500 text-sm mb-2">
                Prep: {receta.tiempoPrep} min | Cocción: {receta.tiempoCoccion} min
            </p>

            <div className="flex justify-between text-sm bg-gray-100 rounded-lg p-3 mb-4">
                <span>🔥 {receta.calorias} kcal</span>
                <span>🍗 {receta.proteina}g</span>
                <span>🍞 {receta.carbohidratos}g</span>
                <span>🥑 {receta.grasa}g</span>
            </div>

            {receta.nota && (
                <p className="text-sm italic text-gray-600 mb-3">{receta.nota}</p>
            )}

            <h2 className="font-semibold text-lg mb-2">Ingredientes</h2>
            <ul className="list-disc list-inside text-sm mb-4">
                {receta.ingredientes.map((item, i) => <li key={i}>{item}</li>)}
            </ul>

            <h2 className="font-semibold text-lg mb-2">Pasos</h2>
            <ol className="list-decimal list-inside text-sm space-y-1">
                {receta.pasos.map((p, i) => <li key={i}>{p}</li>)}
            </ol>
        </div>
    );
}