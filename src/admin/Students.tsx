import React, { useState, useRef, useEffect } from 'react';
import { User, Trash2, X, Save, GraduationCap, Search, Pencil, Upload, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import CourseSelect from './CourseSelect';
import { API_BASE } from '../config/api';


interface StudentsProps {
    data: any[];
    loading: boolean;
    onAddStudent: (student: any | FormData) => void;
    onDeleteStudent: (rid: any) => void;
    showForm: boolean;
    setShowForm: (show: boolean) => void;
    courses: any[];
}

const getImageUrl = (path: string) => {
    if (!path) return null;
    if (path.startsWith('http') || path.startsWith('data:') || path.startsWith('blob:')) {
        return path;
    }
    const backendUrl = API_BASE.replace('/api', '');
    const fullPath = `${backendUrl}/${path}`;
    // console.log('Resolved Image Path:', fullPath);
    return fullPath;
};

export default function Students({ data, loading, onAddStudent, onDeleteStudent, showForm, setShowForm, courses }: StudentsProps) {

    const [formData, setFormData] = useState({
        rid: '',
        stdname: '',
        subject: '',
        dob: '', // we will map this to DD.MM.YYYY internally
        gender: '',
        image: ''
    });

    const [editingId, setEditingId] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);

    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Helper: today's date in YYYY-MM-DD (standard for input type="date")
    const getTodayDate = () => new Date().toISOString().split('T')[0];

    // Helper: convert DD.MM.YYYY to YYYY-MM-DD
    const displayToInput = (dateStr: string) => {
        if (!dateStr || !dateStr.includes('.')) return dateStr;
        const [d, m, y] = dateStr.split('.');
        return `${y}-${m}-${d}`;
    };

    // Helper: convert YYYY-MM-DD to DD.MM.YYYY
    const inputToDisplay = (dateStr: string) => {
        if (!dateStr || !dateStr.includes('-')) return dateStr;
        const [y, m, d] = dateStr.split('-');
        return `${d}.${m}.${y}`;
    };

    // Reset form when opening/closing
    useEffect(() => {
        if (!showForm) {
            setEditingId(null);
            setImageFile(null);

            setImagePreview(null);
            setFormData({
                rid: '',
                stdname: '',
                subject: '',
                dob: '',
                gender: '',
                image: ''
            });
        } else if (!editingId) {
            // Suggest Next RID for new student
            const numericalRids = data
                .map(s => parseInt(s.rid))
                .filter(rid => !isNaN(rid));
            const nextRid = numericalRids.length > 0 ? Math.max(1286, Math.max(...numericalRids) + 1) : 1286;
            setFormData(prev => ({
                ...prev,
                rid: String(nextRid),
                dob: getTodayDate() // Default to today's date in YYYY-MM-DD for the input
            }));
        }
    }, [showForm, editingId, data]);

    const handleEdit = (student: any) => {
        setEditingId(student.rid);
        setFormData({
            rid: student.rid,
            stdname: student.stdname || '',
            subject: student.subject || '',
            dob: displayToInput(student.dob || ''), // Convert to YYYY-MM-DD for input
            gender: student.gender || '',
            image: student.image || ''
        });
        setImagePreview(student.image || null);
        setShowForm(true);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Use FormData for image upload
        const submitData = new FormData();

        // Finalize form data: convert date back to DD.MM.YYYY for consistency in DB
        const finalData = {
            ...formData,
            dob: inputToDisplay(formData.dob)
        };

        Object.entries(finalData).forEach(([key, value]) => {
            if (key !== 'image') submitData.append(key, value);
        });

        if (imageFile) {
            submitData.append('image', imageFile);
        } else if (formData.image) {
            submitData.append('image', formData.image);
        }

        onAddStudent(submitData);
        setShowForm(false);
    };

    const filteredData = Array.isArray(data) ? data.filter(s =>
        s.stdname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.rid?.toLowerCase().includes(searchTerm.toLowerCase())
    ) : [];

    // Pagination logic
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

    if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500"></div></div>;

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search students by name or RID..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:border-brand-500 outline-none transition-all"
                    />
                </div>
            </div>

            {showForm && (
                <div className="bg-white/5 border border-brand-500/30 p-8 rounded-3xl backdrop-blur-xl shadow-2xl mb-12 animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-xl font-bold text-white">{editingId ? 'Edit Student Record' : 'Add New Student Record'}</h3>
                        <button onClick={() => setShowForm(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400">
                            <X size={20} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2 flex flex-col items-center gap-4 py-4">
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="w-32 h-32 bg-white/5 border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-brand-500 transition-all overflow-hidden relative group"
                            >
                                {imagePreview ? (
                                    <>
                                        <img src={getImageUrl(imagePreview) || ''} alt="Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Upload className="text-white w-8 h-8" />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <ImageIcon className="text-gray-500 w-8 h-8 mb-2" />
                                        <span className="text-xs text-gray-400">Click to Upload Image</span>
                                    </>
                                )}
                            </div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImageChange}
                                className="hidden"
                                accept="image/*"
                            />
                            <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Select Student Photo</p>
                        </div>

                        <div>
                            <label className="block text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Registration ID (RID)</label>
                            <input
                                value={formData.rid}
                                readOnly
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white/50 cursor-not-allowed outline-none"
                                placeholder="Next RID Auto-generated"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Student Name</label>
                            <input
                                value={formData.stdname}
                                onChange={e => setFormData({ ...formData, stdname: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-500 outline-none"
                                placeholder="Full Name"
                                required
                            />
                        </div>

                        <CourseSelect
                            value={formData.subject}
                            onChange={v => setFormData({ ...formData, subject: v })}
                            courses={courses}
                        />



                        <div>
                            <label className="block text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Issue Date</label>
                            <input
                                type="date"
                                value={formData.dob}
                                onChange={e => setFormData({ ...formData, dob: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-500 outline-none block"
                                required
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Place of Issue</label>
                            <input
                                value={formData.gender}
                                onChange={e => setFormData({ ...formData, gender: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-500 outline-none"
                                placeholder="e.g. Chennai"
                            />
                        </div>

                        <div className="md:col-span-2 flex gap-4 mt-4">
                            <button type="submit" className="flex-1 bg-brand-600 hover:bg-brand-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-brand-500/20 transition-all flex items-center justify-center gap-2">
                                <Save size={20} /> {editingId ? 'Update Record' : 'Save Student'}
                            </button>
                            <button type="button" onClick={() => setShowForm(false)} className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-4 rounded-xl border border-white/10 transition-all">
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid gap-4">
                {paginatedData.map((student, idx) => (
                    <div key={student.rid || idx} className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:border-white/20 transition-all group">
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-6">
                            <div className="flex gap-6 items-center flex-1">
                                <div className="w-16 h-16 bg-brand-500/10 rounded-2xl flex items-center justify-center">
                                    {student.image ? (
                                        <img src={getImageUrl(student.image) || ''} alt="" className="w-full h-full object-cover rounded-2xl" referrerPolicy="no-referrer" />
                                    ) : (
                                        <User className="text-brand-500 w-8 h-8" />
                                    )}
                                </div>
                                <div className="space-y-1">
                                    <h4 className="text-lg font-bold text-white">{student.stdname}</h4>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs bg-brand-500/20 text-brand-400 px-2 py-0.5 rounded-full font-bold">RID: {student.rid}</span>
                                        <span className="text-xs text-gray-500">•</span>
                                        <p className="text-xs text-gray-400">{student.subject}</p>
                                    </div>
                                    <div className="flex gap-4 pt-1">
                                        <p className="text-[10px] text-gray-500 uppercase tracking-widest"><span className="text-gray-600">Issued:</span> {student.dob || 'N/A'}</p>
                                        <p className="text-[10px] text-gray-500 uppercase tracking-widest"><span className="text-gray-600">Place:</span> {student.gender || 'N/A'}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-2 w-full sm:w-auto">
                                <button
                                    onClick={() => handleEdit(student)}
                                    className="p-3 bg-white/5 text-gray-400 hover:text-brand-500 hover:bg-white/10 rounded-xl transition-all shadow-sm flex items-center justify-center flex-1 sm:flex-none"
                                    title="Edit Student"
                                >
                                    <Pencil size={18} />
                                </button>
                                <button
                                    onClick={() => onDeleteStudent(student.rid)}
                                    className="p-3 bg-white/5 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all shadow-sm flex items-center justify-center flex-1 sm:flex-none"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredData.length > itemsPerPage && (
                <div className="flex justify-center items-center gap-4 pt-8">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(prev => prev - 1)}
                        className="p-2 bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white rounded-lg disabled:opacity-50 transition-all font-bold"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <span className="text-gray-400 text-sm font-bold">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(prev => prev + 1)}
                        className="p-2 bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white rounded-lg disabled:opacity-50 transition-all font-bold"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            )}

            {filteredData.length === 0 && !loading && (
                <div className="text-center py-24 bg-white/3 border border-dashed border-white/10 rounded-3xl">
                    <GraduationCap className="text-gray-600 w-8 h-8 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white">No student records found</h3>
                </div>
            )}
        </div>
    );
}
