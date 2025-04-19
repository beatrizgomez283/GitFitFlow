import { useState } from 'react';
import { recetasNutri } from '../data/recetasNutri';

const semanas = ['1 y 3', '2 y 4'];
const comidas = ['Desayuno', 'Comida', 'Cena'];

export default function Nutricion() {
    const [semanaSeleccionada, setSemanaSeleccionada] = useState('1 y 3');
    const [comidaSeleccionada, setComidaSeleccionada] = useState('Desayuno');

    const recetasFiltradas = recetasNutri.filter(
        (r) => r.semana === semanaSeleccionada && r.comida === comidaSeleccionada
    );

    return (
        <div className="max-w-md mx-auto px-3 py-6">
            <h1 className="text-2xl font-bold mb-4 text-pink-600">Recetas 🍽️</h1>

            <div className="flex gap-2 overflow-x-auto pb-3 mb-4">
                {semanas.map((semana) => (
                    <button
                        key={semana}
                        onClick={() => setSemanaSeleccionada(semana)}
                        className={`px-3 py-1 rounded-full border text-sm whitespace-nowrap ${semanaSeleccionada === semana ? 'bg-pink-600 text-white' : 'border-gray-300 text-gray-700'}`}
                    >
                        Semana {semana}
                    </button>
                ))}
            </div>

            <div className="flex gap-2 overflow-x-auto pb-3 mb-4">
                {comidas.map((comida) => (
                    <button
                        key={comida}
                        onClick={() => setComidaSeleccionada(comida)}
                        className={`px-3 py-1 rounded-full border text-sm whitespace-nowrap ${comidaSeleccionada === comida ? 'bg-pink-600 text-white' : 'border-gray-300 text-gray-700'}`}
                    >
                        {comida}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-2 gap-3">
                {recetasFiltradas.map((receta) => (
                    <div
                        key={receta.id}
                        className="block rounded-xl overflow-hidden shadow-md border bg-white hover:shadow-lg transition"
                    >
                        <img src={receta.imagen} alt={receta.nombre} className="w-full h-40 object-cover" />
                        <h3 className="font-bold text-sm text-black mb-2 mt-2 px-2">{receta.nombre}</h3>
                        <div className="flex justify-between text-xs text-gray-500 mb-2">
                            <span className="ml-2">{receta.tiempoPrep} min</span>
                            <span className="mr-2">{receta.calorias} kcal</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
