// components/BottomNavbar.jsx
import { CalendarCheck, MessageSquare, Heart, Utensils, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function BottomNavbar() {
    const location = useLocation();

    const navItems = [
        { path: '/hoy', label: 'Hoy', icon: <CalendarCheck size={24} /> },
        { path: '/chat', label: 'Chat', icon: <MessageSquare size={24} /> },
        { path: '/actividades', label: 'Actividades', icon: <Heart size={24} /> },
        { path: '/nutricion', label: 'Nutrición', icon: <Utensils size={24} /> },
        { path: '/tu', label: 'Tú', icon: <User size={24} /> },
    ];

    return (
        <nav className="fixed bottom-0 w-full bg-white border-t border-gray-200 flex justify-around items-center py-2 z-50">
            {navItems.map(({ path, label, icon }) => {
                const isActive = location.pathname.startsWith(path);
                return (
                    <Link
                        key={path}
                        to={path}
                        className={`flex flex-col items-center text-xs ${isActive ? 'text-black font-semibold' : 'text-gray-400'
                            }`}
                    >
                        {icon}
                        <span>{label}</span>
                    </Link>
                );
            })}
        </nav>
    );
}
