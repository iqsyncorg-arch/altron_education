import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApi } from '../hooks/useApi';
import { 
    CheckCircle, ShieldCheck, Briefcase, GraduationCap, ArrowRight,
    Star, ChevronDown, ChevronUp, AlertCircle, PlayCircle, Clock,
    Users, Settings, BadgeCheck, Building2,
    ChevronRight, BookOpen, Wrench, UserCheck, PhoneCall, CalendarCheck, Sparkles,
    Calendar, Siren
} from 'lucide-react';
import { Lottie } from 'lottie-react';
import moneyAnimation from '../assets/MoneyIcon.json';
import cctvAnimation from '../assets/cctv.json';
import { getYoutubeEmbedUrl } from '../utils/youtube';

const FAQ_DATA = [
    {
        q: "Do I need previous experience?",
        a: "No. The course is designed to provide the required technical knowledge and practical training."
    },
    {
        q: "How long is the Professional Course?",
        a: "The complete Professional Course is 4 weeks."
    },
    {
        q: "When do job opportunities start?",
        a: "Job opportunities start from the 5th week after completing the training, through the academy's placement process."
    },
    {
        q: "How much is the course fee?",
        a: "The total course fee is ₹33,000. You can reserve your seat with ₹1,000. The remaining ₹32,000 is payable after registration."
    },
    {
        q: "Is the training practical?",
        a: "Yes. The course includes theory as well as hands-on practical training."
    },
    {
        q: "Will I receive job referrals?",
        a: "Yes. Altron Academy supports eligible students with relevant job referrals and placement opportunities through its industry network."
    },
    {
        q: "What if I don't get placement?",
        a: "Altron provides a money-back placement commitment, subject to applicable terms and conditions."
    }
];

