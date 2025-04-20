import { useState } from 'react';
import { recetasNutri } from '../data/recetasNutri';

const semanas = ['1 y 3', '2 y 4'];
const comidas = ['Desayuno', 'Comida', 'Cena', "Snack"];
const dias = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

export default function Nutricion() {
    const [semanaSeleccionada, setSemanaSeleccionada] = useState(null);
    const [comidaSeleccionada, setComidaSeleccionada] = useState(null);
    const [diaSeleccionado, setDiaSeleccionado] = useState(null);

    const toggleSemana = (semana) => {
        setSemanaSeleccionada((prev) => (prev === semana ? null : semana));
    };

    const toggleComida = (comida) => {
        setComidaSeleccionada((prev) => (prev === comida ? null : comida));
    };

    const toggleDia = (dia) => {
        setDiaSeleccionado((prev) => (prev === dia ? null : dia));
    };

    const limpiarFiltros = () => {
        setSemanaSeleccionada(null);
        setComidaSeleccionada(null);
        setDiaSeleccionado(null);
    };

    const recetasFiltradas = recetasNutri.filter((r) => {
        const coincideSemana = semanaSeleccionada ? r.semana === semanaSeleccionada : true;
        const coincideComida = comidaSeleccionada ? r.comida === comidaSeleccionada : true;
        const coincideDia = diaSeleccionado ? r.dia.includes(diaSeleccionado) : true;
        return coincideSemana && coincideComida && coincideDia;
    });

    return (
        <div className="max-w-md mx-auto px-3 py-6">
            <h1 className="text-2xl font-bold mb-4 text-pink-600">Recetas 🍽️</h1>

            {/* Filtros activos */}
            {(semanaSeleccionada || comidaSeleccionada || diaSeleccionado) && (
                <div className="mb-4 flex flex-wrap items-center gap-2 text-xs">
                    {semanaSeleccionada && (
                        <span className="bg-pink-100 text-pink-700 px-2 py-1 rounded-full">
                            Semana {semanaSeleccionada} <button onClick={() => setSemanaSeleccionada(null)}>✖</button>
                        </span>
                    )}
                    {comidaSeleccionada && (
                        <span className="bg-pink-100 text-pink-700 px-2 py-1 rounded-full">
                            {comidaSeleccionada} <button onClick={() => setComidaSeleccionada(null)}>✖</button>
                        </span>
                    )}
                    {diaSeleccionado && (
                        <span className="bg-pink-100 text-pink-700 px-2 py-1 rounded-full">
                            {diaSeleccionado} <button onClick={() => setDiaSeleccionado(null)}>✖</button>
                        </span>
                    )}
                    <button
                        onClick={limpiarFiltros}
                        className="text-pink-600 underline ml-auto"
                    >
                        Limpiar filtros
                    </button>
                </div>
            )}

            {/* Botones de filtros separados por fila */}
            <div className="flex gap-2 overflow-x-auto pb-1 mb-2">
                {semanas.map((semana) => (
                    <button
                        key={semana}
                        onClick={() => toggleSemana(semana)}
                        className={`px-3 py-1 rounded-full border text-sm whitespace-nowrap ${semanaSeleccionada === semana ? 'bg-pink-600 text-white' : 'border-gray-300 text-gray-700'}`}
                    >
                        Semana {semana}
                    </button>
                ))}
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1 mb-2">
                {comidas.map((comida) => (
                    <button
                        key={comida}
                        onClick={() => toggleComida(comida)}
                        className={`px-3 py-1 rounded-full border text-sm whitespace-nowrap ${comidaSeleccionada === comida ? 'bg-pink-600 text-white' : 'border-gray-300 text-gray-700'}`}
                    >
                        {comida}
                    </button>
                ))}
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1 mb-4">
                {dias.map((dia) => (
                    <button
                        key={dia}
                        onClick={() => toggleDia(dia)}
                        className={`px-3 py-1 rounded-full border text-sm whitespace-nowrap ${diaSeleccionado === dia ? 'bg-pink-600 text-white' : 'border-gray-300 text-gray-700'}`}
                    >
                        {dia}
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
                            <span className="ml-2">Semanas: {receta.semana}</span>
                            <span className="mr-2">{receta.comida}</span>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mb-2">
                            <span className="ml-2">{receta.dia.join(', ')}</span>
                            <span className="mr-2">{receta.calorias} kcal</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
