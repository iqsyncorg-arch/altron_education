import { Link } from 'react-router-dom';
import { Shield, Phone, Mail, MapPin, Facebook, Youtube, Instagram, ArrowRight } from 'lucide-react';

export default function Footer() {
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
        <footer className="relative bg-brand-800 border-t border-brand-700 mt-20">
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
                        <a href="tel:+919962456533" className="border-2 border-white text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/10 transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap">
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
                            <a href="#" className="w-9 h-9 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-brand-200 hover:text-white hover:border-white/40 transition-all">
                                <Facebook className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-9 h-9 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-brand-200 hover:text-white hover:border-white/40 transition-all">
                                <Youtube className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-9 h-9 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-brand-200 hover:text-white hover:border-white/40 transition-all">
                                <Instagram className="w-4 h-4" />
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
                                <a href="tel:+919962456533" className="text-brand-200 hover:text-white text-sm transition-colors">
                                    +91 98410 14328
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-4 h-4 text-brand-200 flex-shrink-0" />
                                <a href="mailto:info@altroneducation.com" className="text-brand-200 hover:text-white text-sm transition-colors">
                                    info@altroneducation.com
                                </a>
                            </li>
                        </ul>

                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
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
        </footer>
    );
}
