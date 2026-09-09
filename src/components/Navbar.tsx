import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react'

interface NavItem {
    label: string
    path?: string
    children?: { label: string; path: string; desc?: string }[]
}

const navItems: NavItem[] = [
    { label: 'Home', path: '/' },

    {
        label: 'Academy',
        children: [
            { label: 'About Institute', path: '/about-institute', desc: 'Our legacy and mission' },
            { label: 'Infrastructure', path: '/infrastructure', desc: 'Modern lab facilities' },
            { label: 'Certification', path: '/professional-certification', desc: 'Online Verified Certification' },
            { label: 'World Scenario', path: '/world-scenario', desc: 'Industry insights' },
        ],
    },

    {
        label: 'Courses',
        children: [
            { label: 'Professional Course', path: '/ProfessionalCourse', desc: 'Industry insights' },
            { label: 'CCTV', path: '/cctv', desc: 'Diploma Course in CCTV' },
            { label: 'Fire Alarm', path: '/fire-alarm-training', desc: 'Safety systems training' },
            { label: 'Access & Biometric', path: '/access-biometric-training', desc: 'Security protocols' },
            { label: 'Demand & Benefits', path: '/demand-benefits', desc: 'Industry insights' },
        ],
    },

    { label: 'Fees', path: '/duration-eligibility-fees' },
    { label: 'Authenticity', path: '/authenticity' },
    { label: 'Testimonials', path: '/testimonials' },

    {
        label: 'Gallery',
        children: [
            { label: 'Photos', path: '/gallery' },
            { label: 'e-Campus', path: '/e-campus' },
        ],
    },

    { label: 'Recruitment', path: '/employment' },
    { label: 'FAQ', path: '/faq' },
    { label: 'Centers', path: '/centers' },
    { label: 'Contact', path: '/contact' },
]

