import React, { useState } from 'react';
import {
    Building2,
    MapPin,
    Phone,
    Mail,
    User,
    Lock,
    Trash2,
    X,
    PlusCircle
} from 'lucide-react';

interface FranchiseAccount {
    id: number;
    centerName: string;
    fullAddress: string;
    primaryPhone: string;
    email: string;
    personName: string;
    role: string;
}

interface FranchiseManagementProps {
    data: FranchiseAccount[];
    loading: boolean;
    onSave: (franchise: any) => void;
    onDelete: (id: number) => void;
}

export default function FranchiseManagement({ data, loading, onSave, onDelete }: FranchiseManagementProps) {
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        centerName: '',
        fullAddress: '',
        primaryPhone: '',
        email: '',
        personName: '',
        password: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
        setFormData({
            centerName: '',
            fullAddress: '',
            primaryPhone: '',
            email: '',
            personName: '',
            password: ''
        });
        setShowForm(false);
    };

    if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500"></div></div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h3 className="text-xl font-bold text-white">Managed Franchises</h3>
                    <p className="text-gray-400 text-sm mt-1">Create and manage access for your institute's franchise centers.</p>
                </div>
                {!showForm && (
                    <button
                        onClick={() => setShowForm(true)}
                        className="flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-lg shadow-brand-500/20"
                    >
                        <PlusCircle size={18} /> Add Franchise
                    </button>
                )}
            </div>

            {showForm && (
                <div className="bg-white/5 border border-brand-500/30 p-8 rounded-3xl backdrop-blur-xl shadow-2xl mb-12 animate-in fade-in slide-in-from-top-4">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-xl font-bold text-white">Register New Franchise</h3>
                        <button onClick={() => setShowForm(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400">
                            <X size={20} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-gray-400 text-xs font-bold uppercase tracking-widest px-1">Center Name</label>
                            <div className="relative">
                                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                                <input
                                    type="text"
                                    required
                                    value={formData.centerName}
                                    onChange={e => setFormData({ ...formData, centerName: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:border-brand-500 outline-none transition-all"
                                    placeholder="e.g. Altron Thanjavur"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-gray-400 text-xs font-bold uppercase tracking-widest px-1">Person Name</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                                <input
                                    type="text"
                                    required
                                    value={formData.personName}
                                    onChange={e => setFormData({ ...formData, personName: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:border-brand-500 outline-none transition-all"
                                    placeholder="e.g. John Doe"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-gray-400 text-xs font-bold uppercase tracking-widest px-1">Primary Phone</label>
                            <div className="relative">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                                <input
                                    type="tel"
                                    required
                                    value={formData.primaryPhone}
                                    onChange={e => setFormData({ ...formData, primaryPhone: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:border-brand-500 outline-none transition-all"
                                    placeholder="e.g. +91 98410 14328"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-gray-400 text-xs font-bold uppercase tracking-widest px-1">Email Address (Login ID)</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:border-brand-500 outline-none transition-all"
                                    placeholder="e.g. center@altron.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-gray-400 text-xs font-bold uppercase tracking-widest px-1">Login Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                                <input
                                    type="password"
                                    required
                                    value={formData.password}
                                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:border-brand-500 outline-none transition-all"
                                    placeholder="Set a secure password"
                                />
                            </div>
                        </div>

                        <div className="space-y-2 md:row-span-1">
                            <label className="text-gray-400 text-xs font-bold uppercase tracking-widest px-1">Full Address</label>
                            <div className="relative">
                                <MapPin className="absolute left-4 top-3 text-gray-500 w-5 h-5" />
                                <textarea
                                    required
                                    rows={1}
                                    value={formData.fullAddress}
                                    onChange={e => setFormData({ ...formData, fullAddress: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:border-brand-500 outline-none transition-all resize-none"
                                    placeholder="Full operational address..."
                                />
                            </div>
                        </div>

                        <div className="md:col-span-2 flex gap-4 pt-4">
                            <button type="submit" className="flex-1 bg-brand-500 hover:bg-brand-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-brand-500/20">
                                Register Franchise
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowForm(false)}
                                className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-4 rounded-xl border border-white/10 transition-all"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid gap-4">
                {data.map((franchise) => (
                    <div key={franchise.id} className="bg-white/5 border border-white/10 p-6 rounded-3xl hover:border-brand-500/30 transition-all group">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 bg-brand-500/10 rounded-2xl flex items-center justify-center text-brand-500 group-hover:scale-110 transition-transform">
                                    <Building2 size={32} />
                                </div>
                                <div className="space-y-1">
                                    <h4 className="text-xl font-bold text-white">{franchise.centerName}</h4>
                                    <p className="text-sm text-gray-400 flex items-center gap-2">
                                        <User size={14} className="text-brand-500" /> {franchise.personName}
                                    </p>
                                    <div className="flex flex-wrap gap-4 mt-2">
                                        <span className="text-xs text-gray-500 flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                                            <Mail size={12} className="text-brand-500" /> {franchise.email}
                                        </span>
                                        <span className="text-xs text-gray-500 flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                                            <Phone size={12} className="text-brand-500" /> {franchise.primaryPhone}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-2 w-full md:w-auto">
                                <button
                                    onClick={() => onDelete(franchise.id)}
                                    className="p-4 bg-white/5 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-2xl transition-all flex items-center justify-center flex-1 md:flex-none border border-white/5 hover:border-red-500/20"
                                    title="Delete Franchise"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {data.length === 0 && !loading && (
                    <div className="text-center py-20 bg-white/3 border border-dashed border-white/10 rounded-3xl">
                        <Building2 className="text-gray-700 w-12 h-12 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-white">No franchises registered yet</h3>
                        <p className="text-gray-400 mt-2">Added franchise centers will appear here.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
