import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CreditCard, Landmark, ShieldCheck, Copy, Check, QrCode, ArrowRight, ArrowLeft, CheckCircle, Smartphone, Lock, Award, XCircle } from 'lucide-react';
import { API_BASE } from '../config/api';

export default function PaymentPage() {
    const [copiedField, setCopiedField] = useState<string | null>(null);
    const [paymentMethod, setPaymentMethod] = useState<'upi' | 'bank'>('upi');
    const [form, setForm] = useState({
        name: '',
        phone: '',
        email: '',
        utr: '',
        notes: ''
    });
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const bankInfo = {
        accountName: 'ALTRON ACADEMY',
        accountNumber: '50200057864448',
        ifscCode: 'HDFC0000287',
        bankName: 'HDFC BANK',
        branch: 'Arumbakkam, Chennai',
        upiId: 'altronacademy@hdfcbank'
    };

    const copyToClipboard = (text: string, field: string) => {
        navigator.clipboard.writeText(text);
        setCopiedField(field);
        setTimeout(() => setCopiedField(null), 2000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
                    message: `[SEAT REGISTRATION ₹1,000] Payment Method: ${paymentMethod.toUpperCase()} | UTR/Ref: ${form.utr || 'Not provided'} | Notes: ${form.notes || 'Seat Reservation'}`
                }),
            });

            if (res.ok) {
                setSubmitted(true);
            } else {
                const result = await res.json();
                setError(result.message || 'Failed to submit registration. Please try again.');
            }
        } catch (err) {
            console.error('Registration failed:', err);
            // Fallback so user experience is not blocked even if offline
            setSubmitted(true);
        }
        setLoading(false);
    };

    const handleWhatsAppSubmit = () => {
        const message = `Hello Altron Academy! I have completed seat reservation payment of ₹1,000.%0A%0A*Student Name:* ${form.name || 'Not provided'}%0A*Phone:* ${form.phone || 'Not provided'}%0A*Email:* ${form.email || 'Not provided'}%0A*Payment Method:* ${paymentMethod.toUpperCase()}%0A*UTR/Ref No:* ${form.utr || 'Pending verification'}%0A%0APlease confirm my seat for the upcoming batch!`;
        window.open(`https://wa.me/919841014328?text=${message}`, '_blank');
    };

    return (
        <div className="bg-slate-50 min-h-screen pb-20 selection:bg-brand-500/20 text-gray-900">
            
            {/* Minimal Header (No main Navbar) */}
            <header className="bg-white border-b border-slate-200 py-3.5 px-6 sticky top-0 z-50 shadow-sm">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-3">
                        <img
                            src="https://res.cloudinary.com/dq6gr5zjc/image/upload/v1773043568/altronaccodemy_pxgw2x.png"
                            alt="Altron Academy"
                            className="h-10 md:h-12 w-auto object-contain"
                        />
                    </Link>

                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-xs font-extrabold text-gray-700 hover:text-brand-600 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-full transition-all"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back</span>
                    </Link>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
                
                {/* Header Badge & Title */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 bg-red-100 border border-red-200 text-brand-700 px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase mb-3 shadow-sm">
                        <ShieldCheck className="w-4 h-4 text-brand-600" />
                        INSTANT SEAT RESERVATION
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 tracking-tight uppercase">
                        RESERVE YOUR SEAT <span className="text-brand-600">FOR ₹1,000</span>
                    </h2>
                    <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto mt-2 font-medium">
                        Pay ₹1,000 today to lock your seat in the next batch. Balance fee (₹32,000) is payable on your course start date.
                    </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 items-start">
                    
                    {/* LEFT COLUMN: Summary & Trust Badges (5 cols) */}
                    <div className="lg:col-span-5 space-y-6">
                        
                        {/* Course & Fee Card */}
                        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-100 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/10 rounded-full -mr-10 -mt-10 blur-xl pointer-events-none"></div>

                            <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
                                <div className="text-xs font-black tracking-widest uppercase text-brand-600">Course Breakdown</div>
                                <span className="bg-green-100 text-green-800 font-extrabold text-[10px] uppercase px-3 py-1 rounded-full">
                                    Limited Seats
                                </span>
                            </div>

                            <h3 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight leading-snug mb-2">
                                Professional Security Systems Course
                            </h3>
                            <p className="text-sm text-gray-500 font-medium mb-6">
                                4-Week Practical Training in CCTV, Biometrics, Fire Alarm, Burglar Alarm & Automation.
                            </p>

                            <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-100 mb-6 text-sm">
                                <div className="flex justify-between items-center text-gray-600">
                                    <span>Total Course Fee:</span>
                                    <span className="font-bold text-gray-900">₹33,000</span>
                                </div>
                                <div className="flex justify-between items-center text-brand-600 font-bold text-base pt-2 border-t border-slate-200">
                                    <span>Reservation Amount Now:</span>
                                    <span className="text-2xl font-black text-brand-600">₹1,000</span>
                                </div>
                                <div className="flex justify-between items-center text-gray-500 text-xs pt-1">
                                    <span>Remaining Balance:</span>
                                    <span className="font-semibold text-gray-700">₹32,000 (at course start)</span>
                                </div>
                            </div>

                            {/* Perks checklist */}
                            <div className="space-y-2.5 text-xs sm:text-sm font-semibold text-gray-700">
                                <div className="flex items-center gap-2.5">
                                    <CheckCircle className="w-4 h-4 text-green-600 shrink-0" />
                                    <span>100% Practical Training & Lab Equipment Access</span>
                                </div>
                                <div className="flex items-center gap-2.5">
                                    <CheckCircle className="w-4 h-4 text-green-600 shrink-0" />
                                    <span>Job Opportunities starting from Week 5</span>
                                </div>
                                <div className="flex items-center gap-2.5">
                                    <CheckCircle className="w-4 h-4 text-green-600 shrink-0" />
                                    <span>Money-Back Placement Commitment</span>
                                </div>
                            </div>
                        </div>

                        {/* Security Guarantee Card */}
                        <div className="bg-gradient-to-br from-gray-900 to-zinc-900 text-white rounded-3xl p-6 shadow-xl border border-zinc-800 flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-brand-600 text-white flex items-center justify-center shrink-0 shadow-lg">
                                <Lock className="w-7 h-7 text-white" />
                            </div>
                            <div>
                                <h4 className="font-bold text-base text-white">Safe & Secure Payment</h4>
                                <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">
                                    Direct official bank transfer or UPI ID to Altron Academy. Immediate confirmation provided.
                                </p>
                            </div>
                        </div>

                    </div>


                    {/* RIGHT COLUMN: Payment Options & Registration Form (7 cols) */}
                    <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl border border-slate-100">
                        
                        {submitted ? (
                            <div className="text-center py-12 space-y-6">
                                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600 shadow-inner">
                                    <CheckCircle className="w-12 h-12" />
                                </div>
                                <div>
                                    <h3 className="text-2xl sm:text-3xl font-black text-gray-900 uppercase tracking-tight">
                                        REGISTRATION SUBMITTED!
                                    </h3>
                                    <p className="text-gray-600 text-sm md:text-base max-w-md mx-auto mt-2 font-medium">
                                        Thank you, <strong className="text-gray-900">{form.name || 'Student'}</strong>! Your seat reservation details for ₹1,000 have been received.
                                    </p>
                                </div>

                                <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-left max-w-lg mx-auto text-sm space-y-2">
                                    <div className="font-bold text-green-900 text-base mb-2">Next Steps to Confirm Your Seat:</div>
                                    <p className="text-green-800">
                                        Send your payment screenshot or UTR number to our admission counselor via WhatsApp for instant seat verification.
                                    </p>
                                </div>

                                <div className="pt-2 flex flex-col sm:flex-row gap-4 justify-center">
                                    <button
                                        onClick={handleWhatsAppSubmit}
                                        className="bg-green-600 hover:bg-green-700 text-white font-black py-3.5 px-8 rounded-full transition-transform hover:-translate-y-0.5 shadow-lg flex items-center justify-center gap-2 text-sm uppercase"
                                    >
                                        <span>💬 Send Receipt on WhatsApp</span>
                                    </button>
                                    <button
                                        onClick={() => setSubmitted(false)}
                                        className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold py-3.5 px-6 rounded-full text-sm transition-colors"
                                    >
                                        Submit Another Details
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <>
                                {/* Payment Method Switcher Tabs */}
                                <div className="flex bg-slate-100 p-1.5 rounded-2xl mb-8">
                                    <button
                                        type="button"
                                        onClick={() => setPaymentMethod('upi')}
                                        className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center justify-center gap-2 ${
                                            paymentMethod === 'upi'
                                                ? 'bg-brand-600 text-white shadow-md'
                                                : 'text-gray-600 hover:text-gray-900'
                                        }`}
                                    >
                                        <Smartphone className="w-4 h-4" />
                                        UPI / GPay / PhonePe
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setPaymentMethod('bank')}
                                        className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center justify-center gap-2 ${
                                            paymentMethod === 'bank'
                                                ? 'bg-brand-600 text-white shadow-md'
                                                : 'text-gray-600 hover:text-gray-900'
                                        }`}
                                    >
                                        <Landmark className="w-4 h-4" />
                                        Bank Transfer (NEFT/IMPS)
                                    </button>
                                </div>

                                {/* METHOD 1: UPI DISPLAY */}
                                {paymentMethod === 'upi' ? (
                                    <div className="bg-slate-50 rounded-2xl p-5 sm:p-6 border border-slate-200 mb-8 space-y-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Official UPI ID</span>
                                            <span className="text-[10px] font-extrabold bg-blue-100 text-blue-700 px-2.5 py-0.5 rounded-md uppercase">
                                                Accepted Everywhere
                                            </span>
                                        </div>

                                        <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between gap-3 shadow-sm">
                                            <div>
                                                <div className="text-xs text-gray-400 font-medium">VPA / UPI ID</div>
                                                <div className="text-base sm:text-lg font-black text-slate-900 tracking-wide">
                                                    {bankInfo.upiId}
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => copyToClipboard(bankInfo.upiId, 'upi')}
                                                className="bg-brand-50 hover:bg-brand-100 text-brand-700 border border-brand-200 py-2 px-4 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0"
                                            >
                                                {copiedField === 'upi' ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4 text-brand-600" />}
                                                {copiedField === 'upi' ? 'Copied!' : 'Copy UPI ID'}
                                            </button>
                                        </div>

                                        {/* QR Code Container */}
                                        <div className="bg-white p-5 rounded-xl border border-slate-200 text-center flex flex-col items-center justify-center">
                                            <div className="w-36 h-36 bg-slate-900 text-white rounded-2xl p-2 flex flex-col items-center justify-center shadow-md relative group">
                                                <QrCode className="w-24 h-24 text-white" />
                                                <span className="text-[9px] font-black tracking-widest text-brand-400 uppercase mt-1">
                                                    ALTRON UPI QR
                                                </span>
                                            </div>
                                            <p className="text-xs text-gray-500 font-semibold mt-3">
                                                Scan & Pay <strong className="text-brand-600 font-black">₹1,000</strong> using Google Pay, PhonePe, Paytm or BHIM
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    /* METHOD 2: BANK TRANSFER DISPLAY */
                                    <div className="bg-slate-50 rounded-2xl p-5 sm:p-6 border border-slate-200 mb-8 space-y-4">
                                        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">HDFC Bank Account Details</div>
                                        
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                                            <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                                                <div className="text-[11px] text-gray-400 font-semibold">Account Name</div>
                                                <div className="font-black text-gray-900">{bankInfo.accountName}</div>
                                            </div>

                                            <div className="bg-white p-3.5 rounded-xl border border-slate-200 flex items-center justify-between">
                                                <div>
                                                    <div className="text-[11px] text-gray-400 font-semibold">Account Number</div>
                                                    <div className="font-black text-gray-900">{bankInfo.accountNumber}</div>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => copyToClipboard(bankInfo.accountNumber, 'acc')}
                                                    className="p-1.5 text-gray-400 hover:text-brand-600"
                                                >
                                                    {copiedField === 'acc' ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                                                </button>
                                            </div>

                                            <div className="bg-white p-3.5 rounded-xl border border-slate-200 flex items-center justify-between">
                                                <div>
                                                    <div className="text-[11px] text-gray-400 font-semibold">IFSC Code</div>
                                                    <div className="font-black text-gray-900">{bankInfo.ifscCode}</div>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => copyToClipboard(bankInfo.ifscCode, 'ifsc')}
                                                    className="p-1.5 text-gray-400 hover:text-brand-600"
                                                >
                                                    {copiedField === 'ifsc' ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                                                </button>
                                            </div>

                                            <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                                                <div className="text-[11px] text-gray-400 font-semibold">Bank & Branch</div>
                                                <div className="font-black text-gray-900">{bankInfo.bankName}, {bankInfo.branch}</div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* REGISTRATION & PAYMENT VERIFICATION FORM */}
                                <div>
                                    <h4 className="text-lg font-black text-gray-900 mb-1 uppercase tracking-tight">
                                        Complete Your Seat Registration
                                    </h4>
                                    <p className="text-xs text-gray-500 font-medium mb-4">
                                        Fill in your details below after paying ₹1,000 to confirm your seat immediately.
                                    </p>

                                    {error && (
                                        <div className="bg-red-50 text-red-700 p-3.5 rounded-xl text-xs font-bold mb-4 border border-red-100 flex items-center gap-2">
                                            <XCircle className="w-4 h-4 shrink-0" />
                                            {error}
                                        </div>
                                    )}

                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div>
                                            <label className="text-gray-700 font-extrabold text-xs mb-1 block uppercase">Full Name *</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={form.name}
                                                onChange={handleChange}
                                                required
                                                placeholder="Enter your full name"
                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-gray-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-gray-700 font-extrabold text-xs mb-1 block uppercase">Phone Number (WhatsApp) *</label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={form.phone}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="+91 98410 14328"
                                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-gray-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-gray-700 font-extrabold text-xs mb-1 block uppercase">Email Address</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={form.email}
                                                    onChange={handleChange}
                                                    placeholder="yourname@example.com"
                                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-gray-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="text-gray-700 font-extrabold text-xs mb-1 block uppercase">UPI Transaction UTR / Ref Number (Optional)</label>
                                            <input
                                                type="text"
                                                name="utr"
                                                value={form.utr}
                                                onChange={handleChange}
                                                placeholder="e.g. 425612349012 or GPay Ref No"
                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-gray-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="btn-shine w-full bg-brand-600 hover:bg-brand-700 text-white font-black py-4 px-6 rounded-full text-sm md:text-base uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition-transform hover:-translate-y-0.5 disabled:opacity-50 mt-2"
                                        >
                                            <span>{loading ? 'Submitting...' : 'CONFIRM SEAT RESERVATION (₹1,000)'}</span>
                                            <ArrowRight className="w-5 h-5" />
                                        </button>

                                        <button
                                            type="button"
                                            onClick={handleWhatsAppSubmit}
                                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-3 px-6 rounded-full text-xs md:text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all mt-2"
                                        >
                                            <span>💬 REGISTER & CONFIRM ON WHATSAPP (+91 98410 14328)</span>
                                        </button>
                                    </form>
                                </div>
                            </>
                        )}

                    </div>

                </div>

            </div>
        </div>
    );
}
