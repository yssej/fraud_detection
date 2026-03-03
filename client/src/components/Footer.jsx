import React from 'react';
import {
    Mail,
    Phone,
    MapPin,
    Linkedin,
    Twitter,
    Github,
    Facebook
} from 'lucide-react';

const Footer = () => {
    // Année dynamique - Best practice pour les footers
    const currentYear = new Date().getFullYear();

    // Structure des liens - Organisation par catégories
    const footerLinks = {
        product: {
            title: "Produit",
            links: [
                { name: "Fonctionnalités", href: "#features" },
                { name: "Tarifs", href: "#pricing" },
                { name: "Sécurité", href: "#security" },
                { name: "Mises à jour", href: "#updates" }
            ]
        },
        company: {
            title: "Entreprise",
            links: [
                { name: "À propos", href: "#about" },
                { name: "Blog", href: "#blog" },
                { name: "Carrières", href: "#careers" },
                { name: "Presse", href: "#press" }
            ]
        },
        resources: {
            title: "Ressources",
            links: [
                { name: "Documentation", href: "#docs" },
                { name: "API", href: "#api" },
                { name: "Support", href: "#support" },
                { name: "Statut", href: "#status" }
            ]
        },
        legal: {
            title: "Légal",
            links: [
                { name: "Confidentialité", href: "#privacy" },
                { name: "Conditions", href: "#terms" },
                { name: "Cookies", href: "#cookies" },
                { name: "Licences", href: "#licenses" }
            ]
        }
    };

    // Informations de contact
    const contactInfo = [
        { icon: Mail, text: "contact@riskmonitor.com", href: "mailto:contact@riskmonitor.com" },
        { icon: Phone, text: "+261 34 56 789 10", href: "tel:+261345678910" },
        { icon: MapPin, text: "Antananarivo, Madagascar", href: "#" }
    ];

    // Réseaux sociaux
    const socialLinks = [
        { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
        { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
        { icon: Github, href: "https://github.com", label: "GitHub" },
        { icon: Facebook, href: "https://facebook.com", label: "Facebook" }
    ];

    return (
        <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
            <div className="container mx-auto px-6">

                {/* Section principale du footer */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-12">

                    {/* Colonne 1 : Branding et description (2 colonnes sur large écran) */}
                    <div className="lg:col-span-2">
                        <div className="mb-6">
                            <h3 className="text-2xl font-bold text-white mb-3">
                                Risk<span className="text-blue-400">Monitor</span>
                            </h3>
                            <p className="text-slate-400 leading-relaxed">
                                La plateforme leader pour surveiller et gérer vos risques financiers
                                en temps réel avec l'intelligence artificielle.
                            </p>
                        </div>

                        {/* Informations de contact */}
                        <div className="space-y-3">
                            {contactInfo.map((contact, index) => {
                                const Icon = contact.icon;
                                return (
                                    <a
                                        key={index}
                                        href={contact.href}
                                        className="flex items-center gap-3 text-slate-400 hover:text-blue-400 transition-colors duration-200"
                                    >
                                        <Icon className="w-4 h-4 flex-shrink-0" />
                                        <span className="text-sm">{contact.text}</span>
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Colonnes 2-5 : Liens organisés par catégorie */}
                    {Object.entries(footerLinks).map(([key, section]) => (
                        <div key={key}>
                            <h4 className="text-white font-semibold mb-4">{section.title}</h4>
                            <ul className="space-y-3">
                                {section.links.map((link, index) => (
                                    <li key={index}>
                                        <a
                                            href={link.href}
                                            className="text-slate-400 hover:text-blue-400 transition-colors duration-200 text-sm"
                                        >
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Séparateur */}
                <div className="border-t border-slate-800 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">

                        {/* Copyright */}
                        <div className="text-slate-500 text-sm text-center md:text-left">
                            © {currentYear} RiskMonitor. Tous droits réservés.
                        </div>

                        {/* Réseaux sociaux */}
                        <div className="flex gap-4">
                            {socialLinks.map((social, index) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={index}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={social.label}
                                        className="w-10 h-10 bg-slate-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                                    >
                                        <Icon className="w-5 h-5" />
                                    </a>
                                );
                            })}
                        </div>

                        {/* Badges de certification (optionnel) */}
                        <div className="flex gap-4 items-center">
                            <div className="px-3 py-1 bg-slate-800 rounded text-xs font-medium text-slate-400">
                                ISO 27001
                            </div>
                            <div className="px-3 py-1 bg-slate-800 rounded text-xs font-medium text-slate-400">
                                SOC 2
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
