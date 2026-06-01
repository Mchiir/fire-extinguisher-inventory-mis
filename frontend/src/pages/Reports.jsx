import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { toast } from 'react-hot-toast';
import { FileText, Download, TrendingUp, BarChart3, PieChart } from 'lucide-react';

const Reports = () => {
    const [invSummary, setInvSummary] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const res = await api.get('/reports/inventory-summary');
                setInvSummary(res.data);
            } catch (err) {
                toast.error('Failed to fetch reports');
            } finally {
                setLoading(false);
            }
        };
        fetchReports();
    }, []);

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Business Reports</h1>
                    <p className="text-slate-500">Aggregate insights and inventory analytics</p>
                </div>
                <button className="bg-primary text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-primary/90 transition-colors">
                    <Download className="w-5 h-5" />
                    <span>Export PDF</span>
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Inventory Distribution */}
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-lg font-bold text-slate-800 flex items-center space-x-2">
                            <BarChart3 className="w-5 h-5 text-primary" />
                            <span>Inventory Distribution</span>
                        </h2>
                    </div>

                    {invSummary && (
                        <div className="space-y-6">
                            {[
                                { label: 'In Stock', value: invSummary.inStock, total: invSummary.totalItems, color: 'bg-success' },
                                { label: 'Assigned', value: invSummary.assigned, total: invSummary.totalItems, color: 'bg-accent' },
                                { label: 'Expired', value: invSummary.expired, total: invSummary.totalItems, color: 'bg-danger' },
                                { label: 'Maintenance', value: invSummary.underMaintenance, total: invSummary.totalItems, color: 'bg-secondary' },
                            ].map((stat) => (
                                <div key={stat.label}>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="font-medium text-slate-700">{stat.label}</span>
                                        <span className="text-slate-500">{stat.value} / {stat.total}</span>
                                    </div>
                                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                        <div
                                            className={`${stat.color} h-full transition-all duration-1000`}
                                            style={{ width: `${(stat.value / stat.total) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Quick Stats */}
                <div className="space-y-6">
                    <div className="bg-primary text-white p-6 rounded-xl shadow-lg shadow-primary/20">
                        <TrendingUp className="w-8 h-8 mb-4 opacity-50" />
                        <h3 className="text-sm font-medium uppercase tracking-wider mb-1">Growth Forecast</h3>
                        <p className="text-2xl font-bold">+12.5%</p>
                        <p className="text-xs mt-2 opacity-75 text-white/80">Projected inventory needs for next quarter.</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                        <h3 className="text-slate-800 font-bold mb-4">Report History</h3>
                        <div className="space-y-3">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="flex items-center justify-between text-sm p-2 hover:bg-slate-50 rounded cursor-pointer">
                                    <div className="flex items-center space-x-3">
                                        <FileText className="w-4 h-4 text-slate-400" />
                                        <span className="text-slate-600">Inventory_Aug_202{3 + i}.pdf</span>
                                    </div>
                                    <Download className="w-4 h-4 text-slate-300" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reports;
