import { useState } from 'react';
import { recetasNutri } from '../data/recetasNutri';

const semanas = ['1 y 3', '2 y 4'];
const comidas = ['Desayuno', 'Comida', 'Cena'];
const dias = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

export default function Nutricion() {
    const [semanaSeleccionada, setSemanaSeleccionada] = useState(null);
    const [comidaSeleccionada, setComidaSeleccionada] = useState(null);
    const [diaSeleccionado, setDiaSeleccionado] = useState(null);
    const [recetaSeleccionada, setRecetaSeleccionada] = useState(null);

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
            {recetaSeleccionada ? (
                <div className="max-w-md mx-auto p-4">
                    <button onClick={() => setRecetaSeleccionada(null)} className="text-sm text-pink-600 mb-2">
                        ← Volver
                    </button>
                    <img src={recetaSeleccionada.imagen} alt={recetaSeleccionada.nombre} className="rounded-xl w-full h-48 object-cover my-4" />
                    <h1 className="text-2xl font-bold text-pink-700 mb-1">{recetaSeleccionada.nombre}</h1>
                    <p className="text-gray-500 text-sm mb-2">
                        Prep: {recetaSeleccionada.tiempoPrep} min | Cocción: {recetaSeleccionada.tiempoCoccion} min
                    </p>

                    <div className="flex justify-between text-sm bg-gray-100 rounded-lg p-3 mb-4">
                        <span>🔥 {recetaSeleccionada.calorias} kcal</span>
                        <span>🍗 {recetaSeleccionada.proteina}g</span>
                        <span>🍞 {recetaSeleccionada.carbohidratos}g</span>
                        <span>🥑 {recetaSeleccionada.grasa}g</span>
                    </div>

                    {recetaSeleccionada.nota && (
                        <p className="text-sm italic text-gray-600 mb-3">{recetaSeleccionada.nota}</p>
                    )}

                    <h2 className="font-semibold text-lg mb-2">Ingredientes</h2>
                    <ul className="list-disc list-inside text-sm mb-4">
                        {recetaSeleccionada.ingredientes.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>

                    <h2 className="font-semibold text-lg mb-2">Pasos</h2>
                    <ol className="list-decimal list-inside text-sm space-y-1">
                        {recetaSeleccionada.pasos.map((p, i) => <li key={i}>{p}</li>)}
                    </ol>
                </div>
            ) : (
                <>
                    <h1 className="text-2xl font-bold mb-4 text-pink-600">Recetas 🍽️</h1>

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
                                onClick={() => setRecetaSeleccionada(receta)}
                                className="cursor-pointer block rounded-xl overflow-hidden shadow-md border bg-white hover:shadow-lg transition"
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
                </>
            )}
        </div>
    );
}
