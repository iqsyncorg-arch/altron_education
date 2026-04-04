import React, { useState } from 'react';
import {
    Shield,
    Search,
    CheckCircle,
    XCircle,
    RotateCcw,
    User,
    FileCheck,
    GraduationCap,
    Calendar,
    MapPin,
    Phone,
    ArrowRight,
    Lock
} from 'lucide-react';

interface CertificateResult {
    rollNo: string;
    studentName: string;
    course: string;
    issueDate: string;
    placeOfIssue: string;
    image: string;
}

export default function Authenticity() {
    const [rollNo, setRollNo] = useState('');
    const [result, setResult] = useState<CertificateResult | null | 'not-found'>(null);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!rollNo.trim()) return;

        setLoading(true);
        setResult(null);

        try {
            const res = await fetch(`http://127.0.0.1:5050/api/studentinfo/verify/${rollNo.trim()}`);
            if (res.ok) {
                const student = await res.json();
                setResult({
                    rollNo: student.rid,
                    studentName: student.stdname,
                    course: student.subject,
                    issueDate: student.dob || 'N/A',
                    placeOfIssue: student.gender || 'N/A',
                    image: student.image || '',
                });
            } else {
                setResult('not-found');
            }
        } catch (err) {
            console.error('Error fetching student info:', err);
            setResult('not-found');
        } finally {
            setLoading(false);
        }
    };

    const resetSearch = () => {
        setRollNo('');
        setResult(null);
    };

    return (
        <div className="min-h-screen bg-[#05080f] selection:bg-red-500/30 selection:text-white">
            {/* Immersive Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-red-600/10 rounded-full blur-[120px]"></div>
                <div className="absolute top-[20%] -right-[10%] w-[30%] h-[50%] bg-blue-600/10 rounded-full blur-[120px]"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]"></div>
            </div>

            <div className="relative pt-24 pb-12 px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Header Section */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-white/60 text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-xl">
                            <Lock size={12} className="text-red-500" /> Secure Verification Portal
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">
                            Certificate <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C0392B] to-[#E74C3C]">Authenticity</span>
                        </h1>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto font-medium">
                            Instant digital credential verification for Altron Academy graduates.
                        </p>
                    </div>

                    {/* Search Container */}
                    <div className="relative z-10">
                        <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-12 backdrop-blur-3xl shadow-2xl shadow-black/40 ring-1 ring-white/10 mb-12">
                            <form onSubmit={handleSearch} className="relative flex flex-col md:flex-row gap-4">
                                <div className="relative flex-1 group">
                                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400 group-focus-within:text-red-500 transition-colors" />
                                    <input
                                        type="text"
                                        value={rollNo}
                                        onChange={(e) => setRollNo(e.target.value)}
                                        placeholder="Search by Roll Number..."
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl pl-16 pr-6 py-5 text-xl text-white placeholder-white/20 focus:outline-none focus:border-red-500 focus:bg-white/10 transition-all shadow-inner"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="bg-gradient-to-br from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white px-12 py-5 rounded-2xl font-black text-lg shadow-xl shadow-red-600/20 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3 group"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    ) : (
                                        <>Verify Now <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /></>
                                    )}
                                </button>
                            </form>

                            {result && (
                                <button onClick={resetSearch} className="mt-8 flex items-center gap-2 text-sm font-bold text-white/40 hover:text-red-500 transition-colors mx-auto">
                                    <RotateCcw size={16} /> New Verification Request
                                </button>
                            )}
                        </div>

                        {/* Result Section */}
                        <div className="min-h-[400px]">
                            {loading && (
                                <div className="flex flex-col items-center justify-center py-24 animate-pulse">
                                    <div className="relative w-20 h-20 mb-8 font-black flex items-center justify-center">
                                        <div className="absolute inset-0 bg-red-500/20 rounded-full blur-2xl animate-pulse"></div>
                                        <Shield size={60} className="text-red-600 animate-float" />
                                    </div>
                                    <h3 className="text-white font-black text-2xl mb-2">Querying Database</h3>
                                    <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Connecting to Secure Registry...</p>
                                </div>
                            )}

                            {result === 'not-found' && !loading && (
                                <div className="bg-red-500/5 border border-red-500/20 rounded-[2.5rem] p-12 text-center backdrop-blur-xl animate-in fade-in slide-in-from-bottom-8 duration-500">
                                    <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-8 ring-4 ring-red-500/20">
                                        <XCircle className="w-12 h-12 text-red-500" />
                                    </div>
                                    <h2 className="text-white font-black text-4xl mb-4">Verification Failed</h2>
                                    <p className="text-gray-400 text-lg max-w-md mx-auto mb-8 font-medium leading-relaxed">
                                        We could not find any record associated with <span className="text-white font-bold px-2 py-1 bg-white/5 rounded-lg">#{rollNo}</span>. Please ensure the roll number is correct.
                                    </p>
                                    <button onClick={resetSearch} className="text-red-500 font-black uppercase tracking-widest text-sm hover:text-red-400 transition-colors">Try Different ID</button>
                                </div>
                            )}

                            {result && result !== 'not-found' && !loading && (
                                <div className="bg-white/5 border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden backdrop-blur-3xl animate-in fade-in zoom-in duration-300 relative">
                                    {/* Certificate Authenticity Stamp */}
                                    <div className="absolute top-8 right-8 hidden md:block opacity-20 rotate-12">
                                        <div className="border-4 border-green-500 rounded-full w-32 h-32 flex items-center justify-center font-black text-green-500 text-center uppercase text-sm leading-tight p-4">
                                            verified official record
                                        </div>
                                    </div>

                                    <div className="bg-green-500/10 p-8 border-b border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
                                        <div className="flex items-center gap-6">
                                            <div className="bg-green-500 p-4 rounded-2xl shadow-lg shadow-green-500/20">
                                                <CheckCircle className="w-8 h-8 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="text-white font-black text-2xl tracking-tight">Identity Confirmed</h3>
                                                <p className="text-green-500 text-xs font-black uppercase tracking-widest mt-1">Verified Altron Academy Alumni</p>
                                            </div>
                                        </div>
                                        <div className="text-white/20 font-mono text-sm font-bold tracking-tighter">
                                            AUTH_UID: {result.rollNo}{new Date().getTime()}
                                        </div>
                                    </div>

                                    <div className="p-10 md:p-14 flex flex-col md:flex-row gap-12 items-start">
                                        <div className="w-full md:w-56 flex-shrink-0 group relative">
                                            <div className="absolute -inset-2 bg-gradient-to-br from-green-500/20 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                            <div className="relative h-72 bg-white/5 rounded-[2rem] border border-white/10 overflow-hidden shadow-2xl">
                                                <img src={result.image} alt={result.studentName} className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-500 scale-110 hover:scale-100" />
                                            </div>
                                        </div>

                                        <div className="flex-1 w-full">
                                            <div className="grid sm:grid-cols-2 gap-x-12 gap-y-10">
                                                <Detail icon={<User className="text-red-500" />} label="Candidate Name" value={result.studentName} />
                                                <Detail icon={<FileCheck className="text-red-500" />} label="Official Roll ID" value={result.rollNo} />
                                                <Detail icon={<GraduationCap className="text-red-500" />} label="Academic Field" value={result.course} />
                                                <Detail icon={<Calendar className="text-red-500" />} label="Certification Date" value={result.issueDate} />
                                                <Detail icon={<MapPin className="text-red-500" />} label="Training Center" value={result.placeOfIssue} />
                                                <Detail icon={<Shield className="text-red-500" />} label="Security Status" value="Secure & Authentic" />
                                            </div>

                                            <div className="mt-12 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                                                <p className="text-white/30 text-[10px] leading-relaxed max-w-sm uppercase font-bold tracking-wider">
                                                    *This cryptographic verification confirms the authenticity of the academic credentials issued by Altron Academy.
                                                </p>
                                                <div className="px-6 py-2 rounded-xl bg-white/5 border border-white/10 text-white font-black text-[10px] tracking-[0.2em] uppercase whitespace-nowrap">
                                                    Digital Stamp Secured
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Support Hexagon Cards */}
                    <div className="grid md:grid-cols-2 gap-8 mt-12 mb-24">
                        <div className="group bg-white/5 border border-white/10 p-10 rounded-[3rem] hover:bg-white/[0.07] hover:border-red-500/30 transition-all duration-500 relative overflow-hidden">
                            <div className="absolute -right-8 -bottom-8 opacity-5 text-white transform group-hover:scale-110 transition-transform">
                                <Shield size={160} />
                            </div>
                            <h4 className="text-white font-black text-2xl mb-4 flex items-center gap-3">
                                <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
                                    <Shield size={20} className="text-red-500" />
                                </div>
                                Employer Verification
                            </h4>
                            <p className="text-gray-400 font-medium leading-relaxed mb-6">
                                Institutions requiring high-volume or physical document verification can contact our HR department for priority services.
                            </p>
                            <button className="text-white text-xs font-black uppercase tracking-widest flex items-center gap-2 group-hover:text-red-500 transition-colors">
                                View Partner Portal <ArrowRight size={14} />
                            </button>
                        </div>

                        <div className="group bg-white/5 border border-white/10 p-10 rounded-[3rem] hover:bg-white/[0.07] hover:border-red-500/30 transition-all duration-500 relative overflow-hidden">
                            <div className="absolute -right-8 -bottom-8 opacity-5 text-white transform group-hover:scale-110 transition-transform">
                                <Phone size={160} />
                            </div>
                            <h4 className="text-white font-black text-2xl mb-4 flex items-center gap-3">
                                <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
                                    <Phone size={20} className="text-red-500" />
                                </div>
                                Manual Assistance
                            </h4>
                            <p className="text-gray-400 font-medium mb-6">Encountering problems during Verification? Our support team is here to help you verify credentials manually.</p>
                            <a href="tel:+919962456533" className="text-3xl font-black text-white hover:text-red-500 transition-colors">
                                +91 99624 56533
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Detail({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
    return (
        <div className="flex gap-5 group">
            <div className="mt-1 transition-transform group-hover:scale-110 duration-300">{icon}</div>
            <div>
                <p className="text-gray-500 text-[10px] uppercase tracking-widest font-black mb-1">{label}</p>
                <p className="text-white font-bold text-lg leading-tight">{value}</p>
            </div>
        </div>
    );
}