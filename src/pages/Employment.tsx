import PageHero from '../components/PageHero';
import { CheckCircle, TrendingUp, Users, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
    { icon: CheckCircle, title: '100% Placement Support', desc: 'Every eligible student gets dedicated placement assistance from our job cell.' },
    { icon: TrendingUp, title: 'Industry Connections', desc: 'Tie-ups with 200+ security companies across India for direct placement.' },
    { icon: Users, title: 'Career Counseling', desc: 'Personalized career guidance sessions and resume building workshops.' },
    { icon: Briefcase, title: 'Interview Preparation', desc: 'Mock interviews and technical assessments to prepare you for top companies.' },
];

const companies = [
    'TechGuard India', 'SecureZone Pvt Ltd', 'BuildSafe Systems', 'CityWatch Security',
    'GuardPro Solutions', 'SafeVision Technologies', 'FireShield Corp', 'AccessMasters',
    'NexGen Security', 'ProAlert India', 'VisionTech Systems', 'SafeNet India',
];

const jobRoles = [
    { role: 'CCTV Technician', salary: '₹15,000 - ₹35,000/month', demand: 'Very High' },
    { role: 'Fire Alarm Engineer', salary: '₹18,000 - ₹40,000/month', demand: 'High' },
    { role: 'Biometric Systems Specialist', salary: '₹20,000 - ₹45,000/month', demand: 'Very High' },
    { role: 'Security Project Manager', salary: '₹35,000 - ₹80,000/month', demand: 'High' },
    { role: 'Technical Sales Engineer', salary: '₹25,000 - ₹55,000/month', demand: 'Medium' },
    { role: 'International Technician (Gulf)', salary: '₹50,000 - ₹1,20,000/month', demand: 'Very High' },
];

export default function Employment() {
    return (
        <div>
            <PageHero
                title="Employment & Placement"
                subtitle="Your career success is our ultimate goal — 100% placement support for all eligible students"
                breadcrumbs={['Employment']}
            />
            <div className="max-w-7xl mx-auto px-4 py-20">
                {/* Features */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                    {features.map((f, i) => (
                        <div key={i} className="glass-card hover-lift text-center">
                            <div className="w-12 h-12 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center mx-auto mb-4">
                                <f.icon className="w-6 h-6 text-brand-500" />
                            </div>
                            <h3 className="text-white font-semibold mb-2">{f.title}</h3>
                            <p className="text-gray-400 text-sm">{f.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Job Roles */}
                <div className="mb-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-white">Career Opportunities & Salaries</h2>
                    </div>
                    <div className="glass rounded-2xl overflow-hidden border border-white/10">
                        <table className="w-full">
                            <thead className="bg-brand-500/10 border-b border-white/10">
                                <tr>
                                    <th className="text-left py-4 px-6 text-brand-400 text-sm font-semibold">Job Role</th>
                                    <th className="text-left py-4 px-6 text-brand-400 text-sm font-semibold">Expected Salary</th>
                                    <th className="text-left py-4 px-6 text-brand-400 text-sm font-semibold">Market Demand</th>
                                </tr>
                            </thead>
                            <tbody>
                                {jobRoles.map((job, i) => (
                                    <tr key={i} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                                        <td className="py-4 px-6 text-white font-medium text-sm">{job.role}</td>
                                        <td className="py-4 px-6 text-green-400 font-semibold text-sm">{job.salary}</td>
                                        <td className="py-4 px-6">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${job.demand === 'Very High' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                                                    job.demand === 'High' ? 'bg-brand-500/10 text-brand-500 border border-brand-500/20' :
                                                        'bg-amber-500/10 text-brand-500 border border-brand-200'
                                                }`}>
                                                {job.demand}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Companies */}
                <div className="mb-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-white">Our Placement Partners</h2>
                        <p className="text-gray-400 mt-3">Companies that have hired Altron Academy graduates</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {companies.map((company, i) => (
                            <div key={i} className="glass-card text-center hover-lift">
                                <div className="text-2xl mb-2">🏢</div>
                                <p className="text-gray-300 text-sm font-medium">{company}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Skill Dev CTA */}
                <div className="glass rounded-2xl p-10 border border-brand-500/20 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">Skill Development for Tomorrow's Leaders</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto mb-8">
                        The security industry is growing rapidly. Equip yourself with the skills that employers are looking for right now and secure your future with an internationally recognized certification.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link to="/courses" className="btn-primary px-8 py-4">Browse Courses</Link>
                        <Link to="/contact" className="btn-secondary px-8 py-4">Talk to Counselor</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
