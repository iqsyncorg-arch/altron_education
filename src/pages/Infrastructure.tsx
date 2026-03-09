import PageHero from '../components/PageHero';
import { Monitor, BookOpen, FlaskConical } from 'lucide-react';

const facilities = [
    {
        icon: '👨‍🏫',
        title: 'Well Trained Faculty',
        desc: 'Our faculty members are seasoned professionals with 15+ years of hands-on experience in the security industry. They bring real-world knowledge into every classroom session, ensuring students learn both theory and practical application.',
        highlights: ['Industry veterans as instructors', '15+ years average experience', 'Regular training and upskilling', 'Dedicated mentorship program'],
    },
    {
        icon: '🏛️',
        title: 'Neat & Modern Classrooms',
        desc: 'Our classrooms are designed for optimal learning with modern audio-visual equipment, comfortable seating, and an environment that promotes concentration and collaboration. Each classroom is equipped with projectors, smart boards, and AC facilities.',
        highlights: ['Air-conditioned classrooms', 'Smart boards & projectors', 'Comfortable seating for 30 students', 'Natural lighting & ventilation'],
    },
    {
        icon: '🔬',
        title: 'State-of-the-Art Lab',
        desc: 'Our labs are equipped with the latest industry-standard equipment including IP cameras, DVR/NVR systems, fire alarm panels, biometric devices, and access control systems. Students get hands-on experience with real equipment used in the field.',
        highlights: ['IP & Analog CCTV systems', 'Fire alarm panels & sensors', 'Biometric & access control devices', 'Live network configuration setups'],
    },
];

export default function Infrastructure() {
    return (
        <div>
            <PageHero
                title="Our Infrastructure"
                subtitle="World-class learning environment built to produce industry-ready professionals"
                breadcrumbs={['Academy', 'Infrastructure']}
            />

            <div className="max-w-7xl mx-auto px-4 py-20">
                <div className="text-center mb-16">
                    <p className="section-subtitle">Facilities</p>
                    <h2 className="text-3xl font-bold text-white mb-4">Learning Environment at Altron Academy</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        We believe that the quality of training directly depends on the quality of infrastructure. That's why we invest continuously in upgrading our facilities to match industry standards.
                    </p>
                </div>

                <div className="space-y-12">
                    {facilities.map((facility, i) => (
                        <div key={i} className={`grid lg:grid-cols-2 gap-10 items-center ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                            <div className={`${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                                <div className="text-6xl mb-6">{facility.icon}</div>
                                <h3 className="text-2xl font-bold text-white mb-4">{facility.title}</h3>
                                <p className="text-gray-400 leading-relaxed mb-6">{facility.desc}</p>
                                <ul className="space-y-3">
                                    {facility.highlights.map((hl, j) => (
                                        <li key={j} className="flex items-center gap-3 text-gray-300 text-sm">
                                            <div className="w-2 h-2 rounded-full bg-blue-400 flex-shrink-0" />
                                            {hl}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className={`${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                                <div className="glass rounded-2xl p-10 border border-brand-500/20 bg-gradient-to-br from-brand-900/20 to-brand-900/10 text-center">
                                    <div className="text-8xl mb-4">{facility.icon}</div>
                                    <p className="text-brand-400 font-semibold">{facility.title}</p>
                                    <p className="text-gray-500 text-sm mt-2">World-Class Facility</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Infrastructure Stats */}
                <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                        { value: '3', label: 'State-of-the-Art Labs', icon: '🔬' },
                        { value: '5', label: 'Training Centers', icon: '🏢' },
                        { value: '30+', label: 'Lab Workstations', icon: '💻' },
                        { value: '100%', label: 'Modern Equipment', icon: '⚡' },
                    ].map((stat, i) => (
                        <div key={i} className="glass-card text-center hover-lift">
                            <div className="text-3xl mb-3">{stat.icon}</div>
                            <div className="text-3xl font-black text-white">{stat.value}</div>
                            <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
