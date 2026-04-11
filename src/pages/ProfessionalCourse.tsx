import { ShieldCheck, Flame, Fingerprint, Home, ArrowRight, BookOpen, Star, Users, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';

const modules = [
    {
        id: 'cctv',
        title: 'CCTV Surveillance Systems Training',
        desc: 'Master the art of modern surveillance. Learn system configuration, network setup, DVR/NVR integration, and advanced IP video troubleshooting.',
        icon: <ShieldCheck className="w-8 h-8 text-red-500" />,
        link: '/cctv',
        color: 'from-red-600/20 to-transparent'
    },
    {
        id: 'fire-alarm',
        title: 'Fire Alarm Installation Training',
        desc: 'Become a certified life safety technician. Expertise in smoke detectors, heat sensors, FACP panels, and professional wiring standards.',
        icon: <Flame className="w-8 h-8 text-red-500" />,
        link: '/fire-alarm-training',
        color: 'from-red-600/20 to-transparent'
    },
    {
        id: 'biometric',
        title: 'Access & Biometric Installation Training',
        desc: 'Implement elite security protocols. From fingerprint and face recognition AI to iris scanning and secure entry management.',
        icon: <Fingerprint className="w-8 h-8 text-red-500" />,
        link: '/access-biometric-training',
        color: 'from-red-600/20 to-transparent'
    },
    {
        id: 'home-automation',
        title: 'Home Automation Installation Training',
        desc: 'Step into the future of living. Learn to install smart lighting, security sensors, automated climate control, and mobile ecosystem integration.',
        icon: <Home className="w-8 h-8 text-red-500" />,
        link: '/contact',
        color: 'from-red-600/20 to-transparent'
    }
];

export default function ProfessionalCourse() {
    return (
        <div className="bg-[#0a0a0a] min-h-screen font-sans text-gray-200">
            {/* <PageHero
                title="Professional Course in Safety & Security Engineering"
                subtitle="Master the most in-demand security and automation technologies with our industry-led certification programs."
                breadcrumbs={['Home', 'Professional Course']}
                image="https://res.cloudinary.com/dq6gr5zjc/video/upload/v1775895249/Safety_Security_Engineering_Course_Video_kcjmnw.mp4"
            /> */}
            <section className="relative h-[450px] flex items-center justify-center overflow-hidden">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                    src="https://res.cloudinary.com/dq6gr5zjc/video/upload/v1775895249/Safety_Security_Engineering_Course_Video_kcjmnw.mp4"
                />
                {/* Gradient Overlay to darken the video */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-[#0a0a0a]"></div>

                <div className="relative z-10 text-center max-w-4xl px-4">
                    <span className="text-red-500 font-bold tracking-widest uppercase text-sm mb-4 block">Professional Certification</span>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
                        Safety & <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">
                            Security Engineering
                        </span>
                    </h1>
                    <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
                        Become a certified life safety technician. Master the intricate wiring, panel configuration, and sensor deployment required to protect high-risk environments.
                    </p>
                </div>
            </section>
            <section className="py-24 max-w-7xl mx-auto px-6">
                <div className="text-center mb-20">
                    <span className="text-red-500 font-bold tracking-[0.3em] uppercase text-sm mb-4 block">Our Modules</span>
                    <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-6">Expertise Redefined.</h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Choose from our specialized technical modules designed to launch or accelerate your career in the security engineering industry.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {modules.map((module) => (
                        <div key={module.id} className="relative group overflow-hidden bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-red-500/50 transition-all duration-500">
                            {/* Gradient Accent */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${module.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                            <div className="relative z-10">
                                <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center mb-8 border border-red-500/20 group-hover:scale-110 transition-transform duration-500">
                                    {module.icon}
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-red-400 transition-colors">
                                    {module.title}
                                </h3>

                                <p className="text-gray-400 leading-relaxed mb-8 line-clamp-3">
                                    {module.desc}
                                </p>

                                <Link
                                    to={module.link}
                                    className="inline-flex items-center gap-2 text-white font-bold group/link"
                                >
                                    Explore Module
                                    <ArrowRight className="w-5 h-5 group-hover/link:translate-x-2 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Why Join Section */}
            <section className="py-24 bg-white/5 border-y border-white/5">
                <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-12">
                    {[
                        { icon: <BookOpen className="text-red-500" />, title: 'Practical Lab', desc: '100% hands-on experience with real industrial security panels and hardware.' },
                        { icon: <GraduationCap className="text-red-500" />, title: 'Certified Expertise', desc: 'Government recognized MSME affiliated certifications valued by global employers.' },
                        { icon: <Users className="text-red-500" />, title: 'Career Path', desc: 'End-to-end guidance and placement support for governmental and corporate sectors.' }
                    ].map((item, i) => (
                        <div key={i} className="flex gap-6 items-start">
                            <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center shrink-0">
                                {item.icon}
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 text-center">
                <div className="max-w-3xl mx-auto px-6">
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-8">Ready to secure your future?</h2>
                    <p className="text-gray-400 text-lg mb-12">
                        Join 1300+ successful alumni who have transformed their careers with Altron Academy's professional courses.
                    </p>
                    <Link to="/contact" className="inline-block bg-red-600 hover:bg-red-500 text-white font-bold px-12 py-5 rounded-2xl transition-all hover:shadow-2xl hover:shadow-red-500/20 active:scale-[0.98]">
                        Enquire for Next Batch
                    </Link>
                </div>
            </section>
        </div>
    );
}
