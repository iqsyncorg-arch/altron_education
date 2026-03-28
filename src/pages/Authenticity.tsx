import { useState } from 'react';
import PageHero from '../components/PageHero';
import { Search, Shield, CheckCircle, XCircle, RotateCcw, Award, FileCheck, User, Calendar, GraduationCap, Phone } from 'lucide-react';

interface CertificateResult {
    rollNo: string;
    studentName: string;
    fatherName: string;
    course: string;
    yearOfPassing: string;
    cgpa: string;
    grade: string;
}

const mockData: Record<string, CertificateResult> = {
    'ALT2024001': {
        rollNo: 'ALT2024001',
        studentName: 'Rajesh Kumar',
        fatherName: 'Suresh Kumar',
        course: 'CCTV Surveillance System',
        yearOfPassing: '2024',
        cgpa: '8.5',
        grade: 'A',
    },
    'ALT2023045': {
        rollNo: 'ALT2023045',
        studentName: 'Priya Suresh',
        fatherName: 'Suresh Babu',
        course: 'Fire Alarm System',
        yearOfPassing: '2023',
        cgpa: '9.1',
        grade: 'A+',
    },
};

export default function Authenticity() {
    const [rollNo, setRollNo] = useState('');
    const [result, setResult] = useState<CertificateResult | null | 'not-found'>(null);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!rollNo.trim()) return;

        setLoading(true);
        setResult(null);

        await new Promise((resolve) => setTimeout(resolve, 800));
        const found = mockData[rollNo.trim().toUpperCase()];
        setResult(found || 'not-found');
        setLoading(false);
    };

    const resetSearch = () => {
        setRollNo('');
        setResult(null);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <PageHero
                title="Certificate Authenticity"
                subtitle="Verify Altron Academy student credentials via our secure verification portal."
                breadcrumbs={['Authenticity']}
            />

            <div className="max-w-5xl mx-auto px-4 py-12">
                {/* Search Container */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-12">
                    <div className="bg-red-600 p-6 md:p-8 text-white">
                        <div className="flex items-center gap-4">
                            <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                                <Shield className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold">Verification System</h2>
                                <p className="text-red-100 text-sm">Official database for credential validation</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 md:p-10">
                        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    value={rollNo}
                                    onChange={(e) => setRollNo(e.target.value)}
                                    placeholder="Enter Roll Number (e.g., ALT2024001)"
                                    className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl pl-12 pr-4 py-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-red-600 focus:bg-white transition-all"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-red-600 hover:bg-red-700 text-white px-10 py-4 rounded-xl font-bold shadow-lg shadow-red-600/20 transition-all disabled:opacity-70 flex items-center justify-center gap-2"
                                disabled={loading}
                            >
                                {loading ? 'Checking...' : 'Verify Certificate'}
                            </button>
                        </form>

                        {result && (
                            <button onClick={resetSearch} className="mt-4 flex items-center gap-2 text-sm text-gray-500 hover:text-red-600 transition-colors">
                                <RotateCcw className="w-4 h-4" /> Reset Search
                            </button>
                        )}
                    </div>
                </div>

                {/* Result Section */}
                <div className="min-h-[300px]">
                    {loading && (
                        <div className="flex flex-col items-center justify-center py-12">
                            <div className="w-12 h-12 border-4 border-red-600/20 border-t-red-600 rounded-full animate-spin mb-4"></div>
                            <p className="text-gray-500 font-medium">Querying Secure Database...</p>
                        </div>
                    )}

                    {result === 'not-found' && !loading && (
                        <div className="bg-white border-2 border-red-100 rounded-3xl p-10 text-center shadow-sm">
                            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                <XCircle className="w-12 h-12 text-red-600" />
                            </div>
                            <h3 className="text-gray-900 font-bold text-2xl mb-2">Record Not Found</h3>
                            <p className="text-gray-600 max-w-md mx-auto mb-6">
                                We couldn't find a certificate matching <span className="font-bold text-red-600">{rollNo}</span>. Please verify the number and try again.
                            </p>
                            <button onClick={resetSearch} className="text-red-600 font-semibold hover:underline">Try Again</button>
                        </div>
                    )}

                    {result && result !== 'not-found' && !loading && (
                        <div className="bg-white border-2 border-green-100 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
                            {/* Verification Badge */}
                            <div className="bg-green-50 p-6 flex flex-col md:flex-row items-center justify-between border-b border-green-100">
                                <div className="flex items-center gap-4">
                                    <div className="bg-green-600 p-2 rounded-full">
                                        <CheckCircle className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-green-800 font-bold text-lg">Identity Verified</h3>
                                        <p className="text-green-600 text-xs font-semibold tracking-wider uppercase">Official Altron Academy Graduate</p>
                                    </div>
                                </div>
                                <div className="mt-4 md:mt-0 text-gray-400 text-xs font-mono">
                                    REF: {result.rollNo}-{new Date().getFullYear()}
                                </div>
                            </div>

                            {/* Info Grid */}
                            <div className="p-8 md:p-12 relative">
                                {/* Subtle Red Watermark */}
                                <Award className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 text-red-600/[0.03] pointer-events-none" />

                                <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 relative z-10">
                                    <Detail icon={<User className="text-red-600" />} label="Student Full Name" value={result.studentName} />
                                    <Detail icon={<FileCheck className="text-red-600" />} label="Certificate ID" value={result.rollNo} />
                                    <Detail icon={<GraduationCap className="text-red-600" />} label="Course Title" value={result.course} />
                                    <Detail icon={<Calendar className="text-red-600" />} label="Year of Completion" value={result.yearOfPassing} />

                                    <div className="md:col-span-2 grid grid-cols-2 gap-4 mt-4">
                                        <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                                            <p className="text-gray-500 text-xs uppercase font-bold mb-1">Final CGPA</p>
                                            <p className="text-3xl font-black text-gray-900">{result.cgpa}</p>
                                        </div>
                                        <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                                            <p className="text-gray-500 text-xs uppercase font-bold mb-1">Grade</p>
                                            <p className="text-3xl font-black text-red-600">{result.grade}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-10 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-6">
                                    <div className="text-gray-400 text-[11px] leading-relaxed max-w-sm">
                                        *This digital verification serves as an official confirmation of the candidate's academic standing at Altron Academy.
                                    </div>
                                    <div className="bg-white border-2 border-gray-900 px-6 py-2 rounded-lg font-bold text-gray-900 text-xs tracking-widest uppercase">
                                        Official Record
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer Help */}
                <div className="mt-16 grid md:grid-cols-2 gap-6">
                    <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:border-red-600/30 transition-all shadow-sm">
                        <h4 className="text-gray-900 font-bold mb-3 flex items-center gap-2">
                            <Shield className="w-5 h-5 text-red-600" /> Employer Support
                        </h4>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Need a formal verification letter or bulk verification for your HR department? We provide expedited services for corporate partners.
                        </p>
                    </div>
                    <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:border-red-600/30 transition-all shadow-sm">
                        <h4 className="text-gray-900 font-bold mb-3 flex items-center gap-2">
                            <Phone className="w-5 h-5 text-red-600" /> Manual Assistance
                        </h4>
                        <p className="text-gray-600 text-sm mb-4">If you face any issues during online verification, reach us at:</p>
                        <a href="tel:+919962456533" className="text-xl font-bold text-red-600 hover:text-red-700 transition-colors">
                            +91 99624 56533
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Detail({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
    return (
        <div className="flex gap-4">
            <div className="mt-1">{icon}</div>
            <div>
                <p className="text-gray-500 text-xs uppercase tracking-wider font-bold">{label}</p>
                <p className="text-gray-900 font-bold text-lg">{value}</p>
            </div>
        </div>
    );
}