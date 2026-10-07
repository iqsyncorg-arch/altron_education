import { Link, useLocation } from 'react-router-dom';
import { Shield, Phone, Mail, MapPin, Facebook, Youtube, Instagram, Twitter, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Footer() {
    const location = useLocation();
    const isLandingPage = location.pathname.toLowerCase() === '/landingpage';

    // 7-Day Live Countdown Timer for Landing Page
    const [timeLeft, setTimeLeft] = useState({
        days: 6,
        hours: 23,
        minutes: 55,
        seconds: 43
    });

    useEffect(() => {
        if (!isLandingPage) return;

        let targetTime = localStorage.getItem('altron_batch_timer_end');
        if (!targetTime) {
            const sevenDays = Date.now() + 7 * 24 * 60 * 60 * 1000;
            localStorage.setItem('altron_batch_timer_end', sevenDays.toString());
            targetTime = sevenDays.toString();
        }

        const updateTimer = () => {
            const now = Date.now();
            const diff = Math.max(0, parseInt(targetTime!) - now);

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            setTimeLeft({ days, hours, minutes, seconds });
        };

        updateTimer();
        const interval = setInterval(updateTimer, 1000);

        return () => clearInterval(interval);
    }, [isLandingPage]);

    const courses = [
        { label: 'CCTV Installation', path: '/courses' },
        { label: 'Fire Alarm Training', path: '/fire-alarm-training' },
        { label: 'Access & Biometrics', path: '/access-biometric-training' },
    ];

    const quickLinks = [
        { label: 'About Institute', path: '/about-institute' },
        { label: 'Professional Certification', path: '/professional-certification' },
        { label: 'Fees & Eligibility', path: '/fees-eligibility' },
        { label: 'Employment', path: '/employment' },
        { label: 'Gallery', path: '/gallery' },
        { label: 'Contact Us', path: '/contact' },
    ];

    return (
        <footer className={`relative bg-brand-800 border-t border-brand-700 mt-20 ${isLandingPage ? 'pb-16 sm:pb-14' : ''}`}>
            {/* CTA Banner */}
            <div className="bg-gradient-to-r from-brand-600 via-brand-700 to-brand-800">
                <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <h3 className="text-white text-2xl font-bold">Ready to Start Your Career in Security Systems?</h3>
                        <p className="text-brand-200 mt-1">Join 1000+ certified professionals trained by Altron Academy</p>
                    </div>
                    <div className="flex gap-4">
                        <Link to="/contact" className="bg-white text-brand-700 font-semibold px-6 py-3 rounded-xl hover:bg-brand-50 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 whitespace-nowrap">
                            Enquire Now
                        </Link>
                        <a href="tel:+919841014328" className="border-2 border-white text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/10 transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap">
                            Call Us
                        </a>
                    </div>
                </div>
            </div>

            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <Link to="/" className="flex items-center gap-3 mb-5">
                            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-md">
                                <Shield className="w-5 h-5 text-brand-600" />
                            </div>
                            <div>
                                <div className="text-white font-bold text-lg">ALTRON</div>
                                <div className="text-brand-200 text-[10px] uppercase tracking-widest">Academy</div>
                            </div>
                        </Link>
                        <p className="text-brand-200 text-sm leading-relaxed mb-5">
                            India's Unique & Premier Academy Training Institute for CCTV Surveillance, Fire Alarm, Access with Biometric Attendance and Smart Home Security System Since 2008.
                        </p>
                        <div className="flex gap-3">
                            <a href="https://www.facebook.com/altronacademy" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-brand-200 hover:text-white hover:border-white/40 transition-all">
                                <Facebook className="w-4 h-4" />
                            </a>
                            <a href="https://www.youtube.com/@altronindiapromotion" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-brand-200 hover:text-white hover:border-white/40 transition-all">
                                <Youtube className="w-4 h-4" />
                            </a>
                            <a href="https://www.instagram.com/altroncctvinstitute/?hl=en" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-brand-200 hover:text-white hover:border-white/40 transition-all">
                                <Instagram className="w-4 h-4" />
                            </a>
                            <a href="https://x.com/altroneducation" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-brand-200 hover:text-white hover:border-white/40 transition-all">
                                <Twitter className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Courses */}
                    <div>
                        <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">Our Courses</h4>
                        <ul className="space-y-3">
                            {courses.map((course) => (
                                <li key={course.path}>
                                    <Link to={course.path} className="flex items-center gap-2 text-brand-200 hover:text-white text-sm transition-colors group">
                                        <ArrowRight className="w-3.5 h-3.5 text-brand-300 group-hover:translate-x-1 transition-transform" />
                                        {course.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">Quick Links</h4>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.path}>
                                    <Link to={link.path} className="flex items-center gap-2 text-brand-200 hover:text-white text-sm transition-colors group">
                                        <ArrowRight className="w-3.5 h-3.5 text-brand-300 group-hover:translate-x-1 transition-transform" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">Contact Info</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-4 h-4 text-brand-200 mt-0.5 flex-shrink-0" />
                                <span className="text-brand-200 text-sm">
                                    79A/44A, S1, Panchali Amman Koil Street, Arumbakkam, Chennai – 600 106
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-4 h-4 text-brand-200 flex-shrink-0" />
                                <a href="tel:+919841014328" className="text-brand-200 hover:text-white text-sm transition-colors">
                                    +91 98410 14328
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-4 h-4 text-brand-200 flex-shrink-0" />
                                <a href="mailto:professional@altroneducation.com" className="text-brand-200 hover:text-white text-sm transition-colors">
                                    professional@altroneducation.com
                                </a>
                            </li>
                        </ul>

                    </div>
                </div>
            </div>

            {/* Bottom Copyright Bar */}
            <div className="border-t border-white/10 py-6">
                <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-brand-300">
                    <p>© 2008 - {new Date().getFullYear()} Altron Academy. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link to="/faq" className="hover:text-white transition-colors">FAQ</Link>
                        <Link to="/authenticity" className="hover:text-white transition-colors">Certificate Verification</Link>
                        <Link to="/centers" className="hover:text-white transition-colors">Centers</Link>
                    </div>
                </div>
            </div>

            {/* Sticky Bottom Offer Bar (Navbar-style) - ONLY ON /landingpage */}
            {isLandingPage && (
                <div className="fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-r from-zinc-950 via-red-950 to-zinc-950 text-white border-t border-red-900/60 py-2.5 px-4 shadow-[0_-8px_25px_rgba(0,0,0,0.85)]">
                    <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5 text-[11px] font-bold uppercase tracking-wider">
                        
                        {/* Left: Limited Slots Notice */}
                        <div className="flex items-center gap-2">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                            </span>
                            <span className="text-red-400 font-black">🔥 LIMITED SLOTS LEFT!</span>
                            <span className="hidden sm:inline text-gray-300">Next Batch Reservation Closing Soon</span>
                        </div>

                        {/* Center: Live 7-Day Timer */}
                        <div className="flex items-center gap-1 font-mono text-xs">
                            <span className="text-gray-400 font-sans text-[10px] mr-1">OFFER ENDS IN:</span>
                            <div className="bg-zinc-900 border border-red-600/60 px-2 py-0.5 rounded text-white font-extrabold shadow-sm">
                                {String(timeLeft.days).padStart(2, '0')}<span className="text-red-400 font-sans text-[9px] ml-0.5">d</span>
                            </div>
                            <span className="text-red-500 font-bold">:</span>
                            <div className="bg-zinc-900 border border-red-600/60 px-2 py-0.5 rounded text-white font-extrabold shadow-sm">
                                {String(timeLeft.hours).padStart(2, '0')}<span className="text-red-400 font-sans text-[9px] ml-0.5">h</span>
                            </div>
                            <span className="text-red-500 font-bold">:</span>
                            <div className="bg-zinc-900 border border-red-600/60 px-2 py-0.5 rounded text-white font-extrabold shadow-sm">
                                {String(timeLeft.minutes).padStart(2, '0')}<span className="text-red-400 font-sans text-[9px] ml-0.5">m</span>
                            </div>
                            <span className="text-red-500 font-bold">:</span>
                            <div className="bg-zinc-900 border border-red-600/60 px-2 py-0.5 rounded text-red-400 font-extrabold shadow-sm animate-pulse">
                                {String(timeLeft.seconds).padStart(2, '0')}<span className="text-red-400 font-sans text-[9px] ml-0.5">s</span>
                            </div>
                        </div>

                        {/* Right: Action Button */}
                        <Link
                            to="/payment"
                            className="btn-shine bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-[0_0_12px_rgba(220,38,38,0.6)] inline-flex items-center gap-1.5 transition-transform hover:scale-105"
                        >
                            <span>PAY ₹500 & SECURE SLOT</span>
                            <ArrowRight className="w-3 h-3" />
                        </Link>

                    </div>
                </div>
            )}
        </footer>
    );
}
