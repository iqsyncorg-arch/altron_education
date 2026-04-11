import { ShieldCheck, Globe, Briefcase, GraduationCap, Settings, CheckCircle, Clock, Award, Camera } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApi } from '../hooks/useApi';

const technologies = [
    {
        icon: <Settings className="w-7 h-7 text-red-500" />,
        title: 'Network & Integration',
        desc: 'Emphasize system configuration, network setup, and software integration for DVR/NVR systems.'
    },
    {
        icon: <Globe className="w-7 h-7 text-red-500" />,
        title: 'IP & HD Video',
        desc: 'Advanced training on IP video challenges and HD analog techniques with audio integration.'
    },
    {
        icon: <ShieldCheck className="w-7 h-7 text-red-500" />,
        title: 'Maintenance & OHS',
        desc: 'Additional focus areas are maintenance, diagnostics, and OHS (occupational health and safety) procedures.'
    },
    {
        icon: <Briefcase className="w-7 h-7 text-red-500" />,
        title: 'Planning & Equipment',
        desc: 'Equipment planning, site surveys, and secure system design for large-scale surveillance.'
    },
];

export default function CCTVTraining() {
    const { data: courses, loading } = useApi<any>('/courses');
    const course = courses.find((c: any) => c.slug === 'diploma-course-in-cctv-surveillance-system');

    if (loading) return <div className="flex items-center justify-center min-h-screen bg-[#0a0a0a]"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div></div>;
    if (!course) return <div className="text-white text-center py-20 bg-[#0a0a0a]">Course not found.</div>;

    return (
        <div className="bg-[#0a0a0a] min-h-screen font-sans text-gray-200">
            {/* Hero Section */}
            <section className="relative h-[450px] flex items-center justify-center overflow-hidden">
                <img
                    className="absolute inset-0 w-full h-full object-cover"
                    src="https://res.cloudinary.com/dq6gr5zjc/image/upload/v1773990506/Securing_the_camera_cover_jnvpxt.png"
                    alt="CCTV Installation"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-[#0a0a0a]"></div>

                <div className="relative z-10 text-center max-w-4xl px-4">
                    <span className="text-red-500 font-bold tracking-widest uppercase text-sm mb-4 block">Professional Certification</span>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
                        CCTV Surveillance <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">
                            Systems Training
                        </span>
                    </h1>
                    <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
                        Master modern surveillance technology. From IP camera networking and DVR/NVR configuration to advanced diagnostics and site planning.
                    </p>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 py-20">
                {/* Introduction Section */}
                <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-6">
                            Advanced Surveillance <span className="text-red-500">Engineering</span>
                        </h2>
                        <p className="text-gray-400 mb-6 leading-relaxed">
                            CCTV systems are the backbone of modern security infrastructure. As technology evolves from analog to AI-powered IP surveillance, the demand for technicians who can bridge the gap is soaring.
                        </p>
                        <p className="text-gray-400 leading-relaxed">
                            Our course emphasizes <strong className="text-white">system configuration</strong>, including recording devices (DVR/NVR), network setup, and software integration. We cover everything from HD analog techniques to complex IP video challenges.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            { title: "Reputation", desc: "India's leading security training academy since 2008.", icon: Award },
                            { title: "Expertise", desc: "Hands-on training with latest DVR, NVR, and IP cameras.", icon: GraduationCap },
                        ].map((item, i) => (
                            <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:border-red-500/50 transition-all duration-300 group backdrop-blur-sm">
                                <div className="w-14 h-14 rounded-xl bg-red-500/10 flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform">
                                    <item.icon className="w-7 h-7 text-red-500" />
                                </div>
                                <h4 className="text-white font-bold text-xl mb-3">{item.title}</h4>
                                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Core Competencies */}
                <div className="mb-24">
                    <div className="text-center mb-12">
                        <span className="text-red-500 font-bold tracking-widest uppercase text-xs mb-3 block">Technical Skills</span>
                        <h2 className="text-3xl font-bold text-white mb-4">Core Competencies</h2>
                        <div className="h-1 w-20 bg-red-600 mx-auto"></div>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {technologies.map((tech, i) => (
                            <div key={i} className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-red-500/50 transition-all duration-300 group">
                                <div className="mb-6 transform group-hover:scale-110 transition-transform w-14 h-14 rounded-xl bg-red-500/10 flex items-center justify-center">
                                    {tech.icon}
                                </div>
                                <h3 className="text-white font-bold text-xl mb-3">{tech.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{tech.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Course Details & Sidebar */}
                <div className="grid lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2">
                        <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                            <Camera className="text-red-500" />
                            Technical Training Modules
                        </h2>

                        <div className="prose prose-invert mb-10">
                            <p className="text-gray-400 leading-relaxed italic">
                                Our industry-aligned curriculum is designed to provide comprehensive expertise in both traditional and modern security infrastructure.
                            </p>
                        </div>

                        <div className="space-y-4">
                            {[
                                { title: "System Configuration", desc: "Expertise in DVR/NVR setup, hard drive installation, and recording parameters." },
                                { title: "Network Setup", desc: "Configuration of IP cameras, routers, switches, and remote viewing capabilities." },
                                { title: "Software Integration", desc: "VMS (Video Management Software) setup, mobile app integration, and cloud storage." },
                                { title: "Maintenance & Diagnostics", desc: "Troubleshooting common video loss issues, power supply failures, and cable testing." },
                                { title: "OHS Procedures", desc: "Occupational Health and Safety standards for professional site installation." },
                                { title: "Equipment Planning", desc: "Site survey, lens calculation, and optimal camera placement strategies." }
                            ].map((item, i) => (
                                <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-red-500/5 transition-colors group flex gap-5 items-start">
                                    <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500 font-bold shrink-0 group-hover:bg-red-500 group-hover:text-white transition-all">
                                        {i + 1}
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-lg mb-1">{item.title}</h4>
                                        <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="sticky top-24">
                            <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 border border-red-500/30 shadow-2xl shadow-red-500/10">
                                <h3 className="text-white font-bold text-xl mb-6">Course Quick Facts</h3>
                                <div className="space-y-6">
                                    {[
                                        { label: 'Duration', value: course.duration, icon: Clock },
                                        { label: 'Eligibility', value: course.eligibility, icon: CheckCircle },
                                        { label: 'Fees', value: `₹${course.fees.offer} (Offer)`, icon: Award },
                                    ].map((detail, i) => (
                                        <div key={i} className="flex items-start gap-4">
                                            <div className="p-2 rounded-lg bg-red-500/10">
                                                <detail.icon className="w-5 h-5 text-red-500" />
                                            </div>
                                            <div>
                                                <div className="text-gray-500 text-xs font-semibold uppercase tracking-wider">{detail.label}</div>
                                                <div className="text-white text-base font-medium">{detail.value}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <Link to="/contact" className="mt-8 w-full bg-red-600 hover:bg-red-500 text-white font-bold py-4 rounded-xl text-center block transition-all hover:shadow-lg hover:shadow-red-500/20 active:scale-[0.98]">
                                    Enquire Now
                                </Link>

                                <p className="text-center text-gray-500 text-xs mt-4">
                                    MSME Affiliated & Government Recognized Certification.
                                </p>
                            </div>

                            <div className="mt-6 p-6 rounded-3xl bg-red-500/5 border border-red-500/20 flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 text-red-500">
                                    <ShieldCheck className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-white font-bold text-sm">Industrial Lab</p>
                                    <p className="text-gray-400 text-xs">Work with actual NVR & IP systems.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
