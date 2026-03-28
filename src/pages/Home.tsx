import { useState, useEffect } from 'react';
import {
    ChevronLeft,
    ChevronRight,
    Star,
    ShieldCheck,
    Globe,
    GraduationCap,
    Settings,
    Phone,
    Mail,
    User,
    ArrowRight
} from 'lucide-react';

const SLIDES = [
    {
        id: 1,
        image: "https://res.cloudinary.com/dq6gr5zjc/image/upload/v1773990506/Securing_the_camera_cover_jnvpxt.png",
        title: "CCTV Camera",
        subtitle: "Installation Training",
        description: "Learn professional CCTV camera installation and start your career as a security system technician.",
    },
    {
        id: 2,
        image: "https://res.cloudinary.com/dq6gr5zjc/image/upload/v1773035146/ChatGPT_Image_Mar_9_2026_11_15_03_AM_scurtc.png",
        title: "Smart Home",
        subtitle: "Automation",
        description: "Control your entire perimeter from the palm of your hand with AI integration.",
    },
    {
        id: 3,
        image: "https://res.cloudinary.com/dq6gr5zjc/image/upload/v1773035489/fire-alarm-system-1024x950_u8fsam.jpg",
        title: "Night Vision",
        subtitle: "Ultra HD Clarity",
        description: "See clearly in total darkness with our advanced thermal imaging technology.",
    },
    {
        id: 4,
        image: "https://res.cloudinary.com/dq6gr5zjc/image/upload/v1773035991/ChatGPT_Image_Mar_9_2026_11_29_30_AM_c2lajo.png",
        title: "Thermal AI",
        subtitle: "Advanced Tracking",
        description: "Industry leading movement detection with zero false alarms using neural networks.",
    }
];

const GALLERY_IMAGES = [
    "https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=1470&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1470&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1590272456521-1bbe160a18ce?q=80&w=1470&auto=format&fit=crop"
];

const TESTIMONIALS = [
    { id: 1, videoUrl: "https://www.youtube.com/embed/IuTzmfI8PPA", title: "Altron Electronic Security Solutions" },
    { id: 2, videoUrl: "https://www.youtube.com/embed/SNCFf6KhE-A", title: "Top 5 Reasons to Choose Altron" },
    { id: 3, videoUrl: "https://www.youtube.com/embed/dQabYtFd-Qs", title: "Mastering Safety: Altron Academy" },
    { id: 4, videoUrl: "https://www.youtube.com/embed/uAFn0MB_5DE", title: "ALTROX Manufacturing Process" }
];

const GOOGLE_REVIEWS = [
    {
        id: 1,
        author: "Rahul Sharma",
        rating: 5,
        date: "2 weeks ago",
        text: "The CCTV installation training at Altron was top-notch. Very practical and hands-on. The instructors are industry experts.",
        avatar: "RS"
    },
    {
        id: 2,
        author: "Priya Patel",
        rating: 5,
        date: "1 month ago",
        text: "Excellent service for smart home automation. They integrated everything perfectly with my phone. Highly recommend!",
        avatar: "PP"
    },
    {
        id: 3,
        author: "Vikram Singh",
        rating: 5,
        date: "3 months ago",
        text: "Great experience learning about thermal imaging. The lab facilities are world-class. Best security institute in the region.",
        avatar: "VS"
    }
];

