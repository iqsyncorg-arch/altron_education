import { useState } from 'react';
import PageHero from '../components/PageHero';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, XCircle } from 'lucide-react';
import { API_BASE } from '../config/api';


interface ContactForm {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
}

export default function Contact() {
    const [form, setForm] = useState<ContactForm>({ name: '', email: '', phone: '', subject: '', message: '' });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        if (error) setError(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`${API_BASE}/inquiries`, {

                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: form.name,
                    mobile: form.phone,
                    email: form.email,
                    message: `[Subject: ${form.subject}] ${form.message}`
                }),
            });
            if (res.ok) {
                setSubmitted(true);
                setForm({ name: '', email: '', phone: '', subject: '', message: '' });
            } else {
                const result = await res.json();
                setError(result.message || 'Failed to send message. Please try again later.');
            }
        } catch (err) {
            setError('Network error. Please check your internet connection.');
            console.error('Contact submission failed:', err);
        }
        setLoading(false);
    };

    const contactInfo = [
        { icon: MapPin, label: 'Address', value: '79A/44A, S1, Panchali Amman Koil Street, Arumbakkam, Chennai – 600 106', href: undefined },
        { icon: Phone, label: 'Phone', value: '+91 98410 14328', href: 'tel:+919841014328' },
        { icon: Mail, label: 'Email', value: 'info@altroneducation.com', href: 'mailto:info@altroneducation.com' },
        { icon: Clock, label: 'Office Hours', value: 'Monday – Saturday: 9:00 AM – 7:00 PM', href: undefined },
    ];

    return (
        <div className="bg-gray-50 min-h-screen pb-12">
            <PageHero
                title="Contact Us"
                subtitle="Get in touch with our team — we're here to answer your questions and guide your journey"
                breadcrumbs={['Contact']}
            />
            <div className="max-w-7xl mx-auto px-4 py-20">
                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Get In Touch</h2>
                            <p className="text-gray-600">Have questions about our courses, fees, or enrollment? Our team is ready to help.</p>
                        </div>

                        <div className="space-y-4">
                            {contactInfo.map((info, i) => (
                                <div key={i} className="flex items-start gap-4 bg-white rounded-xl p-4 border border-gray-200 hover:border-brand-500/50 hover:shadow-sm transition-all shadow-sm">
                                    <div className="w-10 h-10 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center flex-shrink-0">
                                        <info.icon className="w-5 h-5 text-brand-600" />
                                    </div>
                                    <div>
                                        <div className="text-gray-500 text-xs mb-0.5">{info.label}</div>
                                        {info.href ? (
                                            <a href={info.href} className="text-gray-900 font-medium text-sm hover:text-brand-600 transition-colors">{info.value}</a>
                                        ) : (
                                            <p className="text-gray-900 font-medium text-sm">{info.value}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Social / Quick Contacts */}
                        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                            <h3 className="text-gray-900 font-semibold mb-4">Quick Connect</h3>
                            <div className="space-y-3">
                                <a href="https://wa.me/919841014328" className="flex items-center gap-3 text-sm text-gray-600 hover:text-green-600 transition-colors">
                                    <span className="text-2xl">💬</span> Chat on WhatsApp
                                </a>
                                <a href="tel:+919841014328" className="flex items-center gap-3 text-sm text-gray-600 hover:text-brand-600 transition-colors">
                                    <span className="text-2xl">📞</span> Call: 98410 14328
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
                        {submitted ? (
                            <div className="text-center py-10">
                                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                                <h3 className="text-gray-900 font-bold text-2xl mb-2">Message Sent!</h3>
                                <p className="text-gray-600">Thank you for reaching out. Our team will get back to you within 24 hours.</p>
                                <button onClick={() => setSubmitted(false)} className="btn-primary mt-6">Send Another Message</button>
                            </div>
                        ) : (
                            <>
                                {error && (
                                    <div className="bg-red-50 text-red-700 p-4 rounded-xl flex items-center gap-2 font-bold mb-6 border border-red-100 animate-in slide-in-from-top-2">
                                        <XCircle size={20} /> {error}
                                    </div>
                                )}
                                <h2 className="text-gray-900 font-bold text-xl mb-6">Send Us a Message</h2>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-gray-600 font-medium text-xs mb-1 block">Your Name *</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={form.name}
                                                onChange={handleChange}
                                                required
                                                placeholder="John Doe"
                                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-gray-600 font-medium text-xs mb-1 block">Phone Number</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={form.phone}
                                                onChange={handleChange}
                                                placeholder="+91 98765 43210"
                                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-colors"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-gray-600 font-medium text-xs mb-1 block">Email Address *</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            required
                                            placeholder="john@example.com"
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-gray-600 font-medium text-xs mb-1 block">Subject *</label>
                                        <select
                                            name="subject"
                                            value={form.subject}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-colors"
                                        >
                                            <option value="">Select subject...</option>
                                            <option value="course">Course Enquiry</option>
                                            <option value="fees">Fees Information</option>
                                            <option value="placement">Placement</option>
                                            <option value="franchise">Franchise Partnership</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-gray-600 font-medium text-xs mb-1 block">Message *</label>
                                        <textarea
                                            name="message"
                                            value={form.message}
                                            onChange={handleChange}
                                            required
                                            rows={5}
                                            placeholder="Write your message here..."
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-colors resize-none"
                                        />
                                    </div>
                                    <button disabled={loading} type="submit" className="btn-primary w-full flex items-center justify-center gap-2 py-3.5 mt-2 disabled:opacity-50">
                                        <Send className={loading ? "animate-pulse" : "w-4 h-4"} /> {loading ? 'Sending...' : 'Send Message'}
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