import { ShieldAlert, Flame, Briefcase, GraduationCap, Settings, CheckCircle, Clock, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApi } from '../hooks/useApi';

const technologies = [
    {
        icon: <Flame className="w-7 h-7 text-red-500" />,
        title: 'Smoke Detection',
        desc: 'Master the installation of ionization and photoelectric smoke detectors for early hazard identification.'
    },
    {
        icon: <ShieldAlert className="w-7 h-7 text-red-500" />,
        title: 'Heat & Flame Sensors',
        desc: 'Learn to configure thermal sensors and infrared flame detectors for high-risk industrial environments.'
    },
    {
        icon: <Settings className="w-7 h-7 text-red-500" />,
        title: 'Control Panels',
        desc: 'Advanced training on Fire Alarm Control Panels (FACP), circuit wiring, and system integration.'
    },
    {
        icon: <Briefcase className="w-7 h-7 text-red-500" />,
        title: 'Emergency Notification',
        desc: 'Setup of hooters, strobes, and voice evacuation systems to ensure safe occupant alerting.'
    },
];

export default function FireAlarmTraining() {
    const { data: courses, loading } = useApi<any>('/courses');
    const course = courses.find((c: any) => c.slug === 'fire-alarm-training');

    if (loading) return <div className="flex items-center justify-center min-h-screen bg-[#0a0a0a]"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div></div>;
    if (!course) return <div className="text-white text-center py-20 bg-[#0a0a0a]">Course not found.</div>;
    return (
        <div className="bg-[#0a0a0a] min-h-screen font-sans text-gray-200">
            {/* Hero Section with Video Background - Removed border-b for seamless transition */}
            <section className="relative h-[450px] flex items-center justify-center overflow-hidden">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                    src="https://res.cloudinary.com/dq6gr5zjc/video/upload/v1773556726/Video_Generation_Request_Fulfilled_xmmohj.mp4"
                />
                {/* Gradient Overlay to darken the video */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-[#0a0a0a]"></div>

                <div className="relative z-10 text-center max-w-4xl px-4">
                    <span className="text-red-500 font-bold tracking-widest uppercase text-sm mb-4 block">Professional Certification</span>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
                        Fire Alarm <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">
                            Installation Training
                        </span>
                    </h1>
                    <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
                        Become a certified life safety technician. Master the intricate wiring, panel configuration, and sensor deployment required to protect high-risk environments.
                    </p>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 py-20">
                {/* Introduction Section */}
                <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-6">
                            Precision Engineering for <span className="text-red-500">Life Safety</span>
                        </h2>
                        <p className="text-gray-400 mb-4 leading-relaxed">
                            A Fire Alarm system is a critical lifeline, designed to detect smoke or heat and alert occupants before disaster strikes. As safety regulations become stricter, the demand for skilled technicians in residential and commercial sectors is at an all-time high.
                        </p>
                        <p className="text-gray-400 leading-relaxed">
                            At <span className="text-red-500 font-semibold">Altron Education</span>, we've been the leader in Fire Alarm Installation Training in Chennai since 2008. We provide hands-on experience that transforms students into professionals capable of securing high-rise buildings, factories, and homes.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            { title: "Reputation", desc: "Serving Chennai since 2008 with a strong track record.", icon: Award },
                            { title: "Expertise", desc: "Learn from industry professionals with real-world experience.", icon: GraduationCap },
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

                {/* Core Technologies */}
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
                            <ShieldAlert className="text-red-500" />
                            Why Altron Education?
                        </h2>
                        <div className="space-y-4">
                            {[
                                {
                                    q: "Professionalism & Clarity",
                                    a: "Our instructors are trained professionals ensuring you learn complex wiring and detection techniques with absolute clarity."
                                },
                                {
                                    q: "Flexible Fee Structure",
                                    a: "We offer various course schedules and affordable fee structures tailored to your needs. Check our Duration & Fees page for more."
                                },
                                {
                                    q: "Career Guidance",
                                    a: "We provide vision for your future with guidance on governmental and non-governmental job opportunities post-completion."
                                }
                            ].map((item, i) => (
                                <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-red-500/5 transition-colors group flex gap-5 items-start">
                                    <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500 font-bold shrink-0 group-hover:bg-red-500 group-hover:text-white transition-all">
                                        {i + 1}
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-lg mb-2">{item.q}</h4>
                                        <p className="text-gray-400 text-sm leading-relaxed">{item.a}</p>
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
                                    Limited seats available for hands-on lab sessions.
                                </p>
                            </div>

                            <div className="mt-6 p-6 rounded-3xl bg-red-500/5 border border-red-500/20 flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 text-red-500">
                                    <Flame className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-white font-bold text-sm">Real Lab Practice</p>
                                    <p className="text-gray-400 text-xs">Work with actual fire alarm panels.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}