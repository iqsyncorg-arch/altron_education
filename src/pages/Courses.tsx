import PageHero from '../components/PageHero';
import { CheckCircle, Clock, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const curriculum = [
    'Introduction to CCTV Systems',
    'Types of Cameras (Analog, IP, HD)',
    'Camera Selection and Placement',
    'DVR/NVR Installation & Configuration',
    'Cable Routing and Connections',
    'Network Configuration for IP Cameras',
    'Video Storage and Retrieval',
    'Remote Monitoring Setup',
    'Troubleshooting Common Issues',
    'Maintenance Best Practices',
    'Client Presentation & Documentation',
    'Hands-On Lab Projects',
];

const careerOpportunities = [
    'CCTV Technician', 'Security System Engineer', 'Surveillance Manager',
    'Technical Sales Representative', 'Field Service Engineer', 'Projects Manager',
];

export default function Courses() {
    return (
        <div>
            <PageHero
                title="CCTV Installation & Surveillance"
                subtitle="Become a certified CCTV technician with hands-on training on latest IP and HD camera systems"
                breadcrumbs={['Courses', 'CCTV Installation']}
            />
            <div className="max-w-7xl mx-auto px-4 py-20">
                {/* Course Overview */}
                <div className="grid lg:grid-cols-3 gap-8 mb-20">
                    <div className="lg:col-span-2 space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-4">Course Overview</h2>
                            <div className="space-y-4 text-gray-400 leading-relaxed">
                                <p>
                                    The <strong className="text-white">Diploma Course in CCTV Surveillance System</strong> is designed to produce industry-ready technicians capable of installing, configuring, and maintaining cutting-edge CCTV systems.
                                </p>
                                <p>
                                    From foundational concepts to advanced IP networking for cameras, this course covers everything a professional CCTV engineer needs to know. Students work with actual industry equipment in our state-of-the-art labs.
                                </p>
                                <p>
                                    Upon completion, students receive a government-recognized certificate that is highly valued by employers across India.
                                </p>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-white mb-6">Foundation of CCTV — Curriculum</h3>
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

                        <div>
                            <h3 className="text-xl font-bold text-white mb-4">Career Opportunities</h3>
                            <div className="flex flex-wrap gap-3">
                                {careerOpportunities.map((role) => (
                                    <span key={role} className="bg-brand-500/10 border border-brand-500/20 text-brand-400 px-4 py-2 rounded-full text-sm">
                                        {role}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <div className="glass rounded-2xl p-6 border border-brand-500/20">
                            <h3 className="text-white font-bold text-lg mb-4">Course Details</h3>
                            <div className="space-y-4">
                                {[
                                    { label: 'Duration', value: '10 Days (Regular)\n1 Month (Fast Track)', icon: Clock },
                                    { label: 'Eligibility', value: 'SSLC / HSC / Diploma / Degree', icon: CheckCircle },
                                    { label: 'Certification', value: 'Government Recognized', icon: Award },
                                    { label: 'Mode', value: 'Classroom + Lab (Hands-on)', icon: CheckCircle },
                                ].map((detail, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <detail.icon className="w-4 h-4 text-brand-500 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <div className="text-gray-500 text-xs">{detail.label}</div>
                                            <div className="text-white text-sm font-medium whitespace-pre-line">{detail.value}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Link to="/contact" className="btn-primary w-full text-center block mt-6">
                                Enquire Now
                            </Link>
                            <Link to="/fees-eligibility" className="btn-secondary w-full text-center block mt-3">
                                View Fees
                            </Link>
                        </div>

                        <div className="glass rounded-2xl p-6 border border-brand-200">
                            <div className="text-3xl mb-3">🏆</div>
                            <h3 className="text-white font-semibold mb-2">Government Recognized</h3>
                            <p className="text-gray-400 text-sm">Official MSME affiliated certifications.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
