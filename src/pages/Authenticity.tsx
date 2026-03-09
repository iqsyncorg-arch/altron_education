import { useState } from 'react';
import PageHero from '../components/PageHero';
import { Search, Shield, CheckCircle, XCircle } from 'lucide-react';

interface CertificateResult {
    rollNo: string;
    studentName: string;
    fatherName: string;
    course: string;
    yearOfPassing: string;
    cgpa: string;
    grade: string;
}

// Mock data for demonstration
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
        setLoading(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const found = mockData[rollNo.trim().toUpperCase()];
        setResult(found || 'not-found');
        setLoading(false);
    };

    return (
        <div>
            <PageHero
                title="Certificate Authenticity"
                subtitle="Verify the genuineness of any Altron Academy certificate using the student's roll number"
                breadcrumbs={['Authenticity']}
            />
            <div className="max-w-4xl mx-auto px-4 py-20">
                {/* Search */}
                <div className="glass rounded-2xl p-8 border border-brand-500/20 mb-12">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center">
                            <Shield className="w-6 h-6 text-brand-500" />
                        </div>
                        <div>
                            <h2 className="text-white font-bold text-xl">Certificate Verification System</h2>
                            <p className="text-gray-400 text-sm">Enter the roll number printed on the certificate</p>
                        </div>
                    </div>
                    <form onSubmit={handleSearch} className="flex gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                            <input
                                type="text"
                                value={rollNo}
                                onChange={(e) => setRollNo(e.target.value)}
                                placeholder="Enter Roll Number (e.g., ALT2024001)"
                                className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-brand-500 transition-colors"
                                required
                            />
                        </div>
                        <button type="submit" className="btn-primary px-8" disabled={loading}>
                            {loading ? 'Verifying...' : 'Verify'}
                        </button>
                    </form>
                    <p className="text-gray-500 text-xs mt-3">
                        Try: ALT2024001 or ALT2023045 for demo results
                    </p>
                </div>

                {/* Result */}
                {result === 'not-found' && (
                    <div className="glass rounded-2xl p-8 border border-red-500/30 text-center">
                        <XCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
                        <h3 className="text-white font-bold text-xl mb-2">Certificate Not Found</h3>
                        <p className="text-gray-400">No certificate was found with roll number <strong className="text-red-400">{rollNo}</strong>. Please check the number and try again.</p>
                    </div>
                )}

                {result && result !== 'not-found' && (
                    <div className="glass rounded-2xl p-8 border border-green-500/30">
                        <div className="flex items-center gap-3 mb-6">
                            <CheckCircle className="w-8 h-8 text-green-400" />
                            <div>
                                <h3 className="text-white font-bold text-xl">Certificate Verified ✓</h3>
                                <p className="text-green-400 text-sm">This is an authentic Altron Academy certificate</p>
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            {[
                                { label: 'Roll Number', value: result.rollNo },
                                { label: 'Student Name', value: result.studentName },
                                { label: "Father's Name", value: result.fatherName },
                                { label: 'Course', value: result.course },
                                { label: 'Year of Passing', value: result.yearOfPassing },
                                { label: 'CGPA', value: result.cgpa },
                                { label: 'Grade', value: result.grade },
                                { label: 'Certification', value: 'BSA-JAS-ANZ International' },
                            ].map((field, i) => (
                                <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-green-500/5 border border-green-500/20">
                                    <div>
                                        <div className="text-gray-500 text-xs">{field.label}</div>
                                        <div className="text-white font-semibold text-sm mt-0.5">{field.value}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Info */}
                <div className="mt-12 grid md:grid-cols-2 gap-6">
                    <div className="glass-card border border-brand-500/20">
                        <div className="text-3xl mb-3">🔍</div>
                        <h3 className="text-white font-semibold mb-2">For Employers</h3>
                        <p className="text-gray-400 text-sm">Verify the authenticity of certificates presented by candidates before employment. Our verification system is available 24/7.</p>
                    </div>
                    <div className="glass-card border border-brand-500/20">
                        <div className="text-3xl mb-3">📞</div>
                        <h3 className="text-white font-semibold mb-2">Need Help?</h3>
                        <p className="text-gray-400 text-sm">For manual verification or bulk certificate checking, call us at <a href="tel:+919962456533" className="text-brand-500 hover:text-brand-400">99624 56533</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
}
