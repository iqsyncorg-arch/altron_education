import React, { useState } from 'react';
import { Send, IndianRupee, Building2, Briefcase, GraduationCap, ShieldCheck, Globe, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { API_BASE } from '../config/api';


const brandBenefits = [
    { icon: GraduationCap, title: 'Complete Staff Training', desc: 'Comprehensive training for your academy staff to ensure high-quality education delivery.' },
    { icon: Briefcase, title: '100% Placement Support', desc: 'Full placement support in Chennai for Professional Course students.' },
    { icon: IndianRupee, title: 'ROI Focused', desc: 'Placement support designed to ensure a minimum and steady Return on Investment.' },
    { icon: ShieldCheck, title: 'Authorized Certification', desc: 'Issue industry-recognized authorized certifications from our established brand.' },
    { icon: Globe, title: 'Online Verification', desc: 'Access to our online verified certification system for transparency and trust.' },
];

const requirements = [
    {
        icon: Building2,
        label: 'Office Space',
        value: '120 - 150 Sq. Ft.',
        detail: 'Minimum requirement for a standard training setup'
    },
    {
        icon: Briefcase,
        label: 'Support',
        value: 'High Success Rate',
        detail: 'Complete operational and academic support from our team'
    },
];

export default function FranchisePartner() {
    const [form, setForm] = useState({
        name: '',
        mobile: '',
        email: '',
        location: '',
        district: '',
        investmentReady: '',
        type: 'franchise'
    });
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${API_BASE}/franchise`, {

                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            if (!response.ok) {
                const result = await response.json();
                throw new Error(result.message || 'Failed to submit application');
            }

            setSubmitted(true);
        } catch (err: any) {
            setError(err.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#0a0a0b] min-h-screen font-sans text-gray-200 selection:bg-brand-500/30">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-brand-600/10 blur-[120px] rounded-full opacity-50 pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-[0.2em] uppercase text-brand-400 bg-brand-400/10 rounded-full border border-brand-400/20">
                            Franchise Opportunity
                        </span>
                        <h1 className="text-4xl md:text-7xl font-black text-white mb-6 leading-[1.1]">
                            FRANCHISE INVESTED.<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-brand-500 to-brand-600">
                                FRANCHISE OPERATED.
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto font-medium mb-8">
                            Start Your Own Safety & Security Training Academy
                        </p>
                        <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
                            Since 2008, we have been successfully operating a Safety & Security Training Academy, training over 1300+ professionals across India and internationally.
                        </p>
                    </motion.div>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 py-12">
                {/* Requirements Cards */}
                <div className="grid md:grid-cols-2 gap-8 mb-24">
                    {requirements.map((req, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="group p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-brand-500/30 transition-all duration-500"
                        >
                            <div className="flex items-start gap-6">
                                <div className="w-16 h-16 rounded-2xl bg-brand-500/10 flex items-center justify-center text-brand-500 flex-shrink-0 group-hover:scale-110 transition-transform">
                                    <req.icon className="w-8 h-8" />
                                </div>
                                <div>
                                    <p className="text-brand-500 font-bold text-sm tracking-wider uppercase mb-1">{req.label}</p>
                                    <h3 className="text-3xl font-bold text-white mb-3">{req.value}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">{req.detail}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Benefits Section */}
                <div className="mb-32">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Brand Support & Benefits</h2>
                        <div className="h-1.5 w-24 bg-gradient-to-r from-brand-600 to-transparent mx-auto rounded-full"></div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {brandBenefits.map((benefit, i) => (
                            <div key={i} className="p-8 rounded-2xl bg-gradient-to-br from-white/[0.05] to-transparent border border-white/5 hover:border-brand-500/20 transition-all group">
                                <benefit.icon className="w-10 h-10 text-brand-500 mb-6 group-hover:rotate-12 transition-transform" />
                                <h3 className="text-xl font-bold text-white mb-4">{benefit.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{benefit.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Interior Model Section */}
                <div className="mb-32 rounded-[32px] overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent z-10"></div>
                    <img
                        src="https://res.cloudinary.com/dq6gr5zjc/image/upload/v1773658955/biometric-access-control-systems_chdurf.jpg"
                        alt="Academy Interior"
                        className="w-full h-[400px] object-cover"
                    />
                    <div className="absolute inset-0 z-20 flex flex-col justify-center px-12 max-w-2xl">
                        <h2 className="text-4xl font-black text-white mb-6 uppercase italic tracking-tighter">Academy Interior Model</h2>
                        <p className="text-gray-300 text-lg leading-relaxed mb-8">
                            Get access to our standardized interior design model, optimized for a professional training environment that reflects Altron Academy's identity.
                        </p>
                    </div>
                </div>

                {/* Form Section */}
                <div className="max-w-4xl mx-auto">
                    <div className="bg-[#111113] border border-white/10 rounded-[40px] p-8 md:p-16 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-600/10 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2"></div>

                        {submitted ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-12"
                            >
                                <div className="w-24 h-24 rounded-full bg-brand-500/20 flex items-center justify-center mx-auto mb-8 border border-brand-500/30">
                                    <Check className="w-12 h-12 text-brand-400" />
                                </div>
                                <h3 className="text-4xl font-black text-white mb-4">Application Sent!</h3>
                                <p className="text-gray-400 text-lg max-w-md mx-auto mb-10">
                                    Thank you for your interest. Our franchise relations team will review your application and get back to you shortly.
                                </p>
                                <button
                                    onClick={() => setSubmitted(false)}
                                    className="px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-2xl transition-all shadow-xl shadow-brand-600/20 active:scale-95"
                                >
                                    Submit New Inquiry
                                </button>
                            </motion.div>
                        ) : (
                            <>
                                <div className="mb-12">
                                    <h2 className="text-3xl md:text-4xl font-black text-white mb-4 uppercase italic">Get Started</h2>
                                    <p className="text-gray-500 font-medium">Fill in your details to start your journey with Altron Academy.</p>
                                </div>

                                <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Name</label>
                                        <input
                                            type="text" name="name" value={form.name} onChange={handleChange} required
                                            placeholder="John Doe"
                                            className="w-full bg-white/[0.02] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand-500 focus:bg-white/[0.04] transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Mobile</label>
                                        <input
                                            type="tel" name="mobile" value={form.mobile} onChange={handleChange} required
                                            placeholder="+91 90000 00000"
                                            className="w-full bg-white/[0.02] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand-500 focus:bg-white/[0.04] transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">E-mail ID</label>
                                        <input
                                            type="email" name="email" value={form.email} onChange={handleChange} required
                                            placeholder="john@example.com"
                                            className="w-full bg-white/[0.02] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand-500 focus:bg-white/[0.04] transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Location</label>
                                        <input
                                            type="text" name="location" value={form.location} onChange={handleChange} required
                                            placeholder="Area/City"
                                            className="w-full bg-white/[0.02] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand-500 focus:bg-white/[0.04] transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">District</label>
                                        <input
                                            type="text" name="district" value={form.district} onChange={handleChange} required
                                            placeholder="Your District"
                                            className="w-full bg-white/[0.02] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand-500 focus:bg-white/[0.04] transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1 text-brand-400">Are you ready to invest and start your own academy?</label>
                                        <select
                                            name="investmentReady" value={form.investmentReady} onChange={handleChange} required
                                            className="w-full bg-[#1a1a1c] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand-500 transition-all appearance-none cursor-pointer"
                                        >
                                            <option value="">Select Option</option>
                                            <option value="Yes">Yes, I am ready</option>
                                            <option value="No">No, need more details</option>
                                        </select>
                                    </div>

                                    {error && (
                                        <p className="col-span-2 text-red-500 text-sm font-medium px-1">{error}</p>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="col-span-2 mt-4 bg-brand-600 hover:bg-brand-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-black uppercase tracking-[0.2em] py-5 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-xl shadow-brand-600/20 active:scale-[0.98]"
                                    >
                                        {loading ? (
                                            <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                                        ) : (
                                            <>
                                                <Send className="w-5 h-5" /> Be a part of our success
                                            </>
                                        )}
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}