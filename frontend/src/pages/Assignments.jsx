import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { toast } from 'react-hot-toast';
import { ShieldCheck, Plus, Search, Calendar, User, MoreVertical } from 'lucide-react';

const Assignments = () => {
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchAssignments = async () => {
        try {
            const res = await api.get('/assignments');
            setAssignments(res.data);
        } catch (err) {
            toast.error('Failed to fetch assignments');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAssignments();
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Extinguisher Assignments</h1>
                    <p className="text-slate-500">Track issued units and their return status</p>
                </div>
                <button className="bg-primary text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-primary/90 transition-colors">
                    <Plus className="w-5 h-5" />
                    <span>New Assignment</span>
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead>
                        <tr className="text-slate-400 text-xs uppercase tracking-wider border-b border-slate-100">
                            <th className="px-6 py-4 font-bold">Client ID</th>
                            <th className="px-6 py-4 font-bold">Item ID</th>
                            <th className="px-6 py-4 font-bold">Assigned At</th>
                            <th className="px-6 py-4 font-bold">Status</th>
                            <th className="px-6 py-4 font-bold">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {loading ? (
                            <tr><td colSpan="5" className="px-6 py-8 text-center text-slate-500">Loading assignments...</td></tr>
                        ) : assignments.length > 0 ? (
                            assignments.map((asgn) => (
                                <tr key={asgn._id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 text-sm font-mono text-slate-600">{asgn.clientId}</td>
                                    <td className="px-6 py-4 text-sm font-mono text-slate-600">{asgn.inventoryItemId}</td>
                                    <td className="px-6 py-4 text-sm text-slate-600">
                                        <div className="flex items-center space-x-2">
                                            <Calendar className="w-4 h-4 text-slate-400" />
                                            <span>{new Date(asgn.assignedAt).toLocaleDateString()}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${asgn.status === 'ACTIVE' ? 'bg-success/10 text-success' : 'bg-slate-100 text-slate-500'
                                            }`}>
                                            {asgn.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button className="text-primary text-sm font-medium hover:underline">
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="5" className="px-6 py-8 text-center text-slate-500">No active assignments.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Assignments;
