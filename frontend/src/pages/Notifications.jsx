import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { toast } from 'react-hot-toast';
import { Bell, Trash2, Clock, ShieldCheck } from 'lucide-react';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchNotifications = async () => {
        try {
            const res = await api.get('/notifications/my');
            setNotifications(res.data);
        } catch (err) {
            toast.error('Failed to fetch notifications');
        } finally {
            setLoading(false);
        }
    };

    const deleteNotification = async (id) => {
        try {
            await api.delete(`/notifications/${id}`);
            setNotifications(notifications.filter(n => n._id !== id));
            toast.success('Notification cleared');
        } catch (err) {
            toast.error('Failed to clear notification');
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-800">Notifications</h1>
                <p className="text-slate-500">Stay updated on maintenance and expiry alerts</p>
            </div>

            <div className="space-y-4">
                {loading ? (
                    <p>Loading notifications...</p>
                ) : notifications.length > 0 ? (
                    notifications.map((note) => (
                        <div key={note._id} className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm hover:border-primary/50 transition-colors flex items-start space-x-4">
                            <div className="h-10 w-10 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                                <Bell className="h-5 w-5 text-accent" />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                    <h3 className="font-bold text-slate-800">Maintenance Reminder</h3>
                                    <span className="text-xs text-slate-400 flex items-center space-x-1">
                                        <Clock className="w-3 h-3" />
                                        <span>{new Date(note.sentAt).toLocaleDateString()}</span>
                                    </span>
                                </div>
                                <p className="text-slate-600 text-sm">{note.message}</p>
                                <div className="mt-4 flex items-center space-x-4 text-xs">
                                    <span className="bg-slate-100 px-2 py-1 rounded text-slate-500 font-medium">Assignment ID: {note.assignmentId}</span>
                                    <button
                                        onClick={() => deleteNotification(note._id)}
                                        className="text-danger hover:underline font-medium flex items-center space-x-1"
                                    >
                                        <Trash2 className="w-3 h-3" />
                                        <span>Clear Notification</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-200">
                        <Bell className="h-12 w-12 text-slate-200 mx-auto mb-4" />
                        <p className="text-slate-500">You're all caught up!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Notifications;
