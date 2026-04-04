import { useState } from 'react';
import { Mail, Phone, CheckCircle, Trash2, MessageSquare, MapPin, BadgeCheck, ChevronDown, ChevronUp, Calendar } from 'lucide-react';

interface InquiriesProps {
    data: any[];
    loading: boolean;
    onDelete: (id: any) => void;
    page?: number;
    totalPages?: number;
    onPageChange?: (page: number) => void;
}

export default function Inquiries({ data, loading, onDelete, page = 1, totalPages = 1, onPageChange }: InquiriesProps) {

    const [expandedId, setExpandedId] = useState<any>(null);

    if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500"></div></div>;

    if (!data || data.length === 0) {
        return (
            <div className="text-center py-20 bg-white/[0.02] border border-dashed border-white/10 rounded-3xl">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="text-gray-600 w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white uppercase tracking-tighter italic">No entries found</h3>
                <p className="text-gray-500 text-xs mt-1 font-medium italic">There are currently no records in this category.</p>
            </div>
        );
    }

    return (
        <div className="w-full">
            {/* Table Header - Visible on desktop */}
            <div className="hidden lg:grid grid-cols-12 gap-4 px-6 py-4 border-b border-white/10 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">
                <div className="col-span-1">Date</div>
                <div className="col-span-3">User / Type</div>
                <div className="col-span-3">Contact Details</div>
                <div className="col-span-3">Requirement / Message</div>
                <div className="col-span-2 text-right">Actions</div>
            </div>

            <div className="space-y-px divide-y divide-white/5 bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden">
                {data.map((item, idx) => {
                    const isFranchise = item.type === 'franchise';
                    const isExpanded = expandedId === item.id;
                    const date = new Date(item.createdAt || Date.now()).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                    });

                    return (
                        <div
                            key={item.id || idx}
                            className={`group hover:bg-white/[0.03] transition-all bg-transparent ${isExpanded ? 'bg-white/[0.04]' : ''}`}
                        >
                            <div className="lg:grid lg:grid-cols-12 flex flex-col items-start lg:items-center gap-2 lg:gap-4 px-4 lg:px-6 py-4 lg:py-3.5 relative">
                                {/* Date - Mobile shows as a badge */}
                                <div className="lg:col-span-1 text-[11px] font-bold text-gray-500 flex items-center lg:block gap-2 w-full lg:w-auto">
                                    <Calendar size={12} className="lg:hidden text-brand-500" />
                                    {date}
                                </div>

                                {/* User / Type */}
                                <div className="lg:col-span-3 flex items-center gap-3 w-full lg:w-auto">
                                    <div className={`w-8 h-8 rounded-lg ${isFranchise ? 'bg-brand-500/10 text-brand-400' : 'bg-white/10 text-gray-400'} flex items-center justify-center shrink-0 border border-white/5`}>
                                        {isFranchise ? <BadgeCheck size={16} /> : <MessageSquare size={16} />}
                                    </div>
                                    <div className="min-w-0">
                                        <h4 className="text-sm font-bold text-white truncate leading-tight">{item.fullName || item.name}</h4>
                                        <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-md uppercase tracking-widest border ${isFranchise ? 'border-brand-500/30 text-brand-400 bg-brand-500/10' : 'border-white/10 text-gray-500 bg-white/5'}`}>
                                            {isFranchise ? 'Franchise' : 'General'}
                                        </span>
                                    </div>
                                </div>

                                {/* Contact */}
                                <div className="lg:col-span-3 flex flex-col gap-0.5 w-full lg:w-auto mt-2 lg:mt-0">
                                    <span className="flex items-center gap-1.5 text-[12px] text-gray-400 font-medium truncate">
                                        <Mail size={12} className="shrink-0 opacity-50" /> {item.email}
                                    </span>
                                    <span className="flex items-center gap-1.5 text-[12px] text-gray-400 font-medium">
                                        <Phone size={12} className="shrink-0 opacity-50" /> {item.phone || item.mobile}
                                    </span>
                                </div>

                                {/* Requirement Snapshot */}
                                <div className="lg:col-span-3 w-full lg:w-auto mt-2 lg:mt-0 cursor-pointer" onClick={() => setExpandedId(isExpanded ? null : item.id)}>
                                    {isFranchise ? (
                                        <div className="flex flex-wrap gap-2">
                                            <span className="flex items-center gap-1 text-[11px] font-bold text-brand-400/80 uppercase tracking-tighter">
                                                <MapPin size={10} /> {item.location}
                                            </span>
                                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest italic border ${item.investmentReady === 'Yes' ? 'border-green-500/30 text-green-400' : 'border-red-500/30 text-red-400'}`}>
                                                {item.investmentReady === 'Yes' ? 'Invest-Ready' : 'Inquiry'}
                                            </span>
                                        </div>
                                    ) : (
                                        <p className="text-[12px] text-gray-500 italic truncate font-medium">
                                            {item.requirements || item.message || "No message included..."}
                                        </p>
                                    )}
                                </div>

                                {/* Actions */}
                                <div className="lg:col-span-2 flex items-center justify-end gap-2 w-full lg:w-auto mt-4 lg:mt-0">
                                    <button
                                        onClick={() => setExpandedId(isExpanded ? null : item.id)}
                                        className="p-2 lg:p-1.5 bg-white/5 text-gray-500 hover:text-white rounded-lg transition-all"
                                    >
                                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                    </button>
                                    <div className="h-4 w-px bg-white/10 hidden lg:block mx-1"></div>
                                    <button
                                        onClick={() => onDelete(item.id)}
                                        className="p-2 lg:p-1.5 bg-white/5 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                    <button className="flex-1 lg:flex-none p-2 lg:p-1.5 bg-white/5 text-gray-500 hover:text-brand-500 hover:bg-brand-500/10 rounded-lg transition-all">
                                        <CheckCircle size={16} />
                                    </button>
                                </div>
                            </div>

                            {/* Detailed View Panel */}
                            {isExpanded && (
                                <div className="px-6 lg:px-14 pb-6 lg:pb-8 pt-2 bg-gradient-to-b from-white/[0.02] to-transparent border-t border-white/5">
                                    <div className="bg-[#0f0f0f] border border-white/10 rounded-2xl p-6 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/5 blur-[40px] pointer-events-none"></div>

                                        <h5 className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                                            <div className="w-1 h-1 bg-brand-500 rounded-full"></div> Detailed Requisition Info
                                        </h5>

                                        <div className="grid md:grid-cols-2 gap-8 text-left">
                                            <div className="space-y-4">
                                                <div>
                                                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1 italic">Applicant Identity</p>
                                                    <p className="text-white font-bold text-lg leading-tight uppercase italic">{item.fullName || item.name}</p>
                                                    <p className="text-brand-500 text-[11px] font-black uppercase tracking-widest mt-0.5">{item.email}</p>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1 italic">Contact</p>
                                                        <p className="text-white font-bold text-sm">{item.phone || item.mobile}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1 italic">Status</p>
                                                        <p className="text-white font-bold text-[10px] uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded-md inline-block">Active Lead</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                {isFranchise ? (
                                                    <>
                                                        <div>
                                                            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1 italic">Geography</p>
                                                            <p className="text-white font-bold text-sm italic">{item.location}, {item.district}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1 italic">Readiness</p>
                                                            <p className={`text-sm font-black italic ${item.investmentReady === 'Yes' ? 'text-green-500' : 'text-yellow-500'}`}>
                                                                Investment Ready: {item.investmentReady}
                                                            </p>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <div>
                                                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1 italic">Requirement Message</p>
                                                        <p className="text-gray-300 text-sm leading-relaxed italic">{item.requirements || item.message || "No additional message provided."}</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Scanned Summary Footer */}
            <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4 px-2">
                <div className="flex items-center gap-4 text-[11px] font-bold text-gray-600 uppercase tracking-widest italic">
                    <span>Total Entries: {data.length}</span>
                    <div className="w-1 h-1 bg-gray-700 rounded-full"></div>
                    <span>Showing Latest First</span>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => onPageChange?.(page - 1)}
                        disabled={page <= 1}
                        className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black text-gray-500 uppercase tracking-widest hover:text-white hover:border-white/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        Previous
                    </button>
                    <div className="flex items-center px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black text-gray-400 uppercase tracking-widest">
                        Page {page} of {totalPages}
                    </div>
                    <button
                        onClick={() => onPageChange?.(page + 1)}
                        disabled={page >= totalPages}
                        className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black text-gray-500 uppercase tracking-widest hover:text-white hover:border-white/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        Next Page
                    </button>
                </div>
            </div>
        </div>
    );
}
