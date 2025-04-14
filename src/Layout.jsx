// app/Layout.jsx
import BottomNavbar from './components/BottomNavbar';
import { Outlet } from 'react-router-dom';

export default function Layout() {
    return (
        <div className="min-h-screen pb-16 bg-[#f9f9f9]">
            <header className="bg-[#D484D4] text-white p-4 text-lg font-semibold">
                ¡Hola, Beatriz!
            </header>

            <main className="p-4">
                <Outlet />
            </main>

            <BottomNavbar />
        </div>
    );
}
