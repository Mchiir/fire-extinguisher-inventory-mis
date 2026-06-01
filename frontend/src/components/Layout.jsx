import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    Home,
    Package,
    ClipboardList,
    Users,
    Bell,
    FileText,
    LogOut,
    Menu,
    ShieldCheck,
    Building2
} from 'lucide-react';

const Layout = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const menuItems = [
        { name: 'Dashboard', icon: Home, path: '/', roles: ['ADMIN', 'INVENTORY_MANAGER', 'SALES_OFFICER', 'CLIENT'] },
        { name: 'Products', icon: Package, path: '/products', roles: ['ADMIN', 'INVENTORY_MANAGER', 'SALES_OFFICER', 'CLIENT'] },
        { name: 'Inventory', icon: ClipboardList, path: '/inventory', roles: ['ADMIN', 'INVENTORY_MANAGER'] },
        { name: 'Clients', icon: Building2, path: '/clients', roles: ['ADMIN', 'SALES_OFFICER'] },
        { name: 'Assignments', icon: ShieldCheck, path: '/assignments', roles: ['ADMIN', 'INVENTORY_MANAGER', 'SALES_OFFICER', 'CLIENT'] },
        { name: 'Users', icon: Users, path: '/users', roles: ['ADMIN'] },
        { name: 'Notifications', icon: Bell, path: '/notifications', roles: ['ADMIN', 'CLIENT'] },
        { name: 'Reports', icon: FileText, path: '/reports', roles: ['ADMIN', 'INVENTORY_MANAGER', 'SALES_OFFICER'] },
    ];

    const filteredMenu = menuItems.filter(item => item.roles.includes(user?.role));

    return (
        <div className="flex h-screen bg-slate-50">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-slate-200 hidden md:block">
                <div className="p-6 flex items-center space-x-2">
                    <ShieldCheck className="w-8 h-8 text-primary" />
                    <span className="font-bold text-xl text-slate-800">Inventory MIS</span>
                </div>
                <nav className="mt-6 px-4 space-y-1">
                    {filteredMenu.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${location.pathname === item.path
                                    ? 'bg-primary/10 text-primary font-medium'
                                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                                }`}
                        >
                            <item.icon className="w-5 h-5" />
                            <span>{item.name}</span>
                        </Link>
                    ))}
                </nav>
                <div className="absolute bottom-0 w-64 p-4 border-t border-slate-200">
                    <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 p-3 w-full text-danger hover:bg-danger/5 rounded-lg transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden">
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6">
                    <button className="md:hidden p-2 text-slate-600">
                        <Menu className="w-6 h-6" />
                    </button>
                    <div className="flex items-center space-x-4">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-medium text-slate-900">{user?.firstName} {user?.lastName}</p>
                            <p className="text-xs text-slate-500 uppercase tracking-wider">{user?.role}</p>
                        </div>
                        <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                            {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                        </div>
                    </div>
                </header>
                <div className="flex-1 overflow-auto p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Layout;
