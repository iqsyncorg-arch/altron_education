import PageHero from '../components/PageHero';
import { Shield, BookOpen, Users, Lightbulb, CheckCircle } from 'lucide-react';

const objectives = [
    { icon: Lightbulb, title: 'Awareness Programs', desc: 'Creating public awareness about the importance of safety and security systems in modern infrastructure.' },
    { icon: Users, title: 'Industry Seminars', desc: 'Conducting regular seminars and workshops with leading industry professionals and experts.' },
    { icon: BookOpen, title: 'Research & Development', desc: 'Continuous R&D to stay updated with the latest advancements in security technologies.' },
    { icon: Shield, title: 'Skill Development', desc: 'Equipping students with practical skills demanded by the rapidly growing security industry.' },
];

const activities = [
    'CCTV Surveillance System Installation Training',
    'Fire Alarm System Installation and Maintenance Training',
    'Access Control and Biometric Systems Training',
    'Professional Safety & Security Engineering Programs',
    'Industry Placement Assistance',
    'International Certification Facilitation',
    'Franchise Partner Development',
    'Online Learning via Altron e-Campus',
];

export default function AboutInstitute() {
    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Header Section with Image Background */}
            <div className="relative h-[60vh] flex items-center overflow-hidden">
                <div
                    className="absolute inset-0 z-0 bg-fixed bg-center bg-cover"
                    style={{
                        backgroundImage: 'url("https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80")'
                    }}
                >
                    {/* Darker Overlay to prevent "soil" mixing with text */}
                    <div className="absolute inset-0 bg-slate-900/70" />
                </div>

                <div className="relative z-10 w-full">
                    <PageHero
                        title="About Altron Academy"
                        subtitle="Pioneering safety and security education since 2008 with international accreditation"
                        breadcrumbs={['Academy', 'About Institute']}
                    />
                </div>
            </div>

            {/* Main Content Area - White Background for Readability */}
            <div className="max-w-7xl mx-auto px-4 py-20 relative z-10">

                {/* Heritage & Mission Section */}
                <div className="grid lg:grid-cols-2 gap-16 items-start mb-24">
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 bg-brand-100 border border-brand-200 rounded-full px-4 py-2 text-brand-700 text-sm font-medium">
                            <Shield className="w-4 h-4" />
                            Established 2008
                        </div>
                        <h2 className="text-4xl font-bold text-slate-900">Our Heritage & Mission</h2>
                        <div className="space-y-4 text-slate-600 leading-relaxed text-lg">
                            <p>
                                Altron Academy was established in 2008 with a singular vision: to create a world-class training institution that bridges the gap between academic learning and industry requirements in the safety and security sector.
                            </p>
                            <p>
                                Over the years, we have grown into one of South India's most reputed institutes for security system training, accredited by the prestigious <strong className="text-brand-600 font-bold">BSA-JAS-ANZ</strong> certification body from New Zealand and Australia.
                            </p>
                            <p>
                                Our institute is also recognized by the Government of India through affiliations with <strong className="text-brand-600 font-bold">MSME</strong> and <strong className="text-brand-600 font-bold">NIESBUD</strong>, making our certifications valuable and credible in both domestic and international job markets.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {/* International Recognition Card */}
                        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                            <div className="text-4xl mb-4 text-brand-500">🏆</div>
                            <h3 className="text-slate-900 font-bold text-2xl mb-3">International Recognition</h3>
                            <p className="text-slate-600 leading-relaxed">
                                Proudly certified by <strong className="text-brand-600">BSA-JAS-ANZ</strong>, an internationally recognized accreditation body. Our certificates are verifiable worldwide and accepted by global employers.
                            </p>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-3 gap-4">
                            {[
                                { value: '2008', label: 'Founded' },
                                { value: '10K+', label: 'Alumni' },
                                { value: '100%', label: 'Placement' },
                            ].map((stat) => (
                                <div key={stat.label} className="bg-brand-600 p-6 rounded-2xl text-center shadow-lg transform hover:-translate-y-1 transition-transform">
                                    <div className="text-2xl font-black text-white">{stat.value}</div>
                                    <div className="text-brand-100 text-xs font-medium uppercase tracking-wider mt-1">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Objectives Section */}
                <div className="mb-24">
                    <div className="text-center mb-16">
                        <span className="text-brand-600 font-bold tracking-widest uppercase text-sm">Our Purpose</span>
                        <h2 className="text-4xl font-bold text-slate-900 mt-2">Objectives of the Institute</h2>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {objectives.map((obj, i) => (
                            <div key={i} className="bg-white p-8 rounded-2xl shadow-md border border-gray-50 hover:shadow-xl transition-shadow text-center">
                                <div className="w-16 h-16 rounded-2xl bg-brand-50 flex items-center justify-center mx-auto mb-6">
                                    <obj.icon className="w-8 h-8 text-brand-600" />
                                </div>
                                <h3 className="text-slate-900 font-bold text-xl mb-3">{obj.title}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">{obj.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Activities Section */}
                <div className="bg-slate-900 rounded-3xl p-10 lg:p-16 shadow-2xl relative overflow-hidden">
                    {/* Decorative Background Element */}
                    <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl"></div>

                    <div className="relative z-10">
                        <div className="mb-12">
                            <span className="text-brand-400 font-bold tracking-widest uppercase text-sm">What We Do</span>
                            <h2 className="text-4xl font-bold text-white mt-2">Our Activities</h2>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            {activities.map((activity, i) => (
                                <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                                    <CheckCircle className="w-6 h-6 text-brand-400 flex-shrink-0" />
                                    <span className="text-gray-200 font-medium">{activity}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}