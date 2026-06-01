import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import {
    Package,
    ClipboardList,
    Users as UsersIcon,
    AlertTriangle,
    CheckCircle2,
    Clock
} from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center space-x-4">
        <div className={`h-12 w-12 rounded-lg ${color} flex items-center justify-center`}>
            <Icon className="h-6 w-6 text-white" />
        </div>
        <div>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">{title}</p>
            <p className="text-2xl font-bold text-slate-800">{value}</p>
        </div>
    </div>
);

const Dashboard = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState(null);

    useEffect(() => {
        if (user?.role === 'ADMIN' || user?.role === 'INVENTORY_MANAGER') {
            api.get('/reports/inventory-summary')
                .then(res => setStats(res.data))
                .catch(console.error);
        }
    }, [user]);

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
                <p className="text-slate-500">Welcome back, {user?.firstName}!</p>
            </div>

            {stats && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard title="Total Inventory" value={stats.totalItems} icon={Package} color="bg-primary" />
                    <StatCard title="In Stock" value={stats.inStock} icon={CheckCircle2} color="bg-success" />
                    <StatCard title="Assigned" value={stats.assigned} icon={ClipboardList} color="bg-accent" />
                    <StatCard title="Expired" value={stats.expired} icon={AlertTriangle} color="bg-danger" />
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Notifications / Alerts */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-slate-800">Recent Alerts</h2>
                        <Clock className="h-5 w-5 text-slate-400" />
                    </div>
                    <div className="space-y-4">
                        <p className="text-sm text-slate-500 italic">No recent alerts to display.</p>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-slate-800">Quick Actions</h2>
                        <Package className="h-5 w-5 text-slate-400" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <button className="p-4 rounded-lg bg-slate-50 text-slate-700 font-medium hover:bg-slate-100 transition-colors text-left">
                            New Assignment
                        </button>
                        <button className="p-4 rounded-lg bg-slate-50 text-slate-700 font-medium hover:bg-slate-100 transition-colors text-left">
                            Add Product
                        </button>
                        <button className="p-4 rounded-lg bg-slate-50 text-slate-700 font-medium hover:bg-slate-100 transition-colors text-left">
                            Generate Report
                        </button>
                        <button className="p-4 rounded-lg bg-slate-50 text-slate-700 font-medium hover:bg-slate-100 transition-colors text-left">
                            Manage Clients
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
