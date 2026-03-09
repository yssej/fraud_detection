import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../context/userContext';
import {
    LayoutDashboard,
    AlertTriangle,
    User,
    LogOut,
    Menu,
    X,
    Bell
} from 'lucide-react';

const DashboardLayout = () => {
    const { userData, logout } = useUser();
    const navigate = useNavigate();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Navigation items
    const navItems = [
        {
            path: '/dashboard',
            icon: LayoutDashboard,
            label: 'Tableau de bord'
        },
        {
            path: '/dashboard/risks',
            icon: AlertTriangle,
            label: 'Risques'
        },
        {
            path: '/dashboard/profile',
            icon: User,
            label: 'Profil'
        }
    ];

    // Fonction de déconnexion
    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    // Vérifier si un lien est actif
    const isActive = (path) => {
        if (path === '/dashboard') {
            return location.pathname === '/dashboard';
        }
        return location.pathname.startsWith(path);
    };

    return (
        <div className="min-h-screen bg-slate-50">

            {/* ============================================
          HEADER (Mobile + Desktop)
          ============================================ */}
            <header className="bg-white border-b border-slate-200 fixed top-0 left-0 right-0 z-30">
                <div className="flex items-center justify-between px-4 py-4">

                    {/* Logo + Menu burger (mobile) */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                            {isSidebarOpen ? (
                                <X className="w-6 h-6 text-slate-600" />
                            ) : (
                                <Menu className="w-6 h-6 text-slate-600" />
                            )}
                        </button>

                        <Link to="/dashboard" className="text-2xl font-bold text-slate-900">
                            Risk<span className="text-blue-600">Monitor</span>
                        </Link>
                    </div>

                    {/* Actions header */}
                    <div className="flex items-center gap-4">
                        {/* Notifications */}
                        <button className="relative p-2 hover:bg-slate-100 rounded-lg transition-colors">
                            <Bell className="w-5 h-5 text-slate-600" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>

                        {/* User info */}
                        <div className="hidden md:flex items-center gap-3">
                            <div className="text-right">
                                <p className="text-sm font-medium text-slate-900">
                                    {userData?.name || 'Utilisateur'}
                                </p>
                                <p className="text-xs text-slate-500">
                                    {userData?.email}
                                </p>
                            </div>
                            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">
                  {userData?.name?.charAt(0) || 'U'}
                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* ============================================
          SIDEBAR
          ============================================ */}
            <aside className={`
                fixed top-16 left-0 bottom-0 w-64 bg-white border-r border-slate-200 z-20
                transition-transform duration-300 ease-in-out
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                lg:translate-x-0
            `}>
                <nav className="p-4 space-y-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.path);

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setIsSidebarOpen(false)}
                                className={`
                                    flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                                    ${active
                                        ? 'bg-blue-50 text-blue-600 font-medium'
                                        : 'text-slate-600 hover:bg-slate-50'
                                    }
                                `}
                            >
                                <Icon className="w-5 h-5" />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Bouton de déconnexion en bas */}
                <div className="absolute bottom-4 left-4 right-4">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                    >
                        <LogOut className="w-5 h-5" />
                        <span>Déconnexion</span>
                    </button>
                </div>
            </aside>

            {/* Overlay mobile */}
            {isSidebarOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-10 top-16"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            {/* ============================================
          MAIN CONTENT
          ============================================ */}
            <main className="lg:ml-64 pt-16 min-h-screen">
                <div className="p-6">
                    {/* Outlet = où les routes enfants s'affichent */}
                    <Outlet />
                </div>
            </main>

        </div>
    );
};

export default DashboardLayout;
