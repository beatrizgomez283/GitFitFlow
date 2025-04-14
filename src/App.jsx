import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Layout';
import Inicio from './pages/Inicio'; // ejemplo de página
import { Home, Dumbbell, Soup, Apple, User } from 'lucide-react';
import Entrenamientos from './pages/Entrenamientos';
import Recetas from './pages/Recetas';
import Nutricion from './pages/Nutricion';
import DetalleReceta from './pages/DetalleReceta'; // 👈 añade esta línea
import Tu from './pages/Tu';

export default function App() {
    return (
        <Router>
            <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800 font-sans">
                <header className="bg-white shadow-md sticky top-0 z-10">
                    <nav className="max-w-md mx-auto flex justify-between items-center px-4 py-3">
                        <Link to="/" className="font-bold text-lg text-pink-600">GitFitFlow</Link>
                        <div className="flex gap-3 text-sm">
                            <Link to="/entrenamientos" className="text-gray-700 hover:text-pink-600">Entrenos</Link>
                            <Link to="/recetas" className="text-gray-700 hover:text-pink-600">Recetas</Link>
                            <Link to="/nutricion" className="text-gray-700 hover:text-pink-600">Nutri</Link>
                        </div>
                    </nav>
                </header>

                <main className="flex-1 max-w-md w-full mx-auto px-4 py-6">
                    <Routes>
                        <Route path="/" element={<Inicio />} />
                        <Route path="/entrenamientos" element={<Entrenamientos />} />
                        <Route path="/recetas" element={<Recetas />} />
                        <Route path="/recetas/:id" element={<DetalleReceta />} /> {/* 👈 esta línea */}
                        <Route path="/nutricion" element={<Nutricion />} />
                        <Route path="/perfil" element={<Tu />} />
                    </Routes>
                </main>

                <footer className="bg-white shadow-inner sticky bottom-0 z-10">
                    <div className="max-w-md mx-auto px-4 py-3 flex justify-between text-xs text-gray-600">
                        <Link to="/" className="flex flex-col items-center hover:text-pink-600">
                            <Home size={20} />
                            <span>Inicio</span>
                        </Link>
                        <Link to="/entrenamientos" className="flex flex-col items-center hover:text-pink-600">
                            <Dumbbell size={20} />
                            <span>Entreno</span>
                        </Link>
                        <Link to="/recetas" className="flex flex-col items-center hover:text-pink-600">
                            <Soup size={20} />
                            <span>Recetas</span>
                        </Link>
                        <Link to="/nutricion" className="flex flex-col items-center hover:text-pink-600">
                            <Apple size={20} />
                            <span>Nutri</span>
                        </Link>
                        <Link to="/perfil" className="flex flex-col items-center hover:text-pink-600">
                            <User size={20} />
                            <span>Tú</span>
                        </Link>
                    </div>
                </footer>

            </div>
        </Router>
    );
}
