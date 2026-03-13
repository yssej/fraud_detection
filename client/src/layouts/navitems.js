import {AlertTriangle, LayoutDashboard, User, Users} from "lucide-react";

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
    },
    {
        path: '/dashboard/organization/requests',
        icon: Users,
        label: 'Demandes d\'organisation'
    }
];

export default navItems;
