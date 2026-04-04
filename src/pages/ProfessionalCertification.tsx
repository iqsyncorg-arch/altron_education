import { Award, CheckCircle, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProfessionalCertification() {
    return (
        <div className="bg-white">

            {/* HERO SECTION (NO BLUR) */}
            <div
                className="relative h-[480px] flex items-center justify-center bg-fixed bg-center bg-cover"
                style={{
                    backgroundImage:
                        "url('https://res.cloudinary.com/dq6gr5zjc/image/upload/v1773062591/ChatGPT_Image_Mar_9_2026_06_42_27_PM_iihcoo.png')"
                }}
            >
                {/* DARK OVERLAY (premium look) */}
                <div className="absolute inset-0 bg-black/60"></div>

                <div className="relative z-10 text-center max-w-3xl px-4">

                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
                        Online Verified Certification
                    </h1>



                </div>
            </div>


            <div className="max-w-7xl mx-auto px-4 py-24">

                {/* MAIN SECTION */}
                <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">

                    {/* LEFT */}
                    <div>

                        <div className="inline-flex items-center gap-2 bg-blue-100 border border-blue-300 rounded-full px-4 py-2 text-black text-sm mb-6">
                            <Shield className="w-4 h-4" /> Online Verified Certification
                        </div>

                        <h2 className="text-3xl md:text-4xl font-bold text-black mb-6 tracking-tight">
                            Certificate Verification
                        </h2>

                        <div className="space-y-5 text-gray-700 leading-relaxed text-[15px]">

                            <p>
                                All our certificates are issued with a unique Roll Number for authentication.
                                To verify the validity of your certificate, please enter the Roll Number on our official verification page
                            </p>

                            <p>
                                This ensures transparency and allows anyone to easily confirm the authenticity of the certificate.
                            </p>



                        </div>

                        <Link
                            to="/authenticity"
                            className="mt-8 inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold shadow-sm hover:shadow-md transition"
                        >
                            <Shield className="w-4 h-4" /> Verify Certificate
                        </Link>

                    </div>


                    {/* RIGHT IMAGE */}
                    <div className="relative group">
                        <div className="rounded-3xl overflow-hidden shadow-2xl border border-gray-200 bg-white">
                            <img
                                src="https://res.cloudinary.com/dq6gr5zjc/image/upload/v1774726745/27edc2b0-288e-4078-bbce-71f72695443b_wplacj.jpg"
                                alt="Government Approval"
                                className="w-full h-auto object-contain blur-[2px] group-hover:blur-0 transition-all duration-500"
                            />
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/20 rounded-3xl pointer-events-none">
                            <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-bold text-black shadow-lg">
                                Official Government Approval Document
                            </div>
                        </div>
                    </div>

                </div>



                {/* BENEFITS */}
                <div className="mb-24">

                    <div className="text-center mb-14">
                        <h2 className="text-3xl md:text-4xl font-bold text-black tracking-tight">
                            Benefits of Professional Certification
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                        {[
                            { title: 'Industry Recognized', desc: 'Certificates highly valued by security companies across India.', icon: Shield },
                            { title: 'Higher Employability', desc: 'Professional certification gives you an edge over non-certified candidates.', icon: Award },
                            { title: 'Authentic Credentials', desc: 'Every certificate has a unique roll number verifiable online.', icon: Shield },
                            { title: 'Career Advancement', desc: 'Opens doors to senior technical and management positions.', icon: CheckCircle },
                            { title: 'Govt. Affiliated', desc: 'Recognized by MSME adding massive credibility.', icon: Shield },
                            { title: 'Skill Validation', desc: 'Ensures your practical skills match current industry requirements.', icon: Award },
                        ].map((benefit, i) => (
                            <div
                                key={i}
                                className="group bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-xl transition duration-300"
                            >

                                <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-red-50 mb-4 group-hover:scale-105 transition">
                                    <benefit.icon className="w-6 h-6 text-red-600" />
                                </div>

                                <h3 className="text-black font-semibold mb-2">
                                    {benefit.title}
                                </h3>

                                <p className="text-gray-700 text-sm leading-relaxed">
                                    {benefit.desc}
                                </p>

                            </div>
                        ))}

                    </div>

                </div>



                {/* VERIFICATION */}
                <div className="rounded-2xl p-10 border border-red-200 text-center bg-gradient-to-b from-white to-gray-50 shadow-sm">

                    <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-red-50 text-3xl mb-5">
                        🔍
                    </div>

                    <h3 className="text-black font-bold text-2xl mb-3 tracking-tight">
                        Verify Your Certificate
                    </h3>

                    <p className="text-gray-700 max-w-lg mx-auto mb-8 leading-relaxed text-[15px]">
                        Every Altron Academy certificate comes with a unique roll number.
                        Employers and institutions can verify the authenticity of any
                        certificate issued by us.
                    </p>

                    <Link
                        to="/authenticity"
                        className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold shadow-sm hover:shadow-md transition"
                    >
                        <Shield className="w-4 h-4" />
                        Go to Certificate Verification
                    </Link>

                </div>

            </div>
        </div>
    );
}
