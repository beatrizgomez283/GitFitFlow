import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Entrenamientos from './pages/Entrenamientos';
import Recetas from './pages/Recetas';
import Nutricion from './pages/Nutricion';

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
            <Route path="/" element={<Home />} />
            <Route path="/entrenamientos" element={<Entrenamientos />} />
            <Route path="/recetas" element={<Recetas />} />
            <Route path="/nutricion" element={<Nutricion />} />
          </Routes>
        </main>

        <footer className="bg-white shadow-inner sticky bottom-0 z-10">
          <div className="max-w-md mx-auto px-4 py-3 flex justify-between text-sm text-gray-600">
            <Link to="/" className="hover:text-pink-600">Inicio</Link>
            <Link to="/entrenamientos" className="hover:text-pink-600">Entreno</Link>
            <Link to="/recetas" className="hover:text-pink-600">Recetas</Link>
            <Link to="/nutricion" className="hover:text-pink-600">Nutri</Link>
          </div>
        </footer>
      </div>
    </Router>
  );
}