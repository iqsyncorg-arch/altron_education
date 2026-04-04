import React, { useState, useEffect } from 'react';
import { Image as ImageIcon, CheckCircle, Trash2, X, Save, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryProps {
    data: any[];
    loading: boolean;
    onAddImage: (image: any) => void;
    onDeleteImage: (id: any) => void;
    showForm: boolean;
    setShowForm: (show: boolean) => void;
}

export default function Gallery({ data, loading, onAddImage, onDeleteImage, showForm, setShowForm }: GalleryProps) {
    const [file, setFile] = useState<File | null>(null);
    const [caption, setCaption] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    // Reset to page 1 when data length changes significantly or current page becomes invalid
    useEffect(() => {
        const maxPage = Math.ceil(data.length / itemsPerPage);
        if (currentPage > maxPage && maxPage > 0) {
            setCurrentPage(maxPage);
        }
    }, [data.length, currentPage]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('--- Save Image Started ---');
        console.log('Caption:', caption);

        if (!file) {
            console.error('No file selected!');
            return;
        }

        console.log('File details:', {
            name: file.name,
            size: `${(file.size / 1024).toFixed(2)} KB`,
            type: file.type
        });

        const formData = new FormData();
        formData.append('image', file);
        formData.append('caption', caption);

        console.log('Sending FormData to parent...');
        onAddImage(formData);
        setShowForm(false);
        setFile(null);
        setCaption('');
        console.log('--- Save Image Form Reset ---');
    };

    if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500"></div></div>;

    // Pagination logic
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedItems = data.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="space-y-6">
            {showForm && (
                <div className="bg-white/5 border border-brand-500/30 p-8 rounded-3xl backdrop-blur-xl shadow-2xl mb-12 animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-xl font-bold text-white">Add Gallery Image</h3>
                        <button onClick={() => setShowForm(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400">
                            <X size={20} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Select Image</label>
                            <input
                                type="file"
                                onChange={e => setFile(e.target.files ? e.target.files[0] : null)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-500 transition-all outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-500 file:text-white hover:file:bg-brand-600"
                                accept="image/*"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Caption</label>
                            <input
                                value={caption}
                                onChange={e => setCaption(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-500 transition-all outline-none"
                                placeholder="e.g. Training session in progress"
                                required
                            />
                        </div>


                        <div className="flex gap-4 mt-4">
                            <button type="submit" className="flex-1 bg-brand-600 hover:bg-brand-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-brand-500/20 transition-all flex items-center justify-center gap-2">
                                <Save size={20} /> Save Image
                            </button>
                            <button type="button" onClick={() => setShowForm(false)} className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-4 rounded-xl border border-white/10 transition-all">
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {Array.isArray(data) && paginatedItems.map((item, idx) => (
                <div key={item.id || idx} className="bg-white/5 border border-white/10 p-4 md:p-6 rounded-2xl hover:border-white/20 transition-all group">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-6">
                        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 items-start sm:items-center flex-1 w-full">
                            <img src={item.imageUrl} alt={item.caption} className="w-full sm:w-32 h-40 sm:h-20 object-cover rounded-xl border border-white/10" />
                            <div className="min-w-0">
                                <h4 className="text-white font-bold leading-tight">{item.caption}</h4>
                            </div>
                        </div>
                        <div className="flex sm:flex-col gap-2 w-full sm:w-auto">
                            <button className="flex-1 sm:flex-none p-3 bg-white/5 text-gray-400 hover:text-brand-500 hover:bg-white/10 rounded-xl transition-all shadow-sm flex items-center justify-center">
                                <CheckCircle size={18} />
                            </button>
                            <button onClick={() => onDeleteImage(item.id)} className="flex-1 sm:flex-none p-3 bg-white/5 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all shadow-sm flex items-center justify-center">
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            ))}

            {data.length > itemsPerPage && (
                <div className="flex items-center justify-between bg-white/5 border border-white/10 px-6 py-4 rounded-2xl">
                    <p className="text-gray-400 text-sm">
                        Showing <span className="text-white font-bold">{startIndex + 1}</span> to <span className="text-white font-bold">{Math.min(startIndex + itemsPerPage, data.length)}</span> of <span className="text-white font-bold">{data.length}</span> images
                    </p>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="p-2 bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed rounded-xl transition-all border border-white/10"
                        >
                            <ChevronLeft size={20} />
                        </button>

                        <div className="flex gap-1">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`w-10 h-10 rounded-xl text-sm font-bold transition-all border ${currentPage === page
                                            ? 'bg-brand-500 text-white border-brand-500 shadow-lg shadow-brand-500/20'
                                            : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white'
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="p-2 bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed rounded-xl transition-all border border-white/10"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
            )}
            {data.length === 0 && (
                <div className="text-center py-24 bg-white/3 border border-dashed border-white/10 rounded-3xl">
                    <ImageIcon className="text-gray-600 w-8 h-8 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white">No images found</h3>
                </div>
            )}
        </div>
    );
}
