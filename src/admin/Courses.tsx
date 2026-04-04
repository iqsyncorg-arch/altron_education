import React, { useState } from 'react';
import { BookOpen, CheckCircle, Trash2, X, Save } from 'lucide-react';

interface CoursesProps {
    data: any[];
    loading: boolean;
    onAddCourse: (course: any) => void;
    onDeleteCourse: (id: any) => void;
    showForm: boolean;
    setShowForm: (show: boolean) => void;
}

export default function Courses({ data, loading, onAddCourse, onDeleteCourse, showForm, setShowForm }: CoursesProps) {
    const [formData, setFormData] = useState({
        title: '',
        description: 'Practical Training Program',
        duration: '',
        day: 'Monday to Saturday',
        timing: '10:00 AM – 05:30 PM',
        eligibility: 'No Need & No Age Bar',
        batchSize: '1 or 2 Candidates Only',
        originalFees: '15900',
        offerPrice: '10900'
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newCourse = {
            ...formData,
            slug: formData.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
            fees: {
                original: parseInt(formData.originalFees),
                offer: parseInt(formData.offerPrice)
            }
        };
        onAddCourse(newCourse);
        setShowForm(false);
    };

    if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500"></div></div>;

    return (
        <div className="space-y-6">
            {showForm && (
                <div className="bg-white/5 border border-brand-500/30 p-8 rounded-3xl backdrop-blur-xl shadow-2xl mb-12 animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-xl font-bold text-white">Create New Course</h3>
                        <button onClick={() => setShowForm(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400">
                            <X size={20} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <div className="md:col-span-2">
                            <label className="block text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Course Title</label>
                            <input
                                value={formData.title}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-500 transition-all outline-none"
                                placeholder="e.g. Diploma Course in CCTV Surveillance System"
                                required
                            />
                        </div>

                        {/* ... Rest of form inputs remain the same but use gap-4 instead of gap-6 for mobile ... */}
                        {/* I can just change the grid-cols-1 md:grid-cols-2 part at the top of the form */}

                        <div>
                            <label className="block text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Program Type</label>
                            <input
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-500 transition-all outline-none"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Duration</label>
                            <input
                                value={formData.duration}
                                onChange={e => setFormData({ ...formData, duration: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-500 transition-all outline-none"
                                placeholder="e.g. 6 Days with Practical Exam"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Days</label>
                            <input
                                value={formData.day}
                                onChange={e => setFormData({ ...formData, day: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-500 transition-all outline-none"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Timing</label>
                            <input
                                value={formData.timing}
                                onChange={e => setFormData({ ...formData, timing: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-500 transition-all outline-none"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Eligibility</label>
                            <input
                                value={formData.eligibility}
                                onChange={e => setFormData({ ...formData, eligibility: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-500 transition-all outline-none"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Batch Size</label>
                            <input
                                value={formData.batchSize}
                                onChange={e => setFormData({ ...formData, batchSize: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-500 transition-all outline-none"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Original Fees (₹)</label>
                            <input
                                type="number"
                                value={formData.originalFees}
                                onChange={e => setFormData({ ...formData, originalFees: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-500 transition-all outline-none"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Offer Price (₹)</label>
                            <input
                                type="number"
                                value={formData.offerPrice}
                                onChange={e => setFormData({ ...formData, offerPrice: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-500 transition-all outline-none"
                                required
                            />
                        </div>

                        <div className="md:col-span-2 flex gap-4 mt-4">
                            <button type="submit" className="flex-1 bg-brand-600 hover:bg-brand-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-brand-500/20 transition-all flex items-center justify-center gap-2">
                                <Save size={20} /> Save Course
                            </button>
                            <button type="button" onClick={() => setShowForm(false)} className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-4 rounded-xl border border-white/10 transition-all">
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {Array.isArray(data) && data.map((item, idx) => (
                <div key={item.id || idx} className="bg-white/5 border border-white/10 p-4 md:p-6 rounded-2xl hover:border-white/20 transition-all group">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-6">
                        <div className="space-y-4 flex-1 w-full">
                            <div>
                                <h4 className="text-lg font-bold text-white leading-tight">{item.title}</h4>
                                <p className="text-sm text-brand-400 font-semibold mt-1">{item.description}</p>
                            </div>
                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                                <div>
                                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Duration</p>
                                    <p className="text-sm text-gray-300 font-medium">{item.duration}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Timing</p>
                                    <p className="text-sm text-gray-300 font-medium">{item.timing}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Batch</p>
                                    <p className="text-sm text-gray-300 font-medium">{item.batchSize}</p>
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Fees</p>
                                    <p className="text-sm text-brand-500 font-bold">₹{item.fees?.offer} <span className="text-gray-600 line-through text-xs font-normal ml-1 whitespace-nowrap">₹{item.fees?.original}</span></p>
                                </div>
                            </div>
                        </div>
                        <div className="flex sm:flex-col gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                            <button className="flex-1 sm:flex-none p-3 bg-white/5 text-gray-400 hover:text-brand-500 hover:bg-white/10 rounded-xl transition-all shadow-sm flex items-center justify-center">
                                <CheckCircle size={18} />
                            </button>
                            <button
                                onClick={() => onDeleteCourse(item.id)}
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
                    <BookOpen className="text-gray-600 w-8 h-8 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white">No courses found</h3>
                </div>
            )}
        </div>
    );
}
