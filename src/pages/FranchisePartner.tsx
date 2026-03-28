import React, { useState } from 'react';
import { CheckCircle, TrendingUp, Users, Shield, Send } from 'lucide-react';

const benefits = [
    { icon: Shield, title: 'Exclusive Territory Rights', desc: 'Get exclusive rights to operate in your assigned territory with no competing Altron centers.' },
    { icon: TrendingUp, title: 'Marketing Assistance', desc: 'Full marketing support including branding, digital marketing, and promotional materials.' },
    { icon: Users, title: 'Ongoing Support', desc: 'Continuous operational, technical, and academic support from our head office team.' },
    { icon: CheckCircle, title: 'Proven Business Model', desc: 'Replicate our 15+ year proven success model with complete training and setup guidance.' },
];

const eligibility = [
    'Individual entrepreneurs with business acumen',
    'Educational institutes looking to add vocational courses',
    'NGOs and skill development organizations',
    'Corporate entities in the education/training sector',
    'Retired professionals with educational interest',
    'Working professionals looking for second income',
];

const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
    'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
    'Delhi', 'Puducherry',
];

interface FranchiseForm {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    message: string;
}

export default function FranchisePartner() {
    const [form, setForm] = useState<FranchiseForm>({ fullName: '', email: '', phone: '', address: '', city: '', state: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div className="bg-[#0a0a0a] min-h-screen font-sans text-gray-200">
            {/* Hero Section */}
            <section
                className="relative h-[450px] flex items-center justify-center bg-fixed bg-center bg-cover"
                style={{
                    backgroundImage: "url('https://res.cloudinary.com/dq6gr5zjc/image/upload/v1773658955/biometric-access-control-systems_chdurf.jpg')", // You can change this to a suitable business/partnership image
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-[#0a0a0a]"></div>

                <div className="relative z-10 text-center max-w-4xl px-4">
                    <span className="text-brand-500 font-bold tracking-widest uppercase text-sm mb-4 block">Franchise Partnership</span>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
                        Build a Profitable <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-brand-600">
                            Training Business
                        </span>
                    </h1>
                    <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
                        Join India's fastest growing security training institute network. Leverage our 20+ years of excellence to establish a thriving educational center in your city.
                    </p>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 py-16">

                {/* Hero Stats - Refactored to match the "10+ Years" glass card */}
                <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm mb-24 max-w-5xl mx-auto relative z-20 -mt-24 shadow-2xl shadow-black/50">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { value: '15+', label: 'Years of Excellence' },
                            { value: '1300+', label: 'Students Trained' },
                            { value: '5+', label: 'Active Centers' },
                            { value: '100%', label: 'Support Provided' },
                        ].map((stat, i) => (
                            <div key={i} className="text-center p-4">
                                <div className="text-brand-500 text-4xl font-bold mb-2">{stat.value}</div>
                                <div className="text-gray-500 text-xs uppercase tracking-wider font-semibold">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Why Partner With Us - Refactored to match Technologies Grid */}
                <div className="mb-24">
                    <div className="text-center mb-12">
                        <span className="text-brand-500 font-bold tracking-widest uppercase text-xs mb-3 block">Partnership Benefits</span>
                        <h2 className="text-3xl font-bold text-white mb-4">Why Partner With Altron Academy?</h2>
                        <div className="h-1 w-20 bg-brand-500 mx-auto"></div>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {benefits.map((b, i) => (
                            <div key={i} className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-brand-500/50 transition-all duration-300 group">
                                <div className="mb-6 transform group-hover:scale-110 transition-transform w-14 h-14 rounded-xl bg-brand-500/10 flex items-center justify-center">
                                    <b.icon className="w-7 h-7 text-brand-500" />
                                </div>
                                <h3 className="text-white font-bold text-xl mb-3">{b.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{b.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Who Can Apply - Refactored to match Curriculum List */}
                <div className="mb-24">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-white mb-4">Who Can Become a Franchise Partner?</h2>
                        <div className="h-1 w-20 bg-brand-500 mx-auto"></div>
                    </div>
                    <div className="max-w-4xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-4">
                            {eligibility.map((item, i) => (
                                <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-brand-500/5 transition-colors group">
                                    <div className="w-8 h-8 rounded-lg bg-brand-500/10 flex items-center justify-center text-brand-500 flex-shrink-0 group-hover:bg-brand-500 group-hover:text-white transition-all">
                                        <CheckCircle className="w-4 h-4" />
                                    </div>
                                    <span className="text-gray-300 text-sm font-medium">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Application Form - Refactored to match the Sidebar Card */}
                <div className="max-w-3xl mx-auto mb-16">
                    <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 md:p-12 border border-brand-500/30 shadow-2xl shadow-brand-500/10">
                        {submitted ? (
                            <div className="text-center py-12">
                                <div className="w-24 h-24 rounded-full bg-brand-500/10 flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle className="w-12 h-12 text-brand-500" />
                                </div>
                                <h3 className="text-white font-bold text-3xl mb-4">Application Received!</h3>
                                <p className="text-gray-400 max-w-md mx-auto leading-relaxed mb-8">
                                    Thank you for your interest in becoming a franchise partner. Our team will review your application and contact you within 2-3 business days.
                                </p>
                                <button
                                    onClick={() => setSubmitted(false)}
                                    className="bg-brand-600 hover:bg-brand-500 text-white font-bold py-3 px-8 rounded-xl transition-all hover:shadow-lg hover:shadow-brand-500/20 active:scale-[0.98]"
                                >
                                    Submit Another Application
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="mb-10 text-center">
                                    <h2 className="text-white font-bold text-3xl mb-3">Apply for Franchise Partnership</h2>
                                    <p className="text-gray-400 text-sm">Fill in your details and we'll reach out to discuss the opportunity.</p>
                                </div>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2 block">Full Name *</label>
                                            <input type="text" name="fullName" value={form.fullName} onChange={handleChange} required
                                                placeholder="Your full name"
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-brand-500 focus:bg-white/10 transition-all" />
                                        </div>
                                        <div>
                                            <label className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2 block">Email Address *</label>
                                            <input type="email" name="email" value={form.email} onChange={handleChange} required
                                                placeholder="you@example.com"
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-brand-500 focus:bg-white/10 transition-all" />
                                        </div>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2 block">Contact Number *</label>
                                            <input type="tel" name="phone" value={form.phone} onChange={handleChange} required
                                                placeholder="+91 98765 43210"
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-brand-500 focus:bg-white/10 transition-all" />
                                        </div>
                                        <div>
                                            <label className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2 block">City</label>
                                            <input type="text" name="city" value={form.city} onChange={handleChange}
                                                placeholder="Your city"
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-brand-500 focus:bg-white/10 transition-all" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2 block">Full Address *</label>
                                        <input type="text" name="address" value={form.address} onChange={handleChange} required
                                            placeholder="Your complete address"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-brand-500 focus:bg-white/10 transition-all" />
                                    </div>
                                    <div>
                                        <label className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2 block">State *</label>
                                        <select name="state" value={form.state} onChange={handleChange} required
                                            className="w-full bg-[#111111] border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-brand-500 transition-all">
                                            <option value="">Select your state</option>
                                            {indianStates.map((state) => (
                                                <option key={state} value={state} className="bg-gray-900 text-white">{state}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2 block">Additional Message</label>
                                        <textarea name="message" value={form.message} onChange={handleChange} rows={4}
                                            placeholder="Tell us about your background, location of proposed center, etc."
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-brand-500 focus:bg-white/10 transition-all resize-none" />
                                    </div>
                                    <button
                                        type="submit"
                                        className="mt-4 w-full bg-brand-600 hover:bg-brand-500 text-white font-bold py-4 rounded-xl text-center flex items-center justify-center gap-2 transition-all hover:shadow-lg hover:shadow-brand-500/20 active:scale-[0.98]"
                                    >
                                        <Send className="w-5 h-5" /> Submit Application
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