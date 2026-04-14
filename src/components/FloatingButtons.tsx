import { Phone, X } from 'lucide-react';
import { useState } from 'react';

export default function FloatingButtons() {
    const [showContact, setShowContact] = useState(false);

    return (
        <>
            {/* Google Review Badge - Center Right */}
            <a
                href="https://www.google.com/maps/place/ALTRON+CCTV,+SAFETY+%26+SECURITY+INSTITUTE/@13.0548357,80.229833,17z/data=!4m8!3m7!1s0x3a5266f51b52007d:0x946b29cd6757348c!8m2!3d13.0548357!4d80.229833!9m1!1b1!16s%2Fg%2F11bxgnpm50?authuser=0&hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed right-4 top-1/2 -translate-y-1/2 z-50 group"
                aria-label="Review us on Google"
            >
                <div className="relative w-16 h-16 flex items-center justify-center transition-all hover:scale-110 active:scale-95 drop-shadow-xl">
                    {/* Google colored border ring */}
                    <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 36 36">
                        <circle cx="18" cy="18" r="16" fill="none" stroke="#4285F4" strokeWidth="2.5" strokeDasharray="25, 100" />
                        <circle cx="18" cy="18" r="16" fill="none" stroke="#EA4335" strokeWidth="2.5" strokeDasharray="25, 100" strokeDashoffset="-25" />
                        <circle cx="18" cy="18" r="16" fill="none" stroke="#FBBC05" strokeWidth="2.5" strokeDasharray="25, 100" strokeDashoffset="-50" />
                        <circle cx="18" cy="18" r="16" fill="none" stroke="#34A853" strokeWidth="2.5" strokeDasharray="25, 100" strokeDashoffset="-75" />
                    </svg>
                    <div className="bg-white rounded-full w-14 h-14 flex flex-col items-center justify-center text-[9px] font-black leading-tight text-center shadow-inner">
                        <span className="text-gray-500 uppercase tracking-tighter">Review</span>
                        <span className="text-[#4285F4] text-[11px] font-black">G<span className="text-[#EA4335]">o</span><span className="text-[#FBBC05]">o</span><span className="text-[#4285F4]">g</span><span className="text-[#34A853]">l</span><span className="text-[#EA4335]">e</span></span>
                    </div>
                    {/* Tooltip */}
                    <span className="absolute right-20 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl border border-white/10">
                        Review us on Google
                    </span>
                </div>
            </a>

            {/* Bottom Right Floating Buttons */}
            <div className="fixed right-4 bottom-6 z-50 flex flex-col gap-3">
                {/* WhatsApp */}
                <a
                    href="https://wa.me/919841014328"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-[#25D366] hover:bg-[#20ba5a] flex items-center justify-center shadow-lg shadow-green-500/40 hover:shadow-green-500/60 transition-all hover:scale-110 group"
                    aria-label="WhatsApp"
                >
                    <svg
                        viewBox="0 0 24 24"
                        className="w-7 h-7 fill-white"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.628 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                    <span className="absolute right-14 bg-gray-900 text-white text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">WhatsApp Us</span>
                </a>

                {/* Call */}
                <a
                    href="tel:+919841014328"
                    className="w-12 h-12 rounded-full bg-blue-500 hover:bg-blue-400 flex items-center justify-center shadow-lg shadow-blue-500/40 hover:shadow-blue-500/60 transition-all hover:scale-110 group"
                    aria-label="Call Now"
                >
                    <Phone className="w-5 h-5 text-white" />
                    <span className="absolute right-14 bg-gray-900 text-white text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Call: 98410 14328</span>
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
                    <div className="absolute bottom-16 right-0 w-72 bg-navy-800/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/50 p-5 animate-in fade-in slide-in-from-bottom-4 duration-300">
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
                            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-blue-500/20 text-sm">
                                Submit Enquiry
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </>
    );
}
