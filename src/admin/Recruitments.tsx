import React from 'react';
import { Building, Mail, Phone, Calendar, Trash2, CheckCircle, Info } from 'lucide-react';

interface RecruitmentsProps {
    data: any[];
    loading: boolean;
    onDelete: (id: any) => void;
    page?: number;
    totalPages?: number;
    onPageChange?: (page: number) => void;
}

export default function Recruitments({ data, loading, onDelete, page = 1, totalPages = 1, onPageChange }: RecruitmentsProps) {

    if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500"></div></div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Professional Requisitions</h2>
                <div className="text-gray-400 text-sm">{data.length} Requests</div>
            </div>

            {Array.isArray(data) && data.map((item, idx) => (
                <div key={item.id || idx} className="bg-white/5 border border-white/10 p-4 md:p-8 rounded-2xl md:rounded-3xl hover:border-brand-500/30 transition-all group relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-brand-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                    <div className="flex flex-col lg:flex-row gap-6 md:gap-8 text-left">
                        {/* Org Info */}
                        <div className="space-y-4 w-full lg:w-1/3">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 md:w-12 md:h-12 bg-white/10 rounded-xl md:rounded-2xl flex items-center justify-center text-brand-500 shrink-0">
                                    <Building size={20} className="md:w-6 md:h-6" />
                                </div>
                                <div className="min-w-0">
                                    <h4 className="text-white font-bold text-base md:text-lg truncate">{item.organisationName}</h4>
                                    <p className="text-[10px] md:text-xs text-brand-400 font-bold uppercase tracking-widest truncate">{item.designation}</p>
                                </div>
                            </div>
                            <div className="space-y-2 text-xs md:text-sm">
                                <p className="text-gray-400 flex items-center gap-2 font-medium"><Calendar size={14} className="shrink-0" /> Submitted: {new Date(item.date || item.createdAt || Date.now()).toLocaleDateString()}</p>
                                <p className="text-gray-400 flex items-center gap-2 break-all font-medium"><Mail size={14} className="shrink-0" /> {item.email}</p>
                                <p className="text-gray-400 flex items-center gap-2 font-medium"><Phone size={14} className="shrink-0" /> {item.mobile}</p>
                            </div>
                        </div>

                        {/* Requirements */}
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 bg-white/3 p-4 md:p-6 rounded-2xl border border-white/5">
                            <div>
                                <h5 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Manpower Details</h5>
                                <div className="grid grid-cols-2 gap-3 md:gap-4">
                                    <div>
                                        <p className="text-gray-400 text-[10px] md:text-[11px] mb-0.5 font-bold uppercase tracking-tighter">Nos. Required</p>
                                        <p className="text-white font-bold text-sm md:text-base">{item.requiredEmployeesNo}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-[10px] md:text-[11px] mb-0.5 font-bold uppercase tracking-tighter">Min. Qualification</p>
                                        <p className="text-white font-bold text-sm md:text-base truncate">{item.qualification || 'N/A'}</p>
                                    </div>
                                    <div className="col-span-2">
                                        <p className="text-gray-400 text-[10px] md:text-[11px] mb-0.5 font-bold uppercase tracking-tighter">Starting Salary</p>
                                        <p className="text-brand-400 font-bold text-sm md:text-base">{item.startingSalary || 'Negotiable'}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6">
                                <h5 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Benefits Offered</h5>
                                <div className="flex flex-wrap gap-2">
                                    {['Conveyance', 'Accommodation', 'Uniform', 'ESIC', 'PF'].map(benefit => {
                                        const key = benefit.toLowerCase();
                                        const value = item[key];
                                        if (value && value !== 'No' && value !== 'N/A') {
                                            return <span key={benefit} className="px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-[9px] md:text-[10px] font-bold border border-green-500/10 shrink-0">✓ {benefit}</span>
                                        }
                                        return null;
                                    })}
                                </div>
                                {item.projectIncentive && (
                                    <div className="mt-4 p-3 bg-white/5 rounded-xl border border-brand-500/10">
                                        <p className="text-[10px] font-bold text-brand-400 uppercase tracking-widest mb-1 flex items-center gap-1"><Info size={10} /> Incentive Details</p>
                                        <p className="text-gray-400 text-[10px] md:text-[11px] leading-relaxed line-clamp-2">{item.projectIncentive}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="text-[10px] md:text-[11px] text-gray-500 italic max-w-full truncate md:whitespace-normal font-medium">
                            Address: {item.address}
                        </div>
                        <div className="flex gap-2 w-full sm:w-auto">
                            <button
                                onClick={() => onDelete(item.id)}
                                className="flex-1 sm:flex-none p-3 bg-white/5 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all flex items-center justify-center"
                            >
                                <Trash2 size={18} />
                            </button>
                            <button className="flex-[2] sm:flex-none p-3 bg-brand-500 text-white rounded-xl transition-all hover:bg-brand-600 px-6 text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-brand-500/20 active:scale-95">
                                <CheckCircle size={16} /> Processed
                            </button>
                        </div>
                    </div>
                </div>
            ))}


            {totalPages > 1 && (
                <div className="mt-12 flex justify-center gap-4">
                    <button
                        onClick={() => onPageChange?.(page - 1)}
                        disabled={page <= 1}
                        className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black text-gray-500 uppercase tracking-widest hover:text-white hover:border-white/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        Previous
                    </button>
                    <div className="flex items-center px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black text-gray-400 uppercase tracking-widest">
                        Page {page} of {totalPages}
                    </div>
                    <button
                        onClick={() => onPageChange?.(page + 1)}
                        disabled={page >= totalPages}
                        className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black text-gray-500 uppercase tracking-widest hover:text-white hover:border-white/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        Next Page
                    </button>
                </div>
            )}


            {Array.isArray(data) && data.length === 0 && (
                <div className="text-center py-24 bg-white/3 border border-dashed border-white/10 rounded-3xl">
                    <Building className="text-gray-600 w-12 h-12 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white">No requisitions found</h3>
                    <p className="text-gray-400 text-sm">New recruitment requests will appear here.</p>
                </div>
            )}
        </div>
    );
}
