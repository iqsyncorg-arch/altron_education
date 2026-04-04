import { CheckCircle, Clock, Award, Fingerprint, Shield, Users, Settings, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApi } from '../hooks/useApi';

const technologies = [
    {
        icon: <Shield className="w-8 h-8 text-blue-400" />,
        title: 'Password Verification',
        desc: 'Master PIN-based access control systems. Learn to install, configure, and manage keypad and card-based entry systems for secure premises management.'
    },
    {
        icon: <Cpu className="w-8 h-8 text-purple-400" />,
        title: 'Eyeball & Iris Scanning',
        desc: 'Dive into cutting-edge iris recognition technology. Practical training on the installation and precise calibration of iris scanners for high-security zones.'
    },
    {
        icon: <Users className="w-8 h-8 text-green-400" />,
        title: 'Face Recognition AI',
        desc: 'Implement AI-powered facial recognition. Learn to set up and integrate sophisticated face detection cameras into existing security infrastructures.'
    },
    {
        icon: <Fingerprint className="w-8 h-8 text-brand-500" />,
        title: 'Fingerprint Biometrics',
        desc: 'The industry standard for attendance. Complete training on enrollment, data verification, and hardware troubleshooting for biometric devices.'
    },
];

export default function AccessBiometricTraining() {
    const { data: courses, loading } = useApi<any>('/courses');
    const course = courses.find((c: any) => c.slug === 'access-biometric-training');

    if (loading) return <div className="flex items-center justify-center min-h-screen bg-[#0a0a0a]"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500"></div></div>;
    if (!course) return <div className="text-white text-center py-20 bg-[#0a0a0a]">Course not found.</div>;

    const curriculum = course.subjects || [];
    return (
        <div className="bg-[#0a0a0a] min-h-screen font-sans text-gray-200">
            {/* Hero Section */}
            <section
                className="relative h-[450px] flex items-center justify-center bg-fixed bg-center bg-cover"
                style={{
                    backgroundImage: "url('https://res.cloudinary.com/dq6gr5zjc/image/upload/v1773658955/biometric-access-control-systems_chdurf.jpg')",
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-[#0a0a0a]"></div>

                <div className="relative z-10 text-center max-w-4xl px-4">
                    <span className="text-brand-500 font-bold tracking-widest uppercase text-sm mb-4 block">Professional Certification</span>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
                        Access & Biometric <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-brand-600">
                            Installation Training
                        </span>
                    </h1>
                    <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
                        Master the world's most advanced security protocols. From fingerprint verification to
                        AI face scanning, gain the technical expertise to secure sensitive environments.
                    </p>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 py-16">
                {/* Intro Content */}
                <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-6">Why Specialized Security Training?</h2>
                        <p className="text-gray-400 mb-4 leading-relaxed">
                            Access and Biometric control systems are critical for protecting confidential areas by ensuring only authorized individuals gain entry. While traditional systems rely on passwords and sensors, modern Biometric systems utilize unique physical identities—like thumbprints and iris patterns—offering the highest level of security.
                        </p>
                        <p className="text-gray-400 leading-relaxed">
                            At <span className="text-brand-500 font-semibold">Altron Academy</span>, we bridge the gap between theory and industry-standard application. With decades of experience, we provide the number one installation training in Chennai, preparing you for roles in hospitals, banks, and corporate data centers.
                        </p>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="text-center p-4">
                                <div className="text-brand-500 text-3xl font-bold mb-1">100%</div>
                                <div className="text-gray-500 text-xs uppercase tracking-wider">Hands-on Practical</div>
                            </div>
                            <div className="text-center p-4">
                                <div className="text-brand-500 text-3xl font-bold mb-1">100%</div>
                                <div className="text-gray-500 text-xs uppercase tracking-wider">On-site Training</div>
                            </div>
                            <div className="text-center p-4">
                                <div className="text-brand-500 text-3xl font-bold mb-1">100%</div>
                                <div className="text-gray-500 text-xs uppercase tracking-wider">Placement Opportunities</div>
                            </div>
                            <div className="text-center p-4">
                                <div className="text-brand-500 text-3xl font-bold mb-1">1300+</div>
                                <div className="text-gray-500 text-xs uppercase tracking-wider">Alumni</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Technologies Grid */}
                <div className="mb-24">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-white mb-4">Technologies You'll Master</h2>
                        <div className="h-1 w-20 bg-brand-500 mx-auto"></div>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {technologies.map((tech, i) => (
                            <div key={i} className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-brand-500/50 transition-all duration-300 group">
                                <div className="mb-6 transform group-hover:scale-110 transition-transform">
                                    {tech.icon}
                                </div>
                                <h3 className="text-white font-bold text-xl mb-3">{tech.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{tech.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Curriculum & Sidebar */}
                <div className="grid lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2">
                        <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                            <Settings className="text-brand-500" />
                            Comprehensive Curriculum
                        </h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            {curriculum.map((item: string, i: number) => (
                                <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-brand-500/5 transition-colors group">
                                    <div className="w-8 h-8 rounded-lg bg-brand-500/10 flex items-center justify-center text-brand-500 text-sm font-bold flex-shrink-0 group-hover:bg-brand-500 group-hover:text-white transition-all">
                                        {i + 1}
                                    </div>
                                    <span className="text-gray-300 text-sm font-medium">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="sticky top-24">
                            <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 border border-brand-500/30 shadow-2xl shadow-brand-500/10">
                                <h3 className="text-white font-bold text-xl mb-6">Course Overview</h3>
                                <div className="space-y-6">
                                    {[
                                        { label: 'Duration', value: course.duration, icon: Clock },
                                        { label: 'Eligibility', value: course.eligibility, icon: CheckCircle },
                                        { label: 'Fees', value: `₹${course.fees.offer} (Offer)`, icon: Award },
                                    ].map((detail, i) => (
                                        <div key={i} className="flex items-start gap-4">
                                            <div className="p-2 rounded-lg bg-brand-500/10">
                                                <detail.icon className="w-5 h-5 text-brand-500" />
                                            </div>
                                            <div>
                                                <div className="text-gray-500 text-xs font-semibold uppercase tracking-wider">{detail.label}</div>
                                                <div className="text-white text-base font-medium">{detail.value}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <Link to="/contact" className="mt-8 w-full bg-brand-600 hover:bg-brand-500 text-white font-bold py-4 rounded-xl text-center block transition-all hover:shadow-lg hover:shadow-brand-500/20 active:scale-[0.98]">
                                    Enquire for Next Batch
                                </Link>

                                <p className="text-center text-gray-500 text-xs mt-4">
                                    Limited seats available for hands-on lab sessions.
                                </p>
                            </div>

                            <div className="mt-6 p-6 rounded-3xl bg-brand-500/5 border border-brand-500/20 flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-brand-500/20 flex items-center justify-center flex-shrink-0">
                                    <Fingerprint className="w-6 h-6 text-brand-500" />
                                </div>
                                <div>
                                    <p className="text-white font-bold text-sm">Hands-On Training</p>
                                    <p className="text-gray-400 text-xs">Work with real RFID & Biometric hardware.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}