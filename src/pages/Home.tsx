import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, User, ChevronLeft, ChevronRight, Play } from 'lucide-react';

const SLIDES = [
    {
        id: 1,
        image: "https://res.cloudinary.com/dq6gr5zjc/image/upload/v1773034527/ChatGPT_Image_Mar_9_2026_11_05_10_AM_t6b58i.png",
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
        title: "Night Vision",
        subtitle: "Ultra HD Clarity",
        description: "See clearly in total darkness with our advanced thermal imaging technology.",
    },
    {
        id: 5,
        image: "https://res.cloudinary.com/dq6gr5zjc/image/upload/v1773035489/fire-alarm-system-1024x950_u8fsam.jpg",
        title: "Night Vision",
        subtitle: "Ultra HD Clarity",
        description: "See clearly in total darkness with our advanced thermal imaging technology.",
    },
    {
        id: 6,
        image: "https://res.cloudinary.com/dq6gr5zjc/image/upload/v1773035489/fire-alarm-system-1024x950_u8fsam.jpg",
        title: "Night Vision",
        subtitle: "Ultra HD Clarity",
        description: "See clearly in total darkness with our advanced thermal imaging technology.",
    }
];

const GALLERY_IMAGES = [
    "https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=1470&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1470&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1590272456521-1bbe160a18ce?q=80&w=1470&auto=format&fit=crop"
];

// Updated TESTIMONIALS with the provided YouTube links
const TESTIMONIALS = [
    { id: 1, videoUrl: "https://www.youtube.com/embed/IuTzmfI8PPA", title: "Altron Electronic Security Solution Provider like CCTV, Fire Alarm, Biometric, VDP, Home Automation" },
    { id: 2, videoUrl: "https://www.youtube.com/embed/SNCFf6KhE-A", title: "Top 5 Reasons to Choose Altron Security Engineering" },
    { id: 3, videoUrl: "https://www.youtube.com/embed/dQabYtFd-Qs", title: "Mastering Safety & Security: Altron Academy" },
    { id: 4, videoUrl: "https://www.youtube.com/embed/uAFn0MB_5DE", title: "ALTROX World Class CCTV Surveillance Manufacturer" }
];

