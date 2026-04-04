import React, { useState } from 'react';
import { Users, CheckCircle, Trash2, X, Save, Video, Star } from 'lucide-react';

interface TestimonialsProps {
    data: any[];
    loading: boolean;
    onAddTestimonial: (testimonial: any) => void;
    onDeleteTestimonial: (id: any) => void;
    showForm: boolean;
    setShowForm: (show: boolean) => void;
}

export default function Testimonials({ data, loading, onAddTestimonial, onDeleteTestimonial, showForm, setShowForm }: TestimonialsProps) {
    const [formData, setFormData] = useState({
        studentName: '',
        courseName: '',
        reviewText: '',
        type: 'text' as 'text' | 'video',
        videoUrl: '',
        avatar: '',
        rating: 5
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAddTestimonial(formData);
        setShowForm(false);
        setFormData({ studentName: '', courseName: '', reviewText: '', type: 'text', videoUrl: '', avatar: '', rating: 5 });
    };

    if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500"></div></div>;

    return (
        <div className="space-y-6">
            {showForm && (
                <div className="bg-white/5 border border-brand-500/30 p-8 rounded-3xl backdrop-blur-xl shadow-2xl mb-12 animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-xl font-bold text-white">Add New Testimonial</h3>
                        <button onClick={() => setShowForm(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400">
                            <X size={20} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Student Name</label>
                            <input
                                value={formData.studentName}
                                onChange={e => setFormData({ ...formData, studentName: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-500 transition-all outline-none"
                                placeholder="e.g. Rahul Sharma"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Course Name</label>
                            <input
                                value={formData.courseName}
                                onChange={e => setFormData({ ...formData, courseName: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-500 transition-all outline-none"
                                placeholder="e.g. CCTV Security Expert"
                                required
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Testimonial Type</label>
                            <div className="flex gap-4">
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, type: 'text' })}
                                    className={`flex-1 py-3 rounded-xl border transition-all font-bold ${formData.type === 'text' ? 'bg-brand-500 border-brand-500 text-white' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}`}
                                >
                                    Text Review
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, type: 'video' })}
                                    className={`flex-1 py-3 rounded-xl border transition-all font-bold ${formData.type === 'video' ? 'bg-brand-500 border-brand-500 text-white' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}`}
                                >
                                    Video Review
                                </button>
                            </div>
                        </div>

                        {formData.type === 'video' && (
                            <div className="md:col-span-2">
                                <label className="block text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">YouTube URL</label>
                                <div className="relative">
                                    <Video className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                                    <input
                                        value={formData.videoUrl}
                                        onChange={e => setFormData({ ...formData, videoUrl: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-brand-500 transition-all"
                                        placeholder="https://youtube.com/watch?v=..."
                                        required={formData.type === 'video'}
                                    />
                                </div>
                            </div>
                        )}

                        {formData.type === 'text' && (
                            <div className="md:col-span-2">
                                <label className="block text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Star Rating</label>
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, rating: star })}
                                            className="focus:outline-none transition-transform hover:scale-110"
                                        >
                                            <Star
                                                size={28}
                                                className={star <= formData.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="md:col-span-2">
                            <label className="block text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Review Content</label>
                            <textarea
                                value={formData.reviewText}
                                onChange={e => setFormData({ ...formData, reviewText: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-500 transition-all outline-none h-32 resize-none"
                                placeholder="What did the student say?"
                                required
                            />
                        </div>

                        <div className="md:col-span-2 flex gap-4 mt-4">
                            <button type="submit" className="flex-1 bg-brand-600 hover:bg-brand-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-brand-500/20 transition-all flex items-center justify-center gap-2">
                                <Save size={20} /> Save Testimonial
                            </button>
                            <button type="button" onClick={() => setShowForm(false)} className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-4 rounded-xl border border-white/10 transition-all">
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-between bg-white/5 border border-white/10 p-6 rounded-2xl mb-8 gap-4">
                <div className="text-center sm:text-left">
                    <h3 className="text-white font-bold text-lg">Performance Overview</h3>
                    <p className="text-gray-400 text-xs mt-1 uppercase tracking-widest font-semibold italic">Average Student Satisfaction</p>
                </div>
                <div className="flex items-center gap-4 bg-brand-500/10 px-6 py-3 rounded-xl border border-brand-500/20 w-full sm:w-auto justify-center">
                    <div className="flex text-yellow-500">
                        {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" strokeWidth={0} />)}
                    </div>
                    <span className="text-white font-black text-xl">4.9/5.0</span>
                </div>
            </div>

            {Array.isArray(data) && data.map((item, idx) => (
                <div key={item.id || idx} className="bg-white/5 border border-white/10 p-4 md:p-6 rounded-2xl hover:border-white/20 transition-all group">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-6">
                        <div className="space-y-4 flex-1 w-full">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-brand-500 font-bold shrink-0">
                                    {item.avatar || (item.studentName ? item.studentName[0] : '?')}
                                </div>
                                <div className="min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <h4 className="text-white font-bold truncate max-w-[150px] sm:max-w-none">{item.studentName || 'Anonymous'}</h4>
                                        {item.type === 'text' && (
                                            <div className="flex text-yellow-500 shrink-0">
                                                {[...Array(item.rating || 5)].map((_, i) => <Star key={i} size={12} fill="currentColor" strokeWidth={0} />)}
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-xs text-gray-400 font-semibold truncate">{item.courseName || 'General Course'}</p>
                                </div>
                                {item.type === 'video' && <span className="bg-brand-500/20 text-brand-400 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-widest border border-brand-500/20 ml-auto sm:ml-2">VIDEO</span>}
                            </div>
                            <p className="text-gray-300 italic text-sm leading-relaxed border-l-2 border-brand-500/30 pl-4 py-1">"{item.reviewText || 'No review content'}"</p>
                        </div>
                        <div className="flex sm:flex-col gap-2 w-full sm:w-auto">
                            <button className="flex-1 sm:flex-none p-3 bg-white/5 text-gray-400 hover:text-brand-500 hover:bg-white/10 rounded-xl transition-all shadow-sm flex items-center justify-center">
                                <CheckCircle size={18} />
                            </button>
                            <button
                                onClick={() => onDeleteTestimonial(item.id)}
                                className="p-3 bg-white/5 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all shadow-sm flex items-center justify-center"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
            {data.length === 0 && (
                <div className="text-center py-24 bg-white/3 border border-dashed border-white/10 rounded-3xl">
                    <Users className="text-gray-600 w-8 h-8 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white">No testimonials found</h3>
                </div>
            )}
        </div>
    );
}
