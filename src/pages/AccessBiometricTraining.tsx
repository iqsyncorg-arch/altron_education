import PageHero from '../components/PageHero';
import { CheckCircle, Clock, Award, Fingerprint } from 'lucide-react';
import { Link } from 'react-router-dom';

const technologies = [
    { icon: '🔑', title: 'Password Verification', desc: 'PIN-based access control systems for secure premises management. Learn to install, configure, and manage keypad and card-based entry systems.' },
    { icon: '👁️', title: 'Eyeball Scanning', desc: 'Cutting-edge iris recognition technology for high-security environments. Training on installation and calibration of iris scanners.' },
    { icon: '😊', title: 'Face Scanning', desc: 'AI-powered facial recognition systems for modern access control. Learn to set up and integrate face detection cameras into security systems.' },
    { icon: '🖐️', title: 'Fingerprint Biometrics', desc: 'Industry-standard fingerprint scanning devices for attendance and access. Complete training on enrollment, verification, and troubleshooting.' },
];

const curriculum = [
    'Introduction to Access Control Systems',
    'Password and PIN-Based Systems',
    'Card Access Technology (RFID, Smart Cards)',
    'Fingerprint Scanner Installation',
    'Iris/Eyeball Recognition Systems',
    'Face Recognition Cameras',
    'Software Integration & Programming',
    'Network Configuration',
    'Multi-Door Access Control',
    'Time & Attendance Integration',
    'Troubleshooting and Maintenance',
    'Compliance and Reporting',
];

export default function AccessBiometricTraining() {
    return (
        <div>
            <PageHero
                title="Access Control & Biometrics"
                subtitle="Master the latest biometric and access control technologies for high-security environments"
                breadcrumbs={['Courses', 'Access & Biometrics']}
            />
            <div className="max-w-7xl mx-auto px-4 py-20">
                {/* Technologies */}
                <div className="mb-16">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-white">Technologies You'll Master</h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        {technologies.map((tech, i) => (
                            <div key={i} className="glass-card border border-brand-500/20 hover-lift">
                                <div className="text-4xl mb-4">{tech.icon}</div>
                                <h3 className="text-white font-bold text-xl mb-3">{tech.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{tech.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Course Details */}
                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <h2 className="text-2xl font-bold text-white mb-6">Curriculum</h2>
                        <div className="grid md:grid-cols-2 gap-3">
                            {curriculum.map((item, i) => (
                                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/3 border border-white/5 hover:bg-white/5 transition-colors">
                                    <div className="w-6 h-6 rounded-full bg-brand-500/20 flex items-center justify-center text-brand-500 text-xs font-bold flex-shrink-0">
                                        {i + 1}
                                    </div>
                                    <span className="text-gray-300 text-sm">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="glass rounded-2xl p-6 border border-brand-500/20">
                            <h3 className="text-white font-bold text-lg mb-4">Course Details</h3>
                            <div className="space-y-4">
                                {[
                                    { label: 'Duration', value: '1 Month', icon: Clock },
                                    { label: 'Eligibility', value: 'SSLC / HSC / Diploma / Degree', icon: CheckCircle },
                                    { label: 'Certification', value: 'BSA-JAS-ANZ International', icon: Award },
                                ].map((detail, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <detail.icon className="w-4 h-4 text-brand-500 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <div className="text-gray-500 text-xs">{detail.label}</div>
                                            <div className="text-white text-sm font-medium">{detail.value}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Link to="/contact" className="bg-brand-600 hover:bg-brand-700 text-white font-semibold px-6 py-3 rounded-xl w-full text-center block mt-6 transition-all">
                                Enquire Now
                            </Link>
                        </div>
                        <div className="glass-card border border-brand-500/20 text-center">
                            <Fingerprint className="w-12 h-12 text-brand-500 mx-auto mb-3" />
                            <p className="text-white font-semibold">Hands-On Lab Training</p>
                            <p className="text-gray-400 text-sm mt-1">Train on real biometric devices used in the field</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
