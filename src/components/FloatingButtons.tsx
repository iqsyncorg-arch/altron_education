import { Phone, MessageCircle, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function FloatingButtons() {
    const [showContact, setShowContact] = useState(false);

    return (
        <div className="fixed right-4 bottom-6 z-50 flex flex-col gap-3">
            {/* WhatsApp */}
            <a
                href="https://wa.me/919962456533"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-green-500 hover:bg-green-400 flex items-center justify-center shadow-lg shadow-green-500/40 hover:shadow-green-500/60 transition-all hover:scale-110 group"
                aria-label="WhatsApp"
            >
                <MessageCircle className="w-6 h-6 text-white" />
                <span className="absolute right-14 bg-gray-900 text-white text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">WhatsApp Us</span>
            </a>

            {/* Call */}
            <a
                href="tel:+919962456533"
                className="w-12 h-12 rounded-full bg-blue-500 hover:bg-blue-400 flex items-center justify-center shadow-lg shadow-blue-500/40 hover:shadow-blue-500/60 transition-all hover:scale-110 group"
                aria-label="Call Now"
            >
                <Phone className="w-5 h-5 text-white" />
                <span className="absolute right-14 bg-gray-900 text-white text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Call: 99624 56533</span>
            </a>

            {/* Enquire */}
            <button
                onClick={() => setShowContact(!showContact)}
                className="w-12 h-12 rounded-full bg-amber-400 hover:bg-amber-300 flex items-center justify-center shadow-lg shadow-amber-400/40 hover:shadow-amber-400/60 transition-all hover:scale-110 group"
                aria-label="Contact Us"
            >
                {showContact ? (
                    <X className="w-5 h-5 text-gray-900" />
                ) : (
                    <span className="text-gray-900 text-xs font-bold">?</span>
                )}
            </button>

            {/* Enquiry Modal */}
            {showContact && (
                <div className="absolute bottom-16 right-0 w-72 bg-navy-800/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/50 p-5 animate-fade-in">
                    <h3 className="text-white font-semibold text-lg mb-1">Quick Enquiry</h3>
                    <p className="text-gray-400 text-xs mb-4">We'll get back to you shortly!</p>
                    <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                        />
                        <input
                            type="tel"
                            placeholder="Phone Number"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                        />
                        <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-gray-300 text-sm focus:outline-none focus:border-blue-500 transition-colors">
                            <option value="" className="bg-gray-800">Select Course</option>
                            <option value="cctv" className="bg-gray-800">CCTV Installation</option>
                            <option value="fire" className="bg-gray-800">Fire Alarm Training</option>
                            <option value="biometric" className="bg-gray-800">Access & Biometrics</option>
                        </select>
                        <button type="submit" className="btn-primary w-full text-sm py-2.5">
                            Submit Enquiry
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}
