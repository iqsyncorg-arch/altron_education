import PageHero from '../components/PageHero';
import { Award, CheckCircle, Globe, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function InternationalCertification() {
    return (
        <div>
            <PageHero
                title="International Certification"
                subtitle="Globally recognized credentials that open doors to opportunities worldwide"
                breadcrumbs={['Academy', 'International Certification']}
            />
            <div className="max-w-7xl mx-auto px-4 py-20">
                {/* Main Certification Card */}
                <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
                    <div>
                        <div className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/20 rounded-full px-4 py-2 text-brand-400 text-sm mb-6">
                            <Globe className="w-4 h-4" /> International Accreditation
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-6">BSA-JAS-ANZ Certification</h2>
                        <div className="space-y-4 text-gray-400 leading-relaxed">
                            <p>
                                Altron Academy is proudly certified by <strong className="text-brand-400">BSA-JAS-ANZ</strong>, a prestigious international accreditation body based in <strong className="text-white">New Zealand and Australia</strong>.
                            </p>
                            <p>
                                This certification ensures that our course curriculum, teaching methodology, infrastructure, and faculty meet international standards. Students who complete our programs receive certificates that are recognized globally.
                            </p>
                            <p>
                                The BSA-JAS-ANZ certification validates the authenticity of our training programs and assures employers worldwide of the quality and credibility of our graduates.
                            </p>
                        </div>
                        <Link to="/authenticity" className="btn-primary mt-8 inline-flex items-center gap-2">
                            <Shield className="w-4 h-4" /> Verify Certificate
                        </Link>
                    </div>
                    <div className="glass rounded-3xl p-12 border border-amber-500/30 text-center bg-gradient-to-br from-amber-900/20 to-orange-900/10">
                        <div className="text-8xl mb-6">🏆</div>
                        <div className="text-brand-400 font-black text-2xl mb-2">BSA-JAS-ANZ</div>
                        <div className="text-gray-300 font-semibold mb-1">Certified Institute</div>
                        <div className="text-gray-500 text-sm mb-6">New Zealand & Australia</div>
                        <div className="grid grid-cols-2 gap-3">
                            {['New Zealand', 'Australia', 'India', 'International'].map((country) => (
                                <div key={country} className="bg-amber-400/10 border border-amber-400/20 rounded-lg py-2 px-3 text-brand-400 text-xs font-medium">
                                    ✓ {country}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Benefits */}
                <div className="mb-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-white">Benefits of International Certification</h2>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { title: 'Globally Recognized', desc: 'Certificates accepted by employers in 40+ countries worldwide.', icon: Globe },
                            { title: 'Higher Employability', desc: 'International certification gives you an edge over non-certified candidates.', icon: Award },
                            { title: 'Authentic Credentials', desc: 'Every certificate has a unique roll number verifiable online.', icon: Shield },
                            { title: 'Career Advancement', desc: 'Opens doors to senior technical and management positions.', icon: CheckCircle },
                            { title: 'Industry Recognition', desc: 'Recognized by top security companies in India and abroad.', icon: Award },
                            { title: 'MSME & NIESBUD', desc: 'Additional government recognition adds further credibility.', icon: Shield },
                        ].map((benefit, i) => (
                            <div key={i} className="glass-card hover-lift">
                                <benefit.icon className="w-8 h-8 text-brand-500 mb-4" />
                                <h3 className="text-white font-semibold mb-2">{benefit.title}</h3>
                                <p className="text-gray-400 text-sm">{benefit.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Certificate Verification */}
                <div className="glass rounded-2xl p-8 border border-brand-500/20 text-center">
                    <div className="text-4xl mb-4">🔍</div>
                    <h3 className="text-white font-bold text-2xl mb-3">Verify Your Certificate</h3>
                    <p className="text-gray-400 max-w-lg mx-auto mb-6">
                        Every Altron Academy certificate comes with a unique roll number. Employers and institutions can verify the authenticity of any certificate issued by us.
                    </p>
                    <Link to="/authenticity" className="btn-primary inline-flex items-center gap-2">
                        <Shield className="w-4 h-4" /> Go to Certificate Verification
                    </Link>
                </div>
            </div>
        </div>
    );
}
