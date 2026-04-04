import { useState } from 'react';
import PageHero from '../components/PageHero';
import { Briefcase, CheckCircle, Send, Info, FileText, ShieldCheck } from 'lucide-react';

export default function Employment() {
    const [formData, setFormData] = useState({
        date: new Date().toISOString().split('T')[0],
        organisationName: '',
        address: '',
        contactPerson: '',
        landline: '',
        mobile: '',
        email: '',
        website: '',
        requiredEmployeesNo: '',
        designation: '',
        qualification: '',
        startingSalary: '',
        conveyance: '',
        accommodation: '',
        uniform: '',
        vehicle: '',
        esic: '',
        pf: '',
        mediClaim: '',
        projectIncentive: ''
    });

    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch('http://127.0.0.1:5050/api/recruitment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                setSubmitted(true);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        } catch (err) {
            console.error('Submission error');
        }
        setLoading(false);
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-white">

                <div className="max-w-4xl mx-auto px-4 py-24 text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 text-green-600">
                        <ShieldCheck size={40} />
                    </div>
                    <h2 className="text-4xl font-black text-gray-900 mb-6">Thank You!</h2>
                    <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
                        We have received your recruitment requisition. Our team will review your needs and shortlist suitable candidates for your interview process.
                    </p>
                    <div className="bg-brand-50 p-10 rounded-[40px] text-left border border-brand-100 max-w-2xl mx-auto">
                        <h4 className="font-bold text-brand-900 mb-4 flex items-center gap-2">
                            <Info size={20} /> Next Steps:
                        </h4>
                        <p className="text-brand-800/80 mb-4">
                            Kindly prepare the requisition information on your **Company Letter Head** with Seal & Signature.
                        </p>
                        <p className="font-bold text-brand-900">Softcopy: professional@altroneducation.com</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen">


            {/* Intro Content - Full Width Flow */}
            <div className="max-w-6xl mx-auto px-4 py-20">
                <div className="mb-20">
                    <div className="inline-flex items-center gap-3 bg-brand-50 text-brand-600 px-5 py-2.5 rounded-full text-[11px] font-black uppercase tracking-[0.2em] mb-6 border border-brand-100">
                        <Briefcase size={14} /> Recruitment Services
                    </div>

                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-8 tracking-tight">
                        Hiring Industry Professionals – <br />
                        <span className="text-brand-600">Skilled Candidates Available</span>
                    </h2>

                    <div className="prose prose-xl max-w-none text-gray-700 space-y-8 leading-relaxed">
                        <p className="text-xl font-bold text-gray-900">Dear Industry Professionals,</p>

                        <p className="text-lg">
                            We are pleased to inform you that we provide well-trained and industry-ready professional candidates for your esteemed organization.
                        </p>

                        <div className="bg-gray-50 p-10 rounded-[40px] border border-gray-100">
                            <p className="font-black text-gray-900 mb-8 uppercase tracking-widest text-sm">All our candidates are:</p>
                            <ul className="space-y-6">
                                {[
                                    "Highly skilled with practical, hands-on training",
                                    "Ready to independently handle installation of Safety & Security Systems (CCTV, Fire Alarm, Access Control, Biometric Systems & Home Automation)",
                                    "Trained to meet industry standards"
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-5 items-start">
                                        <div className="mt-1.5 bg-brand-500 rounded-full p-1.5 shrink-0">
                                            <CheckCircle className="text-white w-4 h-4" />
                                        </div>
                                        <span className="text-xl text-gray-800 font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="flex flex-col md:flex-row items-center gap-10 py-12 border-y border-gray-100 my-16">
                            <div className="flex-1">
                                <p className="text-gray-400 text-xs font-black uppercase tracking-[0.3em] mb-3">Competitive Benchmarking</p>
                                <p className="text-4xl font-black text-gray-900">Expected Salary: <span className="text-brand-600">₹20,000/-</span></p>
                                <p className="text-sm text-gray-400 font-bold mt-2">+ applicable benefits as per company standards</p>
                            </div>
                            <div className="h-20 w-px bg-gray-200 hidden md:block"></div>
                            <div className="flex-1 text-lg text-gray-500 italic font-medium">
                                "Our mission is to support your hiring needs with the right talent that delivers from day one."
                            </div>
                        </div>

                        <p className="text-lg">
                            If you are looking to hire qualified candidates for your organization, we request you to kindly <span className="font-bold text-gray-900">fill out the form mentioned below</span> and submit your requirements.
                        </p>

                        <p className="text-lg">
                            Once we receive your details, our team will carefully review your needs and shortlist suitable candidates. We will then arrange candidates for your interview process.
                        </p>

                        <p className="text-lg font-bold text-brand-600">
                            We look forward to supporting your hiring needs with the right talent. Thank you for your cooperation.
                        </p>
                    </div>
                </div>

                {/* THE FORM - Integrated Dark Theme */}
                <div id="requisition-form" className="bg-zinc-950 border-2 border-zinc-900 rounded-[50px] overflow-hidden shadow-2xl shadow-black/50">
                    <div className="bg-zinc-900/50 border-b border-zinc-900 p-10 text-white flex items-center justify-between">
                        <div>
                            <h3 className="text-2xl font-black uppercase tracking-wider mb-2">Recruitment Requisition Form</h3>
                            <p className="text-red-500 font-bold text-sm tracking-widest">ALTRON INSTITUTE PROFESSIONAL RECRUITMENT</p>
                        </div>
                        <FileText size={40} className="text-white/10" />
                    </div>

                    <form onSubmit={handleSubmit} className="p-10 md:p-16 space-y-16">
                        {/* Section 1 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div>
                                <label className="block text-xs font-black text-zinc-500 uppercase tracking-widest mb-4">Date <span className="text-red-500 ml-1">*</span></label>
                                <input type="date" value={formData.date} className="w-full bg-zinc-900 border-2 border-zinc-800 focus:border-red-600 text-white px-6 py-4 rounded-2xl outline-none transition-all font-bold" required />
                            </div>
                            <div>
                                <label className="block text-xs font-black text-zinc-500 uppercase tracking-widest mb-4">Name of the Organisation <span className="text-red-500 ml-1">*</span></label>
                                <input value={formData.organisationName} onChange={e => setFormData({ ...formData, organisationName: e.target.value })} className="w-full bg-zinc-900 border-2 border-zinc-800 focus:border-red-600 text-white px-6 py-4 rounded-2xl outline-none transition-all font-bold placeholder:text-zinc-600" placeholder="Company Name" required />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-xs font-black text-zinc-500 uppercase tracking-widest mb-4">Address <span className="text-red-500 ml-1">*</span></label>
                                <textarea value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} className="w-full bg-zinc-900 border-2 border-zinc-800 focus:border-red-600 text-white px-6 py-4 rounded-2xl outline-none transition-all font-bold h-32" required />
                            </div>
                        </div>

                        {/* Section 2 */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                            <div>
                                <label className="block text-xs font-black text-zinc-500 uppercase tracking-widest mb-4">Contact / Key Person <span className="text-red-500 ml-1">*</span></label>
                                <input value={formData.contactPerson} onChange={e => setFormData({ ...formData, contactPerson: e.target.value })} className="w-full bg-zinc-900 border-2 border-zinc-800 focus:border-red-600 text-white px-6 py-4 rounded-2xl outline-none transition-all font-bold" required />
                            </div>
                            <div>
                                <label className="block text-xs font-black text-zinc-500 uppercase tracking-widest mb-4">Land Line</label>
                                <input value={formData.landline} onChange={e => setFormData({ ...formData, landline: e.target.value })} className="w-full bg-zinc-900 border-2 border-zinc-800 focus:border-red-600 text-white px-6 py-4 rounded-2xl outline-none transition-all font-bold" />
                            </div>
                            <div>
                                <label className="block text-xs font-black text-zinc-500 uppercase tracking-widest mb-4">Mobile <span className="text-red-500 ml-1">*</span></label>
                                <input value={formData.mobile} onChange={e => setFormData({ ...formData, mobile: e.target.value })} className="w-full bg-zinc-900 border-2 border-zinc-800 focus:border-red-600 text-white px-6 py-4 rounded-2xl outline-none transition-all font-bold" required />
                            </div>
                            <div>
                                <label className="block text-xs font-black text-zinc-500 uppercase tracking-widest mb-4">E-mail <span className="text-red-500 ml-1">*</span></label>
                                <input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full bg-zinc-900 border-2 border-zinc-800 focus:border-red-600 text-white px-6 py-4 rounded-2xl outline-none transition-all font-bold" required />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-xs font-black text-zinc-500 uppercase tracking-widest mb-4">Website</label>
                                <input value={formData.website} onChange={e => setFormData({ ...formData, website: e.target.value })} className="w-full bg-zinc-900 border-2 border-zinc-800 focus:border-red-600 text-white px-6 py-4 rounded-2xl outline-none transition-all font-bold" />
                            </div>
                        </div>

                        {/* Section 3 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div>
                                <label className="block text-xs font-black text-zinc-500 uppercase tracking-widest mb-4">Required Employees No. <span className="text-red-500 ml-1">*</span></label>
                                <input type="number" value={formData.requiredEmployeesNo} onChange={e => setFormData({ ...formData, requiredEmployeesNo: e.target.value })} className="w-full bg-zinc-900 border-2 border-zinc-800 focus:border-red-600 text-white px-6 py-4 rounded-2xl outline-none transition-all font-bold" required />
                            </div>
                            <div>
                                <label className="block text-xs font-black text-zinc-500 uppercase tracking-widest mb-4">Employees Designation <span className="text-red-500 ml-1">*</span></label>
                                <input value={formData.designation} onChange={e => setFormData({ ...formData, designation: e.target.value })} className="w-full bg-zinc-900 border-2 border-zinc-800 focus:border-red-600 text-white px-6 py-4 rounded-2xl outline-none transition-all font-bold placeholder:text-zinc-600" placeholder="Ex. Installation Engg., Service Engg., etc." required />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-xs font-black text-zinc-500 uppercase tracking-widest mb-4">Expected Educational Qualification</label>
                                <input value={formData.qualification} onChange={e => setFormData({ ...formData, qualification: e.target.value })} className="w-full bg-zinc-900 border-2 border-zinc-800 focus:border-red-600 text-white px-6 py-4 rounded-2xl outline-none transition-all font-bold" />
                            </div>
                        </div>

                        {/* Section 4 */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { label: 'Starting Salary', key: 'startingSalary' },
                                { label: 'Conveyance', key: 'conveyance' },
                                { label: 'Accommodation', key: 'accommodation' },
                                { label: 'Uniform for Staff', key: 'uniform' },
                                { label: 'Vehicle for Staff', key: 'vehicle' },
                                { label: 'ESIC', key: 'esic' },
                                { label: 'PF', key: 'pf' },
                                { label: 'Medi Claim', key: 'mediClaim' },
                            ].map(field => (
                                <div key={field.key}>
                                    <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-3">{field.label}</label>
                                    <input
                                        value={(formData as any)[field.key]}
                                        onChange={e => setFormData({ ...formData, [field.key]: e.target.value })}
                                        className="w-full bg-zinc-900 border-2 border-zinc-800 focus:border-red-600 text-white px-5 py-3 rounded-xl outline-none transition-all font-bold text-sm"
                                    />
                                </div>
                            ))}
                        </div>

                        <div>
                            <label className="block text-xs font-black text-zinc-500 uppercase tracking-widest mb-4">Project Incentive (If Yes give the Details)</label>
                            <textarea value={formData.projectIncentive} onChange={e => setFormData({ ...formData, projectIncentive: e.target.value })} className="w-full bg-zinc-900 border-2 border-zinc-800 focus:border-red-600 text-white px-6 py-4 rounded-2xl outline-none transition-all font-bold h-24" />
                        </div>


                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-7 rounded-[30px] shadow-2xl shadow-red-950/50 transition-all flex items-center justify-center gap-4 text-xl uppercase tracking-widest active:scale-95 disabled:opacity-70"
                        >
                            {loading ? 'Processing...' : <><Send size={24} /> Submit Requirements</>}
                        </button>
                    </form>

                    <div className="bg-zinc-900/50 p-10 text-center border-t border-zinc-900/50">
                        <p className="text-zinc-500 text-xs font-black uppercase tracking-[0.2em] mb-4">Support Contact</p>
                        <div className="flex flex-col md:flex-row items-center justify-center gap-10">
                            <div>
                                <p className="text-zinc-400 font-black">Email</p>
                                <a href="mailto:professional@altroneducation.com" className="text-red-500 font-bold hover:underline font-mono text-sm leading-relaxed tracking-tight">professional@altroneducation.com</a>
                            </div>
                            <div className="hidden md:block w-px h-8 bg-zinc-800"></div>
                            <div>
                                <p className="text-zinc-400 font-black">Hotline</p>
                                <a href="tel:+919841014328" className="text-red-500 font-bold font-mono hover:underline">+91 98410 14328</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-20 text-center text-gray-400 text-xs font-medium max-w-2xl mx-auto leading-relaxed">
                    ALTRON INSTITUTE OF SAFETY & SECURITY TECHNOLOGY, # 25, M.B. Complex, First Floor, Loganathan Nagar, Jawaharlal Nehru Salai, 100 Feet Road, MMDA, Chennai – 600 094; Phone: 044 - 2361 5531; Mobile: 98410 14328
                </div>
            </div>
        </div>
    );
}