import { Link } from 'react-router-dom';
import { useApi } from '../hooks/useApi';
import { Phone, Send, Users, Briefcase, TrendingUp, ShieldCheck, Star, Calendar, Clock, User, IndianRupee, FileText, ArrowRight, Crown } from 'lucide-react';

const COURSE_STYLING: Record<string, any> = {
    'cctv-diploma': { icon: '📷' },
    'fire-alarm-training': { icon: '🔥' },
    'access-biometric-training': { icon: '🆔' },
    'engineering': { icon: '🛡️' },
};

export default function FeesEligibility() {
    const { data: backendCourses, loading } = useApi<any[]>('/courses');

    if (loading) return <div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div></div>;

    const courses = ((backendCourses || []) as any).map((course: any) => {
        const isHighlighted = course.title?.includes('Engineering') || course.slug === 'engineering';
        const icon = COURSE_STYLING[course.slug]?.icon || '📷';
        
        return {
            ...course,
            isHighlighted,
            icon,
            rows: [
                { icon: Calendar, label: 'Duration', value: course.duration },
                { icon: Clock, label: 'Timing', value: course.timing },
                { icon: User, label: 'Eligibility', value: course.eligibility },
                { icon: Users, label: 'Batch', value: course.batchSize },
                { icon: IndianRupee, label: 'Course Fees', original: course.fees?.original, offer: course.fees?.offer },
            ]
        };
    });
    return (
        <div className="bg-gradient-to-b from-white to-gray-50">

            <div className="pt-24 pb-12 bg-white text-center border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
                        Duration, Eligibility & Fees
                    </h1>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-10">

                {/* CARDS */}
                <div className="grid md:grid-cols-2 gap-8 lg:gap-10 mb-20 items-start">

                    {courses.map((course: any, i: number) => {
                        const isPop = course.isHighlighted;
                        
                        return (
                        <div
                            key={i}
                            className={`group rounded-3xl border-[3px] ${
                                isPop 
                                    ? 'border-blue-400 bg-gradient-to-br from-blue-50 to-white shadow-[0_8px_30px_rgba(59,130,246,0.2)] md:-mt-4' 
                                    : 'border-white bg-white shadow-xl pt-1'
                            } transition-all duration-300 relative overflow-hidden`}
                        >
                            {/* For normal card, red top bar */}
                            {!isPop && <div className="absolute top-0 left-0 right-0 h-1.5 bg-red-600" />}

                            {/* POPULAR BADGE */}
                            {isPop && (
                                <div className="absolute -top-[1px] -left-[1px] bg-blue-600 text-white text-[11px] md:text-xs font-bold px-4 py-2 rounded-br-2xl rounded-tl-3xl shadow-md uppercase tracking-wider flex items-center gap-1.5 z-20">
                                    <Crown className="w-4 h-4" /> POPULAR
                                </div>
                            )}

                            {/* Most Chosen Watermark for Popular */}
                            {isPop && (
                                <div className="absolute top-6 right-6 font-[cursive] text-blue-300/60 text-3xl md:text-4xl -rotate-12 pointer-events-none z-0">
                                    Most<br/>Chosen
                                </div>
                            )}

                            <div className="p-8 pt-12 md:p-10 relative z-10">

                                {/* HEADER */}
                                <div className="flex items-start gap-5 mb-10">
                                    <div className={`w-16 h-16 shrink-0 flex items-center justify-center rounded-2xl text-3xl shadow-sm ${isPop ? 'bg-blue-100' : 'bg-red-50'}`}>
                                        {course.icon}
                                    </div>
                                    <div>
                                        <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight leading-snug mb-2">
                                            {course.title}
                                        </h2>
                                        <p className="text-sm font-medium text-slate-500">
                                            Practical Training Program
                                        </p>
                                    </div>
                                </div>

                                {/* LIST */}
                                <div className="space-y-0">
                                    {course.rows.map((row: any, j: number) => {
                                        const RowIcon = row.icon;
                                        const isFees = row.label === 'Course Fees';
                                        return (
                                            <div key={j} className="flex items-center py-4 border-b border-slate-100/80 last:border-0 gap-4">
                                                <div className="w-32 shrink-0 flex items-center gap-3">
                                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isPop ? 'bg-blue-50 text-blue-600' : 'bg-red-50 text-red-600'}`}>
                                                        <RowIcon className="w-4 h-4" />
                                                    </div>
                                                    <span className="text-slate-600 font-medium text-sm">{row.label}</span>
                                                </div>
                                                
                                                <div className="h-4 w-px bg-slate-200 shrink-0 mx-2 hidden md:block"></div>

                                                <div className="flex-1 font-bold text-[15px]">
                                                    {isFees ? (
                                                        <div className="flex flex-wrap items-center gap-3">
                                                            <span className="line-through text-slate-400 font-medium text-sm">₹{row.original}</span>
                                                            <span className={`px-4 py-1.5 rounded-full text-sm shadow-sm ${isPop ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                                                                Offer Price ₹{row.offer}
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        <span className={isPop ? 'text-blue-700' : 'text-red-600'}>
                                                            {row.value}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* BUTTONS */}
                                <div className="mt-10 grid grid-cols-1 xl:grid-cols-2 gap-4">
                                    <Link
                                        to="/contact"
                                        className={`flex items-center justify-center gap-2 text-white px-6 py-4 rounded-xl font-bold shadow-sm transition-transform hover:-translate-y-0.5 ${isPop ? 'bg-blue-600 hover:bg-blue-700' : 'bg-red-600 hover:bg-red-700'}`}
                                    >
                                        <FileText className="w-5 h-5" />
                                        Enquire for Fees
                                        <ArrowRight className="w-5 h-5 ml-1" />
                                    </Link>

                                    <Link
                                        to="/contact"
                                        className={`flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold border-2 transition-all ${isPop ? 'border-blue-100 text-blue-600 hover:bg-blue-50' : 'border-slate-200 text-slate-700 hover:border-red-600 hover:text-red-600'}`}
                                    >
                                        <Calendar className="w-5 h-5" />
                                        Schedule Visit
                                    </Link>
                                </div>

                            </div>
                        </div>
                        );
                    })}

                </div>


                {/* PLACEMENT */}
                {/* PLACEMENT BANNER */}
                <div className="bg-gradient-to-r from-red-700 to-red-600 rounded-[2rem] shadow-2xl text-white overflow-hidden relative border-4 border-white">
                    
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-red-500/40 via-transparent to-transparent opacity-60"></div>
                    <div className="absolute -left-20 top-1/4 w-64 h-64 bg-red-500 rounded-full blur-[80px] opacity-40"></div>

                    <div className="relative z-10 flex flex-col lg:flex-row">
                        {/* Left Content */}
                        <div className="p-8 md:p-12 lg:w-[65%] lg:pr-4 flex flex-col justify-center">
                            
                            <div className="self-start inline-flex items-center gap-2 bg-white text-red-700 font-extrabold px-5 py-2 rounded-full text-sm md:text-base mb-6 shadow-md">
                                <span className="text-yellow-500 text-lg leading-none">★</span> 100% Placement for Professional Courses
                            </div>

                            <h3 className="font-extrabold text-4xl md:text-5xl lg:text-6xl mb-6 tracking-tight leading-tight">
                                Launch Your Career <br className="hidden md:block"/> 
                                with <span className="text-yellow-400">Confidence</span>
                            </h3>

                            <p className="text-red-50 mb-10 text-sm md:text-base leading-relaxed max-w-2xl">
                                Our training bridges the gap between students and corporate companies.
                                After successful completion of the Professional Course, students receive
                                guaranteed placement support across Tamil Nadu and nationwide opportunities.
                            </p>

                            {/* Features Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 border-b border-red-500/50 pb-10">
                                <div className="flex items-center gap-3">
                                    <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                        <Users className="w-5 h-5 text-white" />
                                    </div>
                                    <span className="font-semibold text-sm leading-tight text-red-50">Industry<br/>Connections</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                        <Briefcase className="w-5 h-5 text-white" />
                                    </div>
                                    <span className="font-semibold text-sm leading-tight text-red-50">Placement<br/>Support</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                        <TrendingUp className="w-5 h-5 text-white" />
                                    </div>
                                    <span className="font-semibold text-sm leading-tight text-red-50">Nationwide<br/>Opportunities</span>
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex flex-wrap gap-4">
                                <a
                                    href="tel:+919841014328"
                                    className="bg-white hover:bg-gray-50 text-red-700 px-6 py-3.5 rounded-xl font-bold shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5 flex items-center gap-2"
                                >
                                    <Phone className="w-5 h-5 text-red-600 fill-red-600" />
                                    Call: 98410 14328
                                </a>

                                <Link
                                    to="/contact"
                                    className="border border-white/40 bg-black/20 hover:bg-black/30 text-white px-8 py-3.5 rounded-xl font-bold transition transform hover:-translate-y-0.5 flex items-center gap-2"
                                >
                                    <Send className="w-5 h-5 fill-white" />
                                    Send Enquiry
                                </Link>
                            </div>
                        </div>

                        {/* Right Content / Image Area */}
                        <div className="relative w-full lg:w-[40%] min-h-[350px] lg:min-h-0 flex-shrink-0 lg:rounded-br-[2rem]">
                            {/* Decorative Text */}
                            <div className="absolute top-10 right-10 rotate-[-10deg] opacity-70 hidden lg:block z-20 pointer-events-none">
                                <div className="font-[cursive] italic text-2xl text-white/90 leading-tight drop-shadow-md">
                                    Skills<br/>Today<br/>A Better<br/>Tomorrow
                                </div>
                                <div className="w-16 h-px bg-white/50 mt-2"></div>
                            </div>

                            {/* Image */}
                            <div className="absolute inset-0 pt-12 lg:pt-0 overflow-hidden lg:rounded-br-[2rem] flex items-end justify-center lg:justify-end">
                                <img 
                                    src="/image.png" 
                                    alt="Student Graduate" 
                                    className="w-full h-full object-contain object-bottom"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Bottom Features Bar */}
                    <div className="bg-red-800/40 backdrop-blur-sm px-8 py-4 flex flex-wrap items-center justify-between gap-4 text-xs font-semibold text-white/90 relative z-20">
                        <div></div> {/* Spacer */}
                        <div className="flex flex-wrap items-center gap-6 md:gap-10 w-full lg:w-auto lg:pr-8 justify-center lg:justify-end">
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="w-4 h-4 text-white" />
                                Trusted Training
                            </div>
                            <div className="flex items-center gap-2">
                                <Users className="w-4 h-4 text-white" />
                                Career Growth
                            </div>
                            <div className="flex items-center gap-2">
                                <Star className="w-4 h-4 text-white" />
                                Brighter Future
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
}