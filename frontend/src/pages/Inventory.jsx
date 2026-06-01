import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import { ClipboardList, Plus, Search, MoreVertical, AlertCircle } from 'lucide-react';

const Inventory = () => {
    const { user } = useAuth();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchInventory = async () => {
        try {
            const res = await api.get('/inventory');
            setItems(res.data);
        } catch (err) {
            toast.error('Failed to fetch inventory');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInventory();
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case 'IN_STOCK': return 'bg-success/10 text-success';
            case 'ASSIGNED': return 'bg-accent/10 text-accent';
            case 'EXPIRED': return 'bg-danger/10 text-danger';
            case 'UNDER_MAINTENANCE': return 'bg-secondary/10 text-secondary';
            default: return 'bg-slate-100 text-slate-500';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Inventory Tracking</h1>
                    <p className="text-slate-500">Manage individual units and status</p>
                </div>
                <button className="bg-primary text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-primary/90 transition-colors">
                    <Plus className="w-5 h-5" />
                    <span>Add Stock</span>
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-slate-500">
                        <Search className="w-4 h-4" />
                        <input type="text" placeholder="Search by serial number..." className="bg-transparent focus:outline-none text-sm" />
                    </div>
                </div>
                <table className="w-full text-left">
                    <thead>
                        <tr className="text-slate-400 text-xs uppercase tracking-wider border-b border-slate-100">
                            <th className="px-6 py-4 font-bold">Serial Number</th>
                            <th className="px-6 py-4 font-bold">Product ID</th>
                            <th className="px-6 py-4 font-bold">Status</th>
                            <th className="px-6 py-4 font-bold">Expiry Date</th>
                            <th className="px-6 py-4 font-bold">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {loading ? (
                            <tr><td colSpan="5" className="px-6 py-8 text-center text-slate-500">Loading inventory...</td></tr>
                        ) : items.length > 0 ? (
                            items.map((item) => (
                                <tr key={item._id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-slate-800">{item.serialNumber}</td>
                                    <td className="px-6 py-4 text-slate-500 text-sm font-mono">{item.productId}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${getStatusColor(item.status)}`}>
                                            {item.status.replace('_', ' ')}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600 text-sm">
                                        {new Date(item.expiryDate).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button className="text-slate-400 hover:text-slate-600">
                                            <MoreVertical className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="5" className="px-6 py-8 text-center text-slate-500">No items in inventory.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Inventory;