export default function Home() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => setCurrent(current === SLIDES.length - 1 ? 0 : current + 1);
    const prevSlide = () => setCurrent(current === 0 ? SLIDES.length - 1 : current - 1);

    return (
        <div className="min-h-screen font-sans selection:bg-[#BA442E]/30 overflow-x-hidden">
            <section className="relative min-h-screen flex flex-col overflow-hidden">
                {SLIDES.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out ${index === current ? "opacity-100" : "opacity-0"}`}
                    >
                        <img src={slide.image} alt={slide.title} className="w-full h-full object-cover transform scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#1F1F1F]/95 via-[#1F1F1F]/60 to-transparent" />
                    </div>
                ))}

                <div className="relative z-20 flex-grow flex items-center">
                    <div className="max-w-7xl mx-auto px-6 w-full">
                        <div key={current} className="animate-in fade-in slide-in-from-bottom-8 duration-700 max-w-3xl">
                            <h1 className="text-6xl md:text-8xl font-black text-white leading-[1.1] mb-6 tracking-tight">
                                {SLIDES[current].title} <br />
                                <span className="text-[#BA442E]">{SLIDES[current].subtitle}</span>
                            </h1>
                            <p className="text-gray-300 text-xl max-w-md mb-8 font-medium">{SLIDES[current].description}</p>
                        </div>
                    </div>
                </div>

                <div className="relative z-30 max-w-7xl mx-auto px-6 w-full pb-12 flex items-center gap-4">
                    <button onClick={prevSlide} className="p-3 border border-white/20 rounded-full text-white hover:bg-[#BA442E] transition-colors">
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button onClick={nextSlide} className="p-3 border border-white/20 rounded-full text-white hover:bg-[#BA442E] transition-colors">
                        <ChevronRight className="w-6 h-6" />
                    </button>
                    <div className="flex gap-2 ml-4">
                        {SLIDES.map((_, i) => (
                            <div key={i} className={`h-1 transition-all duration-300 ${i === current ? "w-8 bg-[#BA442E]" : "w-4 bg-white/30"}`} />
                        ))}
                    </div>
                </div>
            </section>

            <div className="bg-[#FFFFFF] py-20">
                <div className="w-full bg-white py-12 px-4 md:px-10 lg:px-20">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row min-h-[600px] border border-gray-100 shadow-sm overflow-hidden rounded-xl">
                        <div className="flex-1 w-full h-[400px] md:h-auto relative">
                            <img src="https://res.cloudinary.com/dq6gr5zjc/image/upload/v1773034527/ChatGPT_Image_Mar_9_2026_11_05_10_AM_t6b58i.png" alt="Altron Institute Security" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 px-8 py-16 md:px-12 lg:px-16 flex flex-col items-center justify-center text-center">
                            <h2 className="text-[#b3433a] text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-2 max-w-2xl">Altron Institute of Safety and Security Technologies</h2>
                            <h3 className="text-[#b3433a] text-2xl md:text-3xl font-bold tracking-[0.2em] mb-8">ACADEMY</h3>
                            <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-2xl mb-12">Altron Institute is expertise in making the world use the latest technologies to have safe and secure surveillance.</p>
                            <button className="px-10 py-3 border-2 border-[#b3433a] text-[#b3433a] text-xl font-medium rounded-sm hover:bg-[#b3433a] hover:text-white transition-all duration-300 active:scale-95">Read More</button>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center py-20 px-4 bg-white">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-semibold text-gray-900 mb-4">Altron e Campus</h2>
                        <p className="text-gray-500 text-lg">Our comprehensive ecosystem for safety and security</p>
                    </div>

                    <div className="relative flex flex-col md:flex-row items-center justify-center max-w-7xl w-full gap-12">
                        <div className="flex-1 flex flex-col gap-20 text-right">
                            <div className="flex flex-col items-end">
                                <div className="mb-4 text-3xl text-gray-700">
                                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                                </div>
                                <h4 className="text-xl font-bold text-gray-800 mb-2">Altron Security Engineering PVT LTD</h4>
                                <p className="text-gray-500 text-sm max-w-[250px]">Safety and Security Integration Solutions focused on large-scale infrastructure.</p>
                            </div>
                            <div className="flex flex-col items-end">
                                <div className="mb-4 text-3xl text-gray-700">
                                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                                </div>
                                <h4 className="text-xl font-bold text-gray-800 mb-2">Altrox World Corp</h4>
                                <p className="text-gray-500 text-sm max-w-[250px]">Global CCTV Surveillance System Manufacturer delivering cutting-edge hardware.</p>
                            </div>
                        </div>

                        <div className="relative flex-1 flex justify-center items-center py-10">
                            <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
                                <div className="w-[300px] h-[300px] border border-gray-100 rounded-full absolute"></div>
                                <div className="w-[450px] h-[450px] border border-gray-50 rounded-full absolute"></div>
                            </div>
                            <img src="https://res.cloudinary.com/dq6gr5zjc/image/upload/v1773038587/ChatGPT_Image_Mar_9_2026_12_12_44_PM_prhuf0.png" alt="Core Surveillance Camera" className="relative z-10 w-full max-w-[350px] h-auto drop-shadow-2xl" />
                        </div>

                        <div className="flex-1 flex flex-col gap-20 text-left">
                            <div className="flex flex-col items-start">
                                <div className="mb-4 text-3xl text-gray-700">
                                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>
                                </div>
                                <h4 className="text-xl font-bold text-gray-800 mb-2">Altron Institute</h4>
                                <p className="text-gray-500 text-sm max-w-[250px]">Safety & Security Education Institute providing professional training.</p>
                            </div>
                            <div className="flex flex-col items-start">
                                <div className="mb-4 text-3xl text-gray-700">
                                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                </div>
                                <h4 className="text-xl font-bold text-gray-800 mb-2">Altron Care Service</h4>
                                <p className="text-gray-500 text-sm max-w-[250px]">Multi-brand CCTV Surveillance Service Centre providing maintenance.</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white py-24 px-6 md:px-12 lg:px-24 w-full">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">Our Gallery</h2>
                            <p className="text-gray-500 text-lg mb-6">Glimpses of our hands-on technical training sessions</p>
                            <div className="h-1 w-20 bg-[#BA442E] mx-auto rounded-full"></div>
                        </div>

                        <div className="max-w-[1800px] mx-auto w-full">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                                {GALLERY_IMAGES.map((img, index) => (
                                    <div key={index} className="group relative overflow-hidden rounded-2xl bg-gray-50 shadow-sm transition-all duration-700 hover:shadow-2xl border border-gray-100 cursor-pointer">
                                        <div className="aspect-[16/10] md:aspect-[4/3] overflow-hidden">
                                            <img src={img} alt={`Training ${index}`} className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110" />
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#1F1F1F]/90 via-[#1F1F1F]/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                                            <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                                                <span className="inline-block px-3 py-1 bg-[#BA442E] text-white text-xs font-bold uppercase tracking-wider rounded-sm mb-3">Training Session</span>
                                                <h4 className="text-white font-bold text-2xl mb-1">Practical Lab</h4>
                                                <p className="text-gray-300 text-sm font-medium">Altron Institute</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 md:p-12 lg:p-20 w-full">
                        <div className="max-w-7xl w-full bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
                            <div className="w-full md:w-1/2 flex items-center justify-center overflow-hidden">
                                <video src="https://res.cloudinary.com/dq6gr5zjc/video/upload/v1773051052/animated_kfaqwb.mov" autoPlay loop muted playsInline className="w-full h-full object-cover" />
                            </div>
                            <div className="w-full md:w-1/2 p-12 md:p-20">
                                <form className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                                        <input type="text" className="w-full px-4 py-3 rounded-lg bg-gray-100 border-transparent focus:border-[#BA442E] focus:bg-white focus:ring-0 transition duration-200" placeholder="John Doe" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                                        <input type="tel" className="w-full px-4 py-3 rounded-lg bg-gray-100 border-transparent focus:border-[#BA442E] focus:bg-white focus:ring-0 transition duration-200" placeholder="+91 00000 00000" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                                        <input type="email" className="w-full px-4 py-3 rounded-lg bg-gray-100 border-transparent focus:border-[#BA442E] focus:bg-white focus:ring-0 transition duration-200" placeholder="john@example.com" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                                        <textarea rows={4} className="w-full px-4 py-3 rounded-lg bg-gray-100 border-transparent focus:border-[#BA442E] focus:bg-white focus:ring-0 transition duration-200 resize-none" placeholder="How can we help you?"></textarea>
                                    </div>
                                    <button type="submit" className="w-full md:w-max px-12 py-4 bg-[#BA442E] text-white font-bold rounded-lg hover:bg-[#a13a27] transform hover:-translate-y-1 transition-all duration-200 shadow-md">
                                        Submit
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* --- UPDATED TESTIMONIALS VIDEOS SECTION --- */}
                    <div className="bg-white py-24 px-6 md:px-12 lg:px-24 w-full">
                        <div className="max-w-7xl mx-auto">
                            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                                <div>
                                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">Testimonials — <span className="text-[#BA442E]">Videos</span></h2>
                                    <p className="text-gray-500 text-lg">Hear what our successful students and partners have to say</p>
                                </div>
                                <button className="text-sm font-bold uppercase tracking-widest text-[#BA442E] border-b-2 border-[#BA442E] pb-1 hover:text-black hover:border-black transition-colors">
                                    View All Stories
                                </button>
                            </div>

                            {/* Redesigned Video Layout based on screenshot */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                                {/* Featured Large Video */}
                                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl group">
                                    <iframe
                                        src={TESTIMONIALS[0].videoUrl}
                                        title={TESTIMONIALS[0].title}
                                        className="w-full h-full border-0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                    <div className="absolute top-4 right-4 flex gap-2">
                                        <button className="p-2 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-[#BA442E] transition-colors">
                                            <ChevronLeft className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-[#BA442E] transition-colors">
                                            <ChevronRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                {/* Secondary Video Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
                                    {TESTIMONIALS.slice(1).map((item) => (
                                        <div key={item.id} className="flex flex-col gap-4">
                                            <div className="relative aspect-video rounded-xl overflow-hidden shadow-md group">
                                                <iframe
                                                    src={item.videoUrl}
                                                    title={item.title}
                                                    className="w-full h-full border-0"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}