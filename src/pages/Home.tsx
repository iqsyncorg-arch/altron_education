import { useState, useEffect } from 'react';
import {
    ChevronLeft,
    ChevronRight,
    Star,
    ShieldCheck,
    Globe,
    GraduationCap,
    Phone,
    Mail,
    User,
    ArrowRight,
    CheckCircle,
    XCircle
} from 'lucide-react';
import { useApi } from '../hooks/useApi';


const SLIDES = [
    {
        id: 1,
        image: "https://res.cloudinary.com/dq6gr5zjc/image/upload/v1773990506/Securing_the_camera_cover_jnvpxt.png",
        title: "CCTV Camera",
        subtitle: "Installation Training",
        description: "Learn professional CCTV camera installation, cabling, DVR/NVR setup, and start your career as a security system technician.",
    },
    {
        id: 2,
        image: "https://res.cloudinary.com/dq6gr5zjc/image/upload/v1773035146/ChatGPT_Image_Mar_9_2026_11_15_03_AM_scurtc.png",
        title: "CCTV Surveillance",
        subtitle: "Control Room Configuration",
        description: "Learn control room setup, monitor configuration, remote viewing, networking, and centralized surveillance management.",
    },
    {
        id: 3,
        image: "https://res.cloudinary.com/dq6gr5zjc/image/upload/v1773035489/fire-alarm-system-1024x950_u8fsam.jpg",
        title: "Fire Alarm",
        subtitle: "Installation Training",
        description: "Hands-on training on fire alarm panel installation, detector wiring, safety standards, and troubleshooting.",
    },
    {
        id: 4,
        image: "https://res.cloudinary.com/dq6gr5zjc/image/upload/v1773035991/ChatGPT_Image_Mar_9_2026_11_29_30_AM_c2lajo.png",
        title: "Access Control",
        subtitle: "Biometric Installation",
        description: "Learn biometric access control installation, door lock wiring, attendance systems, and security access configuration.",
    },
    {
        id: 5,
        image: "https://res.cloudinary.com/dq6gr5zjc/image/upload/v1775117085/ChatGPT_Image_Apr_2_2026_01_33_05_PM_stpqov.png",
        title: "Smart Home",
        subtitle: "Installation Training",
        description: "Install and configure smart home automation including lighting, security, sensors, and mobile app integration.",
    },
    {
        id: 6,
        image: "https://res.cloudinary.com/dq6gr5zjc/image/upload/v1774726413/43094343-ec21-4be9-bc3e-1b0f053ab2cc_v9yzvb.jpg",
        title: "Theory & Practical",
        subtitle: "Hands-on Exam",
        description: "Complete theoretical learning and practical hands-on exam to become certified security system installation professional.",
    }
];


const FALLBACK_STORIES = [
    {
        id: 'f1',
        title: "CCTV Academy Course in Tamil Nadu",
        youtubeUrl: "https://www.youtube.com/watch?v=r_mWStz8WxY",
        category: "Training"
    },
    {
        id: 'f2',
        title: "Altron Institute Feedback - Mr. Vallarasu",
        youtubeUrl: "https://www.youtube.com/watch?v=UscfS3Dk_p8",
        category: "Testimonial"
    },
    {
        id: 'f3',
        title: "Security Engineering Training Excellence",
        youtubeUrl: "https://www.youtube.com/watch?v=Q8_v6qj3_xk",
        category: "Success Story"
    },
    {
        id: 'f4',
        title: "Practical Fire Alarm System Training",
        youtubeUrl: "https://www.youtube.com/watch?v=vV7YyG1V6P4",
        category: "Training"
    }
];

const FALLBACK_TESTIMONIALS = [
    {
        id: 't1',
        studentName: "Siddharth Verma",
        courseName: "CCTV & Networking",
        rating: 5,
        reviewText: "Excellent training! The practical sessions were very helpful in understanding the real-world challenges of security installation."
    },
    {
        id: 't2',
        studentName: "Priya Rajan",
        courseName: "Fire Alarm Systems",
        rating: 5,
        reviewText: "I joined with zero knowledge, but now I'm confident in installing and troubleshooting fire alarm panels. Highly recommended."
    },
    {
        id: 't3',
        studentName: "Arun Kumar",
        courseName: "Building Management Systems",
        rating: 5,
        reviewText: "A very professional academy. The staff is knowledgeable and the laboratory facilities are top-notch."
    }
];

