import { TrendingUp, Award, Briefcase, CheckCircle, Settings, Users, Headphones, BarChart, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';

const benefits = [
    {
        icon: <Briefcase className="w-7 h-7 text-brand-500" />,
        title: 'Installation Engineers',
        desc: 'Execute precise setups of CCTV and security systems for diverse clients.'
    },
    {
        icon: <Settings className="w-7 h-7 text-brand-500" />,
        title: 'Service Engineers',
        desc: 'Diagnose and resolve technical issues to ensure system longevity.'
    },
    {
        icon: <Headphones className="w-7 h-7 text-brand-500" />,
        title: 'Customer Support Engineers',
        desc: 'Provide expert guidance and troubleshooting for security system users.'
    },
    {
        icon: <TrendingUp className="w-7 h-7 text-brand-500" />,
        title: 'Project Engineers',
        desc: 'Oversee the implementation of large-scale security infrastructures.'
    },
    {
        icon: <Users className="w-7 h-7 text-brand-500" />,
        title: 'Project Managers',
        desc: 'Lead teams and manage resources for complex safety projects.'
    },
    {
        icon: <BarChart className="w-7 h-7 text-brand-500" />,
        title: 'Sales Managers',
        desc: 'Drive growth by offering tailored security solutions to businesses.'
    },
    {
        icon: <Rocket className="w-7 h-7 text-brand-500" />,
        title: 'Entrepreneurial Ventures',
        desc: 'Start your own business in the booming security and surveillance market.'
    }
];

export default function DemandBenefits() {
    return (
        <div className="bg-[#0a0a0a] min-h-screen font-sans text-gray-200">
            {/* Hero Section */}
            <section className="relative h-[450px] flex items-center justify-center overflow-hidden">
                <img
                    src="https://res.cloudinary.com/dq6gr5zjc/image/upload/v1773735685/Jul19_05-931636724_bgirdp.avif"
                    alt="Security Systems"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-[#0a0a0a]"></div>

                <div className="relative z-10 text-center max-w-4xl px-4">
                    <span className="text-brand-500 font-bold tracking-widest uppercase text-sm mb-4 block">Future-Proof Careers</span>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
                        Demand & <br className="md:hidden" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-brand-600">
                            Benefits
                        </span>
                    </h1>
                    <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
                        Explore the immense potential and career opportunities in the world of CCTV, Safety, and Security training.
                    </p>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 py-20">
                {/* Introduction */}
                <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-500/10 text-brand-500 border border-brand-500/20 text-xs font-bold uppercase tracking-wider mb-6">
                            <TrendingUp className="w-4 h-4" />
                            Industry Growth
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                            Home Automation Training <br />
                            <span className="text-brand-500">with Certificate</span>
                        </h2>
                        <p className="text-gray-400 mb-6 leading-relaxed">
                            Altron Institute conducts various training programs providing a well-disposed development of students while offering best practices in the latest technologies, trends, and challenges in the competitive arena of CCTV and Security training.
                        </p>
                        <p className="text-gray-400 mb-8 leading-relaxed">
                            We offer courses that come with accessible certification to become a CCTV and Security Systems engineer. Learn about CCTV Camera Systems and start your business with high salary packages. This technical expertise is essential to resolve issues with proper guidance.
                        </p>
                        <Link to="/contact" className="inline-block bg-brand-600 hover:bg-brand-500 text-white font-bold py-4 px-8 rounded-xl transition-all hover:shadow-lg hover:shadow-brand-500/20 active:scale-[0.98]">
                            Start Your Career
                        </Link>
                    </div>

                    <div className="relative">
                        <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl shadow-brand-500/10 border border-white/10">
                            <img
                                src="https://res.cloudinary.com/dq6gr5zjc/image/upload/v1773735746/home-automation_cin1eq.jpg"
                                alt="CCTV Technology"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="absolute -bottom-6 -left-6 bg-[#111111] p-6 rounded-2xl shadow-xl border border-white/10 max-w-[240px]">
                            <div className="flex items-center gap-3 mb-2 text-brand-500 font-bold">
                                <Award className="w-5 h-5" />
                                Certified Excellence
                            </div>
                            <p className="text-xs text-gray-400 leading-relaxed">
                                Join the future scope of the Digital World with our expert-led practical training.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Demand Section */}
                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 mb-24 relative overflow-hidden backdrop-blur-sm">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>

                    <div className="relative z-10 max-w-3xl">
                        <h2 className="text-3xl font-bold text-white mb-8">
                            Demand for CCTV Install, <br />
                            <span className="text-brand-500">Repair and Maintenance</span>
                        </h2>
                        <div className="border-l-4 border-brand-500 pl-6 mb-8">
                            <p className="text-gray-400 text-lg leading-relaxed italic">
                                "With over 10 Crore (100 Million) CCTV cameras installed in Tamil Nadu alone, the special skills for CCTV systems repair and maintenance technicians are in greater demand."
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-4 p-4 bg-[#0a0a0a] rounded-xl border border-white/5">
                                <div className="w-10 h-10 rounded-lg bg-brand-500/10 flex items-center justify-center shrink-0">
                                    <CheckCircle className="w-5 h-5 text-brand-500" />
                                </div>
                                <p className="text-gray-300 text-sm">
                                    Invaluable for tech-savvy end users wishing to ensure system accuracy.
                                </p>
                            </div>
                            <div className="flex items-center gap-4 p-4 bg-[#0a0a0a] rounded-xl border border-white/5">
                                <div className="w-10 h-10 rounded-lg bg-brand-500/10 flex items-center justify-center shrink-0">
                                    <CheckCircle className="w-5 h-5 text-brand-500" />
                                </div>
                                <p className="text-gray-300 text-sm">
                                    High demand due to increasing focus on safety and security.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Benefits Section */}
                <div className="mb-24">
                    <div className="text-center mb-12">
                        <span className="text-brand-500 font-bold tracking-widest uppercase text-xs mb-3 block">Career Path</span>
                        <h2 className="text-3xl font-bold text-white mb-4">Benefits of the Course</h2>
                        <div className="h-1 w-20 bg-brand-500 mx-auto mb-6"></div>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Upon successful completion, we provide placement assistance and a clear path for career progression.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {benefits.map((benefit, i) => (
                            <div key={i} className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-brand-500/50 transition-all duration-300 group">
                                <div className="w-14 h-14 rounded-xl bg-brand-500/10 flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform">
                                    {benefit.icon}
                                </div>
                                <h3 className="text-white font-bold text-xl mb-3">{benefit.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{benefit.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Call to Action */}
                <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-12 text-center border border-brand-500/30 shadow-2xl shadow-brand-500/10">
                    <div className="max-w-2xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
                            Ready to transform your future?
                        </h2>
                        <p className="text-gray-400 mb-10 text-lg">
                            Join Altron Institute and gain the skills that are in high demand across the globe.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/contact" className="bg-brand-600 hover:bg-brand-500 text-white font-bold py-4 px-8 rounded-xl transition-all hover:shadow-lg hover:shadow-brand-500/20 active:scale-[0.98]">
                                Enquire Now
                            </Link>
                            <Link to="/fees-eligibility" className="bg-transparent hover:bg-white/5 text-white font-bold py-4 px-8 rounded-xl border border-white/20 transition-all hover:border-white/40">
                                View Course Fees
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}