export default function Home() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
        }, 7000); // Slightly longer for a more relaxed, premium feel
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => setCurrent(current === SLIDES.length - 1 ? 0 : current + 1);
    const prevSlide = () => setCurrent(current === 0 ? SLIDES.length - 1 : current - 1);

    return (
        <div className="min-h-screen font-sans bg-white text-gray-900 selection:bg-[#BA442E]/20 overflow-x-hidden antialiased">

            {/* --- HERO SECTION --- */}
            <section className="relative h-screen w-full flex flex-col justify-center overflow-hidden bg-black">
                {SLIDES.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`absolute inset-0 z-0 transition-all duration-1000 ease-in-out ${index === current ? "opacity-100 scale-100" : "opacity-0 scale-105"}`}
                    >
                        <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
                    </div>
                ))}

                <div className="relative z-20 max-w-7xl mx-auto px-6 w-full pt-20">
                    <div className="max-w-3xl transition-all duration-700 transform translate-y-0">
                        <div className="overflow-hidden mb-4">
                            <span className="inline-block text-[#BA442E] uppercase tracking-[0.3em] font-bold text-sm md:text-base">
                                {SLIDES[current].subtitle}
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1.05] tracking-tighter mb-8">
                            {SLIDES[current].title}
                        </h1>
                        <p className="text-gray-300 text-lg md:text-2xl font-light max-w-xl mb-12 leading-relaxed">
                            {SLIDES[current].description}
                        </p>
                        <button className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-[#BA442E] overflow-hidden rounded-none">
                            <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-72 group-hover:h-56 opacity-10"></span>
                            <span className="relative flex items-center gap-3">
                                Explore Courses <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </button>
                    </div>
                </div>

                {/* Refined Slider Controls */}
                <div className="absolute bottom-12 left-0 right-0 z-30">
                    <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                        <div className="flex gap-3 items-center">
                            {SLIDES.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrent(i)}
                                    className={`h-[2px] transition-all duration-500 ease-in-out ${i === current ? "w-12 bg-[#BA442E]" : "w-6 bg-white/30 hover:bg-white/60"}`}
                                    aria-label={`Go to slide ${i + 1}`}
                                />
                            ))}
                        </div>
                        <div className="flex gap-4">
                            <button onClick={prevSlide} className="p-4 border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300">
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button onClick={nextSlide} className="p-4 border border-white/20 text-white hover:bg-[#BA442E] hover:border-[#BA442E] transition-all duration-300">
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- ACADEMY HIGHLIGHT --- */}
            <section className="py-24 md:py-32 bg-white relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                        <div className="w-full lg:w-1/2 relative group">
                            {/* Decorative background element */}
                            <div className="absolute -inset-4 md:-inset-6 bg-gray-50 transform translate-x-4 translate-y-4 transition-transform duration-500 group-hover:translate-x-6 group-hover:translate-y-6"></div>
                            <div className="relative overflow-hidden shadow-2xl">
                                <img
                                    src="https://res.cloudinary.com/dq6gr5zjc/image/upload/v1773990506/Securing_the_camera_cover_jnvpxt.png"
                                    alt="Training Academy"
                                    className="w-full h-[400px] md:h-[600px] object-cover transform transition-transform duration-1000 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 border border-black/5 z-10"></div>
                            </div>
                        </div>
                        <div className="w-full lg:w-1/2 flex flex-col items-start">
                            <span className="text-[#b3433a] font-bold tracking-[0.3em] uppercase text-sm mb-4">The Academy</span>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.1] tracking-tight mb-8">
                                Altron Safety & Security Academy
                            </h2>
                            <p className="text-gray-500 text-lg md:text-xl leading-relaxed mb-10 font-light">
                                We specialize in equipping the world with the expertise to utilize the latest technologies, ensuring profoundly safe and secure surveillance environments globally.
                            </p>
                            <button className="group flex items-center gap-4 text-gray-900 font-bold hover:text-[#b3433a] transition-colors pb-2 border-b-2 border-transparent hover:border-[#b3433a]">
                                Discover Our Heritage <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- E-CAMPUS ECOSYSTEM --- */}
            <section className="py-24 md:py-32 bg-[#FAFAFA] border-y border-gray-100">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <span className="text-[#BA442E] font-bold tracking-[0.3em] uppercase text-sm mb-4 block">Ecosystem</span>
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-6">Altron e-Campus</h2>
                        <p className="text-gray-500 text-lg md:text-xl font-light">A 360° holistic approach to integrated security solutions and global standards.</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-8 items-center">
                        {/* Left Column */}
                        <div className="flex flex-col gap-12 lg:text-right order-2 lg:order-1">
                            <div className="group flex flex-col lg:items-end">
                                <div className="mb-6 p-4 bg-white shadow-sm border border-gray-100 rounded-full text-gray-400 group-hover:text-[#BA442E] group-hover:border-[#BA442E]/30 transition-all duration-300">
                                    <ShieldCheck strokeWidth={1.5} size={32} />
                                </div>
                                <h4 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight">Altron Engineering</h4>
                                <p className="text-gray-500 leading-relaxed font-light lg:max-w-[280px]">Custom security infrastructure engineered exclusively for elite corporate and government sectors.</p>
                            </div>
                            <div className="group flex flex-col lg:items-end">
                                <div className="mb-6 p-4 bg-white shadow-sm border border-gray-100 rounded-full text-gray-400 group-hover:text-[#BA442E] group-hover:border-[#BA442E]/30 transition-all duration-300">
                                    <Globe strokeWidth={1.5} size={32} />
                                </div>
                                <h4 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight">Altrox World Corp</h4>
                                <p className="text-gray-500 leading-relaxed font-light lg:max-w-[280px]">Advanced manufacturing of next-generation, AI-powered surveillance hardware.</p>
                            </div>
                        </div>

                        {/* Center Image */}
                        <div className="relative flex justify-center items-center order-1 lg:order-2 py-10 lg:py-0">
                            <div className="absolute w-[120%] h-[120%] border-[1px] border-gray-200 rounded-full animate-[spin_40s_linear_infinite]" />
                            <div className="absolute w-[90%] h-[90%] border-[1px] border-dashed border-[#BA442E]/20 rounded-full animate-[spin_30s_linear_infinite_reverse]" />
                            <img
                                src="https://res.cloudinary.com/dq6gr5zjc/image/upload/v1773038587/ChatGPT_Image_Mar_9_2026_12_12_44_PM_prhuf0.png"
                                alt="Core Technology"
                                className="relative z-10 w-64 lg:w-full max-w-[360px] drop-shadow-2xl mix-blend-multiply"
                            />
                        </div>

                        {/* Right Column */}
                        <div className="flex flex-col gap-12 order-3">
                            <div className="group flex flex-col items-start">
                                <div className="mb-6 p-4 bg-white shadow-sm border border-gray-100 rounded-full text-gray-400 group-hover:text-[#BA442E] group-hover:border-[#BA442E]/30 transition-all duration-300">
                                    <GraduationCap strokeWidth={1.5} size={32} />
                                </div>
                                <h4 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight">Altron Institute</h4>
                                <p className="text-gray-500 leading-relaxed font-light lg:max-w-[280px]">Elite vocational training and government-recognized certifications in safety technologies.</p>
                            </div>
                            <div className="group flex flex-col items-start">
                                <div className="mb-6 p-4 bg-white shadow-sm border border-gray-100 rounded-full text-gray-400 group-hover:text-[#BA442E] group-hover:border-[#BA442E]/30 transition-all duration-300">
                                    <Settings strokeWidth={1.5} size={32} />
                                </div>
                                <h4 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight">Altron Care</h4>
                                <p className="text-gray-500 leading-relaxed font-light lg:max-w-[280px]">Dedicated post-installation maintenance and premium white-glove technical support.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- GALLERY --- */}
            <section className="py-24 md:py-32 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                        <div className="max-w-2xl">
                            <span className="text-[#BA442E] font-bold tracking-[0.3em] uppercase text-sm mb-4 block">Facilities</span>
                            <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">Hands-on Training.</h2>
                        </div>
                        <button className="text-gray-900 font-bold hover:text-[#BA442E] transition-colors flex items-center gap-2">
                            View Full Gallery <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {GALLERY_IMAGES.map((img, index) => (
                            <div key={index} className="group relative overflow-hidden bg-black aspect-[4/5]">
                                <img
                                    src={img}
                                    alt={`Training Session ${index + 1}`}
                                    className="w-full h-full object-cover opacity-90 transition-all duration-700 group-hover:scale-110 group-hover:opacity-100"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                                    <span className="text-[#BA442E] font-bold text-xs uppercase tracking-widest mb-2">Module 0{index + 1}</span>
                                    <h3 className="text-white text-xl font-bold">Practical Session</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- CONTACT SECTION --- */}
            <section className="py-0 bg-white">
                <div className="w-full flex flex-col lg:flex-row border-y border-gray-100">
                    <div className="w-full lg:w-1/2 relative min-h-[500px] lg:min-h-0 bg-black">
                        <video
                            src="https://res.cloudinary.com/dq6gr5zjc/video/upload/v1773051052/animated_kfaqwb.mov"
                            autoPlay loop muted playsInline
                            className="absolute inset-0 w-full h-full object-cover opacity-60"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center p-12 lg:p-24">
                            <h2 className="text-5xl lg:text-7xl font-black text-white leading-tight">
                                Secure Your<br /><span className="text-[#BA442E]">Future.</span>
                            </h2>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 bg-white p-12 lg:p-24 flex flex-col justify-center">
                        <div className="max-w-lg w-full mx-auto lg:mx-0">
                            <span className="text-[#BA442E] font-bold tracking-[0.3em] uppercase text-sm mb-4 block">Inquiry</span>
                            <h3 className="text-3xl font-black text-gray-900 mb-10 tracking-tight">Ready to begin?</h3>

                            <form className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="relative group">
                                        <User className="absolute left-0 top-3 text-gray-400 w-5 h-5 transition-colors group-focus-within:text-[#BA442E]" />
                                        <input type="text" placeholder="Full Name" className="w-full pl-8 pr-4 py-3 bg-transparent border-b border-gray-300 focus:border-[#BA442E] outline-none text-gray-900 placeholder-gray-400 transition-colors" />
                                    </div>
                                    <div className="relative group">
                                        <Phone className="absolute left-0 top-3 text-gray-400 w-5 h-5 transition-colors group-focus-within:text-[#BA442E]" />
                                        <input type="tel" placeholder="Mobile Number" className="w-full pl-8 pr-4 py-3 bg-transparent border-b border-gray-300 focus:border-[#BA442E] outline-none text-gray-900 placeholder-gray-400 transition-colors" />
                                    </div>
                                </div>
                                <div className="relative group">
                                    <Mail className="absolute left-0 top-3 text-gray-400 w-5 h-5 transition-colors group-focus-within:text-[#BA442E]" />
                                    <input type="email" placeholder="Email Address" className="w-full pl-8 pr-4 py-3 bg-transparent border-b border-gray-300 focus:border-[#BA442E] outline-none text-gray-900 placeholder-gray-400 transition-colors" />
                                </div>
                                <div className="relative group">
                                    <textarea rows={3} placeholder="Tell us about your requirements..." className="w-full py-3 bg-transparent border-b border-gray-300 focus:border-[#BA442E] outline-none text-gray-900 placeholder-gray-400 resize-none transition-colors" />
                                </div>
                                <button className="w-full bg-[#BA442E] text-white py-5 font-bold tracking-widest uppercase text-sm hover:bg-black transition-colors duration-300 mt-4">
                                    Send Inquiry
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- VIDEO TESTIMONIALS --- */}
            <section className="bg-[#0A0A0A] py-24 md:py-32">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="mb-16">
                        <span className="text-[#BA442E] font-bold tracking-[0.3em] uppercase text-sm mb-4 block">Success Stories</span>
                        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">Hear from our founder and alumni.</h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Main Featured Video */}
                        <div className="lg:col-span-8">
                            <div className="aspect-video w-full bg-black relative group overflow-hidden border border-white/10">
                                <iframe src={TESTIMONIALS[0].videoUrl} className="absolute inset-0 w-full h-full" allowFullScreen title="Featured Video" />
                            </div>
                        </div>

                        {/* Playlist */}
                        <div className="lg:col-span-4 flex flex-col gap-6">
                            {TESTIMONIALS.slice(1).map((video, idx) => (
                                <div key={video.id} className="group cursor-pointer flex flex-col sm:flex-row lg:flex-col gap-4">
                                    <div className="w-full sm:w-48 lg:w-full aspect-video bg-black relative overflow-hidden border border-white/5 transition-all duration-300 group-hover:border-[#BA442E]/50">
                                        <iframe src={video.videoUrl} className="absolute inset-0 w-full h-full pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity" title={video.title} />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-center">
                                        <span className="text-[#BA442E] text-xs font-bold tracking-widest uppercase mb-1 block">Episode 0{idx + 2}</span>
                                        <h4 className="text-white font-medium text-sm md:text-base leading-snug group-hover:text-[#BA442E] transition-colors">{video.title}</h4>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* --- GOOGLE REVIEWS SECTION --- */}
            <section className="bg-[#FAFAFA] py-24 md:py-32">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
                        <div>
                            <span className="text-[#BA442E] font-bold tracking-[0.3em] uppercase text-sm mb-4 block">Testimonials</span>
                            <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">Verified Excellence.</h2>
                            <div className="flex items-center gap-4">
                                <div className="flex text-yellow-400">
                                    {[...Array(5)].map((_, i) => <Star key={i} size={24} fill="currentColor" strokeWidth={0} />)}
                                </div>
                                <span className="font-bold text-xl text-gray-900">4.9/5.0 <span className="text-gray-400 font-normal text-base ml-2">on Google</span></span>
                            </div>
                        </div>
                        <a href="#" className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white border border-gray-200 text-gray-900 font-bold hover:border-[#BA442E] transition-colors duration-300">
                            <img src="https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png" alt="Google" className="w-5 h-5" />
                            Leave a Review
                        </a>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {GOOGLE_REVIEWS.map((review) => (
                            <div key={review.id} className="bg-white p-10 border border-gray-100 flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                                <div className="flex text-yellow-400 mb-8">
                                    {[...Array(review.rating)].map((_, i) => <Star key={i} size={18} fill="currentColor" strokeWidth={0} />)}
                                </div>
                                <p className="text-gray-600 leading-relaxed text-lg flex-grow font-light mb-10">
                                    "{review.text}"
                                </p>
                                <div className="mt-auto flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gray-100 flex items-center justify-center text-[#BA442E] font-black text-lg">
                                        {review.avatar}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-sm">{review.author}</h4>
                                        <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">{review.date}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
}