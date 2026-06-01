import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { toast } from 'react-hot-toast';
import { Building2, Plus, Search, Mail, Phone, MapPin } from 'lucide-react';

const Clients = () => {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchClients = async () => {
        try {
            const res = await api.get('/clients');
            setClients(res.data);
        } catch (err) {
            toast.error('Failed to fetch clients');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClients();
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Client Management</h1>
                    <p className="text-slate-500">Manage customer organizations and contacts</p>
                </div>
                <button className="bg-primary text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-primary/90 transition-colors">
                    <Plus className="w-5 h-5" />
                    <span>Add Client</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <p>Loading clients...</p>
                ) : clients.length > 0 ? (
                    clients.map((client) => (
                        <div key={client._id} className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex flex-col h-full">
                            <div className="flex items-center space-x-4 mb-6">
                                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                                    <Building2 className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-800">{client.companyName}</h3>
                                    <p className="text-sm text-slate-500">{client.contactPerson}</p>
                                </div>
                            </div>

                            <div className="space-y-3 flex-1">
                                <div className="flex items-center space-x-3 text-sm text-slate-600">
                                    <Mail className="w-4 h-4 text-slate-400" />
                                    <span>{client.email}</span>
                                </div>
                                <div className="flex items-center space-x-3 text-sm text-slate-600">
                                    <Phone className="w-4 h-4 text-slate-400" />
                                    <span>{client.phone}</span>
                                </div>
                                <div className="flex items-center space-x-3 text-sm text-slate-600">
                                    <MapPin className="w-4 h-4 text-slate-400" />
                                    <span className="line-clamp-1">{client.address}</span>
                                </div>
                            </div>

                            <div className="mt-6 pt-4 border-t border-slate-50 flex space-x-2">
                                <button className="flex-1 bg-slate-50 text-slate-600 text-sm font-medium py-2 rounded-lg hover:bg-slate-100 transition-colors">
                                    Details
                                </button>
                                <button className="flex-1 bg-primary/5 text-primary text-sm font-medium py-2 rounded-lg hover:bg-primary/10 transition-colors">
                                    Edit
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="col-span-full text-center text-slate-500 py-12">No clients registered.</p>
                )}
            </div>
        </div>
    );
};

export default Clients;
