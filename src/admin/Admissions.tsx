import { useState, useRef } from 'react';
import type { ChangeEvent } from 'react';
import {
    User,
    Trash2,
    X,
    Save,
    GraduationCap,
    Search,
    ChevronDown,
    ChevronUp,
    FileText,
    BookOpen,
    UserCheck,
    Info,
    Paperclip,
    Upload,
    Loader2,
    Building2,
    Phone,
    Download,
    FileDown
} from 'lucide-react';
import jsPDF from 'jspdf';
import CourseSelect from './CourseSelect';



interface AdmissionsProps {
    data: any[];
    loading: boolean;
    onAddAdmission: (admission: any) => void;
    onDeleteAdmission: (id: any) => void;
    showForm: boolean;
    setShowForm: (show: boolean) => void;
    role?: string;
    courses: any[];
}


const initialForm = {
    course_information: {
        course_name: '',
        course_code: '',
        registration_number: '',
        application_number: '',
        passport_photo: ''
    },
    biographical_information: {
        full_name: '',
        place_of_birth: '',
        state_country: '',
        religion: '',
        nationality: '',
        mother_tongue: '',
        sex: '',
        date_of_birth: '',
        blood_group: '',
        permanent_address: '',
        telephone_number: '',
        mobile_number: '',
        email: ''
    },
    education_details: {
        qualifying_exam_name: '',
        year_of_passing: '',
        number_of_attempts: '',
        affiliating_body_university: '',
        institution_last_studied: ''
    },
    declaration: {
        parent_name: '',
        parent_signature: '',
        student_name: '',
        candidate_signature: '',
        place: '',
        date: ''
    },
    additional_information: {
        reason_for_interest_1: '',
        reason_for_interest_2: '',
        reason_for_interest_3: ''
    },
    attachments_required: {
        application_fee: '',
        registration_fee_nri: '',
        certificates_and_marksheets: '',
        passport_photos: ''
    }
};

