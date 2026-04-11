import React, { useState } from 'react';
import { Video, ExternalLink, CheckCircle, Trash2, X, Save, Pencil } from 'lucide-react';

interface StoriesProps {
    data: any[];
    loading: boolean;
    onSaveStory: (story: any) => void;
    onDeleteStory: (id: any) => void;
    showForm: boolean;
    setShowForm: (show: boolean) => void;
}

export default function Stories({ data, loading, onSaveStory, onDeleteStory, showForm, setShowForm }: StoriesProps) {
    const [editingItem, setEditingItem] = useState<any>(null);
    const [formData, setFormData] = useState({
        title: '',
        youtubeUrl: '',
        description: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSaveStory({ ...formData, id: editingItem?.id });
        setShowForm(false);
        setEditingItem(null);
        setFormData({ title: '', youtubeUrl: '', description: '' });
    };

    const handleEdit = (item: any) => {
        setEditingItem(item);
        setFormData({
            title: item.title,
            youtubeUrl: item.youtubeUrl,
            description: item.description
        });
        setShowForm(true);
    };

    if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500"></div></div>;

    return (
        <div className="space-y-6">
            {showForm && (
                <div className="bg-white/5 border border-brand-500/30 p-8 rounded-3xl backdrop-blur-xl shadow-2xl mb-12 animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-xl font-bold text-white">{editingItem ? 'Edit Success Story' : 'Add Success Story'}</h3>
                        <button onClick={() => { setShowForm(false); setEditingItem(null); }} className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400">
                            <X size={20} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Video Title</label>
                            <input
                                value={formData.title}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-500 transition-all outline-none"
                                placeholder="e.g. Student Achievement Story"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">YouTube URL</label>
                            <div className="relative">
                                <Video className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                                <input
                                    value={formData.youtubeUrl}
                                    onChange={e => setFormData({ ...formData, youtubeUrl: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-brand-500 transition-all"
                                    placeholder="https://youtube.com/watch?v=..."
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Description</label>
                            <textarea
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-500 transition-all outline-none h-24 resize-none"
                                placeholder="Briefly describe this success story"
                                required
                            />
                        </div>

                        <div className="flex gap-4 mt-4">
                            <button type="submit" className="flex-1 bg-brand-600 hover:bg-brand-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-brand-500/20 transition-all flex items-center justify-center gap-2">
                                <Save size={20} /> {editingItem ? 'Update Story' : 'Save Story'}
                            </button>
                            <button type="button" onClick={() => { setShowForm(false); setEditingItem(null); }} className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-4 rounded-xl border border-white/10 transition-all">
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {Array.isArray(data) && data.map((item, idx) => (
                <div key={item.id || idx} className="bg-white/5 border border-white/10 p-4 md:p-6 rounded-2xl hover:border-white/20 transition-all group">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-6">
                        <div className="space-y-3 flex-1 w-full text-left">
                            <h4 className="text-lg font-bold text-white leading-tight">{item.title}</h4>
                            <p className="text-sm text-gray-400 mb-4 line-clamp-3 leading-relaxed">{item.description}</p>
                            <a href={item.youtubeUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-brand-400 hover:text-brand-300 text-sm font-semibold transition-colors bg-brand-500/5 px-4 py-2 rounded-lg border border-brand-500/10">
                                <Video size={16} /> Watch on YouTube <ExternalLink size={14} />
                            </a>
                        </div>
                        <div className="flex sm:flex-col gap-2 w-full sm:w-auto">
                            <button
                                onClick={() => handleEdit(item)}
                                className="flex-1 sm:flex-none p-3 bg-white/5 text-gray-400 hover:text-brand-500 hover:bg-white/10 rounded-xl transition-all shadow-sm flex items-center justify-center"
                                title="Edit Story"
                            >
                                <Pencil size={18} />
                            </button>
                            <button
                                onClick={() => onDeleteStory(item.id)}
                                className="flex-1 sm:flex-none p-3 bg-white/5 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all shadow-sm flex items-center justify-center"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
            {data.length === 0 && (
                <div className="text-center py-24 bg-white/3 border border-dashed border-white/10 rounded-3xl">
                    <Video className="text-gray-600 w-8 h-8 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white">No stories found</h3>
                </div>
            )}
        </div>
    );
}
