import React, { useState, useRef, useEffect } from 'react';
import { User, Trash2, X, Save, GraduationCap, Search, Pencil, Upload, ChevronLeft, ChevronRight, Image as ImageIcon, Award } from 'lucide-react';
import jsPDF from 'jspdf';
import CourseSelect from './CourseSelect';
import { API_BASE } from '../config/api';

const getBase64 = async (url: string): Promise<string | null> => {
    try {
        const response = await fetch(url);
        const blob = await response.blob();
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    } catch { return null; }
};


interface StudentsProps {
    data: any[];
    loading: boolean;
    onAddStudent: (student: any | FormData) => void;
    onDeleteStudent: (rid: any) => void;
    showForm: boolean;
    setShowForm: (show: boolean) => void;
    courses: any[];
    prefill?: any | null;
    onClearPrefill?: () => void;
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

export default function Students({ data, loading, onAddStudent, onDeleteStudent, showForm, setShowForm, courses, prefill, onClearPrefill }: StudentsProps) {

    const [formData, setFormData] = useState({
        rid: '',
        stdname: '',
        subject: '',
        dob: '',
        gender: '',
        image: ''
    });

    const [editingId, setEditingId] = useState<string | null>(null);
    const [certModal, setCertModal] = useState(false);
    const [certStudent, setCertStudent] = useState<any>(null);
    const [certForm, setCertForm] = useState({ from: '', to: '', place: '', grade: '' });
    const [generating, setGenerating] = useState(false);

    const openCertModal = (student: any) => {
        setCertStudent(student);
        setCertForm({ from: '', to: '', place: student.gender || '', grade: '' });
        setCertModal(true);
    };

    const generateCertificate = async () => {
        if (!certStudent) return;
        setGenerating(true);
        await new Promise(r => setTimeout(r, 2000));
        try {
            const doc = new jsPDF('l', 'mm', 'a4');
            const W = 297, H = 210, mg = 8;
            const RED    = [185, 28, 28] as const;
            const GOLD   = [184, 134, 11] as const;
            const DARK   = [17, 24, 39] as const;
            const CRIMSON= [160, 10, 10] as const;
            const DKGOLD = [120, 80, 0] as const;

            // ── White background ──
            doc.setFillColor(255, 255, 255);
            doc.rect(0, 0, W, H, 'F');

            // ── Gold double border ──
            doc.setDrawColor(...GOLD); doc.setLineWidth(3);
            doc.rect(mg, mg, W-2*mg, H-2*mg);
            doc.setLineWidth(0.6);
            doc.rect(mg+3, mg+3, W-2*mg-6, H-2*mg-6);

            // ── Red corner triangles (larger, matching design) ──
            doc.setFillColor(...RED);
            doc.triangle(W-mg-45, mg, W-mg, mg, W-mg, mg+45, 'F');
            doc.triangle(mg, H-mg, mg+45, H-mg, mg, H-mg-45, 'F');

            // ── Roll No + Photo box ──
            const pX = mg+6, pY = mg+6;
            doc.setFont('helvetica','bold'); doc.setFontSize(7.5); doc.setTextColor(...DARK);
            doc.text(`Roll No.  ${certStudent.rid}`, pX, pY+4);
            doc.setDrawColor(...RED); doc.setLineWidth(1);
            doc.rect(pX, pY+7, 28, 34);
            if (certStudent.image) {
                try {
                    const imgUrl = getImageUrl(certStudent.image);
                    if (imgUrl) { const b64 = await getBase64(imgUrl); if (b64) doc.addImage(b64,'JPEG',pX,pY+7,28,34); }
                } catch {}
            }

            // ── Academy title (center, right of photo) ──
            const tX = (mg + 40 + W - mg) / 2;   // center between photo-right and right margin
            doc.setFont('helvetica','bold'); doc.setFontSize(18); doc.setTextColor(...DARK);
            doc.text('ALTRON SAFETY & SECURITY ACADEMY', tX, mg+20, {align:'center'});
            doc.setFont('helvetica','normal'); doc.setFontSize(9.5); doc.setTextColor(...RED);
            doc.text('Micro, Small & Medium Enterprises - Government of India', tX, mg+30, {align:'center'});

            // ── Altron logo (top-right, before triangle) ──
            try { const lb = await getBase64('/applogo.png'); if (lb) doc.addImage(lb,'PNG', W-mg-38, mg+5, 25, 25); } catch {}

            // ── Red separator line ──
            doc.setDrawColor(...RED); doc.setLineWidth(1);
            doc.line(mg+5, mg+38, W-mg-5, mg+38);

            // ── CERTIFICATE (large, spaced) ──
            doc.setFont('times','italic'); doc.setFontSize(52); doc.setTextColor(...CRIMSON);
            doc.text('C E R T I F I C A T E', W/2, mg+62, {align:'center'});

            // ── OF COMPLETION with long flanking gold lines ──
            const ocY = mg+73;
            doc.setFont('helvetica','bold'); doc.setFontSize(11); doc.setTextColor(...DKGOLD);
            doc.setDrawColor(...GOLD); doc.setLineWidth(0.6);
            doc.line(mg+14, ocY-1.5, W/2-38, ocY-1.5);
            doc.text('OF COMPLETION', W/2, ocY, {align:'center'});
            doc.line(W/2+38, ocY-1.5, W-mg-14, ocY-1.5);

            // ── Body fields (4 rows, 14mm spacing) ──
            let bY = ocY + 16;
            const lm = mg+14, rm = W-mg-12;
            doc.setFont('helvetica','italic'); doc.setFontSize(11); doc.setTextColor(...DARK);
            doc.setDrawColor(160,160,160); doc.setLineWidth(0.3);

            const dash  = () => doc.setLineDashPattern([0.8,1.2], 0);
            const solid = () => doc.setLineDashPattern([], 0);

            // Row 1: This is to certify that [name] ....
            doc.text('This is to certify that', lm, bY);
            const nm = certStudent.stdname || '';
            doc.setFont('helvetica','bolditalic');
            doc.text(nm, lm+53, bY);
            dash(); doc.line(lm+53+doc.getTextWidth(nm)+3, bY+0.5, rm, bY+0.5); solid();

            bY += 14;
            // Row 2: has successfully completed [course] ....
            doc.setFont('helvetica','italic');
            doc.text('has successfully completed', lm, bY);
            const cv = certStudent.subject || '';
            doc.setFont('helvetica','bolditalic');
            doc.text(cv, lm+67, bY);
            dash(); doc.line(lm+67+doc.getTextWidth(cv)+3, bY+0.5, rm, bY+0.5); solid();

            bY += 14;
            // Row 3: Course in .... Grade ....
            doc.setFont('helvetica','italic');
            doc.text('Course in', lm, bY);
            dash(); doc.line(lm+27, bY+0.5, W/2-15, bY+0.5); solid();
            doc.text('Grade', W/2-10, bY);
            doc.setFont('helvetica','bolditalic');
            if (certForm.grade) doc.text(certForm.grade, W/2+15, bY);
            dash(); doc.line(W/2+14, bY+0.5, rm, bY+0.5); solid();

            bY += 14;
            // Row 4: During the period from [from] .... To [to] ....
            doc.setFont('helvetica','italic');
            doc.text('During the period from', lm, bY);
            const fv = certForm.from || '';
            doc.setFont('helvetica','bolditalic');
            doc.text(fv, lm+60, bY);
            dash(); doc.line(lm+60+doc.getTextWidth(fv)+3, bY+0.5, W/2+10, bY+0.5); solid();
            doc.setFont('helvetica','italic'); doc.text('To', W/2+14, bY);
            const tv = certForm.to || '';
            doc.setFont('helvetica','bolditalic'); doc.text(tv, W/2+24, bY);
            dash(); doc.line(W/2+24+doc.getTextWidth(tv)+3, bY+0.5, rm, bY+0.5); solid();

            // ── Bottom section separator ──
            const botY = bY + 14;
            doc.setDrawColor(...GOLD); doc.setLineWidth(0.5);
            doc.line(mg+5, botY, W-mg-5, botY);

            // Vertical dividers (3 columns)
            const col1 = mg + 80;   // left | center divider
            const col2 = W-mg-60;   // center | right divider
            doc.line(col1, botY, col1, H-mg-6);
            doc.line(col2, botY, col2, H-mg-6);

            // Left column: MSME text + Grades
            const lc = mg+12;
            doc.setFont('helvetica','bold'); doc.setFontSize(8); doc.setTextColor(...RED);
            doc.text('Ministry of MSME, Govt. of India', lc, botY+8);
            doc.text('Grades', lc, botY+16);
            doc.setTextColor(80,80,80); doc.setFont('helvetica','normal'); doc.setFontSize(7.5);
            doc.text('50% to <60%  -  Pass', lc, botY+22);
            doc.text('60% to <70%  -  Credit', lc, botY+28);
            doc.text('70% & above  -  Distinction', lc, botY+34);

            // Center column: gold medal circle
            const sX = (col1 + col2) / 2;
            doc.setDrawColor(...GOLD); doc.setLineWidth(1.5);
            doc.circle(sX, botY+22, 15, 'D');
            doc.setLineWidth(0.5);
            doc.circle(sX, botY+22, 17, 'D');
            doc.setFont('helvetica','bold'); doc.setFontSize(9); doc.setTextColor(...RED);
            doc.text('ALTRON', sX, botY+20, {align:'center'});
            doc.setFontSize(7); doc.setTextColor(...GOLD);
            doc.text('★  ★  ★', sX, botY+27, {align:'center'});

            // Right column: Authorised Signatory
            const rc = col2 + 8;
            const lineEnd = W-mg-12;
            doc.setDrawColor(...DKGOLD); doc.setLineWidth(0.5);
            doc.line(rc, botY+28, lineEnd, botY+28);
            doc.setFont('helvetica','bold'); doc.setFontSize(10); doc.setTextColor(...GOLD);
            doc.text('Authorised Signatory', (rc+lineEnd)/2, botY+34, {align:'center'});
            doc.setFontSize(9); doc.setTextColor(...DARK); doc.setFont('helvetica','normal');
            doc.text(`Place:  ${certForm.place || ''}`, rc, botY+42);

            // ── Footer ──
            doc.setFontSize(8); doc.setTextColor(120,120,120);
            doc.text('To Verify this Certificate visit  www.altroneducation.com/authenticity/', W/2, H-mg-3, {align:'center'});

            doc.save(`${(certStudent.stdname||'certificate').replace(/\s+/g,'_')}_certificate.pdf`);
        } catch (e) { console.error(e); }
        setGenerating(false);
        setCertModal(false);
    };

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

            // Apply prefill if available
            if (prefill) {
                setFormData(prev => ({
                    ...prev,
                    rid: String(nextRid),
                    dob: getTodayDate(),
                    stdname: prefill.stdname || '',
                    subject: prefill.subject || '',
                    image: prefill.image || '',
                }));
                if (prefill.image) setImagePreview(prefill.image);
                onClearPrefill?.();
            } else {
                setFormData(prev => ({
                    ...prev,
                    rid: String(nextRid),
                    dob: getTodayDate()
                }));
            }
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
        String(s.rid || '').toLowerCase().includes(searchTerm.toLowerCase())
    ).sort((a, b) => {
        const numA = parseInt(a.rid);
        const numB = parseInt(b.rid);
        if (!isNaN(numA) && !isNaN(numB)) return numB - numA;
        return String(b.rid || '').localeCompare(String(a.rid || ''));
    }) : [];

