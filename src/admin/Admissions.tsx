import { useState, useRef, useEffect } from 'react';
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
    FileDown,
    CheckCircle,
    Pencil
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import CourseSelect from './CourseSelect';
import { API_BASE } from '../config/api';


interface AdmissionsProps {
    data: any[];
    loading: boolean;
    onSaveAdmission: (admission: any) => void;
    onDeleteAdmission: (id: any) => void;
    showForm: boolean;
    setShowForm: (show: boolean) => void;
    role?: string;
    courses: any[];
    onPromoteToStudent?: (admission: any) => void;
}


const initialForm = {
    course_information: {
        course_name: '',
        application_number: '',
        passport_photo: '',
        adhar_card: ''
    },
    biographical_information: {
        full_name: '',
        place_of_birth: '',
        state_country: '',
        religion: '',
        nationality: '',
        mother_tongue: '',
        gender: '',
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

export default function Admissions({ data, loading, onSaveAdmission, onDeleteAdmission, showForm, setShowForm, role, courses, onPromoteToStudent }: AdmissionsProps) {
    const [editingAdmission, setEditingAdmission] = useState<any>(null);
    const [formData, setFormData] = useState(initialForm);
    const [expandedSection, setExpandedSection] = useState<string | null>('course_information');
    const [searchTerm, setSearchTerm] = useState('');
    const [uploading, setUploading] = useState(false);
    const [selectedAdmission, setSelectedAdmission] = useState<any | null>(null);
    const passportInputRef = useRef<HTMLInputElement>(null);
    const adharInputRef = useRef<HTMLInputElement>(null);

    const getNextApplicationNumber = () => {
        if (!data || data.length === 0) return "1000";
        const appNumbers = data
            .map(item => {
                const val = item.course_information?.application_number;
                return typeof val === "string" ? parseInt(val) : val;
            })
            .filter(num => typeof num === "number" && !isNaN(num));

        if (appNumbers.length === 0) return "1000";
        const maxApp = Math.max(...appNumbers);
        return (Math.max(1000, maxApp + 1)).toString();
    };

    useEffect(() => {
        if (showForm && !editingAdmission) {
            const nextAppNum = getNextApplicationNumber();
            setFormData(prev => ({
                ...prev,
                course_information: {
                    ...prev.course_information,
                    application_number: nextAppNum
                }
            }));
        }
    }, [showForm, editingAdmission, data]);

    const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>, field: 'passport_photo' | 'adhar_card') => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const uploadFormData = new FormData();
        uploadFormData.append('image', file);

        const token = localStorage.getItem('altron_admin_token');

        try {
            const res = await fetch(`${API_BASE}/upload`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: uploadFormData
            });

            if (res.ok) {
                const result = await res.json();
                handleInputChange('course_information', field, result.url);
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
            if (passportInputRef.current) passportInputRef.current.value = '';
            if (adharInputRef.current) adharInputRef.current.value = '';
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
        onSaveAdmission({ ...formData, id: editingAdmission?.id });
        setFormData(initialForm);
        setShowForm(false);
        setEditingAdmission(null);
    };

    const handleEdit = (admission: any) => {
        setEditingAdmission(admission);
        setFormData({
            course_information: { ...initialForm.course_information, ...admission.course_information },
            biographical_information: { ...initialForm.biographical_information, ...admission.biographical_information },
            education_details: { ...initialForm.education_details, ...admission.education_details },
            declaration: { ...initialForm.declaration, ...admission.declaration },
            additional_information: { ...initialForm.additional_information, ...admission.additional_information },
            attachments_required: { ...initialForm.attachments_required, ...admission.attachments_required }
        });
        setShowForm(true);
    };

    const filteredData = data.filter(item =>
        item.biographical_information?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.course_information?.application_number?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const downloadCSV = (exportData: any[]) => {
        if (!exportData || exportData.length === 0) return;

        const headers = [
            'Full Name', 'Email', 'Mobile', 'Course', 'App Number',
            'DOB', 'Gender', 'Nationality',
            'Place of Birth', 'Address', 'Franchise'
        ];

        const rows = exportData.map(item => [
            item.biographical_information?.full_name || '',
            item.biographical_information?.email || '',
            item.biographical_information?.mobile_number || '',
            item.course_information?.course_name || '',
            item.course_information?.application_number || '',
            item.biographical_information?.date_of_birth || '',
            item.biographical_information?.gender || '',
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
        } catch (error) {
            console.error('Error converting image to base64:', error);
            return null;
        }
    };

    const downloadPDF = async (admission: any) => {
        const doc = new jsPDF('p', 'mm', 'a4')

        const pageWidth = 210
        const pageHeight = 297
        const margin = 14
        const contentWidth = pageWidth - margin * 2

        let y = 18

        // COLORS
        const RED = [185, 28, 28] as const
        const DARK = [17, 24, 39] as const
        const GRAY = [107, 114, 128] as const
        const LIGHT = [245, 245, 245] as const
        const BORDER = [230, 230, 230] as const

        // ---------- HELPERS ----------

        const sectionTitle = (title: string) => {

            doc.setFillColor(...RED)
            doc.roundedRect(margin, y, 70, 10, 2, 2, 'F')

            doc.setTextColor(255, 255, 255)
            doc.setFontSize(12)
            doc.setFont('helvetica', 'bold')

            doc.text(title.toUpperCase(), margin + 35, y + 6.5, {
                align: 'center',
            })

            y += 13
        }

        const drawField = (
            label: string,
            value: string,
            x: number,
            currentY: number
        ) => {

            doc.setTextColor(...GRAY)
            doc.setFontSize(9)
            doc.setFont('helvetica', 'normal')
            doc.text(label, x, currentY)

            doc.setTextColor(...DARK)
            doc.setFont('helvetica', 'bold')
            doc.text(value || 'N/A', x + 45, currentY)
        }

        const drawBox = (height: number) => {
            doc.setDrawColor(...BORDER)
            doc.setFillColor(255, 255, 255)
            doc.roundedRect(
                margin,
                y,
                contentWidth,
                height,
                3,
                3,
                'FD'
            )
        }

        // ---------- HEADER ----------

        // OUTER BORDER
        doc.setDrawColor(...RED)
        doc.setLineWidth(0.8)
        doc.roundedRect(2, 2, 206, 293, 4, 4)

        // LOGO
        try {

            const logoBase64 = await getBase64('/applogo.png')

            if (logoBase64) {

                doc.addImage(
                    logoBase64,
                    'PNG',
                    margin,
                    y - 3,
                    26,
                    26
                )
            }

        } catch (_e) { }

        // PHOTO
        const photoUrl = admission.course_information?.passport_photo

        if (photoUrl) {

            try {

                const photoBase64 = await getBase64(photoUrl)

                if (photoBase64) {

                    doc.setDrawColor(...RED)

                    doc.roundedRect(
                        pageWidth - 46,
                        y - 1,
                        28,
                        26,
                        3,
                        3
                    )

                    doc.addImage(
                        photoBase64,
                        'JPEG',
                        pageWidth - 44,
                        y + 1,
                        24,
                        22
                    )
                }

            } catch (_e) { }
        }

        // TITLE
        doc.setTextColor(...RED)
        doc.setFontSize(17)
        doc.setFont('helvetica', 'bold')

        doc.text(
            'ALTRON SAFETY &',
            pageWidth / 2 - 10,
            y + 5,
            { align: 'center' }
        )

        doc.text(
            'SECURITY ACADEMY',
            pageWidth / 2 - 10,
            y + 14,
            { align: 'center' }
        )

        doc.setTextColor(...DARK)
        doc.setFontSize(13)

        doc.text(
            'APPLICATION FORM',
            pageWidth / 2 - 10,
            y + 25,
            { align: 'center' }
        )

        y += 28

        // RED DIVIDER
        doc.setDrawColor(...RED)
        doc.setLineWidth(0.5)
        doc.line(margin, y, pageWidth - margin, y)

        y += 5

        // ---------- APPLICATION INFO CARD ----------

        drawBox(14)

        // LEFT
        drawField(
            'Application ID',
            admission.course_information?.application_number || 'N/A',
            margin + 10,
            y + 7
        )

        // RIGHT
        drawField(
            'Generated On',
            new Date().toLocaleDateString(),
            margin + 100,
            y + 7
        )

        y += 18

        // ---------- COURSE DETAILS ----------

        sectionTitle('Course Details')

        drawBox(18)

        drawField(
            'Applied Course',
            admission.course_information?.course_name || 'N/A',
            margin + 10,
            y + 7
        )

        drawField(
            'Application Number',
            admission.course_information?.application_number || 'N/A',
            margin + 10,
            y + 14
        )

        y += 24

        // ---------- PERSONAL DETAILS ----------

        sectionTitle('Student Personal Details')

        drawBox(38)

        const leftX = margin + 10
        const rightX = margin + 98

        const startY = y + 7

        drawField('Full Name', admission.biographical_information?.full_name, leftX, startY)

        drawField('Date of Birth', admission.biographical_information?.date_of_birth, leftX, startY + 7)

        drawField('Nationality', admission.biographical_information?.nationality, leftX, startY + 14)

        drawField('Gender', admission.biographical_information?.gender, leftX, startY + 21)

        drawField('Blood Group', admission.biographical_information?.blood_group, leftX, startY + 28)

        drawField('Mobile', admission.biographical_information?.mobile_number, rightX, startY)

        drawField('Email', admission.biographical_information?.email, rightX, startY + 7)

        drawField('Address', admission.biographical_information?.permanent_address, rightX, startY + 14)

        y += 46

        // ---------- ACADEMIC ----------

        sectionTitle('Academic History')

        drawBox(28)

        drawField(
            'Qualifying Exam',
            admission.education_details?.qualifying_exam_name,
            leftX,
            y + 7
        )

        drawField(
            'Year of Passing',
            admission.education_details?.year_of_passing,
            leftX,
            y + 14
        )

        drawField(
            'Number of Attempts',
            admission.education_details?.number_of_attempts,
            leftX,
            y + 21
        )

        drawField(
            'University/Board',
            admission.education_details?.affiliating_body_university,
            rightX,
            y + 7
        )

        drawField(
            'Institution Last Studied',
            admission.education_details?.institution_last_studied,
            rightX,
            y + 14
        )

        y += 36

        // ---------- DECLARATION ----------

        sectionTitle('Declaration')

        drawBox(22)

        const declaration = `I hereby declare that the information provided in this application is true and complete to the best of my knowledge and belief. I understand that any false or misleading information may result in the cancellation of my admission. I agree to abide by the rules and regulations of Altron Academy during the tenure of my course.`

        doc.setFont('helvetica', 'normal')
        doc.setTextColor(...DARK)
        doc.setFontSize(9)

        const declarationLines = doc.splitTextToSize(
            declaration,
            170
        )

        doc.text(
            declarationLines,
            margin + 10,
            y + 8
        )

        y += 38

        // ---------- SIGNATURE ----------

        doc.setDrawColor(0, 0, 0)

        doc.line(
            margin,
            y,
            margin + 60,
            y
        )

        doc.setFont('helvetica', 'bold')
        doc.setFontSize(10)

        doc.text(
            'Student Signature',
            margin,
            y + 6
        )

        // ---------- SAVE ----------

        const fullName =
            (
                admission.biographical_information?.full_name ||
                'application'
            ).replace(/\s+/g, '_')

        doc.save(`${fullName}.pdf`)
    }
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
                        <h3 className="text-xl font-bold text-white">{editingAdmission ? 'Edit Admission Form' : 'New Admission Form'}</h3>
                        <button onClick={() => { setShowForm(false); setEditingAdmission(null); }} className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400">
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
                                <Field
                                    label="Application Number"
                                    value={formData.course_information.application_number}
                                    onChange={v => handleInputChange('course_information', 'application_number', v)}
                                    readOnly={true}
                                />
                                <div className="md:col-span-1">
                                    <label className="block text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2">Passport Photo</label>
                                    <div className="flex flex-col gap-4">
                                        <div className="flex gap-4">
                                            <input
                                                type="file"
                                                ref={passportInputRef}
                                                onChange={e => handleImageUpload(e, 'passport_photo')}
                                                className="hidden"
                                                accept="image/*"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => passportInputRef.current?.click()}
                                                disabled={uploading}
                                                className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                                            >
                                                {uploading ? <Loader2 className="animate-spin w-4 h-4" /> : <Upload size={18} />}
                                                {uploading ? 'Uploading...' : 'Upload Photo'}
                                            </button>
                                            {formData.course_information.passport_photo && (
                                                <div className="w-12 h-12 rounded-xl border border-white/10 overflow-hidden bg-white/5 shrink-0">
                                                    <img src={formData.course_information.passport_photo} alt="" className="w-full h-full object-cover" />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="md:col-span-1">
                                    <label className="block text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2">Adhar Card Photo</label>
                                    <div className="flex flex-col gap-4">
                                        <div className="flex gap-4">
                                            <input
                                                type="file"
                                                ref={adharInputRef}
                                                onChange={e => handleImageUpload(e, 'adhar_card')}
                                                className="hidden"
                                                accept="image/*"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => adharInputRef.current?.click()}
                                                disabled={uploading}
                                                className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                                            >
                                                {uploading ? <Loader2 className="animate-spin w-4 h-4" /> : <Upload size={18} />}
                                                {uploading ? 'Uploading...' : 'Upload Adhar'}
                                            </button>
                                            {formData.course_information.adhar_card && (
                                                <div className="w-12 h-12 rounded-xl border border-white/10 overflow-hidden bg-white/5 shrink-0">
                                                    <img src={formData.course_information.adhar_card} alt="" className="w-full h-full object-cover" />
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
                                <div>
                                    <label className="block text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2">Gender</label>
                                    <select
                                        value={formData.biographical_information.gender}
                                        onChange={e => handleInputChange('biographical_information', 'gender', e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-500 outline-none appearance-none"
                                    >
                                        <option value="" className="bg-gray-900">Select Gender</option>
                                        <option value="Male" className="bg-gray-900">Male</option>
                                        <option value="Female" className="bg-gray-900">Female</option>
                                        <option value="Not to disclose" className="bg-gray-900">Not to disclose</option>
                                    </select>
                                </div>
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

                        <Section
                            id="declaration"
                            title="Declaration"
                            icon={<UserCheck size={20} />}
                            expanded={expandedSection === 'declaration'}
                            onToggle={() => toggleSection('declaration')}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
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
                                <Save size={20} /> {editingAdmission ? 'Update Admission' : 'Save Admission'}
                            </button>
                            <button type="button" onClick={() => { setShowForm(false); setEditingAdmission(null); }} className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-4 rounded-xl border border-white/10 transition-all">
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
                                    onClick={() => handleEdit(admission)}
                                    className="p-3 bg-white/5 text-brand-500 hover:bg-brand-500/10 rounded-xl transition-all shadow-sm border border-white/5"
                                    title="Edit Admission"
                                >
                                    <Pencil size={18} />
                                </button>
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
                                {onPromoteToStudent && (
                                    <button
                                        onClick={() => onPromoteToStudent(admission)}
                                        className="p-3 bg-green-500/10 text-green-400 hover:bg-green-500/20 rounded-xl transition-all shadow-sm border border-green-500/10"
                                        title="Promote to Student Record"
                                    >
                                        <GraduationCap size={18} />
                                    </button>
                                )}
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
                                <SummaryItem label="Gender" value={selectedAdmission.biographical_information?.gender} />
                                <SummaryItem label="DOB" value={selectedAdmission.biographical_information?.date_of_birth} />
                                <SummaryItem label="Blood Group" value={selectedAdmission.biographical_information?.blood_group} />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <DetailSection title="Personal Information" icon={<User size={18} className="text-brand-500" />}>
                                    <DetailItem label="Full Name" value={selectedAdmission.biographical_information?.full_name} />
                                    <DetailItem label="DOB" value={selectedAdmission.biographical_information?.date_of_birth} />
                                    <DetailItem label="Gender" value={selectedAdmission.biographical_information?.gender} />
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
                                    <DetailItem label="Application #" value={selectedAdmission.course_information?.application_number} />
                                    <DetailItem label="Franchise ID" value={selectedAdmission.franchiseEmail} />
                                    <DetailItem label="Added Role" value={selectedAdmission.addedByRole} />
                                </DetailSection>

                                <DetailSection title="Declaration" icon={<UserCheck size={18} className="text-brand-500" />}>
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

                        <div className="p-8 border-t border-white/10 flex justify-end gap-4 bg-white/[0.02]">
                            <button
                                onClick={() => handleEdit(selectedAdmission)}
                                className="px-10 py-4 bg-white/5 hover:bg-white/10 text-white font-black rounded-2xl transition-all border border-white/10 flex items-center gap-2"
                            >
                                <Pencil size={20} className="text-brand-500" />
                                Edit Form
                            </button>
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

function Field({ label, value, onChange, type = "text", readOnly = false }: { label: string, value: string, onChange: (v: string) => void, type?: string, readOnly?: boolean }) {
    return (
        <div>
            <label className="block text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2">{label}</label>
            <input
                type={type}
                value={value}
                onChange={e => onChange(e.target.value)}
                readOnly={readOnly}
                className={`w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-500 outline-none ${readOnly ? 'opacity-60 cursor-not-allowed bg-black/20' : ''}`}
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
            <p className={`text-white text-sm font-medium ${isEmail ? 'lowercase' : ''} break-words`}>{value || '-'}</p>
        </div>
    );
}

