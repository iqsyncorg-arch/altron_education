import { useState } from 'react';
import PageHero from '../components/PageHero';
import { CheckCircle, TrendingUp, Users, Shield, MapPin, Send } from 'lucide-react';

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
        <div>
            <PageHero
                title="Become a Franchise Partner"
                subtitle="Join India's fastest growing security training institute network and build a profitable business"
                breadcrumbs={['Franchise Partner']}
            />
            <div className="max-w-7xl mx-auto px-4 py-20">
                {/* Hero Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
                    {[
                        { value: '15+', label: 'Years of Excellence', icon: '⭐' },
                        { value: '10K+', label: 'Students Trained', icon: '👨‍🎓' },
                        { value: '5+', label: 'Active Centers', icon: '🏢' },
                        { value: '100%', label: 'Support Provided', icon: '🤝' },
                    ].map((stat, i) => (
                        <div key={i} className="glass-card text-center hover-lift">
                            <div className="text-3xl mb-2">{stat.icon}</div>
                            <div className="text-2xl font-black text-white">{stat.value}</div>
                            <div className="text-gray-400 text-xs mt-1">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Why Partner With Us */}
                <div className="mb-20">
                    <div className="text-center mb-12">
                        <p className="section-subtitle">Partnership Benefits</p>
                        <h2 className="text-3xl font-bold text-white">Why Partner With Altron Academy?</h2>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {benefits.map((b, i) => (
                            <div key={i} className="glass-card hover-lift border border-brand-200">
                                <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center mb-4">
                                    <b.icon className="w-6 h-6 text-brand-500" />
                                </div>
                                <h3 className="text-white font-semibold mb-2">{b.title}</h3>
                                <p className="text-gray-400 text-sm">{b.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Who Can Apply */}
                <div className="mb-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-white">Who Can Become a Franchise Partner?</h2>
                    </div>
                    <div className="glass rounded-2xl p-8 border border-white/10">
                        <div className="grid md:grid-cols-2 gap-4">
                            {eligibility.map((item, i) => (
                                <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors">
                                    <CheckCircle className="w-5 h-5 text-brand-500 flex-shrink-0" />
                                    <span className="text-gray-300 text-sm">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Application Form */}
                <div className="max-w-3xl mx-auto">
                    <div className="glass rounded-2xl p-8 border border-brand-200">
                        {submitted ? (
                            <div className="text-center py-12">
                                <CheckCircle className="w-20 h-20 text-green-400 mx-auto mb-5" />
                                <h3 className="text-white font-bold text-2xl mb-3">Application Received!</h3>
                                <p className="text-gray-400 max-w-md mx-auto">
                                    Thank you for your interest in becoming a franchise partner. Our team will review your application and contact you within 2-3 business days.
                                </p>
                                <button onClick={() => setSubmitted(false)} className="btn-primary mt-6">Submit Another Application</button>
                            </div>
                        ) : (
                            <>
                                <h2 className="text-white font-bold text-2xl mb-2">Apply for Franchise Partnership</h2>
                                <p className="text-gray-400 text-sm mb-8">Fill in your details and we'll reach out to discuss the opportunity.</p>
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="grid md:grid-cols-2 gap-5">
                                        <div>
                                            <label className="text-gray-400 text-xs mb-1.5 block">Full Name *</label>
                                            <input type="text" name="fullName" value={form.fullName} onChange={handleChange} required
                                                placeholder="Your full name"
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-amber-400 transition-colors" />
                                        </div>
                                        <div>
                                            <label className="text-gray-400 text-xs mb-1.5 block">Email Address *</label>
                                            <input type="email" name="email" value={form.email} onChange={handleChange} required
                                                placeholder="you@example.com"
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-amber-400 transition-colors" />
                                        </div>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-5">
                                        <div>
                                            <label className="text-gray-400 text-xs mb-1.5 block">Contact Number *</label>
                                            <input type="tel" name="phone" value={form.phone} onChange={handleChange} required
                                                placeholder="+91 98765 43210"
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-amber-400 transition-colors" />
                                        </div>
                                        <div>
                                            <label className="text-gray-400 text-xs mb-1.5 block">City</label>
                                            <input type="text" name="city" value={form.city} onChange={handleChange}
                                                placeholder="Your city"
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-amber-400 transition-colors" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-gray-400 text-xs mb-1.5 block">Full Address *</label>
                                        <input type="text" name="address" value={form.address} onChange={handleChange} required
                                            placeholder="Your complete address"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-amber-400 transition-colors" />
                                    </div>
                                    <div>
                                        <label className="text-gray-400 text-xs mb-1.5 block">State *</label>
                                        <select name="state" value={form.state} onChange={handleChange} required
                                            className="w-full bg-brand-800 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-amber-400 transition-colors">
                                            <option value="">Select your state</option>
                                            {indianStates.map((state) => (
                                                <option key={state} value={state} className="bg-gray-800">{state}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-gray-400 text-xs mb-1.5 block">Additional Message</label>
                                        <textarea name="message" value={form.message} onChange={handleChange} rows={4}
                                            placeholder="Tell us about your background, location of proposed center, etc."
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-amber-400 transition-colors resize-none" />
                                    </div>
                                    <button type="submit" className="btn-amber w-full flex items-center justify-center gap-2 py-3.5 text-base">
                                        <Send className="w-4 h-4" /> Submit Application
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
