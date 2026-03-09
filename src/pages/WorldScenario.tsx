import PageHero from '../components/PageHero';
import { TrendingUp, Shield, Globe, Zap } from 'lucide-react';

const sectors = [
    { name: 'Banking & Finance', desc: 'ATMs, vaults, and banking halls require sophisticated CCTV and access control.', trend: '↑ 45% growth', icon: '🏦' },
    { name: 'Healthcare', desc: 'Hospitals and clinics need 24/7 surveillance and fire safety systems.', trend: '↑ 38% growth', icon: '🏥' },
    { name: 'Retail & Malls', desc: 'Large retail chains invest heavily in loss prevention and security systems.', trend: '↑ 52% growth', icon: '🏬' },
    { name: 'IT & Corporates', desc: 'Tech companies require multi-layer security including biometric access.', trend: '↑ 61% growth', icon: '💼' },
    { name: 'Government & Defence', desc: 'Public infrastructure requires certified security professionals.', trend: '↑ 33% growth', icon: '🏛️' },
    { name: 'Residential Projects', desc: 'Modern apartments and gated communities invest in smart security.', trend: '↑ 78% growth', icon: '🏘️' },
];

export default function WorldScenario() {
    return (
        <div>
            <PageHero
                title="World Scenario"
                subtitle="Understanding the global demand for security & safety professionals"
                breadcrumbs={['Academy', 'World Scenario']}
            />
            <div className="max-w-7xl mx-auto px-4 py-20">
                {/* Intro */}
                <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-white">The Growing Demand for Security Professionals</h2>
                        <div className="space-y-4 text-gray-400 leading-relaxed">
                            <p>
                                In an era defined by increasing urbanization, terrorism threats, and cybersecurity risks, the demand for trained safety and security professionals has never been greater. Nations across the globe are investing billions in upgrading their safety infrastructure.
                            </p>
                            <p>
                                The global security industry is valued at over <strong className="text-brand-400">$180 billion</strong> and is growing at a CAGR of 9.5%. In India alone, the market is projected to reach <strong className="text-brand-400">₹50,000 Crore</strong> by 2027.
                            </p>
                            <p>
                                Anti-terrorism measures, information technology security, and physical infrastructure protection are driving unprecedented demand for CCTV engineers, fire safety technicians, and access control specialists.
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { value: '$180B', label: 'Global Market Size', color: 'text-brand-500', icon: Globe },
                            { value: '9.5%', label: 'Annual Growth Rate', color: 'text-green-400', icon: TrendingUp },
                            { value: '₹50K Cr', label: 'India Market by 2027', color: 'text-brand-500', icon: TrendingUp },
                            { value: '2M+', label: 'Jobs Created Annually', color: 'text-brand-500', icon: Zap },
                        ].map((stat, i) => (
                            <div key={i} className="glass-card text-center hover-lift">
                                <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-3`} />
                                <div className={`text-2xl font-black ${stat.color}`}>{stat.value}</div>
                                <div className="text-gray-400 text-xs mt-1">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Industry Sectors */}
                <div className="mb-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-white">Key Industry Sectors Driving Demand</h2>
                        <p className="text-gray-400 mt-3 max-w-2xl mx-auto">Security professionals are needed across virtually every industry vertical today</p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {sectors.map((sector, i) => (
                            <div key={i} className="glass-card hover-lift">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="text-4xl">{sector.icon}</div>
                                    <span className="text-green-400 text-xs font-bold bg-green-400/10 px-2 py-1 rounded-full">{sector.trend}</span>
                                </div>
                                <h3 className="text-white font-semibold mb-2">{sector.name}</h3>
                                <p className="text-gray-400 text-sm">{sector.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Why Now */}
                <div className="glass rounded-2xl p-10 border border-white/10 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">Why There Has Never Been a Better Time</h2>
                    <p className="text-gray-400 max-w-3xl mx-auto mb-8">
                        With smart city initiatives, tightening safety regulations, and rising security awareness, career opportunities in this field are at an all-time high. Getting certified now positions you at the forefront of this boom.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        {['Anti-terrorism Measures', 'Smart City Projects', 'Corporate Security Mandates', 'Residential Safety', 'IT Infrastructure Security', 'Defence & Government'].map((tag) => (
                            <span key={tag} className="bg-brand-500/10 border border-brand-500/20 text-brand-400 px-4 py-2 rounded-full text-sm">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
