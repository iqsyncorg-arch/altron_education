import PageHero from '../components/PageHero';
import { Award, CheckCircle, Globe, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function InternationalCertification() {
    return (
        <div>

            {/* Header with Fixed Image */}
            <div
                className="relative h-[450px] flex items-center justify-center bg-fixed bg-center bg-cover"
                style={{
                    backgroundImage:
                        "url('https://res.cloudinary.com/dq6gr5zjc/image/upload/v1773062591/ChatGPT_Image_Mar_9_2026_06_42_27_PM_iihcoo.png')"
                }}
            >
                {/* overlay */}
                <div className="absolute inset-0 bg-white/80"></div>

                <div className="relative z-10 text-center max-w-4xl px-4">

                    <h1 className="text-5xl font-bold text-black mb-4">
                        International Certification
                    </h1>

                    <p className="text-lg text-black">
                        Globally recognized credentials that open doors to opportunities worldwide
                    </p>

                    <div className="text-sm text-gray-700 mt-4">
                        Academy / International Certification
                    </div>

                </div>
            </div>


            <div className="max-w-7xl mx-auto px-4 py-20">

                {/* Main Certification Card */}
                <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">

                    <div>

                        <div className="inline-flex items-center gap-2 bg-amber-100 border border-amber-300 rounded-full px-4 py-2 text-black text-sm mb-6">
                            <Globe className="w-4 h-4" /> International Accreditation
                        </div>

                        <h2 className="text-3xl font-bold text-black mb-6">
                            BSA-JAS-ANZ Certification
                        </h2>

                        <div className="space-y-4 text-gray-700 leading-relaxed">

                            <p>
                                Altron Academy is proudly certified by
                                <strong className="text-black"> BSA-JAS-ANZ</strong>, a prestigious international
                                accreditation body based in <strong className="text-black">New Zealand and Australia</strong>.
                            </p>

                            <p>
                                This certification ensures that our course curriculum, teaching methodology,
                                infrastructure, and faculty meet international standards. Students who complete
                                our programs receive certificates that are recognized globally.
                            </p>

                            <p>
                                The BSA-JAS-ANZ certification validates the authenticity of our training programs
                                and assures employers worldwide of the quality and credibility of our graduates.
                            </p>

                        </div>

                        <Link
                            to="/authenticity"
                            className="btn-primary mt-8 inline-flex items-center gap-2"
                        >
                            <Shield className="w-4 h-4" /> Verify Certificate
                        </Link>

                    </div>


                    {/* Certification Card */}
                    <div className="glass rounded-3xl p-12 border border-amber-500/30 text-center bg-gradient-to-br from-amber-100 to-orange-100">

                        <div className="text-8xl mb-6">🏆</div>

                        <div className="text-black font-black text-2xl mb-2">
                            BSA-JAS-ANZ
                        </div>

                        <div className="text-gray-800 font-semibold mb-1">
                            Certified Institute
                        </div>

                        <div className="text-gray-600 text-sm mb-6">
                            New Zealand & Australia
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            {['New Zealand', 'Australia', 'India', 'International'].map((country) => (
                                <div
                                    key={country}
                                    className="bg-amber-100 border border-amber-300 rounded-lg py-2 px-3 text-black text-xs font-medium"
                                >
                                    ✓ {country}
                                </div>
                            ))}
                        </div>

                    </div>
                </div>



                {/* Benefits */}
                <div className="mb-20">

                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-black">
                            Benefits of International Certification
                        </h2>
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

                                <benefit.icon className="w-8 h-8 text-red-600 mb-4" />

                                <h3 className="text-black font-semibold mb-2">
                                    {benefit.title}
                                </h3>

                                <p className="text-gray-700 text-sm">
                                    {benefit.desc}
                                </p>

                            </div>
                        ))}

                    </div>

                </div>



                {/* Certificate Verification */}
                <div className="glass rounded-2xl p-8 border border-red-200 text-center">

                    <div className="text-4xl mb-4">🔍</div>

                    <h3 className="text-black font-bold text-2xl mb-3">
                        Verify Your Certificate
                    </h3>

                    <p className="text-gray-700 max-w-lg mx-auto mb-6">
                        Every Altron Academy certificate comes with a unique roll number.
                        Employers and institutions can verify the authenticity of any
                        certificate issued by us.
                    </p>

                    <Link
                        to="/authenticity"
                        className="btn-primary inline-flex items-center gap-2"
                    >
                        <Shield className="w-4 h-4" />
                        Go to Certificate Verification
                    </Link>

                </div>

            </div>
        </div>
    );
}