export default function Admissions({ data, loading, onAddAdmission, onDeleteAdmission, showForm, setShowForm, role, courses }: AdmissionsProps) {
    const [formData, setFormData] = useState(initialForm);
    const [expandedSection, setExpandedSection] = useState<string | null>('course_information');
    const [searchTerm, setSearchTerm] = useState('');
    const [uploading, setUploading] = useState(false);
    const [selectedAdmission, setSelectedAdmission] = useState<any | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);


    const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('image', file);

        const token = localStorage.getItem('altron_admin_token');

        try {
            const res = await fetch('http://127.0.0.1:5050/api/upload', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            if (res.ok) {
                const result = await res.json();
                handleInputChange('course_information', 'passport_photo', result.url);
            } else {
                if (res.status === 401) {
                    localStorage.removeItem('altron_admin_token');
                    window.location.reload();
                }
                alert('Upload failed. Please try again.');
            }

        } catch (err) {
            console.error('Upload error:', err);
            alert('Upload failed. Network error.');
        } finally {
            setUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };


    const toggleSection = (section: string) => {
        setExpandedSection(expandedSection === section ? null : section);
    };

    const handleInputChange = (section: string, field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [section]: {
                ...(prev as any)[section],
                [field]: value
            }
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAddAdmission(formData);
        setFormData(initialForm);
        setShowForm(false);
    };

    const filteredData = data.filter(item =>
        item.biographical_information?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.course_information?.application_number?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const downloadCSV = (exportData: any[]) => {
        if (!exportData || exportData.length === 0) return;

        const headers = [
            'Full Name', 'Email', 'Mobile', 'Course', 'App Number',
            'Registration Number', 'DOB', 'Sex', 'Nationality',
            'Place of Birth', 'Address', 'Franchise'
        ];

        const rows = exportData.map(item => [
            item.biographical_information?.full_name || '',
            item.biographical_information?.email || '',
            item.biographical_information?.mobile_number || '',
            item.course_information?.course_name || '',
            item.course_information?.application_number || '',
            item.course_information?.registration_number || '',
            item.biographical_information?.date_of_birth || '',
            item.biographical_information?.sex || '',
            item.biographical_information?.nationality || '',
            item.biographical_information?.place_of_birth || '',
            (item.biographical_information?.permanent_address || '').replace(/,/g, ' '),
            item.franchiseEmail || 'admin'
        ]);

        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `admissions_records_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const downloadPDF = async (admission: any) => {
        // If we are calling from the list, we might not have the modal open.
        // Let's create a temporary div to render the admission details for PDF.

        const doc = new jsPDF('p', 'mm', 'a4');
        const padding = 15;
        let y = 20;

        doc.setFontSize(22);
        doc.setTextColor(0, 0, 0);
        doc.text('ADMISSION FORM', 105, y, { align: 'center' });
        y += 15;

        doc.setFontSize(14);
        doc.text('ALTRON EDUCATION', 105, y, { align: 'center' });
        y += 10;

        doc.setLineWidth(0.5);
        doc.line(padding, y, 210 - padding, y);
        y += 10;

        // Application Details
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text(`Application Number: ${admission.course_information?.application_number || 'N/A'}`, padding, y);
        doc.text(`Date: ${new Date().toLocaleDateString()}`, 210 - padding, y, { align: 'right' });
        y += 15;

        const addSection = (title: string, data: any) => {
            doc.setFontSize(12);
            doc.setTextColor(0, 0, 0);
            doc.setFont('helvetica', 'bold');
            doc.text(title.toUpperCase(), padding, y);
            y += 6;
            doc.line(padding, y, 210 - padding, y);
            y += 8;
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(9);

            Object.entries(data).forEach(([key, value]: [string, any]) => {
                if (y > 270) {
                    doc.addPage();
                    y = 20;
                }
                const cleanKey = key.replace(/_/g, ' ').toUpperCase();
                doc.setTextColor(100, 100, 100);
                doc.text(`${cleanKey}:`, padding, y);
                doc.setTextColor(0, 0, 0);
                doc.text(`${value || 'N/A'}`, padding + 50, y);
                y += 6;
            });
            y += 10;
        };

        addSection('Course Information', {
            'Course Name': admission.course_information?.course_name,
            'Course Code': admission.course_information?.course_code,
            'Registration Number': admission.course_information?.registration_number
        });

        addSection('Biographical Information', {
            'Full Name': admission.biographical_information?.full_name,
            'DOB': admission.biographical_information?.date_of_birth,
            'Sex': admission.biographical_information?.sex,
            'Email': admission.biographical_information?.email,
            'Mobile': admission.biographical_information?.mobile_number,
            'Address': admission.biographical_information?.permanent_address
        });

        addSection('Education Details', {
            'Qualifying Exam': admission.education_details?.qualifying_exam_name,
            'Year': admission.education_details?.year_of_passing,
            'Institution': admission.education_details?.institution_last_studied
        });

        addSection('Declaration', {
            'Parent Name': admission.declaration?.parent_name,
            'Place': admission.declaration?.place,
            'Date': admission.declaration?.date
        });

        doc.save(`admission_${admission.course_information?.application_number || admission.id}.pdf`);
    };

    if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500"></div></div>;

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by student name or application number..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:border-brand-500 outline-none transition-all"
                    />
                </div>
                <button
                    onClick={() => downloadCSV(filteredData)}
                    className="bg-brand-500/10 hover:bg-brand-500/20 text-brand-500 px-6 py-3 rounded-xl border border-brand-500/20 flex items-center gap-2 transition-all font-bold"
                    title="Export all filtered records to CSV"
                >
                    <FileDown size={20} />
                    Export CSV
                </button>
            </div>

            {showForm && (
                <div className="bg-white/5 border border-brand-500/30 p-8 rounded-3xl backdrop-blur-xl shadow-2xl mb-12 animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-xl font-bold text-white">New Admission Form</h3>
                        <button onClick={() => setShowForm(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400">
                            <X size={20} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Course Information */}
                        <Section
                            id="course_information"
                            title="Course Information"
                            icon={<BookOpen size={20} />}
                            expanded={expandedSection === 'course_information'}
                            onToggle={() => toggleSection('course_information')}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                                <CourseSelect
                                    label="Course Name"
                                    value={formData.course_information.course_name}
                                    onChange={v => handleInputChange('course_information', 'course_name', v)}
                                    courses={courses}
                                />
                                <Field label="Course Code" value={formData.course_information.course_code} onChange={v => handleInputChange('course_information', 'course_code', v)} />

                                <Field label="Registration Number" value={formData.course_information.registration_number} onChange={v => handleInputChange('course_information', 'registration_number', v)} />
                                <Field label="Application Number" value={formData.course_information.application_number} onChange={v => handleInputChange('course_information', 'application_number', v)} />
                                <div className="md:col-span-2">
                                    <label className="block text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2">Passport Photo</label>
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <div className="flex-1 relative">
                                            <input
                                                type="text"
                                                value={formData.course_information.passport_photo}
                                                onChange={e => handleInputChange('course_information', 'passport_photo', e.target.value)}
                                                placeholder="Enter photo URL or upload below"
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-500 outline-none"
                                            />
                                        </div>
                                        <div className="flex gap-4">
                                            <input
                                                type="file"
                                                ref={fileInputRef}
                                                onChange={handleImageUpload}
                                                className="hidden"
                                                accept="image/*"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => fileInputRef.current?.click()}
                                                disabled={uploading}
                                                className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-all disabled:opacity-50"
                                            >
                                                {uploading ? <Loader2 className="animate-spin w-4 h-4" /> : <Upload size={18} />}
                                                {uploading ? 'Uploading...' : 'Upload'}
                                            </button>
                                            {formData.course_information.passport_photo && (
                                                <div className="w-12 h-12 rounded-xl border border-white/10 overflow-hidden bg-white/5">
                                                    <img src={formData.course_information.passport_photo} alt="" className="w-full h-full object-cover" />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </Section>

                        {/* Biographical Information */}
                        <Section
                            id="biographical_information"
                            title="Biographical Information"
                            icon={<User size={20} />}
                            expanded={expandedSection === 'biographical_information'}
                            onToggle={() => toggleSection('biographical_information')}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
                                <Field label="Full Name" value={formData.biographical_information.full_name} onChange={v => handleInputChange('biographical_information', 'full_name', v)} />
                                <Field label="Date of Birth" type="date" value={formData.biographical_information.date_of_birth} onChange={v => handleInputChange('biographical_information', 'date_of_birth', v)} />
                                <Field label="Sex" value={formData.biographical_information.sex} onChange={v => handleInputChange('biographical_information', 'sex', v)} />
                                <Field label="Place of Birth" value={formData.biographical_information.place_of_birth} onChange={v => handleInputChange('biographical_information', 'place_of_birth', v)} />
                                <Field label="State/Country" value={formData.biographical_information.state_country} onChange={v => handleInputChange('biographical_information', 'state_country', v)} />
                                <Field label="Nationality" value={formData.biographical_information.nationality} onChange={v => handleInputChange('biographical_information', 'nationality', v)} />
                                <Field label="Religion" value={formData.biographical_information.religion} onChange={v => handleInputChange('biographical_information', 'religion', v)} />
                                <Field label="Mother Tongue" value={formData.biographical_information.mother_tongue} onChange={v => handleInputChange('biographical_information', 'mother_tongue', v)} />
                                <Field label="Blood Group" value={formData.biographical_information.blood_group} onChange={v => handleInputChange('biographical_information', 'blood_group', v)} />
                                <Field label="Mobile Number" value={formData.biographical_information.mobile_number} onChange={v => handleInputChange('biographical_information', 'mobile_number', v)} />
                                <Field label="Email" type="email" value={formData.biographical_information.email} onChange={v => handleInputChange('biographical_information', 'email', v)} />
                                <div className="md:col-span-3">
                                    <label className="block text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2">Permanent Address</label>
                                    <textarea
                                        value={formData.biographical_information.permanent_address}
                                        onChange={e => handleInputChange('biographical_information', 'permanent_address', e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-500 outline-none min-h-[80px]"
                                    />
                                </div>
                            </div>
                        </Section>

                        {/* Education Details */}
                        <Section
                            id="education_details"
                            title="Education Details"
                            icon={<GraduationCap size={20} />}
                            expanded={expandedSection === 'education_details'}
                            onToggle={() => toggleSection('education_details')}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                                <Field label="Qualifying Exam" value={formData.education_details.qualifying_exam_name} onChange={v => handleInputChange('education_details', 'qualifying_exam_name', v)} />
                                <Field label="Year of Passing" value={formData.education_details.year_of_passing} onChange={v => handleInputChange('education_details', 'year_of_passing', v)} />
                                <Field label="Number of Attempts" value={formData.education_details.number_of_attempts} onChange={v => handleInputChange('education_details', 'number_of_attempts', v)} />
                                <Field label="University/Board" value={formData.education_details.affiliating_body_university} onChange={v => handleInputChange('education_details', 'affiliating_body_university', v)} />
                                <div className="md:col-span-2">
                                    <Field label="Institution Last Studied" value={formData.education_details.institution_last_studied} onChange={v => handleInputChange('education_details', 'institution_last_studied', v)} />
                                </div>
                            </div>
                        </Section>

                        {/* Declaration */}
                        <Section
                            id="declaration"
                            title="Declaration"
                            icon={<UserCheck size={20} />}
                            expanded={expandedSection === 'declaration'}
                            onToggle={() => toggleSection('declaration')}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                                <Field label="Parent/Guardian Name" value={formData.declaration.parent_name} onChange={v => handleInputChange('declaration', 'parent_name', v)} />
                                <Field label="Student Name" value={formData.declaration.student_name} onChange={v => handleInputChange('declaration', 'student_name', v)} />
                                <Field label="Place" value={formData.declaration.place} onChange={v => handleInputChange('declaration', 'place', v)} />
                                <Field label="Date" type="date" value={formData.declaration.date} onChange={v => handleInputChange('declaration', 'date', v)} />
                            </div>
                        </Section>

                        {/* Additional info and Attachments */}
                        <div className="grid md:grid-cols-2 gap-4">
                            <Section
                                id="additional_information"
                                title="Additional Info"
                                icon={<Info size={18} />}
                                expanded={expandedSection === 'additional_information'}
                                onToggle={() => toggleSection('additional_information')}
                            >
                                <div className="p-4 space-y-3">
                                    <Field label="Reason 1" value={formData.additional_information.reason_for_interest_1} onChange={v => handleInputChange('additional_information', 'reason_for_interest_1', v)} />
                                    <Field label="Reason 2" value={formData.additional_information.reason_for_interest_2} onChange={v => handleInputChange('additional_information', 'reason_for_interest_2', v)} />
                                    <Field label="Reason 3" value={formData.additional_information.reason_for_interest_3} onChange={v => handleInputChange('additional_information', 'reason_for_interest_3', v)} />
                                </div>
                            </Section>
                            <Section
                                id="attachments"
                                title="Attachments"
                                icon={<Paperclip size={18} />}
                                expanded={expandedSection === 'attachments'}
                                onToggle={() => toggleSection('attachments')}
                            >
                                <div className="p-4 space-y-3">
                                    <Field label="Application Fee Ref" value={formData.attachments_required.application_fee} onChange={v => handleInputChange('attachments_required', 'application_fee', v)} />
                                    <Field label="Registration Fee" value={formData.attachments_required.registration_fee_nri} onChange={v => handleInputChange('attachments_required', 'registration_fee_nri', v)} />
                                    <Field label="Certificates (Checklist)" value={formData.attachments_required.certificates_and_marksheets} onChange={v => handleInputChange('attachments_required', 'certificates_and_marksheets', v)} />
                                </div>
                            </Section>
                        </div>

                        <div className="flex gap-4 pt-6">
                            <button type="submit" className="flex-1 bg-brand-600 hover:bg-brand-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-brand-500/20 transition-all flex items-center justify-center gap-2">
                                <Save size={20} /> Save Admission
                            </button>
                            <button type="button" onClick={() => setShowForm(false)} className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-4 rounded-xl border border-white/10 transition-all">
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid gap-4">
                {filteredData.map((admission, idx) => (
                    <div key={admission.id || idx} className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:border-white/20 transition-all group">
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-6">
                            <div
                                className="flex gap-6 items-center flex-1 cursor-pointer"
                                onClick={() => setSelectedAdmission(admission)}
                            >
                                <div className="w-16 h-16 bg-brand-500/10 rounded-2xl flex items-center justify-center overflow-hidden border border-brand-500/20 group-hover:scale-105 transition-transform">
                                    {admission.course_information?.passport_photo ? (
                                        <img src={admission.course_information.passport_photo} alt="" className="w-full h-full object-cover" />
                                    ) : (
                                        <User className="text-brand-500 w-8 h-8" />
                                    )}
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <h4 className="text-lg font-bold text-white mb-0.5">{admission.biographical_information?.full_name}</h4>
                                        {role === 'admin' && (
                                            <span className="text-[10px] bg-white/10 text-gray-400 px-2 py-0.5 rounded flex items-center gap-1 border border-white/5 uppercase tracking-tighter">
                                                <Building2 size={10} className="text-brand-500" /> {admission.franchiseEmail === 'admin' ? 'Managed by Admin' : admission.franchiseEmail}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs bg-brand-500/20 text-brand-400 px-2 py-0.5 rounded-lg font-bold">
                                            APP: {admission.course_information?.application_number}
                                        </span>
                                        <span className="text-xs text-gray-500">•</span>
                                        <p className="text-xs text-gray-400 font-medium">{admission.course_information?.course_name}</p>
                                    </div>
                                    <div className="flex gap-4 pt-1.5 overflow-hidden">
                                        <p className="text-[10px] text-gray-500 uppercase tracking-widest truncate">
                                            <span className="text-gray-600 font-bold">Email:</span> {admission.biographical_information?.email}
                                        </p>
                                        <p className="text-[10px] text-gray-500 uppercase tracking-widest">
                                            <span className="text-gray-600 font-bold">Mobile:</span> {admission.biographical_information?.mobile_number}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => downloadPDF(admission)}
                                    className="p-3 bg-white/5 text-brand-500 hover:bg-brand-500/10 rounded-xl transition-all shadow-sm border border-white/5"
                                    title="Download PDF"
                                >
                                    <Download size={18} />
                                </button>
                                <button
                                    onClick={() => setSelectedAdmission(admission)}
                                    className="p-3 bg-white/5 text-brand-500 hover:bg-brand-500/10 rounded-xl transition-all shadow-sm border border-white/5"
                                    title="View Full Details"
                                >
                                    <FileText size={18} />
                                </button>
                                <button
                                    onClick={() => onDeleteAdmission(admission.id)}
                                    className="p-3 bg-white/5 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all shadow-sm border border-white/5"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Details Modal */}
            {selectedAdmission && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
                    <div className="bg-[#111] border border-white/10 w-full max-w-4xl max-h-[90vh] rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl animate-in zoom-in-95 duration-300">
                        {/* Modal Header */}
                        <div className="p-8 border-b border-white/10 flex justify-between items-center bg-gradient-to-r from-brand-500/10 to-transparent">
                            <div className="flex items-center gap-6">
                                <div className="w-20 h-20 bg-brand-500 rounded-3xl flex items-center justify-center overflow-hidden border-2 border-white/10 shadow-lg">
                                    {selectedAdmission.course_information?.passport_photo ? (
                                        <img src={selectedAdmission.course_information.passport_photo} alt="" className="w-full h-full object-cover" />
                                    ) : (
                                        <User className="text-white w-10 h-10" />
                                    )}
                                </div>
                                <div className="space-y-1">
                                    <h2 className="text-3xl font-black text-white tracking-tight">{selectedAdmission.biographical_information?.full_name}</h2>
                                    <p className="text-brand-500 font-bold uppercase tracking-widest text-xs">Application #{selectedAdmission.course_information?.application_number}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedAdmission(null)}
                                className="p-4 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-full transition-all border border-white/10"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-8 overflow-y-auto space-y-10 custom-scrollbar">
                            {/* Summary Bar */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-white/5 rounded-3xl border border-white/5">
                                <SummaryItem label="Course" value={selectedAdmission.course_information?.course_name} />
                                <SummaryItem label="Sex" value={selectedAdmission.biographical_information?.sex} />
                                <SummaryItem label="DOB" value={selectedAdmission.biographical_information?.date_of_birth} />
                                <SummaryItem label="Blood Group" value={selectedAdmission.biographical_information?.blood_group} />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <DetailSection title="Personal Information" icon={<User size={18} className="text-brand-500" />}>
                                    <DetailItem label="Full Name" value={selectedAdmission.biographical_information?.full_name} />
                                    <DetailItem label="DOB" value={selectedAdmission.biographical_information?.date_of_birth} />
                                    <DetailItem label="Sex" value={selectedAdmission.biographical_information?.sex} />
                                    <DetailItem label="Place of Birth" value={selectedAdmission.biographical_information?.place_of_birth} />
                                    <DetailItem label="State/Country" value={selectedAdmission.biographical_information?.state_country} />
                                    <DetailItem label="Nationality" value={selectedAdmission.biographical_information?.nationality} />
                                    <DetailItem label="Religion" value={selectedAdmission.biographical_information?.religion} />
                                    <DetailItem label="Mother Tongue" value={selectedAdmission.biographical_information?.mother_tongue} />
                                </DetailSection>

                                <DetailSection title="Contact Details" icon={<Phone size={18} className="text-brand-500" />}>
                                    <DetailItem label="Email" value={selectedAdmission.biographical_information?.email} isEmail />
                                    <DetailItem label="Mobile" value={selectedAdmission.biographical_information?.mobile_number} />
                                    <DetailItem label="Permanent Address" value={selectedAdmission.biographical_information?.permanent_address} fullWidth />
                                </DetailSection>

                                <DetailSection title="Academic Background" icon={<GraduationCap size={18} className="text-brand-500" />}>
                                    <DetailItem label="Exam" value={selectedAdmission.education_details?.qualifying_exam_name} />
                                    <DetailItem label="Year" value={selectedAdmission.education_details?.year_of_passing} />
                                    <DetailItem label="Attempts" value={selectedAdmission.education_details?.number_of_attempts} />
                                    <DetailItem label="Institution" value={selectedAdmission.education_details?.institution_last_studied} fullWidth />
                                    <DetailItem label="University" value={selectedAdmission.education_details?.affiliating_body_university} fullWidth />
                                </DetailSection>

                                <DetailSection title="Administration" icon={<Info size={18} className="text-brand-500" />}>
                                    <DetailItem label="Course Code" value={selectedAdmission.course_information?.course_code} />
                                    <DetailItem label="Registration #" value={selectedAdmission.course_information?.registration_number} />
                                    <DetailItem label="Franchise ID" value={selectedAdmission.franchiseEmail} />
                                    <DetailItem label="Added Role" value={selectedAdmission.addedByRole} />
                                </DetailSection>

                                <DetailSection title="Declaration" icon={<UserCheck size={18} className="text-brand-500" />}>
                                    <DetailItem label="Parent Name" value={selectedAdmission.declaration?.parent_name} />
                                    <DetailItem label="Student Name" value={selectedAdmission.declaration?.student_name} />
                                    <DetailItem label="Place" value={selectedAdmission.declaration?.place} />
                                    <DetailItem label="Date" value={selectedAdmission.declaration?.date} />
                                </DetailSection>

                                <DetailSection title="Additional Info" icon={<Paperclip size={18} className="text-brand-500" />}>
                                    <DetailItem label="Application Fee" value={selectedAdmission.attachments_required?.application_fee} />
                                    <DetailItem label="Registration Fee" value={selectedAdmission.attachments_required?.registration_fee_nri} />
                                    <DetailItem label="Interests" value={selectedAdmission.additional_information?.reason_for_interest_1} fullWidth />
                                </DetailSection>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="p-8 border-t border-white/10 flex justify-end gap-4 bg-white/[0.02]">
                            <button
                                onClick={() => downloadPDF(selectedAdmission)}
                                className="px-10 py-4 bg-white/5 hover:bg-white/10 text-white font-black rounded-2xl transition-all border border-white/10 flex items-center gap-2"
                            >
                                <Download size={20} />
                                Download PDF
                            </button>
                            <button
                                onClick={() => setSelectedAdmission(null)}
                                className="px-10 py-4 bg-brand-500 hover:bg-brand-600 text-white font-black rounded-2xl transition-all shadow-xl shadow-brand-500/20 active:scale-95"
                            >
                                Close View
                            </button>
                        </div>
                    </div>
                </div>
            )}


            {filteredData.length === 0 && !loading && (
                <div className="text-center py-24 bg-white/3 border border-dashed border-white/10 rounded-3xl">
                    <FileText className="text-gray-600 w-8 h-8 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white">No admission records found</h3>
                    <p className="text-gray-400 mt-2">New student registrations will appear here</p>
                </div>
            )}
        </div>
    );
}

function Section({ id, title, icon, children, expanded, onToggle }: { id: string, title: string, icon: React.ReactNode, children: React.ReactNode, expanded: boolean, onToggle: () => void }) {
    return (
        <div className={`border rounded-2xl overflow-hidden transition-all ${expanded ? 'bg-white/5 border-white/20' : 'bg-transparent border-white/10'}`}>
            <button
                type="button"
                onClick={onToggle}
                className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <span className="text-brand-500">{icon}</span>
                    <span className="text-sm font-bold text-white tracking-wide uppercase">{title}</span>
                </div>
                {expanded ? <ChevronUp size={18} className="text-gray-500" /> : <ChevronDown size={18} className="text-gray-500" />}
            </button>
            {expanded && (
                <div className="border-t border-white/10 bg-black/20">
                    {children}
                </div>
            )}
        </div>
    );
}

function Field({ label, value, onChange, type = "text" }: { label: string, value: string, onChange: (v: string) => void, type?: string }) {
    return (
        <div>
            <label className="block text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2">{label}</label>
            <input
                type={type}
                value={value}
                onChange={e => onChange(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-500 outline-none"
            />
        </div>
    );
}

function SummaryItem({ label, value }: { label: string, value: string }) {
    return (
        <div className="text-center">
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">{label}</p>
            <p className="text-white font-bold text-sm truncate">{value || 'N/A'}</p>
        </div>
    );
}

function DetailSection({ title, icon, children }: { title: string, icon: React.ReactNode, children: React.ReactNode }) {
    return (
        <div className="space-y-4">
            <h5 className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest">
                {icon} {title}
            </h5>
            <div className="grid grid-cols-2 gap-4">
                {children}
            </div>
        </div>
    );
}

function DetailItem({ label, value, fullWidth = false, isEmail = false }: { label: string, value: string, fullWidth?: boolean, isEmail?: boolean }) {
    return (
        <div className={`${fullWidth ? 'col-span-2' : 'col-span-1'} space-y-1 bg-white/[0.02] p-3 rounded-xl border border-white/5`}>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{label}</p>
            <p className={`text-white text-sm font-medium ${isEmail ? 'lowercase' : ''} break-words`}>{value || '—'}</p>
        </div>
    );
}