export default function Navbar() {

    const [isOpen, setIsOpen] = useState(false)
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
    const [isScrolled, setIsScrolled] = useState(false)

    // 7-Day Live Countdown Timer
    const [timeLeft, setTimeLeft] = useState({
        days: 6,
        hours: 23,
        minutes: 58,
        seconds: 45
    });

    useEffect(() => {
        let targetTime = localStorage.getItem('altron_batch_timer_end');
        if (!targetTime) {
            const sevenDays = Date.now() + 7 * 24 * 60 * 60 * 1000;
            localStorage.setItem('altron_batch_timer_end', sevenDays.toString());
            targetTime = sevenDays.toString();
        }

        const updateTimer = () => {
            const now = Date.now();
            const diff = Math.max(0, parseInt(targetTime!) - now);

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            setTimeLeft({ days, hours, minutes, seconds });
        };

        updateTimer();
        const interval = setInterval(updateTimer, 1000);

        return () => clearInterval(interval);
    }, []);

    const location = useLocation()

    useEffect(() => {
        setIsOpen(false)
        setActiveDropdown(null)
    }, [location])

    useEffect(() => {

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }

        window.addEventListener('scroll', handleScroll)

        return () => window.removeEventListener('scroll', handleScroll)

    }, [])

    const isLandingPage = location.pathname.toLowerCase() === '/landingpage';

    return (

        <nav className="sticky top-0 z-50 bg-white border-b border-slate-100 shadow-sm">

            {/* Top Utility Announcement Bar with Live 7-Day Countdown Timer (ONLY ON /landingpage) */}
            {isLandingPage ? (
                <div className="bg-gradient-to-r from-zinc-950 via-red-950 to-zinc-950 text-white border-b border-red-900/60 py-2 px-4 shadow-inner">
                    <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-bold uppercase tracking-wider">
                        
                        {/* Left: Limited Slots Notice */}
                        <div className="flex items-center gap-2">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                            </span>
                            <span className="text-red-400 font-black">🔥 LIMITED SLOTS LEFT!</span>
                            <span className="hidden sm:inline text-gray-300">Next Batch Reservation Closing Soon</span>
                        </div>

                        {/* Center: Live 7-Day Timer */}
                        <div className="flex items-center gap-1 font-mono text-xs">
                            <span className="text-gray-400 font-sans text-[10px] mr-1">OFFER ENDS IN:</span>
                            <div className="bg-zinc-900 border border-red-600/60 px-2 py-0.5 rounded text-white font-extrabold shadow-sm">
                                {String(timeLeft.days).padStart(2, '0')}<span className="text-red-400 font-sans text-[9px] ml-0.5">d</span>
                            </div>
                            <span className="text-red-500 font-bold">:</span>
                            <div className="bg-zinc-900 border border-red-600/60 px-2 py-0.5 rounded text-white font-extrabold shadow-sm">
                                {String(timeLeft.hours).padStart(2, '0')}<span className="text-red-400 font-sans text-[9px] ml-0.5">h</span>
                            </div>
                            <span className="text-red-500 font-bold">:</span>
                            <div className="bg-zinc-900 border border-red-600/60 px-2 py-0.5 rounded text-white font-extrabold shadow-sm">
                                {String(timeLeft.minutes).padStart(2, '0')}<span className="text-red-400 font-sans text-[9px] ml-0.5">m</span>
                            </div>
                            <span className="text-red-500 font-bold">:</span>
                            <div className="bg-zinc-900 border border-red-600/60 px-2 py-0.5 rounded text-red-400 font-extrabold shadow-sm animate-pulse">
                                {String(timeLeft.seconds).padStart(2, '0')}<span className="text-red-400 font-sans text-[9px] ml-0.5">s</span>
                            </div>
                        </div>

                        {/* Right: Action Button */}
                        <Link
                            to="/payment"
                            className="btn-shine bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-[0_0_12px_rgba(220,38,38,0.6)] inline-flex items-center gap-1.5 transition-transform hover:scale-105"
                        >
                            <span>PAY ₹1,000 & SECURE SLOT</span>
                            <ArrowRight className="w-3 h-3" />
                        </Link>

                    </div>
                </div>
            ) : (
                <div
                    className={`hidden lg:block bg-slate-50 border-b border-slate-100 transition-all duration-300 overflow-hidden ${isScrolled
                            ? 'max-h-0 opacity-0 border-none'
                            : 'max-h-12 opacity-100'
                        }`}
                >
                    <div className="relative z-50 max-w-7xl mx-auto px-6 py-2 flex justify-between items-center text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                        <Link
                            to="/authenticity"
                            onClick={() => {
                                setIsOpen(false)
                                setActiveDropdown(null)
                            }}
                            className="inline-flex items-center gap-1 text-red-700 hover:text-red-800"
                        >
                            Online Verified Certification
                            <ArrowRight className="w-3 h-3 shrink-0" />
                        </Link>

                        <Link
                            to="/become-franchise"
                            className="inline-flex items-center gap-1 text-red-700 hover:text-red-800"
                        >
                            Franchise Opportunities
                            <ArrowRight className="w-3 h-3 shrink-0" />
                        </Link>
                    </div>
                </div>
            )}

            {/* Main Navbar & Mobile Menu (Hidden on /landingpage) */}
            {!isLandingPage && (
                <>
                    <div className="max-w-7xl mx-auto px-6">

                        <div className="flex items-center justify-between h-24">

                            {/* Logo Section */}
                            <div className="flex items-center flex-shrink-0 relative z-10">

                                <Link to="/" className="block">

                                    <img
                                        src="https://res.cloudinary.com/dq6gr5zjc/image/upload/v1773043568/altronaccodemy_pxgw2x.png"
                                        alt="Altron Academy"
                                        className="h-32 md:h-42 w-auto object-contain mt-6 transition-transform pointer-events-none"
                                    />

                                </Link>

                            </div>

                            {/* Desktop Navigation */}
                            <div className="hidden xl:flex items-center gap-2">

                                {navItems.map((item) => (

                                    <div
                                        key={item.label}
                                        className="relative"
                                        onMouseEnter={() => setActiveDropdown(item.label)}
                                        onMouseLeave={() => setActiveDropdown(null)}
                                    >

                                        {item.children ? (

                                            <div
                                                className={`flex items-center gap-1 px-4 py-2 text-xs font-semibold rounded-full cursor-pointer transition ${activeDropdown === item.label
                                                        ? 'bg-slate-100 text-slate-900'
                                                        : 'text-slate-600 hover:text-slate-900'
                                                    }`}
                                            >

                                                {item.label}

                                                <ChevronDown
                                                    className={`w-4 h-4 transition-transform ${activeDropdown === item.label
                                                            ? 'rotate-180'
                                                            : ''
                                                        }`}
                                                />

                                            </div>

                                        ) : (

                                            <Link
                                                to={item.path!}
                                                className={`px-4 py-2 text-xs font-semibold rounded-full transition ${location.pathname === item.path
                                                        ? 'bg-red-50 text-red-700'
                                                        : 'text-slate-600 hover:text-slate-900'
                                                    }`}
                                            >
                                                {item.label}
                                            </Link>

                                        )}

                                        {/* Dropdown */}
                                        {item.children && activeDropdown === item.label && (

                                            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-64">

                                                <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-2">

                                                    {item.children.map((child) => (

                                                        <Link
                                                            key={child.path}
                                                            to={child.path}
                                                            className="group flex flex-col px-4 py-3 rounded-xl hover:bg-slate-50 transition"
                                                        >

                                                            <span className="text-xs font-bold text-slate-900 group-hover:text-red-700">
                                                                {child.label}
                                                            </span>

                                                            {child.desc && (
                                                                <span className="text-xs text-slate-500 mt-1">
                                                                    {child.desc}
                                                                </span>
                                                            )}

                                                        </Link>

                                                    ))}

                                                </div>

                                            </div>

                                        )}

                                    </div>

                                ))}

                            </div>

                            {/* Right Side */}
                            <div className="flex items-center gap-4">

                                <button
                                    onClick={() => setIsOpen(!isOpen)}
                                    className="xl:hidden p-2.5 rounded-xl bg-slate-50"
                                >
                                    {isOpen
                                        ? <X className="w-6 h-6" />
                                        : <Menu className="w-6 h-6" />
                                    }
                                </button>

                            </div>

                        </div>

                    </div>

                    {/* Mobile Menu */}
                    {isOpen && (

                        <div className="xl:hidden fixed inset-0 top-24 bg-white z-[60] overflow-y-auto">

                            <div className="p-6 space-y-4">

                                {navItems.map((item) => (

                                    <div key={item.label}>

                                        {item.children ? (

                                            <div>

                                                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                                                    {item.label}
                                                </div>

                                                <div className="pl-4 space-y-2">

                                                    {item.children.map((child) => (

                                                        <Link
                                                            key={child.path}
                                                            to={child.path}
                                                            className="block py-2 text-sm font-medium text-slate-700"
                                                        >
                                                            {child.label}
                                                        </Link>

                                                    ))}

                                                </div>

                                            </div>

                                        ) : (

                                            <Link
                                                to={item.path!}
                                                className="block py-2 text-sm font-semibold text-slate-900"
                                            >
                                                {item.label}
                                            </Link>

                                        )}

                                    </div>

                                ))}

                            </div>

                        </div>

                    )}
                </>
            )}

        </nav>

    )
}