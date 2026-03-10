import {AlertTriangle, LayoutDashboard, User} from "lucide-react";

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

export default navItems;
