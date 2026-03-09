import PageHero from '../components/PageHero';
import { CheckCircle, Clock, Award, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';

const curriculum = [
    'Introduction to Fire Safety Standards',
    'Types of Fire Alarm Systems',
    'Smoke and Heat Detectors',
    'Manual Call Points & Sounders',
    'Fire Alarm Control Panels',
    'Cable Installation & Routing',
    'Zone Configuration & Programming',
    'Testing and Commissioning',
    'Emergency Response Procedures',
    'Compliance and Documentation',
];

const careerOpportunities = [
    'Fire Alarm Technician', 'Fire Safety Engineer', 'Commissioning Engineer',
    'Fire Consultant', 'Maintenance Technician', 'Project Coordinator',
];

const whyImportant = [
    { title: 'Life Safety', desc: 'Fire alarm systems are the first line of defense in saving lives during emergencies.' },
    { title: 'Legal Compliance', desc: 'All commercial and residential buildings are mandated to have certified fire alarm systems.' },
    { title: 'Growing Demand', desc: 'Smart city initiatives and new construction drive continuous demand for qualified technicians.' },
    { title: 'High Salaries', desc: 'Certified fire alarm engineers command premium salaries in the job market.' },
];

export default function FireAlarmTraining() {
    return (
        <div>
            <PageHero
                title="Fire Alarm Training"
                subtitle="Become a certified fire alarm installation and maintenance technician"
                breadcrumbs={['Courses', 'Fire Alarm Training']}
            />
            <div className="max-w-7xl mx-auto px-4 py-20">
                {/* Why Important */}
                <div className="mb-16">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-white">Why Fire Alarm Training Matters</h2>
                        <p className="text-gray-400 mt-3 max-w-2xl mx-auto">
                            Fire alarm technicians play a critical role in protecting life and property. With mandatory fire safety regulations and rapid urbanization, this is one of the fastest-growing career fields.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {whyImportant.map((item, i) => (
                            <div key={i} className="glass-card border border-orange-500/20 hover-lift">
                                <Flame className="w-8 h-8 text-orange-400 mb-3" />
                                <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                                <p className="text-gray-400 text-sm">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Course Details */}
                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-4">Course Overview</h2>
                            <div className="space-y-4 text-gray-400 leading-relaxed">
                                <p>
                                    Our <strong className="text-white">Diploma Course in Fire Alarm System</strong> provides comprehensive training on all aspects of fire detection and alarm systems. From selecting appropriate detectors to programming complex fire panels, students gain expertise through hands-on lab sessions.
                                </p>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white mb-6">Curriculum</h3>
                            <div className="grid md:grid-cols-2 gap-3">
                                {curriculum.map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/3 border border-white/5 hover:bg-white/5 transition-colors">
                                        <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 text-xs font-bold flex-shrink-0">
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
                                    <span key={role} className="bg-orange-500/10 border border-orange-500/20 text-orange-300 px-4 py-2 rounded-full text-sm">{role}</span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <div className="glass rounded-2xl p-6 border border-orange-500/20">
                            <h3 className="text-white font-bold text-lg mb-4">Course Details</h3>
                            <div className="space-y-4">
                                {[
                                    { label: 'Duration', value: '5 Days', icon: Clock },
                                    { label: 'Eligibility', value: 'SSLC / HSC / Diploma / Degree', icon: CheckCircle },
                                    { label: 'Certification', value: 'BSA-JAS-ANZ International', icon: Award },
                                ].map((detail, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <detail.icon className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <div className="text-gray-500 text-xs">{detail.label}</div>
                                            <div className="text-white text-sm font-medium">{detail.value}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Link to="/contact" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl w-full text-center block mt-6 transition-all">
                                Enquire Now
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