export default function LandingPage() {
    const { data: testimonialsData, loading: tLoading } = useApi<any>('/testimonials', []);
    const { data: storiesData } = useApi<any>('/stories', []);
    const [openFaq, setOpenFaq] = useState<number | null>(0);
    const [timeLeft, setTimeLeft] = useState(48 * 60 * 60 - 3500); // 47 hours, 1 minute
    const [errorLottieData, setErrorLottieData] = useState<any>(null);

    useEffect(() => {
        fetch('/error.json')
            .then((res) => res.json())
            .then((data) => setErrorLottieData(data))
            .catch((err) => console.error('Failed to load error.json:', err));
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 48 * 60 * 60));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (timeInSeconds: number) => {
        const d = Math.floor(timeInSeconds / (3600 * 24));
        const h = Math.floor((timeInSeconds % (3600 * 24)) / 3600);
        const m = Math.floor((timeInSeconds % 3600) / 60);
        const s = timeInSeconds % 60;
        return { d, h, m, s };
    };

    const { d, h, m, s } = formatTime(timeLeft);

    return (
        <div className="bg-zinc-50 min-h-screen font-sans selection:bg-brand-500/20 text-gray-900">

            {/* 1. HERO BANNER SECTION (FITS SINGLE SCREEN WINDOW WITH STACKED CARDS) */}
            <section className="min-h-screen lg:h-screen lg:max-h-[920px] pt-12 md:pt-14 pb-4 md:pb-6 bg-[#0d0d0d] text-white relative overflow-hidden flex flex-col justify-between">
                {/* Bottom-Right Red Fluid Curve */}
                <div className="absolute bottom-16 right-0 w-72 md:w-[480px] h-72 md:h-[480px] bg-gradient-to-tl from-[#e61c24] via-red-700 to-transparent rounded-tl-[16rem] opacity-80 mix-blend-screen pointer-events-none"></div>

                {/* Bottom White Background Curve Layer */}
                <div className="absolute bottom-0 left-0 right-0 h-44 md:h-52 bg-white pointer-events-none z-0" style={{ borderTopLeftRadius: '100% 45px' }}></div>

                <div className="max-w-7xl mx-auto px-4 relative z-10 text-center w-full my-auto flex flex-col justify-between h-full py-1">
                    
                    {/* Header Block */}
                    <div className="pt-2">
                        {/* Top Pill Badge */}
                        <div className="inline-flex items-center gap-2 bg-[#250a0a]/90 backdrop-blur-md border border-red-600/50 text-white px-4 py-1 rounded-full shadow-[0_0_20px_rgba(230,28,36,0.3)] mb-2">
                            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                            <span className="w-2 h-2 rounded-full bg-red-500 -ml-4"></span>
                            <span className="text-white font-extrabold text-[10px] sm:text-xs md:text-xs tracking-[0.16em] uppercase">
                                LIMITED SEATS AVAILABLE FOR NEXT BATCH
                            </span>
                        </div>

                        {/* Lottie Animation from public/error.json starting this text */}
                        {errorLottieData && (
                            <div className="w-14 h-14 sm:w-18 sm:h-18 md:w-20 md:h-20 mx-auto -mb-1 flex items-center justify-center">
                                <Lottie src={errorLottieData} loop autoplay />
                            </div>
                        )}

                        {/* Headline */}
                        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight uppercase leading-[0.95] mb-0.5 text-white" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.8)' }}>
                            READY FOR A
                        </h1>
                        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight uppercase leading-[0.95] mb-2 text-[#ff2b2b]" style={{ textShadow: '0 4px 30px rgba(255,43,43,0.4)' }}>
                            BETTER CAREER?
                        </h1>

                        {/* Sub-headlines */}
                        <p className="text-xs sm:text-base md:text-xl text-gray-200 font-medium tracking-tight mb-0.5">
                            Learn Professional Security Systems Skills in Just <strong className="text-white font-black">4 Weeks.</strong>
                        </p>
                        <p className="text-xs sm:text-base md:text-xl text-[#ff4d4d] font-extrabold tracking-tight mb-3 md:mb-4">
                            Start Exploring Job Opportunities From Week 5.
                        </p>
                    </div>

                    {/* 5 Category Cards */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 text-center relative z-20 my-1">
                        
                        {/* Card 1: CCTV Systems */}
                        <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] p-3.5 md:p-4 flex flex-col items-center justify-center text-center shadow-[0_12px_35px_rgba(0,0,0,0.12)] border border-gray-100 hover:-translate-y-1 transition-transform duration-300 group">
                            <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-[#fff0f0] flex items-center justify-center mb-2 shadow-inner group-hover:scale-105 transition-transform overflow-hidden">
                                <div className="relative w-10 h-10 md:w-14 md:h-14 flex items-center justify-center">
                                    <Lottie src={cctvAnimation} loop autoplay className="w-full h-full object-contain" />
                                </div>
                            </div>
                            <h3 className="text-sm sm:text-base md:text-lg font-black text-gray-900 leading-tight tracking-tight">
                                CCTV<br />Systems
                            </h3>
                        </div>

                        {/* Card 2: Biometrics Systems */}
                        <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] p-3.5 md:p-4 flex flex-col items-center justify-center text-center shadow-[0_12px_35px_rgba(0,0,0,0.12)] border border-gray-100 hover:-translate-y-1 transition-transform duration-300 group">
                            <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-[#eef6ff] flex items-center justify-center mb-2 shadow-inner group-hover:scale-105 transition-transform">
                                <div className="relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
                                    <svg className="w-9 h-9 md:w-10 md:h-10" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="12" y="8" width="40" height="48" rx="6" fill="#1E293B" stroke="#334155" strokeWidth="2" />
                                        <rect x="17" y="13" width="30" height="16" rx="2" fill="#0F172A" />
                                        <rect x="20" y="16" width="16" height="4" rx="1" fill="#38BDF8" />
                                        <rect x="20" y="22" width="24" height="3" rx="1" fill="#22C55E" />
                                        <rect x="33" y="33" width="14" height="18" rx="3" fill="#0284C7" />
                                        <path d="M40 37 Q44 40 40 43 Q36 46 40 49" stroke="#E0F2FE" strokeWidth="2" strokeLinecap="round" fill="none" />
                                        <path d="M38 39 Q41 41 38 43 Q37 44 38 46" stroke="#E0F2FE" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                                        <circle cx="21" cy="36" r="2" fill="#94A3B8" />
                                        <circle cx="27" cy="36" r="2" fill="#94A3B8" />
                                        <circle cx="21" cy="42" r="2" fill="#94A3B8" />
                                        <circle cx="27" cy="42" r="2" fill="#94A3B8" />
                                        <circle cx="21" cy="48" r="2" fill="#94A3B8" />
                                        <circle cx="27" cy="48" r="2" fill="#22C55E" />
                                    </svg>
                                </div>
                            </div>
                            <h3 className="text-sm sm:text-base md:text-lg font-black text-gray-900 leading-tight tracking-tight">
                                Biometrics<br />Systems
                            </h3>
                        </div>

                        {/* Card 3: Fire Alarm Systems */}
                        <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] p-3.5 md:p-4 flex flex-col items-center justify-center text-center shadow-[0_12px_35px_rgba(0,0,0,0.12)] border border-gray-100 hover:-translate-y-1 transition-transform duration-300 group">
                            <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-[#ffebee] flex items-center justify-center mb-2 shadow-inner group-hover:scale-105 transition-transform">
                                <div className="relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
                                    <svg className="w-9 h-9 md:w-10 md:h-10" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="32" cy="26" r="18" fill="#DC2626" stroke="#B91C1C" strokeWidth="2" />
                                        <circle cx="32" cy="26" r="14" fill="#EF4444" />
                                        <circle cx="32" cy="26" r="4" fill="#991B1B" />
                                        <rect x="14" y="32" width="6" height="4" rx="1" fill="#4B5563" />
                                        <circle cx="12" cy="34" r="3" fill="#1F2937" />
                                        <rect x="20" y="42" width="24" height="14" rx="3" fill="#DC2626" />
                                        <text x="32" y="52" textAnchor="middle" fill="white" fontSize="7" fontWeight="900" fontFamily="sans-serif">FIRE</text>
                                    </svg>
                                </div>
                            </div>
                            <h3 className="text-sm sm:text-base md:text-lg font-black text-gray-900 leading-tight tracking-tight">
                                Fire Alarm<br />Systems
                            </h3>
                        </div>

                        {/* Card 4: Burglar Alarm Systems */}
                        <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] p-3.5 md:p-4 flex flex-col items-center justify-center text-center shadow-[0_12px_35px_rgba(0,0,0,0.12)] border border-gray-100 hover:-translate-y-1 transition-transform duration-300 group">
                            <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-[#eef6ff] flex items-center justify-center mb-2 shadow-inner group-hover:scale-105 transition-transform">
                                <div className="relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
                                    <svg className="w-9 h-9 md:w-10 md:h-10" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <line x1="16" y1="18" x2="16" y2="8" stroke="#0284C7" strokeWidth="2.5" strokeLinecap="round" />
                                        <line x1="48" y1="18" x2="48" y2="8" stroke="#0284C7" strokeWidth="2.5" strokeLinecap="round" />
                                        <path d="M28 8 Q32 4 36 8" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" fill="none" />
                                        <path d="M25 5 Q32 0 39 5" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" fill="none" />
                                        <rect x="12" y="16" width="40" height="38" rx="6" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="2" />
                                        <rect x="18" y="22" width="28" height="10" rx="2" fill="#E0F2FE" stroke="#BAE6FD" strokeWidth="1" />
                                        <circle cx="22" cy="27" r="1.5" fill="#0284C7" />
                                        <circle cx="27" cy="27" r="1.5" fill="#0284C7" />
                                        <circle cx="32" cy="27" r="1.5" fill="#0284C7" />
                                        <circle cx="21" cy="38" r="2" fill="#94A3B8" />
                                        <circle cx="27" cy="38" r="2" fill="#94A3B8" />
                                        <circle cx="33" cy="38" r="2" fill="#94A3B8" />
                                        <circle cx="21" cy="44" r="2" fill="#94A3B8" />
                                        <circle cx="27" cy="44" r="2" fill="#94A3B8" />
                                        <circle cx="33" cy="44" r="2" fill="#94A3B8" />
                                        <circle cx="43" cy="38" r="2.5" fill="#22C55E" />
                                        <circle cx="43" cy="44" r="2.5" fill="#EF4444" />
                                    </svg>
                                </div>
                            </div>
                            <h3 className="text-sm sm:text-base md:text-lg font-black text-gray-900 leading-tight tracking-tight">
                                Burglar Alarm<br />Systems
                            </h3>
                        </div>

                        {/* Card 5: Home Security & Automation */}
                        <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] p-3.5 md:p-4 flex flex-col items-center justify-center text-center shadow-[0_12px_35px_rgba(0,0,0,0.12)] border border-gray-100 hover:-translate-y-1 transition-transform duration-300 group col-span-2 sm:col-span-1 lg:col-span-1">
                            <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-[#e6f7ed] flex items-center justify-center mb-2 shadow-inner group-hover:scale-105 transition-transform">
                                <div className="relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
                                    <svg className="w-9 h-9 md:w-10 md:h-10" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 28 L32 12 L52 28 L46 28 L46 50 L18 50 L18 28 Z" stroke="#0F172A" strokeWidth="4" strokeLinejoin="round" fill="none" />
                                        <path d="M26 26 Q32 20 38 26" stroke="#0284C7" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                                        <path d="M29 30 Q32 26 35 30" stroke="#0284C7" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                                        <circle cx="32" cy="33" r="1.5" fill="#0284C7" />
                                        <rect x="36" y="32" width="16" height="24" rx="3" fill="#0F172A" />
                                        <rect x="38" y="35" width="12" height="15" rx="1" fill="#0284C7" />
                                        <path d="M41 44 L44 41 L47 44 V47 H41 V44 Z" fill="white" />
                                    </svg>
                                </div>
                            </div>
                            <h3 className="text-sm sm:text-base md:text-lg font-black text-gray-900 leading-tight tracking-tight">
                                Home Security<br />& Automation
                            </h3>
                        </div>

                    </div>

                    {/* Bottom Features & Fee Bar Container */}
                    <div className="pb-1">
                        {/* Row 2: 4 Feature Badges */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3 mb-2.5 relative z-20">
                            <div className="bg-[#fff5f5] border border-red-100/90 rounded-full py-1.5 md:py-2 px-3 md:px-4 flex items-center justify-center gap-2 text-gray-900 text-xs md:text-xs font-bold shadow-sm hover:shadow-md transition-shadow">
                                <GraduationCap className="w-3.5 h-3.5 md:w-4 md:h-4 text-brand-600 shrink-0" />
                                <span>No prior experience required</span>
                            </div>
                            <div className="bg-[#fff5f5] border border-red-100/90 rounded-full py-1.5 md:py-2 px-3 md:px-4 flex items-center justify-center gap-2 text-gray-900 text-xs md:text-xs font-bold shadow-sm hover:shadow-md transition-shadow">
                                <BookOpen className="w-3.5 h-3.5 md:w-4 md:h-4 text-brand-600 shrink-0" />
                                <span>8th Standard to Any Degree can learn</span>
                            </div>
                            <div className="bg-[#fff5f5] border border-red-100/90 rounded-full py-1.5 md:py-2 px-3 md:px-4 flex items-center justify-center gap-2 text-gray-900 text-xs md:text-xs font-bold shadow-sm hover:shadow-md transition-shadow">
                                <Wrench className="w-3.5 h-3.5 md:w-4 md:h-4 text-brand-600 shrink-0" />
                                <span>100% Practical Training</span>
                            </div>
                            <div className="bg-[#fff5f5] border border-red-100/90 rounded-full py-1.5 md:py-2 px-3 md:px-4 flex items-center justify-center gap-2 text-gray-900 text-xs md:text-xs font-bold shadow-sm hover:shadow-md transition-shadow">
                                <Briefcase className="w-3.5 h-3.5 md:w-4 md:h-4 text-brand-600 shrink-0" />
                                <span>Job Opportunities from Week 5</span>
                            </div>
                        </div>

                        {/* Row 3: Action & Fee Bar */}
                        <div className="bg-white rounded-[1.2rem] md:rounded-[1.8rem] p-3 md:p-4 border border-gray-100 shadow-[0_12px_40px_rgba(0,0,0,0.12)] text-gray-900 grid md:grid-cols-12 gap-3 items-center relative z-20">
                            {/* Left Fee Column */}
                            <div className="md:col-span-3 text-center md:text-left">
                                <div className="text-gray-500 font-semibold text-[11px] md:text-xs mb-0.5">Course Fee:</div>
                                <div className="text-2xl md:text-3xl lg:text-4xl font-black text-brand-600 tracking-tight leading-none">
                                    ₹33,000
                                </div>
                            </div>

                            {/* Center Register Button Column */}
                            <div className="md:col-span-5 text-center flex flex-col items-center">
                                <Link to="/payment" className="btn-shine bg-brand-600 hover:bg-brand-700 text-white rounded-full py-2.5 md:py-3 px-5 md:px-7 font-black text-xs md:text-sm uppercase inline-flex items-center justify-center gap-2 shadow-[0_6px_20px_rgba(192,57,43,0.35)] w-full transition-transform hover:-translate-y-0.5">
                                    REGISTER NOW FOR ₹1,000 <ArrowRight className="w-4 h-4" />
                                </Link>
                                <div className="text-[10px] md:text-[11px] text-gray-500 font-medium mt-1">
                                    Take the first step towards a secure and successful career.
                                </div>
                            </div>

                            {/* Right Commitment Column */}
                            <div className="md:col-span-4 flex items-center justify-center md:justify-end gap-2.5 md:border-l border-gray-200 md:pl-5 pt-2 md:pt-0 border-t md:border-t-0">
                                <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-gray-900 text-white flex items-center justify-center shrink-0 shadow-md">
                                    <ShieldCheck className="w-5 h-5 md:w-6 md:h-6 text-white" />
                                </div>
                                <div className="text-left leading-tight">
                                    <div className="font-extrabold text-gray-900 text-xs md:text-xs">Your Career Our Commitment</div>
                                    <div className="text-[9px] font-extrabold tracking-widest text-gray-400 uppercase mt-0.5">SKILLS TODAY A SAFER TOMORROW</div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
            
            {/* White spacing block below cards so next section transitions cleanly */}
            <div className="h-10 md:h-16 bg-white"></div>

            {/* 2. YOUTUBE VIDEO SECTION — 1 FULL SIZE VIDEO + 3 IN GRID BELOW */}
            <section className="py-16 md:py-20 bg-zinc-900 text-white relative overflow-hidden">
                {/* Glow filter background */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    
                    {/* Header */}
                    <div className="text-center mb-10 md:mb-12">
                        <div className="inline-flex items-center gap-2 bg-red-950/80 border border-red-600/40 text-red-400 px-4 py-1.5 rounded-full text-xs font-extrabold tracking-widest uppercase mb-3">
                            <PlayCircle className="w-4 h-4 text-red-500 animate-pulse" />
                            PRACTICAL TRAINING DEMO
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase leading-tight">
                            SEE HOW OUR <span className="text-brand-500">STUDENTS LEARN</span>
                        </h2>
                        <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto mt-2 font-medium">
                            Watch our 100% hands-on practical security system training labs in action.
                        </p>
                    </div>

                    {/* 1 FULL SIZE YOUTUBE VIDEO */}
                    <div className="mb-12 md:mb-16 max-w-5xl mx-auto">
                        <div className="relative w-full aspect-video rounded-2xl md:rounded-3xl overflow-hidden bg-black shadow-[0_20px_50px_rgba(230,28,36,0.25)] border border-zinc-800 group">
                            <iframe
                                src={getYoutubeEmbedUrl("https://www.youtube.com/watch?v=r_mWStz8WxY")}
                                className="w-full h-full border-0"
                                title="Altron Academy Full Practical Training Video"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                        <div className="mt-4 flex flex-col md:flex-row md:items-center justify-between gap-2 px-2">
                            <div>
                                <h3 className="text-lg md:text-xl font-black text-white">
                                    Altron Security Systems Academy — Full Course & Lab Overview
                                </h3>
                                <p className="text-xs md:text-sm text-gray-400">
                                    4-Week Intensive Practical Training: CCTV, Biometrics, Fire Alarm & Automation
                                </p>
                            </div>
                            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-400 bg-brand-950/60 border border-brand-800/60 px-3 py-1.5 rounded-full shrink-0">
                                <BadgeCheck className="w-4 h-4 text-brand-500" />
                                100% Practical Lab
                            </span>
                        </div>
                    </div>

                    {/* DOWN TO THAT: 3 IN GRID */}
                    <div>
                        <div className="flex items-center justify-between mb-6 border-b border-zinc-800 pb-3">
                            <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-brand-500"></span>
                                STUDENT SUCCESS & TRAINING STORIES
                            </h3>
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest hidden sm:inline-block">
                                3 FEATURED HIGHLIGHTS
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                            {[
                                {
                                    title: "Altron Institute Feedback — Mr. Vallarasu",
                                    youtubeUrl: "https://www.youtube.com/watch?v=UscfS3Dk_p8",
                                    tag: "STUDENT FEEDBACK",
                                    tagColor: "bg-red-500/10 border-red-500/30 text-red-400",
                                    desc: "Hear directly from our student about their learning experience and career transformation."
                                },
                                {
                                    title: "Security Engineering Hands-on Training",
                                    youtubeUrl: "https://www.youtube.com/watch?v=Q8_v6qj3_xk",
                                    tag: "PRACTICAL LAB",
                                    tagColor: "bg-blue-500/10 border-blue-500/30 text-blue-400",
                                    desc: "Real-world security engineering installation, wiring, and panel configuration."
                                },
                                {
                                    title: "Fire Alarm & Access Control Systems",
                                    youtubeUrl: "https://www.youtube.com/watch?v=vV7YyG1V6P4",
                                    tag: "FIRE & ALARM",
                                    tagColor: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
                                    desc: "Practical training on fire alarm panels, detector wiring, and biometric access setup."
                                }
                            ].map((vid, idx) => {
                                const storyItem = (Array.isArray(storiesData) && storiesData[idx]) ? storiesData[idx] : vid;
                                const embedUrl = getYoutubeEmbedUrl(storyItem.youtubeUrl || vid.youtubeUrl);

                                return (
                                    <div key={idx} className="bg-zinc-800/80 rounded-2xl p-4 border border-zinc-700/60 hover:border-brand-500/50 transition-all duration-300 shadow-lg group">
                                        <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black mb-3.5">
                                            <iframe
                                                src={embedUrl}
                                                className="w-full h-full border-0"
                                                title={storyItem.title || vid.title}
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                allowFullScreen
                                            />
                                        </div>
                                        <div className={`inline-block border text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-md mb-2 ${vid.tagColor}`}>
                                            {vid.tag}
                                        </div>
                                        <h4 className="text-base font-bold text-white leading-snug group-hover:text-brand-400 transition-colors">
                                            {storyItem.title || vid.title}
                                        </h4>
                                        <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                                            {storyItem.description || vid.desc}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                </div>
            </section>

            {/* 3. ABOUT ALTRON ACADEMY */}
            <section className="py-20 bg-white border-b border-gray-100 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">

                    {/* Top label */}
                    <div className="flex items-center gap-3 mb-10">
                        <span className="text-brand-600 font-black text-xs tracking-[0.3em] uppercase">ABOUT</span>
                        <div className="w-10 h-0.5 bg-brand-600"></div>
                    </div>

                    {/* Main 2-col grid */}
                    <div className="grid lg:grid-cols-2 gap-12 items-start">

                        {/* LEFT: Text content */}
                        <div>
                            {/* Logo wordmark */}
                            <div className="mb-4">
                                <div className="text-5xl md:text-6xl font-black tracking-tight text-gray-900 leading-none">
                                    <span className="text-brand-600">A</span>LTRON
                                </div>
                                <div className="text-2xl md:text-3xl font-black tracking-[0.25em] text-gray-900 mt-1">
                                    ACADEMY
                                </div>
                                <div className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase mt-2">
                                    Building Skills For A Safer Tomorrow
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="w-16 h-1 bg-brand-600 rounded-full mb-8"></div>

                            {/* Body text */}
                            <div className="space-y-5 text-gray-600 text-base md:text-lg leading-relaxed mb-10">
                                <p>
                                    Altron started in <strong className="text-gray-900">2000</strong> as a manufacturer and distributor of CCTV cameras and electronic security systems.
                                </p>
                                <p>
                                    In <strong className="text-gray-900">2008</strong>, we started Altron Academy after seeing the growing need for trained professionals in the security systems industry.
                                </p>
                                <p>
                                    Today, <strong className="text-brand-600">1,000+</strong> students and entrepreneurs have completed their training with us.
                                </p>
                            </div>

                            {/* Timeline row */}
                            <div className="grid grid-cols-3 gap-3 md:gap-4 relative pt-2">
                                {[
                                    {
                                        Icon: Building2,
                                        year: '2000',
                                        desc: 'Started as a manufacturer and distributor of CCTV cameras and electronic security systems.'
                                    },
                                    {
                                        Icon: GraduationCap,
                                        year: '2008',
                                        desc: 'Launched Altron Academy to meet the growing need for trained professionals in the security industry.'
                                    },
                                    {
                                        Icon: Users,
                                        year: '1,000+',
                                        desc: 'Students and entrepreneurs have completed their training with us.'
                                    }
                                ].map((item, i) => (
                                    <div key={i} className="text-center relative group">
                                        {/* Animated connector line to the next box */}
                                        {i < 2 && (
                                            <div className="absolute top-5 left-[50%] w-full h-[3px] z-0 overflow-hidden pointer-events-none px-2">
                                                {/* Light background track line */}
                                                <div className="w-full h-full bg-brand-100 rounded-full"></div>
                                                
                                                {/* Animated red line filling sequentially towards next box */}
                                                <motion.div
                                                    initial={{ scaleX: 0 }}
                                                    whileInView={{ scaleX: 1 }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 0.7, delay: 0.3 + i * 0.6, ease: "easeInOut" }}
                                                    className="absolute inset-0 bg-gradient-to-r from-brand-600 via-red-500 to-brand-600 origin-left rounded-full shadow-[0_0_8px_rgba(192,57,43,0.8)]"
                                                />

                                                {/* Continuous pulse effect flowing towards next box */}
                                                <motion.div
                                                    animate={{ x: ['-100%', '100%'] }}
                                                    transition={{ repeat: Infinity, duration: 1.6, ease: "linear", delay: 1.0 + i * 0.6 }}
                                                    className="absolute top-0 bottom-0 w-1/3 bg-gradient-to-r from-transparent via-white to-transparent opacity-90"
                                                />
                                            </div>
                                        )}

                                        {/* Node Icon and Text with pop animation */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 15, scale: 0.9 }}
                                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5, delay: i * 0.6 }}
                                            className="relative z-10 flex flex-col items-center"
                                        >
                                            <div className="relative z-10 w-11 h-11 mx-auto rounded-full bg-gradient-to-br from-brand-50 to-red-100 border-2 border-brand-500 flex items-center justify-center text-brand-600 mb-2.5 shadow-md group-hover:scale-110 group-hover:border-brand-600 transition-transform duration-300">
                                                <item.Icon className="w-5.5 h-5.5 text-brand-600" />
                                            </div>
                                            <div className="text-brand-600 font-black text-lg md:text-xl mb-1">{item.year}</div>
                                            <p className="text-gray-600 text-[11px] md:text-xs font-medium leading-relaxed">{item.desc}</p>
                                        </motion.div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* RIGHT: Building image with camera overlay & JOIN NOW button */}
                        <div className="flex flex-col space-y-5">
                            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl min-h-[380px] bg-zinc-900">
                                {/* Building background */}
                                <img
                                    src="https://res.cloudinary.com/dq6gr5zjc/image/upload/v1788888931/e90b99dd-662c-4526-bef5-5b299ebcf9c0_nfdflg.png"
                                    alt="Altron Academy Building"
                                    className="w-full h-full object-cover opacity-80"
                                    style={{ minHeight: '380px' }}
                                />
                                {/* Dark overlay */}
                                <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/60 via-transparent to-brand-900/40"></div>

                                {/* CCTV Camera cutout overlapping the card */}
                                <img
                                    src="https://res.cloudinary.com/dq6gr5zjc/image/upload/v1788883513/d8a27830-4429-4f86-a26a-0326007f9d0e_sqgmbw.png"
                                    alt="CCTV Camera"
                                    className="absolute -bottom-6 -left-10 w-[200px] md:w-[280px] object-contain z-20 drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
                                />
                            </div>

                            {/* PAY ₹1,000 & SECURE YOUR SLOT BUTTON BELOW IMAGE */}
                            <div className="space-y-2.5 text-center">
                                <Link 
                                    to="/payment" 
                                    className="btn-shine bg-brand-600 hover:bg-brand-700 text-white rounded-full py-4 px-8 font-black text-base md:text-lg uppercase tracking-wider shadow-[0_8px_25px_rgba(192,57,43,0.4)] flex items-center justify-center gap-3 transition-transform hover:-translate-y-0.5 w-full text-center"
                                >
                                    <span>PAY ₹1,000 & SECURE YOUR SLOT</span>
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                                <div className="flex items-center justify-center gap-2 text-xs font-black text-red-600 uppercase tracking-widest pt-1">
                                    <span className="relative flex h-2.5 w-2.5">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600"></span>
                                    </span>
                                    <span>🔥 Limited Slots Remaining for Next Batch — Reserve Yours Now!</span>
                                </div>
                            </div>
                        </div>
                    </div>



                </div>
            </section>



            {/* 4. WHAT YOU GET */}
            <section className="py-24 bg-[#f8f9fa] relative overflow-hidden z-0" style={{ minHeight: '700px' }}>
                {/* Red Abstract Layers on Bottom Left */}
                <div className="absolute bottom-0 -left-20 w-[500px] h-[500px] bg-brand-700 rounded-full mix-blend-multiply filter blur-3xl opacity-60 z-0"></div>
                <div className="absolute -bottom-20 -left-20 w-[520px] h-[520px] bg-brand-600 rounded-[8rem] rotate-12 z-0 shadow-2xl"></div>
                
                
                {/* CCTV Camera Cutout - BIG and prominent */}
                <img 
                    src="https://res.cloudinary.com/dq6gr5zjc/image/upload/v1788883513/d8a27830-4429-4f86-a26a-0326007f9d0e_sqgmbw.png" 
                    alt="CCTV Camera"
                    className="absolute bottom-0 left-0 w-[160px] md:w-[220px] lg:w-[280px] object-contain object-bottom z-30 drop-shadow-[0_20px_30px_rgba(0,0,0,0.4)]"
                />

                <div className="max-w-[1500px] mx-auto px-4 relative z-10 flex justify-end">
                    
                    {/* Main White Container — shifted right to give room to camera */}
                    <div className="bg-white rounded-[3rem] shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-gray-100 p-8 md:p-12 lg:p-16 w-full lg:w-[88%] relative z-10 mr-0 lg:mr-[4%]">
                        {/* Header */}
                        <div className="text-center mb-16 relative">
                            {/* Learn Build Get Placed — top right of white card */}
                            <div className="absolute -top-6 md:-top-10 right-0 font-bold italic text-xl md:text-2xl text-gray-400 rotate-[-8deg] z-20 opacity-70 leading-snug text-right" style={{ fontFamily: 'Georgia, serif' }}>
                                Learn<br/>Build<br/>Get Placed
                            </div>
                            <motion.h2 
                                animate={{ opacity: [1, 0.3, 1] }}
                                transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                                className="text-5xl md:text-6xl font-black text-gray-900 tracking-tight mb-4"
                            >
                                What You <span className="text-brand-600 relative inline-block">
                                    Get
                                    {/* Red underline swoosh */}
                                    <svg className="absolute w-[110%] h-4 -bottom-2 left-[-5%] text-brand-600" viewBox="0 0 100 10" preserveAspectRatio="none">
                                        <path d="M0 5 Q 50 10 100 2" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none" />
                                    </svg>
                                </span>
                            </motion.h2>
                            <div className="w-full bg-brand-600 text-white font-black text-xl md:text-2xl lg:text-3xl py-3 rounded-full shadow-[0_10px_35px_rgba(192,57,43,0.5)] tracking-tight border-2 border-brand-400 mt-6 overflow-hidden mx-auto">
                                <div className="animate-marquee whitespace-nowrap items-center">
                                    {/* Track 1 */}
                                    <div className="flex items-center shrink-0">
                                        <span className="inline-flex items-center gap-3 px-8">
                                            <span className="w-10 h-10 md:w-12 md:h-12 inline-flex items-center justify-center shrink-0 -my-2">
                                                <Lottie src={moneyAnimation} loop autoplay />
                                            </span>
                                            Get Placed or Get Your Fee Back
                                            <span className="text-yellow-300 text-lg ml-2">★</span>
                                        </span>
                                        <span className="inline-flex items-center gap-3 px-8">
                                            <span className="w-10 h-10 md:w-12 md:h-12 inline-flex items-center justify-center shrink-0 -my-2">
                                                <Lottie src={moneyAnimation} loop autoplay />
                                            </span>
                                            Get Placed or Get Your Fee Back
                                            <span className="text-yellow-300 text-lg ml-2">★</span>
                                        </span>
                                    </div>
                                    {/* Track 2 (Seamless loop copy) */}
                                    <div className="flex items-center shrink-0">
                                        <span className="inline-flex items-center gap-3 px-8">
                                            <span className="w-10 h-10 md:w-12 md:h-12 inline-flex items-center justify-center shrink-0 -my-2">
                                                <Lottie src={moneyAnimation} loop autoplay />
                                            </span>
                                            Get Placed or Get Your Fee Back
                                            <span className="text-yellow-300 text-lg ml-2">★</span>
                                        </span>
                                        <span className="inline-flex items-center gap-3 px-8">
                                            <span className="w-10 h-10 md:w-12 md:h-12 inline-flex items-center justify-center shrink-0 -my-2">
                                                <Lottie src={moneyAnimation} loop autoplay />
                                            </span>
                                            Get Placed or Get Your Fee Back
                                            <span className="text-yellow-300 text-lg ml-2">★</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-lg md:text-xl text-gray-600 font-medium max-w-2xl mx-auto mt-4">
                                A complete, hands-on learning experience designed to make you job-ready in the security systems industry.
                            </p>
                        </div>

                        {/* 4 Cards */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                            {/* Card 1 */}
                            <div className="bg-[#fff5f5] rounded-[2rem] p-8 flex flex-col items-center text-center shadow-sm border border-red-100/50 transition-transform hover:-translate-y-1">
                                <div className="w-20 h-20 rounded-full bg-brand-600 flex items-center justify-center shadow-[0_8px_20px_rgba(192,57,43,0.3)] mb-6 text-white">
                                    <BookOpen className="w-10 h-10" />
                                </div>
                                <h3 className="text-xl font-extrabold text-gray-900 mb-3 leading-tight tracking-tight">Theory + Practical<br/>Training</h3>
                                <p className="text-gray-600 mb-8 font-medium text-sm leading-relaxed">Learn the basics and practise how real security systems work.</p>
                                <div className="w-8 h-1 bg-brand-600 rounded-full mt-auto"></div>
                            </div>

                            {/* Card 2 */}
                            <div className="bg-[#f0f7ff] rounded-[2rem] p-8 flex flex-col items-center text-center shadow-sm border border-blue-100/50 transition-transform hover:-translate-y-1">
                                <div className="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center shadow-[0_8px_20px_rgba(59,130,246,0.3)] mb-6 text-white">
                                    <Wrench className="w-10 h-10" />
                                </div>
                                <h3 className="text-xl font-extrabold text-gray-900 mb-3 leading-tight tracking-tight">Professional<br/>Training</h3>
                                <p className="text-gray-600 mb-8 font-medium text-sm leading-relaxed">Build practical technical skills across multiple security systems.</p>
                                <div className="w-8 h-1 bg-blue-500 rounded-full mt-auto"></div>
                            </div>

                            {/* Card 3 */}
                            <div className="bg-[#f0fdf4] rounded-[2rem] p-8 flex flex-col items-center text-center shadow-sm border border-green-100/50 transition-transform hover:-translate-y-1">
                                <div className="w-20 h-20 rounded-full bg-emerald-500 flex items-center justify-center shadow-[0_8px_20px_rgba(16,185,129,0.3)] mb-6 text-white">
                                    <Briefcase className="w-10 h-10" />
                                </div>
                                <h3 className="text-xl font-extrabold text-gray-900 mb-3 leading-tight tracking-tight">Job<br/>Opportunities</h3>
                                <p className="text-gray-600 mb-8 font-medium text-sm leading-relaxed">After completing the 4-week training, job opportunities start from the 5th week.</p>
                                <div className="w-8 h-1 bg-emerald-500 rounded-full mt-auto"></div>
                            </div>

                            {/* Card 4 */}
                            <div className="bg-[#fffcf0] rounded-[2rem] p-8 flex flex-col items-center text-center shadow-sm border border-orange-100/50 transition-transform hover:-translate-y-1">
                                <div className="w-20 h-20 rounded-full bg-orange-400 flex items-center justify-center shadow-[0_8px_20px_rgba(251,146,60,0.3)] mb-6 text-white">
                                    <ShieldCheck className="w-10 h-10" />
                                </div>
                                <h3 className="text-xl font-extrabold text-gray-900 mb-3 leading-tight tracking-tight">Placement<br/>Money-Back Commitment</h3>
                                <p className="text-gray-600 mb-8 font-medium text-sm leading-relaxed">If you don't get placement, your course fee is returned, subject to applicable terms and conditions.</p>
                                <div className="w-8 h-1 bg-orange-400 rounded-full mt-auto"></div>
                            </div>
                        </div>

                        {/* Bottom CTA Bar */}
                        <div className="bg-[#fcfaf9] rounded-[2.5rem] border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.04)] p-8 md:p-10 flex flex-col lg:flex-row items-center justify-between gap-8 relative z-20">
                            {/* Course Fee */}
                            <div className="text-center lg:text-left shrink-0 lg:pl-8">
                                <div className="text-gray-500 font-bold mb-1 text-lg tracking-wide">Course Fee:</div>
                                <div className="text-5xl md:text-6xl font-black text-brand-600 tracking-tighter leading-none">
                                    ₹33,000
                                </div>
                            </div>

                            {/* Center CTA Button */}
                            <div className="flex flex-col items-center text-center flex-1 max-w-lg">
                                <Link to="/contact" className="btn-shine w-full bg-brand-700 hover:bg-brand-800 text-white rounded-full py-4 px-8 font-black text-xl md:text-2xl tracking-wide uppercase transition-transform hover:-translate-y-1 shadow-[0_8px_20px_rgba(192,57,43,0.3)] flex items-center justify-center gap-3">
                                    GET COURSE DETAILS 
                                    <div className="bg-white text-brand-700 rounded-full p-1">
                                        <ChevronRight className="w-5 h-5 md:w-6 md:h-6" strokeWidth={3} />
                                    </div>
                                </Link>
                                <p className="text-gray-500 font-medium text-xs md:text-sm mt-3">Take the first step towards a secure and successful career.</p>
                            </div>

                            {/* Right Badge */}
                            <div className="flex items-center justify-center gap-4 pl-0 lg:pl-10 lg:border-l-2 border-gray-200 shrink-0">
                                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center shrink-0 shadow-sm border border-gray-200">
                                    <GraduationCap className="w-8 h-8 text-gray-700" />
                                </div>
                                <div className="text-left">
                                    <div className="text-gray-500 font-bold text-xs tracking-[0.15em] uppercase mb-0.5">Skills Today</div>
                                    <div className="text-gray-900 font-black uppercase text-sm tracking-[0.05em]">A Safer Tomorrow</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>



            {/* 6. HOW IT WORKS */}
            <section className="py-24 bg-gradient-to-b from-gray-50 via-white to-gray-50 border-y border-gray-200/60 relative overflow-hidden">
                {/* Background decorative elements */}
                <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-500/5 rounded-full filter blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-10 right-0 w-96 h-96 bg-red-500/5 rounded-full filter blur-3xl pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    {/* Header */}
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <div className="inline-flex items-center gap-2 bg-brand-50 text-brand-600 border border-brand-200 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-4 shadow-sm">
                            <Sparkles className="w-4 h-4 text-brand-600" />
                            <span>Simple 5-Step Journey</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight uppercase">
                            🚀 HOW IT <span className="text-brand-600">WORKS</span>
                        </h2>
                        <p className="text-gray-600 text-base md:text-lg font-medium mt-3">
                            From seat reservation to your first career opportunity — transparent, simple, and practical.
                        </p>
                    </div>
                    
                    {/* Steps Timeline Grid */}
                    <div className="max-w-5xl mx-auto relative">
                        {/* Connecting center line for desktop */}
                        <div className="hidden md:block absolute left-1/2 top-10 bottom-10 w-1 -translate-x-1/2 bg-gray-200 rounded-full z-0 overflow-hidden">
                            <motion.div 
                                initial={{ height: 0 }}
                                whileInView={{ height: '100%' }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.5, ease: "easeInOut" }}
                                className="w-full bg-gradient-to-b from-brand-600 via-red-500 to-brand-600 shadow-[0_0_12px_rgba(192,57,43,0.8)]"
                            />
                        </div>

                        <div className="space-y-10 md:space-y-16 relative z-10">
                            {[
                                { 
                                    num: '01', 
                                    title: 'REGISTER', 
                                    subtitle: 'Quick & Instant Reservation',
                                    desc: 'Reserve your seat with just ₹1,000.',
                                    Icon: UserCheck,
                                    badgeColor: 'from-brand-600 to-red-600'
                                },
                                { 
                                    num: '02', 
                                    title: 'GET A CALL', 
                                    subtitle: 'Personalized Guidance',
                                    desc: 'Our team will contact you and explain the course structure and next steps.',
                                    Icon: PhoneCall,
                                    badgeColor: 'from-zinc-800 to-zinc-900'
                                },
                                { 
                                    num: '03', 
                                    title: 'CHOOSE YOUR START DATE', 
                                    subtitle: 'Flexible Batch Selection',
                                    desc: 'Pay the remaining course fee and select your convenient start date.',
                                    Icon: CalendarCheck,
                                    badgeColor: 'from-brand-600 to-red-600'
                                },
                                { 
                                    num: '04', 
                                    title: 'LEARN + PRACTISE', 
                                    subtitle: '100% Practical Exposure',
                                    desc: 'Complete 4 weeks of professional theory + hands-on lab practical training.',
                                    Icon: GraduationCap,
                                    badgeColor: 'from-zinc-800 to-zinc-900'
                                },
                                { 
                                    num: '05', 
                                    title: 'EXPLORE JOB OPPORTUNITIES', 
                                    subtitle: 'Placement Assistance',
                                    desc: 'From the 5th week, start receiving relevant job opportunities through our placement network.',
                                    Icon: Briefcase,
                                    badgeColor: 'from-brand-600 to-red-600'
                                }
                            ].map((step, idx) => {
                                const isEven = idx % 2 === 1;
                                return (
                                    <motion.div 
                                        key={idx} 
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-50px" }}
                                        transition={{ duration: 0.6, delay: idx * 0.15 }}
                                        className={`flex flex-col md:flex-row items-center gap-6 md:gap-0 ${isEven ? 'md:flex-row-reverse' : ''}`}
                                    >
                                        {/* Card content */}
                                        <div className="w-full md:w-[45%]">
                                            <div className="bg-white p-7 md:p-8 rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.06)] border border-gray-100 hover:border-brand-300 hover:shadow-[0_20px_40px_rgba(192,57,43,0.12)] transition-all duration-300 group">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <span className="text-xs font-black uppercase tracking-widest text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-100">
                                                        Step {step.num}
                                                    </span>
                                                    <span className="text-xs font-semibold text-gray-400">
                                                        {step.subtitle}
                                                    </span>
                                                </div>
                                                <h3 className="text-xl md:text-2xl font-black text-gray-900 group-hover:text-brand-600 transition-colors uppercase tracking-tight mb-2">
                                                    {step.title}
                                                </h3>
                                                <p className="text-gray-600 font-medium text-sm md:text-base leading-relaxed">
                                                    {step.desc}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Center Badge Icon */}
                                        <div className="w-full md:w-[10%] flex justify-center shrink-0">
                                            <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br ${step.badgeColor} text-white flex items-center justify-center font-black text-xl shadow-xl border-4 border-white transform group-hover:scale-110 transition-transform duration-300 z-10`}>
                                                <step.Icon className="w-7 h-7 text-white" />
                                            </div>
                                        </div>

                                        {/* Spacer for 2-column alternating layout */}
                                        <div className="hidden md:block w-[45%]"></div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                    
                    {/* Bottom CTA */}
                    <div className="text-center mt-20">
                        <Link 
                            to="/payment" 
                            className="btn-shine inline-flex items-center justify-center bg-brand-600 hover:bg-brand-700 text-white px-10 py-5 rounded-full font-black text-base md:text-lg tracking-wider uppercase shadow-[0_10px_30px_rgba(192,57,43,0.4)] transition-all hover:-translate-y-1 gap-3"
                        >
                            <span>👉 REGISTER FOR ₹1,000 & SECURE YOUR SEAT</span>
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                        <div className="text-xs font-extrabold text-red-600 uppercase tracking-widest mt-3 animate-pulse">
                            🔥 Limited Slots Remaining for Next Batch!
                        </div>
                    </div>
                </div>
            </section>

            {/* 7 & 8. WHY ALTRON ACADEMY? */}
            <section className="py-24 bg-zinc-900 text-white border-t border-zinc-800">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black mb-6 uppercase text-brand-500">🏆 WHY ALTRON ACADEMY?</h2>
                        <h3 className="text-2xl font-bold uppercase tracking-widest text-gray-300">25+ YEARS OF INDUSTRY EXPERIENCE</h3>
                    </div>
                    
                    <div className="max-w-4xl mx-auto text-center mb-16 space-y-6 text-lg text-gray-400">
                        <p>Altron started in <strong className="text-white">2000</strong> as a manufacturer and distributor of CCTV cameras and electronic security systems.</p>
                        <p>In <strong className="text-white">2008</strong>, Altron Academy was started to address the growing need for trained professionals in the security systems industry.</p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
                        {[
                            { stat: '1,000+', label: 'Students & Entrepreneurs Trained' },
                            { stat: '10+', label: 'Professional Courses' },
                            { stat: '25+ Years', label: 'Industry Experience' },
                            { stat: '100%', label: 'Practical Focus (Theory + Hands-On)' }
                        ].map((box, i) => (
                            <div key={i} className="bg-zinc-800 p-8 rounded-3xl border border-zinc-700 text-center flex flex-col justify-center">
                                <div className="text-4xl font-black text-white mb-4">{box.stat}</div>
                                <div className="text-brand-400 font-bold uppercase tracking-wider text-sm">{box.label}</div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-brand-600 rounded-[3rem] p-10 md:p-16 text-center shadow-2xl relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')] opacity-20"></div>
                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-4xl font-black mb-8 uppercase tracking-tight">
                                🔧 LEARN FROM PEOPLE WHO KNOW THE INDUSTRY
                            </h2>
                            <p className="text-xl md:text-2xl text-red-100 font-medium mb-8 max-w-3xl mx-auto">
                                You're not learning a random skill. You're learning from an organisation that has been working in the <strong className="text-white">electronic security systems industry since 2000.</strong>
                            </p>
                            <div className="inline-block bg-black/30 backdrop-blur-sm border border-white/20 text-white font-bold px-6 py-4 rounded-2xl uppercase tracking-widest text-sm md:text-base">
                                LEARN → PRACTISE → BUILD SKILLS → EXPLORE OPPORTUNITIES
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 9. TESTIMONIALS (WHATSAPP CHAT UI SCREENSHOT CARDS) */}
            <section className="py-24 max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-emerald-100 border border-emerald-200 text-emerald-800 px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase mb-3 shadow-sm">
                        <span className="text-base">💬</span> VERIFIED WHATSAPP FEEDBACK
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black mb-3 uppercase tracking-tight text-gray-900">
                        ⭐ REAL STUDENTS. REAL TRAINING. REAL EXPERIENCES.
                    </h2>
                    <h3 className="text-xl md:text-2xl font-black text-brand-600 uppercase tracking-wider mb-4">
                        DON'T TAKE OUR WORD FOR IT.
                    </h3>
                    <p className="text-base md:text-lg text-gray-600 font-medium max-w-2xl mx-auto">
                        See what our students have to say about their experience at Altron Academy.
                    </p>
                </div>
                
                {/* 4 WhatsApp Chat Mockup Cards Grid */}
                <div className="grid md:grid-cols-2 gap-8 mb-14">
                    {[
                        {
                            name: "Vivek Rajan",
                            initial: "V",
                            bgColor: "bg-emerald-600",
                            course: "Professional Course in Safety & Security Engineering",
                            time: "10:42 AM",
                            text: "I recently completed the CCTV and Biometric Access Control course at Altron Academy, and it was a fantastic experience. The training is highly focused on hands-on practicals rather than just theory. I learned how to do complete cabling, configure DVR/NVR systems, and properly set up biometric attendance software with EM locks. The instructors are incredibly knowledgeable, supportive, and patiently cleared all my doubts. This course gives you real-world, industry-ready skills. Highly recommended for anyone looking to build a career in safety and security systems!"
                        },
                        {
                            name: "Janagiraman Boss",
                            initial: "J",
                            bgColor: "bg-blue-600",
                            course: "Professional Course in Safety & Security Systems",
                            time: "02:15 PM",
                            text: "Altron Academy – My Life Changing Experience Altron Academy provides excellent teaching with a strong focus on practical training. The on-site training is handled by highly experienced senior professionals who guide us step by step. The entire team is very supportive—from training to office assistance—and they also help with placement opportunities. Because of Altron Academy, my life has truly changed in a positive way. Special Thanks to: Gajendran Mari Mahesh Thank you so much to everyone for your support and guidance. I’m truly grateful and send my love to the entire team!"
                        },
                        {
                            name: "Ajith Kumar",
                            initial: "A",
                            bgColor: "bg-indigo-600",
                            course: "Professional Course in Safety & Security Engineering",
                            time: "05:30 PM",
                            text: "This Altron Company and altrox Cctv is perfectly run in the institute. All teaching staff is very excellent.. I am go through in( professional course) Had completed... Techincal teaching staff : 1.Gajendran 2.Marri 3.mahesh 4.shamim very thanks to all Staff....."
                        },
                        {
                            name: "Kaviarasan",
                            initial: "K",
                            bgColor: "bg-teal-600",
                            course: "Professional Course in Safety & Security Systems",
                            time: "07:18 PM",
                            text: "I am Kaviarasan from Thanjavur, I have completed Access control and biometric, video door phone, CCTV course, the course is worth for every penny, thanks to Gaja sir, and Mari, I recommend to everyone if you want to learn CCTV and security systems."
                        }
                    ].map((chat, i) => (
                        <div key={i} className="rounded-3xl overflow-hidden border border-emerald-200/80 shadow-[0_15px_40px_rgba(0,0,0,0.08)] bg-white flex flex-col hover:-translate-y-1 transition-transform duration-300">
                            {/* WhatsApp Header Bar */}
                            <div className="bg-[#075e54] text-white p-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-full ${chat.bgColor} flex items-center justify-center font-black text-white text-lg shadow-md border-2 border-white/20`}>
                                        {chat.initial}
                                    </div>
                                    <div>
                                        <div className="font-bold text-base leading-tight flex items-center gap-1.5">
                                            {chat.name}
                                            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                                        </div>
                                        <div className="text-[11px] text-emerald-100 font-medium">
                                            Online • Verified Altron Student
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <span className="bg-emerald-700/80 text-emerald-100 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
                                        WhatsApp Chat
                                    </span>
                                </div>
                            </div>

                            {/* WhatsApp Chat Body Wallpaper */}
                            <div className="bg-[#efeae2] p-5 sm:p-6 flex-grow relative" style={{ backgroundImage: "radial-gradient(#cbd5e1 1px, transparent 1px)", backgroundSize: "16px 16px" }}>
                                
                                {/* Date Divider */}
                                <div className="text-center mb-4">
                                    <span className="bg-white/90 backdrop-blur-sm text-gray-500 font-semibold text-[10px] uppercase px-3 py-1 rounded-md shadow-2xs border border-gray-200/60">
                                        Verified WhatsApp Review
                                    </span>
                                </div>

                                {/* Incoming Message Bubble */}
                                <div className="bg-white rounded-2xl rounded-tl-xs p-4 sm:p-5 shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-emerald-100/60 max-w-[95%] relative">
                                    {/* Star Rating Header */}
                                    <div className="flex items-center gap-1 text-yellow-400 mb-2">
                                        {[...Array(5)].map((_, s) => (
                                            <Star key={s} className="w-4 h-4 fill-current" />
                                        ))}
                                    </div>

                                    {/* Message Text */}
                                    <p className="text-gray-800 text-xs sm:text-sm font-medium leading-relaxed mb-3">
                                        "{chat.text}"
                                    </p>

                                    {/* Timestamp & Double Blue Ticks */}
                                    <div className="flex items-center justify-end gap-1 text-[10px] text-gray-400 font-semibold pt-1 border-t border-gray-100">
                                        <span>{chat.time}</span>
                                        <span className="text-sky-500 font-bold">✓✓</span>
                                    </div>
                                </div>

                            </div>

                            {/* Card Footer: Student Course Info */}
                            <div className="bg-white p-4 border-t border-gray-100 flex items-center justify-between">
                                <div>
                                    <div className="text-xs font-extrabold text-gray-900">{chat.name}</div>
                                    <div className="text-[11px] text-gray-500 font-medium">{chat.course}</div>
                                </div>
                                <span className="bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase px-3 py-1 rounded-full border border-emerald-200 shrink-0">
                                    Verified Course
                                </span>
                            </div>

                        </div>
                    ))}
                </div>
                
                {/* Bottom Action Links */}
                <div className="flex flex-wrap justify-center gap-4">
                    <Link to="/testimonials" className="bg-white border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50 font-black px-6 py-3 rounded-full uppercase text-xs sm:text-sm tracking-wider transition-all shadow-sm flex items-center gap-2">
                        <span>💬 MORE WHATSAPP REVIEWS</span>
                    </Link>
                    <a href="https://www.google.com/maps/place/ALTRON+CCTV,+SAFETY+%26+SECURITY+INSTITUTE/@13.0548357,80.229833,17z/data=!4m8!3m7!1s0x3a5266f51b52007d:0x946b29cd6757348c!8m2!3d13.0548357!4d80.229833!9m1!1b1!16s%2Fg%2F11bxgnpm50" target="_blank" rel="noreferrer" className="bg-white border-2 border-blue-600 text-blue-700 hover:bg-blue-50 font-black px-6 py-3 rounded-full uppercase text-xs sm:text-sm tracking-wider transition-all shadow-sm flex items-center gap-2">
                        <span>⭐ GOOGLE REVIEWS (4.9/5)</span>
                    </a>
                </div>
            </section>

            {/* 10. FAQ */}
            <section className="py-24 bg-gray-100 border-t border-gray-200">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-4xl font-black text-center mb-16 uppercase tracking-tight">❓ FREQUENTLY ASKED QUESTIONS</h2>
                    <div className="space-y-4">
                        {FAQ_DATA.map((faq, idx) => (
                            <div key={idx} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm transition-all">
                                <button 
                                    className="w-full text-left px-8 py-6 font-bold text-lg text-gray-900 flex justify-between items-center focus:outline-none"
                                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                                >
                                    {faq.q}
                                    {openFaq === idx ? <ChevronUp className="w-5 h-5 text-brand-600 shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />}
                                </button>
                                {openFaq === idx && (
                                    <div className="px-8 pb-6 text-gray-600 leading-relaxed border-t border-gray-50 pt-4 font-medium">
                                        {faq.a.includes('No.') ? (
                                            <><strong className="text-gray-900">No.</strong> {faq.a.replace('No. ', '')}</>
                                        ) : faq.a.includes('Yes.') ? (
                                            <><strong className="text-gray-900">Yes.</strong> {faq.a.replace('Yes. ', '')}</>
                                        ) : (
                                            faq.a
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 11. FINAL CTA & DISCLAIMER */}
            <section className="py-24 bg-[#0a0a0c] text-white overflow-hidden relative border-t border-zinc-800">
                {/* Background red ambient glow */}
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-red-600/10 filter blur-[120px] rounded-full pointer-events-none z-0"></div>

                <div className="max-w-6xl mx-auto px-4 relative z-10">
                    
                    {/* Top Siren & Title Header */}
                    <div className="text-center max-w-3xl mx-auto mb-14">
                        {/* Siren Icon with rays */}
                        <div className="inline-flex items-center justify-center relative mb-4">
                            <div className="w-12 h-12 rounded-xl bg-red-600/20 border border-red-500/50 flex items-center justify-center shadow-[0_0_25px_rgba(239,68,68,0.6)] animate-pulse">
                                <Siren className="w-6 h-6 text-red-500" />
                            </div>
                        </div>

                        {/* Title: STOP WAITING FOR THE "RIGHT TIME" */}
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-none">
                            STOP WAITING FOR<br/>
                            <span className="text-red-500 drop-shadow-[0_0_20px_rgba(239,68,68,0.5)]">THE "RIGHT TIME"</span>
                        </h2>
                        
                        <p className="text-gray-400 font-medium text-base md:text-lg mt-4">
                            Start building a skill that can open new career opportunities.
                        </p>

                        {/* Small red accent line */}
                        <div className="w-12 h-1 bg-red-600 rounded-full mx-auto mt-5"></div>
                    </div>

                    {/* 3 Step Cards Grid with Flow Arrows */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-4 mb-8 items-center">
                        
                        {/* Card 01 */}
                        <div className="bg-[#121216]/90 border border-red-500/20 hover:border-red-500/50 rounded-2xl p-6 text-center shadow-[0_10px_30px_rgba(0,0,0,0.5)] relative group transition-all duration-300">
                            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-red-600/30 to-red-950/80 border border-red-500/60 flex items-center justify-center shadow-[0_0_20px_rgba(239,68,68,0.3)] mb-2 group-hover:scale-110 transition-transform">
                                <Calendar className="w-7 h-7 text-white" />
                            </div>
                            <span className="inline-block bg-red-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-3">
                                01
                            </span>
                            <h3 className="text-lg md:text-xl font-black text-red-500 uppercase tracking-wide mb-2">
                                4 WEEKS TRAINING
                            </h3>
                            <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                                Learn from industry experts with practical training.
                            </p>
                        </div>

                        {/* Card 02 */}
                        <div className="bg-[#121216]/90 border border-red-500/20 hover:border-red-500/50 rounded-2xl p-6 text-center shadow-[0_10px_30px_rgba(0,0,0,0.5)] relative group transition-all duration-300">
                            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-red-600/30 to-red-950/80 border border-red-500/60 flex items-center justify-center shadow-[0_0_20px_rgba(239,68,68,0.3)] mb-2 group-hover:scale-110 transition-transform">
                                <Settings className="w-7 h-7 text-white" />
                            </div>
                            <span className="inline-block bg-red-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-3">
                                02
                            </span>
                            <h3 className="text-lg md:text-xl font-black text-red-500 uppercase tracking-wide mb-2">
                                PRACTICAL SKILLS
                            </h3>
                            <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                                Gain hands-on experience with real equipment.
                            </p>
                        </div>

                        {/* Card 03 */}
                        <div className="bg-[#121216]/90 border border-red-500/20 hover:border-red-500/50 rounded-2xl p-6 text-center shadow-[0_10px_30px_rgba(0,0,0,0.5)] relative group transition-all duration-300">
                            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-red-600/30 to-red-950/80 border border-red-500/60 flex items-center justify-center shadow-[0_0_20px_rgba(239,68,68,0.3)] mb-2 group-hover:scale-110 transition-transform">
                                <Briefcase className="w-7 h-7 text-white" />
                            </div>
                            <span className="inline-block bg-red-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-3">
                                03
                            </span>
                            <h3 className="text-lg md:text-xl font-black text-red-500 uppercase tracking-wide mb-2">
                                JOB OPPORTUNITIES FROM WEEK 5
                            </h3>
                            <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                                Step into the industry with confidence.
                            </p>
                        </div>
                    </div>

                    {/* Bottom Dark Box with Price & REGISTER NOW Button */}
                    <div className="bg-[#121216]/90 border border-red-500/30 rounded-3xl p-6 md:p-8 shadow-[0_15px_40px_rgba(0,0,0,0.7)] backdrop-blur-md">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                            
                            {/* Column 1: Course Fee */}
                            <div className="md:col-span-4 flex items-center gap-4 justify-center md:justify-start border-b md:border-b-0 md:border-r border-zinc-800 pb-4 md:pb-0 pr-0 md:pr-4">
                                <span className="text-4xl shrink-0">💰</span>
                                <div>
                                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                                        COURSE FEE
                                    </div>
                                    <div className="text-3xl md:text-4xl font-black text-white tracking-tight">
                                        ₹33,000
                                    </div>
                                </div>
                            </div>

                            {/* Column 2: Reserve Seat */}
                            <div className="md:col-span-4 flex items-center gap-4 justify-center md:justify-start border-b md:border-b-0 md:border-r border-zinc-800 pb-4 md:pb-0 pr-0 md:pr-4">
                                <span className="text-3xl shrink-0">🔥</span>
                                <div>
                                    <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                                        RESERVE YOUR SEAT FOR JUST
                                    </div>
                                    <div className="text-3xl md:text-4xl font-black text-red-500 tracking-tight">
                                        ₹1,000
                                    </div>
                                </div>
                            </div>

                            {/* Column 3: REGISTER NOW Button */}
                            <div className="md:col-span-4 text-center">
                                <Link 
                                    to="/payment" 
                                    className="btn-shine bg-gradient-to-r from-red-600 via-red-500 to-red-600 hover:from-red-500 hover:to-red-600 text-white rounded-2xl py-4 px-6 font-black text-base md:text-lg uppercase tracking-wider shadow-[0_0_30px_rgba(239,68,68,0.5)] flex items-center justify-center gap-3 transition-transform hover:-translate-y-0.5 w-full text-center group"
                                >
                                    <span>REGISTER NOW</span>
                                    <div className="w-8 h-8 rounded-full bg-red-950/60 border border-white/20 flex items-center justify-center text-white shrink-0 group-hover:translate-x-1 transition-transform">
                                        <ArrowRight className="w-4 h-4 text-white" />
                                    </div>
                                </Link>
                                <div className="text-[11px] text-gray-400 font-medium italic mt-2.5">
                                    Take the first step towards a brighter future
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Disclaimer box below */}
                    <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 text-left mt-12 max-w-4xl mx-auto">
                        <div className="flex items-center gap-3 text-yellow-500 font-bold uppercase tracking-widest mb-2 text-xs">
                            <AlertCircle className="w-4 h-4" /> ⚠️ IMPORTANT
                        </div>
                        <p className="text-xs text-gray-500 italic leading-relaxed">
                            *Placement opportunities, money-back eligibility and refund terms are subject to the academy's applicable terms and conditions. Job placement is not guaranteed unless specifically stated in the official terms.
                        </p>
                    </div>

                    <div className="mt-12 text-center">
                        <h4 className="text-xl font-black tracking-widest text-white uppercase mb-1">ALTRON ACADEMY</h4>
                        <p className="text-red-500 font-bold tracking-widest uppercase text-xs">Learn Skills. Build Confidence. Create Opportunities.</p>
                    </div>

                </div>
            </section>

        </div>
    );
}
