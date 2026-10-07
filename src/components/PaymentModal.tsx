import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, ShieldCheck, CheckCircle, ArrowRight, Lock, Sparkles, XCircle } from 'lucide-react';
import { API_BASE } from '../config/api';
import { loadRazorpayScript } from '../utils/razorpay';

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function PaymentModal({ isOpen, onClose }: PaymentModalProps) {
    const [form, setForm] = useState({
        name: '',
        phone: '',
        email: '',
        notes: ''
    });
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [paymentDetails, setPaymentDetails] = useState<{ paymentId?: string; orderId?: string } | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        if (error) setError(null);
    };

    const handleRazorpayPayment = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.name.trim() || !form.phone.trim()) {
            setError('Please enter your full name and WhatsApp phone number.');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // 1. Create order on backend (₹500)
            const orderRes = await fetch(`${API_BASE}/payment/create-order`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: 500,
                    name: form.name,
                    email: form.email,
                    phone: form.phone
                })
            });

            const orderData = await orderRes.json();

            if (!orderRes.ok || !orderData.success) {
                throw new Error(orderData.message || 'Failed to initialize payment');
            }

            // 2. Load Razorpay script
            const isLoaded = await loadRazorpayScript();
            if (!isLoaded) {
                throw new Error('Razorpay SDK failed to load. Please check your internet connection.');
            }

            // 3. Configure Razorpay modal
            const options = {
                key: orderData.key,
                amount: orderData.amount,
                currency: orderData.currency,
                name: 'ALTRON SAFETY & SECURITY ACADEMY',
                description: 'Seat Reservation Fee (₹500)',
                image: 'https://res.cloudinary.com/dq6gr5zjc/image/upload/v1773043568/altronaccodemy_pxgw2x.png',
                order_id: orderData.order_id,
                prefill: {
                    name: form.name,
                    email: form.email || '',
                    contact: form.phone
                },
                theme: {
                    color: '#c0392b'
                },
                handler: async function (response: any) {
                    try {
                        setLoading(true);
                        // 4. Verify signature on backend
                        const verifyRes = await fetch(`${API_BASE}/payment/verify`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                                name: form.name,
                                email: form.email,
                                phone: form.phone,
                                notes: 'Online Seat Reservation (₹500)'
                            })
                        });

                        const verifyData = await verifyRes.json();

                        if (verifyData.success) {
                            setPaymentDetails({
                                paymentId: response.razorpay_payment_id,
                                orderId: response.razorpay_order_id
                            });
                            setSubmitted(true);
                        } else {
                            setError(verifyData.message || 'Payment verification failed.');
                        }
                    } catch (err: any) {
                        console.error('Payment verification error:', err);
                        setError('Payment was completed, but signature verification encountered an error. Our team will verify manually.');
                        setSubmitted(true);
                    } finally {
                        setLoading(false);
                    }
                },
                modal: {
                    ondismiss: function () {
                        setLoading(false);
                    }
                }
            };

            const rzp = new (window as any).Razorpay(options);
            rzp.on('payment.failed', function (response: any) {
                console.error('Razorpay payment failed:', response.error);
                setError(response.error.description || 'Payment process was cancelled or failed.');
                setLoading(false);
            });

            rzp.open();
        } catch (err: any) {
            console.error('Razorpay initialization error:', err);
            setError(err.message || 'Unable to connect to payment gateway. Please try again.');
            setLoading(false);
        }
    };

    const handleWhatsAppSubmit = () => {
        const payIdInfo = paymentDetails?.paymentId ? `%0A*Razorpay Payment ID:* ${paymentDetails.paymentId}` : '';
        const message = `Hello Altron Academy! I have reserved my seat by paying ₹500 online payment.%0A%0A*Name:* ${form.name || 'Not provided'}%0A*Phone:* ${form.phone || 'Not provided'}%0A*Email:* ${form.email || 'Not provided'}${payIdInfo}%0A%0APlease send my batch schedule and confirmation!`;
        window.open(`https://wa.me/919841014328?text=${message}`, '_blank');
    };

    const resetModal = () => {
        setSubmitted(false);
        setPaymentDetails(null);
        setError(null);
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 overflow-y-auto bg-black/75 backdrop-blur-md">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden"
                    >
                        {/* Header banner */}
                        <div className="bg-gradient-to-r from-brand-700 via-brand-600 to-red-600 p-6 text-white relative">
                            <button
                                onClick={resetModal}
                                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/20 hover:bg-black/40 text-white flex items-center justify-center transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md text-white text-[11px] font-black uppercase tracking-widest px-3 py-1 rounded-full w-fit mb-2">
                                <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
                                Instant Seat Reservation
                            </div>

                            <h3 className="text-2xl sm:text-3xl font-black tracking-tight uppercase">
                                RESERVE SEAT FOR <span className="text-amber-300">₹500</span>
                            </h3>
                            <p className="text-xs sm:text-sm text-red-100 mt-1 font-medium">
                                Lock your seat for the next batch. Balance fee payable at course start.
                            </p>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 sm:p-8">
                            {submitted ? (
                                <div className="text-center py-4 space-y-5">
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600 shadow-inner">
                                        <CheckCircle className="w-10 h-10" />
                                    </div>
                                    <div>
                                        <span className="bg-green-100 text-green-800 font-extrabold text-[10px] uppercase px-3 py-1 rounded-full tracking-wider">
                                            Payment Verified
                                        </span>
                                        <h4 className="text-xl sm:text-2xl font-black text-gray-900 mt-2 uppercase tracking-tight">
                                            SEAT RESERVED SUCCESSFULLY!
                                        </h4>
                                        <p className="text-xs sm:text-sm text-gray-600 mt-1 font-medium">
                                            Thank you, <strong>{form.name}</strong>! Your seat has been locked.
                                        </p>
                                    </div>

                                    {paymentDetails?.paymentId && (
                                        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs space-y-1 text-left">
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Payment ID:</span>
                                                <span className="font-mono font-bold text-gray-900">{paymentDetails.paymentId}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Amount Paid:</span>
                                                <span className="font-bold text-green-700">₹500</span>
                                            </div>
                                        </div>
                                    )}

                                    <div className="pt-2 flex flex-col gap-2.5">
                                        <button
                                            onClick={handleWhatsAppSubmit}
                                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-3.5 px-6 rounded-full text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition-transform hover:-translate-y-0.5"
                                        >
                                            <span>💬 SHARE RECEIPT ON WHATSAPP</span>
                                        </button>
                                        <button
                                            onClick={resetModal}
                                            className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-3 px-6 rounded-full text-xs transition-colors"
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <form onSubmit={handleRazorpayPayment} className="space-y-4">
                                    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3.5 flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0">
                                            <Sparkles className="w-5 h-5" />
                                        </div>
                                        <div className="text-xs text-amber-900 font-medium leading-tight">
                                            <strong className="font-black">Secured by Razorpay:</strong> Supports GPay, PhonePe, Paytm, Cards & NetBanking.
                                        </div>
                                    </div>

                                    {error && (
                                        <div className="bg-red-50 text-red-700 p-3 rounded-xl text-xs font-bold border border-red-100 flex items-center gap-2">
                                            <XCircle className="w-4 h-4 shrink-0" />
                                            <span>{error}</span>
                                        </div>
                                    )}

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

                                    <div>
                                        <label className="text-gray-700 font-extrabold text-xs mb-1 block uppercase">WhatsApp Phone Number *</label>
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
                                        <label className="text-gray-700 font-extrabold text-xs mb-1 block uppercase">Email Address (Optional)</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            placeholder="yourname@example.com"
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-gray-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="btn-shine w-full bg-brand-600 hover:bg-brand-700 text-white font-black py-4 px-6 rounded-full text-sm uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition-transform hover:-translate-y-0.5 disabled:opacity-50 mt-2"
                                    >
                                        <CreditCard className="w-5 h-5" />
                                        <span>{loading ? 'Opening Razorpay...' : 'PAY ₹500 & SECURE YOUR SLOT'}</span>
                                        <ArrowRight className="w-5 h-5" />
                                    </button>

                                    <div className="flex items-center justify-center gap-2 text-[11px] text-gray-400 font-semibold pt-1">
                                        <Lock className="w-3.5 h-3.5 text-gray-400" />
                                        <span>100% Encrypted & Safe Payment Gateway</span>
                                    </div>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
