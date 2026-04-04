import React, { useState } from 'react';
import {
    Lock,
    Users,
    MessageSquare,
    Video,
    BookOpen,
    Image as ImageIcon,
    LogOut,
    PlusCircle,
    Briefcase,
    BadgeCheck,
    GraduationCap,
    MapPin,
    Menu,
    X,
    FileText,
    Building2
} from 'lucide-react';


interface AdminLayoutProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    onLogout: () => void;
    onAdd?: () => void;
    children: React.ReactNode;
    role?: string;
}


export default function AdminLayout({ activeTab, setActiveTab, onLogout, onAdd, children, role = 'admin' }: AdminLayoutProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const allTabs = [
        { id: 'inquiries', label: 'Inquiries', icon: MessageSquare, roles: ['admin'] },
        { id: 'courses', label: 'Courses', icon: BookOpen, roles: ['admin'] },
        { id: 'stories', label: 'Success Stories', icon: Video, roles: ['admin'] },
        { id: 'testimonials', label: 'Testimonials', icon: Users, roles: ['admin'] },
        { id: 'gallery', label: 'Gallery', icon: ImageIcon, roles: ['admin'] },
        { id: 'recruitment', label: 'Recruitment', icon: Briefcase, roles: ['admin'] },
        { id: 'franchise', label: 'Franchise Inquiries', icon: BadgeCheck, roles: ['admin'] },
        { id: 'centers', label: 'Training Centers', icon: MapPin, roles: ['admin'] },
        { id: 'franchise-accounts', label: 'Franchise Management', icon: Building2, roles: ['admin'] },
        { id: 'studentinfo', label: 'Student Records', icon: GraduationCap, roles: ['admin'] },
        { id: 'admissions', label: 'Admissions', icon: FileText, roles: ['admin', 'franchise'] },
    ];

    const tabs = allTabs.filter(tab => tab.roles.includes(role));


    return (
        <div className="min-h-screen bg-[#0a0a0a] text-gray-200">
            {/* Mobile Header */}
            <div className="lg:hidden flex items-center justify-between p-4 bg-white/5 border-b border-white/10 sticky top-0 z-50 backdrop-blur-md">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
                        <Lock className="text-white w-4 h-4" />
                    </div>
                    <span className="font-bold text-white tracking-tight">Altron <span className="text-brand-500">Education Panel</span></span>
                </div>
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2 bg-white/5 rounded-lg text-gray-400 hover:text-white transition-colors"
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            <div className="flex h-screen overflow-hidden">
                {/* Sidebar */}
                <div className={`
                    fixed inset-0 z-40 lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out
                    w-72 bg-[#0d0d0d] lg:bg-white/5 border-r border-white/10 p-6 flex flex-col
                    ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
                `}>
                    <div className="hidden lg:flex items-center gap-3 mb-10 px-2 text-white">
                        <div className="w-10 h-10 bg-brand-500 rounded-xl flex items-center justify-center">
                            <Lock className="text-white w-5 h-5" />
                        </div>
                        <span className="text-xl font-bold tracking-tight">Altron <span className="text-brand-500">Education Panel</span></span>
                    </div>

                    <div className="flex-1 space-y-2 overflow-y-auto">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => {
                                    setActiveTab(tab.id);
                                    setIsMobileMenuOpen(false);
                                }}
                                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all ${activeTab === tab.id ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/20' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                            >
                                <tab.icon size={20} />
                                <span className="font-semibold text-sm">{tab.label}</span>
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={onLogout}
                        className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-brand-400 hover:bg-brand-500/10 transition-all font-semibold text-sm mt-auto"
                    >
                        <LogOut size={20} /> Sign Out
                    </button>
                </div>

                {/* Main Content */}
                <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12 mt-4 lg:mt-0">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 lg:mb-12 gap-6">
                        <div>
                            <h2 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">{tabs.find(t => t.id === activeTab)?.label || activeTab}</h2>
                            <p className="text-gray-400 mt-1 lg:mt-2 text-sm lg:text-base">Manage your institute's {tabs.find(t => t.id === activeTab)?.label?.toLowerCase() || activeTab} data efficiently.</p>
                        </div>
                        {onAdd && (
                            <button
                                onClick={onAdd}
                                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-black px-6 py-3 rounded-xl font-bold text-sm hover:bg-gray-200 transition-all shadow-xl hover:scale-[1.02] active:scale-95"
                            >
                                <PlusCircle size={18} /> Add New {
                                    activeTab === 'studentinfo' ? 'Student Record' :
                                        activeTab === 'centers' ? 'Training Center' :
                                            activeTab === 'courses' ? 'Course' :
                                                activeTab === 'stories' ? 'Success Story' :
                                                    activeTab === 'testimonials' ? 'Testimonial' :
                                                        activeTab === 'gallery' ? 'Image' :
                                                            'Entry'
                                }
                            </button>
                        )}
                    </div>


                    {children}
                </div>
            </div>

            {/* Overlay for mobile menu */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}
        </div>
    );
}
