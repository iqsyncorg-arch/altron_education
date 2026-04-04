import React, { useState } from 'react';
import { Mail, Phone, Trash2, MapPin, Clock, Edit2, Plus, X, ExternalLink, Globe } from 'lucide-react';

interface Center {
    id: any;
    name: string;
    address: string;
    phone: string;
    mobile?: string;
    email: string;
    timing: string;
    type: string;
    contactPerson?: string;
    mapLink: string;
}

interface CentersManagementProps {
    data: Center[];
    loading: boolean;
    onDelete: (id: any) => void;
    onSave: (center: any) => void;
}

export default function CentersManagement({ data, loading, onDelete, onSave }: CentersManagementProps) {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingCenter, setEditingCenter] = useState<Center | null>(null);
    const [formData, setFormData] = useState<Partial<Center>>({
        name: '',
        address: '',
        phone: '',
        mobile: '',
        email: '',
        timing: '',
        type: 'Regional Center',
        contactPerson: '',
        mapLink: ''
    });

    if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500"></div></div>;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(editingCenter ? { ...formData, id: editingCenter.id } : formData);
        setIsFormOpen(false);
        setEditingCenter(null);
        setFormData({ name: '', address: '', phone: '', mobile: '', email: '', timing: '', type: 'Regional Center', contactPerson: '', mapLink: '' });
    };

    const handleEdit = (center: Center) => {
        setEditingCenter(center);
        setFormData(center);
        setIsFormOpen(true);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-brand-500/10 rounded-xl flex items-center justify-center text-brand-500">
                        <MapPin size={24} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white tracking-tight italic uppercase">Center Management</h2>
                        <p className="text-gray-500 text-xs font-medium italic">Manage institute locations and contact details</p>
                    </div>
                </div>
                <button
                    onClick={() => { setIsFormOpen(true); setEditingCenter(null); }}
                    className="flex items-center gap-2 bg-brand-500 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-brand-600 transition-all shadow-lg shadow-brand-500/20"
                >
                    <Plus size={18} /> Add Center
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.map((center) => (
                    <div key={center.id} className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all group relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/5 blur-[40px] pointer-events-none"></div>

                        <div className="flex justify-between items-start mb-4">
                            <span className="text-[9px] font-black px-2 py-1 bg-brand-500/10 text-brand-400 rounded-md uppercase tracking-widest border border-brand-500/20">
                                {center.type}
                            </span>
                            <div className="flex gap-2">
                                <button onClick={() => handleEdit(center)} className="p-2 bg-white/5 text-gray-400 hover:text-white rounded-lg transition-all border border-white/5">
                                    <Edit2 size={14} />
                                </button>
                                <button onClick={() => onDelete(center.id)} className="p-2 bg-white/5 text-gray-400 hover:text-red-500 rounded-lg transition-all border border-white/5">
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        </div>

                        <h3 className="text-lg font-bold text-white mb-2 italic uppercase">{center.name}</h3>

                        <div className="space-y-3 mb-6">
                            <div className="flex items-start gap-3">
                                <Globe size={14} className="text-brand-500 mt-1 shrink-0" />
                                <p className="text-xs text-gray-400 font-medium leading-relaxed">{center.address}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center gap-3">
                                    <Phone size={14} className="text-brand-500 shrink-0" />
                                    <span className="text-xs text-white font-bold">{center.phone}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Clock size={14} className="text-brand-500 shrink-0" />
                                    <span className="text-xs text-white font-bold">{center.timing}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail size={14} className="text-brand-500 shrink-0" />
                                <span className="text-xs text-gray-400 font-medium">{center.email}</span>
                            </div>
                        </div>

                        <a
                            href={center.mapLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full flex items-center justify-center gap-2 bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 py-3 rounded-xl transition-all text-xs font-bold border border-white/5"
                        >
                            View on Maps <ExternalLink size={14} />
                        </a>
                    </div>
                ))}
            </div>

            {/* Modal Form */}
            {isFormOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="bg-[#0f0f0f] border border-white/10 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl">
                        <div className="px-8 py-6 border-b border-white/10 flex justify-between items-center bg-white/[0.02]">
                            <h3 className="text-xl font-bold text-white italic uppercase">{editingCenter ? 'Edit Center' : 'Add New Center'}</h3>
                            <button onClick={() => setIsFormOpen(false)} className="text-gray-500 hover:text-white transition-all">
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-8 space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest italic ml-1">Center Name</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="e.g. Chennai Head Office"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-500 transition-all font-bold italic"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest italic ml-1">Type</label>
                                    <select
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-500 transition-all font-bold italic"
                                        value={formData.type}
                                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                    >
                                        <option value="Corporate Headquarters">Corporate Headquarters</option>
                                        <option value="Regional Center">Regional Center</option>
                                        <option value="Training Center">Training Center</option>
                                    </select>
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest italic ml-1">Full Address</label>
                                    <textarea
                                        required
                                        placeholder="Complete address including pincode"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-500 transition-all min-h-[80px] font-medium"
                                        value={formData.address}
                                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest italic ml-1">Primary Phone</label>
                                    <input
                                        required
                                        type="text"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-500 transition-all"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest italic ml-1">Mobile (Optional)</label>
                                    <input
                                        type="text"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-500 transition-all"
                                        value={formData.mobile}
                                        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest italic ml-1">Email Address</label>
                                    <input
                                        required
                                        type="email"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-500 transition-all"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest italic ml-1">Working Hours</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="Mon - Sat: 9:00 AM - 7:00 PM"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-500 transition-all"
                                        value={formData.timing}
                                        onChange={(e) => setFormData({ ...formData, timing: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest italic ml-1">Contact Person</label>
                                    <input
                                        type="text"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-500 transition-all font-bold italic"
                                        value={formData.contactPerson}
                                        onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest italic ml-1">Google Maps Link</label>
                                    <input
                                        required
                                        type="url"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-500 transition-all font-medium"
                                        value={formData.mapLink}
                                        onChange={(e) => setFormData({ ...formData, mapLink: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="flex gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsFormOpen(false)}
                                    className="flex-1 bg-white/5 text-white font-bold py-4 rounded-xl hover:bg-white/10 transition-all uppercase tracking-widest text-xs"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-[2] bg-brand-500 text-white font-bold py-4 rounded-xl hover:bg-brand-600 transition-all shadow-xl shadow-brand-500/20 uppercase tracking-widest text-xs"
                                >
                                    {editingCenter ? 'Save Changes' : 'Add Center'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
