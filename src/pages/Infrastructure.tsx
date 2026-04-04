import { motion } from 'framer-motion';
import { Shield, Monitor, Layout, Cpu, CheckCircle, Users, Home } from 'lucide-react';

const facilities = [
    {
        icon: Users,
        title: 'Well Trained Faculty',
        desc: 'Our faculty members are seasoned professionals with 20+ years of hands-on experience in the security industry. They bring real-world knowledge into every classroom session.',
        highlights: ['Industry veterans as instructors', '20+ years average experience', 'Regular training and upskilling', 'Dedicated mentorship program'],
        image: 'https://res.cloudinary.com/dq6gr5zjc/image/upload/v1774726363/7fd81e80-9af0-46c5-895d-223b88b456ad_rqwfhf.jpg'
    },
    {
        icon: Layout,
        title: 'Neat & Modern Classrooms',
        desc: 'Our classrooms are designed for optimal learning with modern audio-visual equipment, comfortable seating, and an environment that promotes concentration.',
        highlights: ['Air-conditioned classrooms', 'Smart boards & projectors', 'Comfortable seating for 30 students', 'Natural lighting & ventilation'],
        image: 'https://res.cloudinary.com/dq6gr5zjc/image/upload/v1774726413/43094343-ec21-4be9-bc3e-1b0f053ab2cc_v9yzvb.jpg'
    },
    {
        icon: Cpu,
        title: 'State-of-the-Art Lab',
        desc: 'Our Practical Training Academy is fully equipped with the latest industry-standard technologies, including HD & IP Cameras, XVR/NVR Systems, Fire Alarm Panels (Conventional & Addressable), Detectors, Access Control & Biometric Devices, Video Door Phones, Apartment Systems, and a wide range of accessories—ensuring complete hands-on training experience.',
        highlights: ['IP & Analog CCTV systems', 'Fire alarm panels & sensors', 'Biometric & access control devices', 'Live network configuration setups'],
        image: 'https://res.cloudinary.com/dq6gr5zjc/image/upload/v1774726368/0560e602-03f5-4a07-9370-7e412e9c5ea5_cpxplw.jpg'
    },
];

export default function Infrastructure() {
    return (
        <div className="bg-white min-h-screen">

            {/* Header Section */}
            <section
                className="relative h-[350px] flex items-center bg-center bg-cover"
                style={{
                    backgroundImage: `url('https://res.cloudinary.com/dq6gr5zjc/image/upload/v1773059569/ChatGPT_Image_Mar_9_2026_06_01_00_PM_bqqwpu.png')`
                }}
            >
                {/* Better Overlay (image visible) */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/70"></div>

                <div className="container mx-auto px-6 relative z-10 flex justify-between items-center">

                    <motion.h1
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-5xl font-bold text-white uppercase tracking-tight"
                    >
                        Infrastructure
                    </motion.h1>

                    <nav className="bg-black/40 backdrop-blur px-6 py-3 flex items-center gap-4 text-white rounded-sm border border-white/10">
                        <span className="flex items-center gap-2 text-xs font-bold tracking-widest cursor-pointer hover:text-red-500 transition-colors">
                            <Home size={14} className="text-red-500" /> HOME
                        </span>

                        <span className="text-white/30 text-[10px]">○</span>

                        <span className="text-xs font-bold tracking-widest border-b border-red-600 pb-0.5">
                            ACADEMY
                        </span>
                    </nav>

                </div>
            </section>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">

                {/* Title */}
                <div className="text-center mb-24">
                    <span className="text-red-600 font-bold tracking-[0.3em] uppercase text-xs">Facilities</span>

                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 mt-4 mb-6 uppercase tracking-tighter">
                        Learning Environment
                    </h2>

                    <div className="w-24 h-1 bg-red-600 mx-auto mb-8" />

                    <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
                        Top-tier equipment and expert guidance. We bridge the gap between classroom theory and real-world security engineering.
                    </p>
                </div>

                {/* Facilities */}
                <div className="space-y-32">
                    {facilities.map((facility, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className={`flex flex-col ${i % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-16 items-center`}
                        >

                            <div className="flex-1">

                                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-red-50 text-red-600 mb-8 border border-red-100 shadow-sm">
                                    <facility.icon size={28} />
                                </div>

                                <h3 className="text-3xl font-bold text-slate-900 mb-6 uppercase tracking-tight">
                                    {facility.title}
                                </h3>

                                <p className="text-slate-600 text-lg leading-relaxed mb-8">
                                    {facility.desc}
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
                                    {facility.highlights.map((hl, j) => (
                                        <div key={j} className="flex items-center gap-3 text-slate-800">
                                            <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                                            <span className="text-sm font-bold uppercase tracking-tight">{hl}</span>
                                        </div>
                                    ))}
                                </div>

                            </div>

                            <div className="flex-1 w-full">
                                <div className="relative group">
                                    <div className="absolute -inset-2 bg-red-600/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500" />

                                    <div className="relative overflow-hidden rounded-xl border border-gray-200 shadow-2xl aspect-video bg-white">
                                        <img
                                            src={facility.image}
                                            alt={facility.title}
                                            className="w-full h-full object-cover transform group-hover:scale-105 transition duration-700"
                                        />
                                    </div>
                                </div>
                            </div>

                        </motion.div>
                    ))}
                </div>

                {/* Stats */}
                <div className="mt-40 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { value: '100%', label: 'Hands-on Practical', icon: Cpu },
                        { value: '100%', label: 'On-site Training', icon: Layout },
                        { value: '100%', label: 'Placement Opportunities', icon: Monitor },
                        { value: '1300+', label: 'Alumni', icon: Shield },
                    ].map((stat, i) => (
                        <div key={i} className="bg-red-600 p-10 rounded-sm text-center shadow-lg transform hover:-translate-y-1 transition-all duration-300">

                            <div className="text-3xl font-black text-white mb-1 tracking-tighter">
                                {stat.value}
                            </div>

                            <div className="text-white/80 text-[10px] font-bold uppercase tracking-[0.2em]">
                                {stat.label}
                            </div>

                        </div>
                    ))}
                </div>

            </div>

            {/* CTA */}
            <div className="bg-slate-900 py-20">
                <div className="max-w-4xl mx-auto px-6 text-center">

                    <h2 className="text-3xl font-bold text-white mb-4 uppercase tracking-tight">
                        Visit Our Academy
                    </h2>

                    <p className="text-gray-400 mb-10 text-lg">
                        We welcome parents and students to tour our facilities between 10 AM and 6 PM.
                    </p>

                    <button className="bg-red-600 hover:bg-red-700 text-white px-10 py-4 font-bold text-sm uppercase tracking-widest transition-all rounded-sm shadow-xl">
                        Book a Tour
                    </button>

                </div>
            </div>

        </div>
    );
}