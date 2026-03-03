import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    // State pour le menu mobile (ouvert/fermé)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // State pour détecter le scroll (navbar transparente ou opaque)
    const [isScrolled, setIsScrolled] = useState(false);

    // useEffect - Hook pour les effets de bord (ici: écouter le scroll)
    useEffect(() => {
        // Fonction qui s'exécute à chaque scroll
        const handleScroll = () => {
            // Si on a scrollé plus de 50px, on change l'état
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        // Ajouter l'écouteur d'événement au montage du composant
        window.addEventListener('scroll', handleScroll);

        // Fonction de nettoyage - IMPORTANT !
        // Elle s'exécute quand le composant est démonté
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []); // [] = s'exécute une seule fois au montage

    // Liens de navigation
    const navLinks = [
        { name: 'Accueil', href: '#hero' },
        { name: 'Fonctionnalités', href: '#features' },
        { name: 'Comment ça marche', href: '#how-it-works' },
        { name: 'Tarifs', href: '#pricing' }
    ];

    // Fonction pour le smooth scroll
    const handleSmoothScroll = (e, href) => {
        e.preventDefault(); // Empêche le comportement par défaut du lien

        // Ferme le menu mobile si ouvert
        setIsMobileMenuOpen(false);

        // Si c'est le lien vers hero, on scroll tout en haut
        if (href === '#hero') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            return;
        }

        // Sinon, on cherche l'élément avec cet ID
        const element = document.querySelector(href);
        if (element) {
            // Calcul de la position en tenant compte de la hauteur de la navbar
            const navbarHeight = 80;
            const elementPosition = element.offsetTop - navbarHeight;

            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled
                    ? 'bg-slate-900/95 backdrop-blur-md shadow-lg'
                    : 'bg-transparent'
            }`}
        >
            <div className="container mx-auto px-6">
                <div className="flex items-center justify-between h-20">

                    {/* Logo */}
                    <a
                        href="#hero"
                        onClick={(e) => handleSmoothScroll(e, '#hero')}
                        className="text-2xl font-bold text-white hover:text-blue-400 transition-colors duration-200"
                    >
                        Risk<span className="text-blue-400">Monitor</span>
                    </a>

                    {/* Navigation Desktop - Cachée sur mobile */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => handleSmoothScroll(e, link.href)}
                                className="text-slate-200 hover:text-blue-400 transition-colors duration-200 font-medium"
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>

                    {/* Boutons Auth Desktop - Cachés sur mobile */}
                    <div className="hidden md:flex items-center space-x-4">
                        <button className="px-6 py-2 text-white hover:text-blue-400 transition-colors duration-200 font-medium">
                            Se connecter
                        </button>
                        <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105">
                            S'inscrire
                        </button>
                    </div>

                    {/* Bouton Menu Mobile - Visible uniquement sur mobile */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>

                </div>

                {/* Menu Mobile - Apparaît en slide depuis le haut */}
                <div
                    className={`md:hidden overflow-hidden transition-all duration-300 ${
                        isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                >
                    <div className="py-4 space-y-4 border-t border-slate-700">
                        {/* Liens de navigation mobile */}
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => handleSmoothScroll(e, link.href)}
                                className="block text-slate-200 hover:text-blue-400 hover:bg-white/5 px-4 py-2 rounded-lg transition-all duration-200 font-medium"
                            >
                                {link.name}
                            </a>
                        ))}

                        {/* Boutons Auth mobile */}
                        <div className="pt-4 border-t border-slate-700 space-y-3 px-4">
                            <button className="w-full px-6 py-3 text-white hover:bg-white/5 border border-slate-600 rounded-lg font-medium transition-all duration-200">
                                Se connecter
                            </button>
                            <button className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-200 shadow-lg">
                                S'inscrire
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </nav>
    );
};

export default Navbar;