    // Pagination logic
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

    if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500"></div></div>;

    return (
        <>
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
                                    onClick={() => openCertModal(student)}
                                    className="p-3 bg-yellow-500/10 text-yellow-400 hover:text-yellow-300 hover:bg-yellow-500/20 rounded-xl transition-all shadow-sm flex items-center justify-center flex-1 sm:flex-none"
                                    title="Generate Certificate"
                                >
                                    <Award size={18} />
                                </button>
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

        {/* Certificate Modal */}
        {certModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
                <div className="bg-slate-900 border border-yellow-500/30 rounded-3xl p-8 w-full max-w-md shadow-2xl relative">
                    <button onClick={() => setCertModal(false)} className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full text-gray-400">
                        <X size={20} />
                    </button>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-yellow-500/10 rounded-xl"><Award className="text-yellow-400" size={22} /></div>
                        <div>
                            <h3 className="text-white font-bold text-lg">Generate Certificate</h3>
                            <p className="text-gray-400 text-xs">{certStudent?.stdname}</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">From Date</label>
                            <input type="text" placeholder="e.g. 01.01.2025" value={certForm.from} onChange={e => setCertForm({...certForm, from: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-yellow-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">To Date</label>
                            <input type="text" placeholder="e.g. 31.12.2025" value={certForm.to} onChange={e => setCertForm({...certForm, to: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-yellow-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Grade</label>
                            <input type="text" placeholder="e.g. Distinction" value={certForm.grade} onChange={e => setCertForm({...certForm, grade: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-yellow-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Place</label>
                            <input type="text" placeholder="e.g. Chennai" value={certForm.place} onChange={e => setCertForm({...certForm, place: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-yellow-500 outline-none" />
                        </div>
                        <button onClick={generateCertificate} disabled={!certForm.from || !certForm.to} className="w-full mt-2 bg-yellow-500 hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2">
                            <Award size={18} /> Generate Certificate
                        </button>
                    </div>
                </div>
            </div>
        )}

        {/* Generating Animation */}
        {generating && (
            <div className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-black/80 backdrop-blur-md">
                <div className="relative flex items-center justify-center mb-6">
                    <div className="w-24 h-24 rounded-full border-4 border-yellow-500/20 border-t-yellow-400 animate-spin" />
                    <Award className="absolute text-yellow-400 w-10 h-10" />
                </div>
                <p className="text-white text-xl font-bold">Generating Certificate...</p>
                <p className="text-gray-400 text-sm mt-2">Please wait while we prepare your document</p>
            </div>
        )}
        </>
    );
}
