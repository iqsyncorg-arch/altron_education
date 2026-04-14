import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown, Shield, ArrowRight } from 'lucide-react'

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

            // { label: 'Bank Details', path: '/bank-details', desc: 'Payment information' },
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
    { label: 'Employment', path: '/employment' },
    { label: 'FAQ', path: '/faq' },
    { label: 'Centers', path: '/centers' },
    { label: 'Contact', path: '/contact' },
]

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
    const [isScrolled, setIsScrolled] = useState(false)
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

    return (
        <nav className="sticky top-0 z-50 bg-white border-b border-slate-100 shadow-sm">

            {/* Top Utility */}
            <div className={`hidden lg:block bg-slate-50 border-b border-slate-100 transition-all duration-300 overflow-hidden ${isScrolled ? 'max-h-0 opacity-0 border-none' : 'max-h-12 opacity-100'}`}>
                <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between items-center text-[11px] font-semibold uppercase tracking-wider text-slate-500">

                    <div className="flex gap-6">
                        <span className="flex items-center gap-1.5 text-brand-600 font-bold">
                            <Shield className="w-3 h-3" />
                            Online Verified Certification
                        </span>
                    </div>

                    <Link
                        to="/become-franchise"
                        className="text-brand-600 hover:text-brand-700 flex items-center gap-1"
                    >
                        Franchise Opportunities
                        <ArrowRight className="w-3 h-3" />
                    </Link>

                </div>
            </div>

            {/* Main Navbar */}
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between h-24">

                    {/* Logo Section */}
                    <div className="flex items-center flex-shrink-0">
                        <Link to="/" className="block relative z-10">
                            <img
                                src="https://res.cloudinary.com/dq6gr5zjc/image/upload/v1773043568/altronaccodemy_pxgw2x.png"
                                alt="Altron Academy"
                                className="h-32 md:h-42 w-auto object-contain transform scale-125 mt-6 transition-transform"
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
                                    <button
                                        className={`flex items-center gap-1 px-4 py-2 text-xs font-semibold rounded-full transition
                                            ${activeDropdown === item.label
                                                ? 'bg-slate-100 text-slate-900'
                                                : 'text-slate-600 hover:text-slate-900'
                                            }`}
                                    >
                                        {item.label}

                                        <ChevronDown
                                            className={`w-4 h-4 transition-transform
                                                ${activeDropdown === item.label ? 'rotate-180' : ''}`}
                                        />

                                    </button>
                                ) : (
                                    <Link
                                        to={item.path!}
                                        className={`px-4 py-2 text-xs font-semibold rounded-full transition
                                            ${location.pathname === item.path
                                                ? 'bg-brand-50 text-brand-700'
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
                                                    <span className="text-xs font-bold text-slate-900 group-hover:text-brand-600">
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

                        {/* Phone number button removed */}

                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="xl:hidden p-2.5 rounded-xl bg-slate-50"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>

                    </div>

                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="xl:hidden fixed inset-0 top-24 bg-white z-[60] overflow-y-auto">

                    <div className="p-6 space-y-4">

                        {navItems.map((item) => (
                            <div key={item.label} className="border-b border-slate-100 pb-4">

                                {item.children ? (
                                    <>
                                        <div className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3 ml-2">
                                            {item.label}
                                        </div>

                                        <div className="grid gap-2">

                                            {item.children.map((child) => (
                                                <Link
                                                    key={child.path}
                                                    to={child.path}
                                                    className="px-4 py-3 bg-slate-50 rounded-xl text-sm font-bold"
                                                >
                                                    {child.label}
                                                </Link>
                                            ))}

                                        </div>
                                    </>
                                ) : (
                                    <Link
                                        to={item.path!}
                                        className="block px-4 py-3 text-sm font-bold"
                                    >
                                        {item.label}
                                    </Link>
                                )}

                            </div>
                        ))}

                        <div className="pt-6">
                            <Link
                                to="/become-franchise"
                                className="block w-full py-4 bg-slate-900 text-white text-center rounded-2xl font-bold"
                            >
                                Become a Franchise Partner
                            </Link>
                        </div>

                    </div>

                </div>
            )}

        </nav>
    )
}