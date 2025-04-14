import { useState } from 'react';
import { Link } from 'react-router-dom';
import recetas from '../data/recetas';

const tipos = ['Todas', 'Desayuno', 'Comida', 'Cena', 'Snack'];

export default function Recetas() {
    const [filtro, setFiltro] = useState('Todas');

    const recetasFiltradas = filtro === 'Todas'
        ? recetas
        : recetas.filter(r => r.tipo === filtro);

    return (
        <div className="max-w-md mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold mb-4 text-pink-600">Recetas 🍽️</h1>

            <div className="flex gap-2 overflow-x-auto pb-3 mb-4">
                {tipos.map((tipo) => (
                    <button
                        key={tipo}
                        onClick={() => setFiltro(tipo)}
                        className={`px-3 py-1 rounded-full border text-sm whitespace-nowrap ${filtro === tipo ? 'bg-pink-600 text-white' : 'border-gray-300 text-gray-700'
                            }`}
                    >
                        {tipo}
                    </button>
                ))}
            </div>

            <div className="grid gap-4">
                {recetasFiltradas.map((receta) => (
                    <Link
                        key={receta.id}
                        to={`/recetas/${receta.id}`}
                        className="block rounded-xl overflow-hidden shadow-md border bg-white hover:shadow-lg transition"
                    >
                        <img src={receta.imagen} alt={receta.nombre} className="w-full h-40 object-cover" />
                        <div className="p-3">
                            <h3 className="font-semibold text-lg text-pink-700">{receta.nombre}</h3>
                            <p className="text-sm text-gray-500">{receta.tipo}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