const FALLBACK_GALLERY = [
    { imageUrl: "https://res.cloudinary.com/dq6gr5zjc/image/upload/v1773990506/Securing_the_camera_cover_jnvpxt.png", caption: "CCTV Installation Lab" },
    { imageUrl: "https://res.cloudinary.com/dq6gr5zjc/image/upload/v1773035146/ChatGPT_Image_Mar_9_2026_11_15_03_AM_scurtc.png", caption: "Surveillance Monitoring" },
    { imageUrl: "https://res.cloudinary.com/dq6gr5zjc/image/upload/v1773035489/fire-alarm-system-1024x950_u8fsam.jpg", caption: "Fire Alarm Panel Training" },
    { imageUrl: "https://res.cloudinary.com/dq6gr5zjc/image/upload/v1773035991/ChatGPT_Image_Mar_9_2026_11_29_30_AM_c2lajo.png", caption: "Biometric Setup" }
];

export default function Home() {
    const [current, setCurrent] = useState(0);
    const [inquiryLoading, setInquiryLoading] = useState(false);
    const [inquirySuccess, setInquirySuccess] = useState(false);
    const [inquiryError, setInquiryError] = useState<string | null>(null);
    const [inquiryForm, setInquiryForm] = useState({
        name: '',
        mobile: '',
        email: '',
        message: ''
    });

    const { data: galleryData, loading: galleryLoading } = useApi<any>('/gallery', FALLBACK_GALLERY);
    const { data: storiesData, loading: storiesLoading } = useApi<any>('/stories', FALLBACK_STORIES);
    const { data: testimonialsData, loading: testimonialsLoading } = useApi<any>('/testimonials', FALLBACK_TESTIMONIALS);

    const [galleryIndex, setGalleryIndex] = useState(0);
    const [testimonialIndex, setTestimonialIndex] = useState(0);
    const [featuredStoryIndex, setFeaturedStoryIndex] = useState(0);
    const [itemsPerView, setItemsPerView] = useState(1);

    useEffect(() => {
        const handleResize = () => {
            setItemsPerView(window.innerWidth >= 768 ? 3 : 1);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const nextGallery = () => {
        if (galleryData) {
            setGalleryIndex((prev) => (prev + 1 >= galleryData.length - (itemsPerView - 1) ? 0 : prev + 1));
        }
    };

    const prevGallery = () => {
        if (galleryData) {
            setGalleryIndex((prev) => (prev === 0 ? Math.max(0, galleryData.length - 3) : prev - 1));
        }
    };

    const nextTestimonial = () => {
        if (testimonialsData) {
            setTestimonialIndex((prev) => (prev + 1 >= testimonialsData.length - (itemsPerView - 1) ? 0 : prev + 1));
        }
    };

    const prevTestimonial = () => {
        if (testimonialsData) {
            setTestimonialIndex((prev) => (prev === 0 ? Math.max(0, testimonialsData.length - itemsPerView) : prev - 1));
        }
    };

    const handleInquiryChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setInquiryForm(prev => ({ ...prev, [name]: value }));
    };

    const handleInquirySubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setInquiryLoading(true);
        setInquiryError(null);
        try {
            const res = await fetch('http://127.0.0.1:5050/api/inquiries', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(inquiryForm),
            });
            if (res.ok) {
                setInquirySuccess(true);
                setInquiryForm({ name: '', mobile: '', email: '', message: '' });
                setTimeout(() => setInquirySuccess(false), 5000);
            } else {
                const result = await res.json();
                setInquiryError(result.message || 'Failed to send inquiry. Please try again.');
            }
        } catch (err) {
            setInquiryError('Network error. Please check your connection.');
            console.error('Inquiry submission failed:', err);
        }
        setInquiryLoading(false);
    };

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
                                We specialize in equipping students with the expertise to utilize the latest technologies, ensuring profoundly safe and secure surveillance environments.
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
                        <p className="text-gray-500 text-lg md:text-xl font-light">A 360° holistic approach to integrated security solutions and professional standards.</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-8 items-center">
                        {/* Left Column */}
                        <div className="flex flex-col gap-12 lg:text-right order-2 lg:order-1">
                            <a href="https://altronindia.com/" target="_blank" rel="noopener noreferrer" className="group flex flex-col lg:items-end hover:scale-[1.02] transition-transform">
                                <div className="mb-6 p-4 bg-white shadow-sm border border-gray-100 rounded-full text-gray-400 group-hover:text-[#BA442E] group-hover:border-[#BA442E]/30 transition-all duration-300">
                                    <ShieldCheck strokeWidth={1.5} size={32} />
                                </div>
                                <h4 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight">Altron Engineering</h4>
                                <p className="text-gray-500 leading-relaxed font-light lg:max-w-[280px]">Custom security infrastructure engineered exclusively for elite corporate and government sectors.</p>
                            </a>
                            <a href="https://altroxworld.com/" target="_blank" rel="noopener noreferrer" className="group flex flex-col lg:items-end hover:scale-[1.02] transition-transform">
                                <div className="mb-6 p-4 bg-white shadow-sm border border-gray-100 rounded-full text-gray-400 group-hover:text-[#BA442E] group-hover:border-[#BA442E]/30 transition-all duration-300">
                                    <Globe strokeWidth={1.5} size={32} />
                                </div>
                                <h4 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight">Altrox World Corp</h4>
                                <p className="text-gray-500 leading-relaxed font-light lg:max-w-[280px]">Advanced manufacturing of next-generation, AI-powered surveillance hardware.</p>
                            </a>
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
                            <a href="https://altroneducation.com/" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-start hover:scale-[1.02] transition-transform">
                                <div className="mb-6 p-4 bg-white shadow-sm border border-gray-100 rounded-full text-gray-400 group-hover:text-[#BA442E] group-hover:border-[#BA442E]/30 transition-all duration-300">
                                    <GraduationCap strokeWidth={1.5} size={32} />
                                </div>
                                <h4 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight">Altron Institute</h4>
                                <p className="text-gray-500 leading-relaxed font-light lg:max-w-[280px]">Elite vocational training and government-recognized certifications in safety technologies.</p>
                            </a>
                            <a href="https://www.gripforum.com/" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-start hover:scale-[1.02] transition-transform">
                                <div className="mb-6 p-4 bg-white shadow-sm border border-gray-100 rounded-full text-gray-400 group-hover:text-[#BA442E] group-hover:border-[#BA442E]/30 transition-all duration-300">
                                    <Globe strokeWidth={1.5} size={32} />
                                </div>
                                <h4 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight">GRIP</h4>
                                <p className="text-gray-500 leading-relaxed font-light lg:max-w-[280px]">Global Referral Interacting Platform: India's first paperless digital networking forum for structured business growth.</p>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- GALLERY --- */}
            <section id="gallery" className="py-24 md:py-32 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center md:items-end justify-between mb-16 gap-6 text-center md:text-left">
                        <div className="max-w-2xl">
                            <span className="text-[#BA442E] font-bold tracking-[0.3em] uppercase text-sm mb-4 block">Facilities</span>
                            <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">Hands-on Training.</h2>
                        </div>
                    </div>

                    <div className="relative group">
                        <div className="overflow-hidden">
                            <div
                                className={`flex transition-transform duration-500 ease-out gap-6 ${galleryLoading ? 'opacity-50 grayscale blur-sm' : 'opacity-100'}`}
                                style={{ transform: `translateX(-${galleryIndex * (100 / itemsPerView)}%)` }}
                            >
                                {Array.isArray(galleryData) && galleryData.map((imgObj: any, index) => {
                                    const imgUrl = imgObj.imageUrl;
                                    return (
                                        <div key={index} className="flex-none w-full md:w-[calc(33.333%-16px)] group/item relative overflow-hidden bg-black aspect-[4/5]">
                                            <img
                                                src={imgUrl}
                                                alt={imgObj.caption || `Training Session ${index + 1}`}
                                                className="w-full h-full object-cover opacity-90 transition-all duration-700 group-hover/item:scale-110 group-hover/item:opacity-100"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                                                <span className="text-[#BA442E] font-bold text-xs uppercase tracking-widest mb-2">Module 0{index + 1}</span>
                                                <h3 className="text-white text-xl font-bold">{imgObj.caption || 'Practical Session'}</h3>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {Array.isArray(galleryData) && galleryData.length > itemsPerView && (
                            <>
                                <button
                                    onClick={prevGallery}
                                    className="absolute left-[-20px] top-1/2 -translate-y-1/2 p-4 bg-white shadow-xl text-gray-900 rounded-full opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-300 z-30 hover:bg-[#BA442E] hover:text-white"
                                >
                                    <ChevronLeft className="w-6 h-6" />
                                </button>
                                <button
                                    onClick={nextGallery}
                                    className="absolute right-[-20px] top-1/2 -translate-y-1/2 p-4 bg-white shadow-xl text-gray-900 rounded-full opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-300 z-30 hover:bg-[#BA442E] hover:text-white"
                                >
                                    <ChevronRight className="w-6 h-6" />
                                </button>
                            </>
                        )}
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

                            <form className="space-y-8" onSubmit={handleInquirySubmit}>
                                {inquirySuccess && (
                                    <div className="bg-green-50 text-green-700 p-4 rounded-xl flex items-center gap-2 font-bold mb-4 border border-green-100 animate-in slide-in-from-top-2">
                                        <CheckCircle size={20} /> Thank you! Your inquiry has been sent.
                                    </div>
                                )}
                                {inquiryError && (
                                    <div className="bg-red-50 text-red-700 p-4 rounded-xl flex items-center gap-2 font-bold mb-4 border border-red-100 animate-in slide-in-from-top-2">
                                        <XCircle size={20} /> {inquiryError}
                                    </div>
                                )}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="relative group">
                                        <User className="absolute left-0 top-3 text-gray-400 w-5 h-5 transition-colors group-focus-within:text-[#BA442E]" />
                                        <input name="name" value={inquiryForm.name} onChange={handleInquiryChange} type="text" placeholder="Full Name" className="w-full pl-8 pr-4 py-3 bg-transparent border-b border-gray-300 focus:border-[#BA442E] outline-none text-gray-900 placeholder-gray-400 transition-colors" required />
                                    </div>
                                    <div className="relative group">
                                        <Phone className="absolute left-0 top-3 text-gray-400 w-5 h-5 transition-colors group-focus-within:text-[#BA442E]" />
                                        <input name="mobile" value={inquiryForm.mobile} onChange={handleInquiryChange} type="tel" placeholder="Mobile Number" className="w-full pl-8 pr-4 py-3 bg-transparent border-b border-gray-300 focus:border-[#BA442E] outline-none text-gray-900 placeholder-gray-400 transition-colors" required />
                                    </div>
                                </div>
                                <div className="relative group">
                                    <Mail className="absolute left-0 top-3 text-gray-400 w-5 h-5 transition-colors group-focus-within:text-[#BA442E]" />
                                    <input name="email" value={inquiryForm.email} onChange={handleInquiryChange} type="email" placeholder="Email Address" className="w-full pl-8 pr-4 py-3 bg-transparent border-b border-gray-300 focus:border-[#BA442E] outline-none text-gray-900 placeholder-gray-400 transition-colors" required />
                                </div>
                                <div className="relative group">
                                    <textarea name="message" value={inquiryForm.message} onChange={handleInquiryChange} rows={3} placeholder="Tell us about your requirements..." className="w-full py-3 bg-transparent border-b border-gray-300 focus:border-[#BA442E] outline-none text-gray-900 placeholder-gray-400 resize-none transition-colors" required />
                                </div>
                                <button disabled={inquiryLoading} className="w-full bg-[#BA442E] text-white py-5 font-bold tracking-widest uppercase text-sm hover:bg-black transition-colors duration-300 mt-4 disabled:opacity-50">
                                    {inquiryLoading ? 'Sending...' : 'Send Inquiry'}
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

                    <div className={`relative ${storiesLoading ? 'opacity-50' : 'opacity-100'} transition-opacity duration-500`}>
                        {storiesLoading && (
                            <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/20 backdrop-blur-[2px]">
                                <div className="flex flex-col items-center gap-4">
                                    <div className="w-12 h-12 border-4 border-[#BA442E]/30 border-t-[#BA442E] rounded-full animate-spin"></div>
                                    <span className="text-[#BA442E] font-bold tracking-widest uppercase text-xs">Syncing Stories</span>
                                </div>
                            </div>
                        )}
                        {Array.isArray(storiesData) && storiesData.length > 0 && (
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                                {/* Main Featured Video */}
                                <div className="lg:col-span-8">
                                    <div className="aspect-video w-full bg-black relative group overflow-hidden border border-white/10 rounded-2xl">
                                        <iframe
                                            src={storiesData[featuredStoryIndex]?.youtubeUrl.replace('watch?v=', 'embed/')}
                                            className="absolute inset-0 w-full h-full"
                                            allowFullScreen
                                            title="Featured Video"
                                        />
                                    </div>
                                </div>

                                {/* Playlist */}
                                <div className="lg:col-span-4 flex flex-col gap-6 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                                    {storiesData.map((video: any, idx) => (
                                        <div
                                            key={video.id || idx}
                                            onClick={() => setFeaturedStoryIndex(idx)}
                                            className={`group cursor-pointer flex flex-col sm:flex-row lg:flex-col gap-4 p-3 rounded-xl transition-all duration-300 ${featuredStoryIndex === idx ? 'bg-white/10 border border-white/20' : 'hover:bg-white/5 border border-transparent'}`}
                                        >
                                            <div className="w-full sm:w-48 lg:w-full aspect-video bg-black relative overflow-hidden border border-white/5 rounded-lg transition-all duration-300 group-hover:border-[#BA442E]/50">
                                                <img
                                                    src={`https://img.youtube.com/vi/${video.youtubeUrl.split('v=')[1]}/hqdefault.jpg`}
                                                    alt={video.title}
                                                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity"
                                                />
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${featuredStoryIndex === idx ? 'bg-[#BA442E] scale-110' : 'bg-white/20 group-hover:bg-[#BA442E]'}`}>
                                                        <ChevronRight className="w-6 h-6 text-white" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex-1 flex flex-col justify-center">
                                                <span className="text-[#BA442E] text-[10px] font-black tracking-[0.2em] uppercase mb-1 block">Episode 0{idx + 1}</span>
                                                <h4 className={`font-bold text-sm md:text-base leading-tight transition-colors ${featuredStoryIndex === idx ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>{video.title}</h4>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* --- GOOGLE REVIEWS SECTION --- */}
            <section id="testimonials" className="bg-[#FAFAFA] py-24 md:py-32">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center md:items-end justify-between mb-16 gap-8 text-center md:text-left">
                        <div>
                            <span className="text-[#BA442E] font-bold tracking-[0.3em] uppercase text-sm mb-4 block">Testimonials</span>
                            <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">Verified Excellence.</h2>
                            <div className="flex items-center justify-center md:justify-start gap-4">
                                <div className="flex text-yellow-400">
                                    {[...Array(5)].map((_, i) => <Star key={i} size={24} fill="currentColor" strokeWidth={0} />)}
                                </div>
                                <span className="font-bold text-xl text-gray-900">4.9/5.0 <span className="text-gray-400 font-normal text-base ml-2">on Google</span></span>
                            </div>
                        </div>
                        <a href="https://search.google.com/local/writereview?placeid=ChIJj__-F49mUjoR8Z7Zq6U7p8Y" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white border border-gray-200 text-gray-900 font-bold hover:border-[#BA442E] transition-colors duration-300 w-full md:w-auto">
                            <img src="https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png" alt="Google" className="w-5 h-5" />
                            Leave a Review
                        </a>
                    </div>

                    <div className="relative group">
                        <div className="overflow-hidden">
                            <div
                                className={`flex transition-transform duration-500 ease-out gap-8 ${testimonialsLoading ? 'opacity-50 blur-[2px]' : 'opacity-100'}`}
                                style={{ transform: `translateX(-${testimonialIndex * (100 / itemsPerView)}%)` }}
                            >
                                {Array.isArray(testimonialsData) && testimonialsData.map((review: any, index) => (
                                    <div key={review.id || index} className="flex-none w-full md:w-[calc(33.333%-21.33px)] bg-white border border-gray-100 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col h-[400px]">
                                        <div className="flex text-yellow-500 mb-6 font-bold">
                                            {[...Array(review.rating || 5)].map((_, i) => <Star key={i} size={20} fill="currentColor" strokeWidth={0} />)}
                                        </div>
                                        <p className="text-gray-600 leading-relaxed text-lg flex-grow font-light mb-10 overflow-hidden line-clamp-6">
                                            "{review.reviewText || review.content || review.comment}"
                                        </p>
                                        <div className="flex items-center gap-4 pt-6 border-t border-gray-50 mt-auto">
                                            <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center text-[#BA442E] font-black text-xl">
                                                {(review.studentName || review.name || 'A')[0]}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900 text-base leading-tight">{review.studentName || review.name}</h4>
                                                <p className="text-xs text-gray-400 uppercase tracking-widest mt-1 font-bold">{review.courseName || 'Verified Student'}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {Array.isArray(testimonialsData) && testimonialsData.length > itemsPerView && (
                            <>
                                <button
                                    onClick={prevTestimonial}
                                    className="absolute left-[-20px] top-1/2 -translate-y-1/2 p-4 bg-white shadow-xl text-gray-900 rounded-full opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-300 z-30 hover:bg-[#BA442E] hover:text-white border border-gray-100"
                                >
                                    <ChevronLeft className="w-6 h-6" />
                                </button>
                                <button
                                    onClick={nextTestimonial}
                                    className="absolute right-[-20px] top-1/2 -translate-y-1/2 p-4 bg-white shadow-xl text-gray-900 rounded-full opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-300 z-30 hover:bg-[#BA442E] hover:text-white border border-gray-100"
                                >
                                    <ChevronRight className="w-6 h-6" />
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </section>

        </div>
    );
}