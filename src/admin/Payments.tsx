import { useState } from 'react';
import { 
    CreditCard, Search, Trash2, CheckCircle2, Copy, Check, MessageCircle, 
    RefreshCw, Download, Eye, X
} from 'lucide-react';

interface PaymentItem {
    _id: string;
    name: string;
    email: string;
    phone: string;
    amount: number;
    currency: string;
    razorpayPaymentId: string;
    razorpayOrderId: string;
    status: string;
    notes?: string;
    createdAt: string;
}

interface PaymentsProps {
    data: PaymentItem[] | { data: PaymentItem[]; total?: number };
    loading: boolean;
    onDelete: (id: string) => void;
    page?: number;
    totalPages?: number;
    onPageChange?: (page: number) => void;
}

export default function Payments({ data, loading, onDelete }: PaymentsProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [selectedPayment, setSelectedPayment] = useState<PaymentItem | null>(null);
    const [dateFilter, setDateFilter] = useState<'all' | 'today' | 'week' | 'month'>('all');

    // Bulletproof array extraction from props
    const paymentsList: PaymentItem[] = Array.isArray(data) 
        ? data 
        : (data && Array.isArray((data as any).data)) 
            ? (data as any).data 
            : [];

    const copyToClipboard = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    // Filter payments
    const filteredPayments = paymentsList.filter((item) => {
        const query = searchTerm.toLowerCase();
        const matchesSearch = (
            (item.name || '').toLowerCase().includes(query) ||
            (item.phone || '').toLowerCase().includes(query) ||
            (item.email || '').toLowerCase().includes(query) ||
            (item.razorpayPaymentId || '').toLowerCase().includes(query) ||
            (item.razorpayOrderId || '').toLowerCase().includes(query)
        );

        if (!matchesSearch) return false;
        if (dateFilter === 'all') return true;

        const paymentDate = new Date(item.createdAt);
        const now = new Date();

        if (dateFilter === 'today') {
            return paymentDate.toDateString() === now.toDateString();
        }
        if (dateFilter === 'week') {
            const oneWeekAgo = new Date();
            oneWeekAgo.setDate(now.getDate() - 7);
            return paymentDate >= oneWeekAgo;
        }
        if (dateFilter === 'month') {
            const oneMonthAgo = new Date();
            oneMonthAgo.setMonth(now.getMonth() - 1);
            return paymentDate >= oneMonthAgo;
        }

        return true;
    });

    // Export to CSV
    const exportCSV = () => {
        if (paymentsList.length === 0) return;
        const headers = ['Student Name', 'Phone', 'Email', 'Amount (INR)', 'Payment ID', 'Order ID', 'Status', 'Date'];
        const rows = filteredPayments.map(p => [
            `"${p.name || ''}"`,
            `"${p.phone || ''}"`,
            `"${p.email || ''}"`,
            p.amount || 1,
            `"${p.razorpayPaymentId || ''}"`,
            `"${p.razorpayOrderId || ''}"`,
            `"${p.status || 'captured'}"`,
            `"${p.createdAt ? new Date(p.createdAt).toLocaleString() : ''}"`
        ]);

        const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', `Altron_Razorpay_Payments_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="space-y-6 text-gray-100">
            
            {/* Top Bar: Title & Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                <div className="relative w-full sm:w-80">
                    <Search className="absolute left-3.5 top-3 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search student, phone, payment ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-500 transition-colors"
                    />
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                    {/* Date filter tabs */}
                    <div className="flex p-1 rounded-xl border border-white/10 bg-black/30 text-xs font-bold">
                        {(['all', 'today', 'week', 'month'] as const).map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setDateFilter(filter)}
                                className={`px-3 py-1.5 rounded-lg uppercase text-[10px] tracking-wider transition-all ${
                                    dateFilter === filter
                                        ? 'bg-brand-600 text-white shadow-sm'
                                        : 'text-gray-400 hover:text-white'
                                }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>

                    {/* CSV Export */}
                    <button
                        onClick={exportCSV}
                        disabled={paymentsList.length === 0}
                        className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-md disabled:opacity-40"
                    >
                        <Download size={15} />
                        <span>Export CSV</span>
                    </button>
                </div>
            </div>

            {/* Table View */}
            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 text-gray-400 gap-3">
                    <RefreshCw size={28} className="animate-spin text-brand-500" />
                    <span>Fetching payment transactions...</span>
                </div>
            ) : filteredPayments.length === 0 ? (
                <div className="bg-white/5 border border-white/10 rounded-2xl p-16 text-center text-gray-400 backdrop-blur-md">
                    <div className="w-16 h-16 rounded-full bg-brand-500/10 text-brand-500 flex items-center justify-center mx-auto mb-4">
                        <CreditCard size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">No Payment Records Found</h3>
                    <p className="text-sm text-gray-400 max-w-md mx-auto">
                        {searchTerm || dateFilter !== 'all' 
                            ? 'No transactions match your current search or date filters.' 
                            : 'When students complete ₹500 seat reservations via Razorpay, their payments will automatically appear here.'}
                    </p>
                    {(searchTerm || dateFilter !== 'all') && (
                        <button
                            onClick={() => { setSearchTerm(''); setDateFilter('all'); }}
                            className="mt-4 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold transition-all"
                        >
                            Reset Filters
                        </button>
                    )}
                </div>
            ) : (
                <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/10 bg-white/5 text-gray-400 text-xs font-bold uppercase tracking-wider">
                                    <th className="py-4 px-6">Student Details</th>
                                    <th className="py-4 px-6">Payment ID</th>
                                    <th className="py-4 px-6">Order ID</th>
                                    <th className="py-4 px-6 text-center">Amount</th>
                                    <th className="py-4 px-6 text-center">Status</th>
                                    <th className="py-4 px-6 text-right">Date & Time</th>
                                    <th className="py-4 px-6 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 text-sm">
                                {filteredPayments.map((item) => (
                                    <tr key={item._id} className="hover:bg-white/5 transition-colors group">
                                        
                                        {/* Student Details */}
                                        <td className="py-4 px-6">
                                            <div className="font-bold text-white text-base">{item.name || 'Student'}</div>
                                            <div className="flex items-center gap-3 text-xs text-gray-400 mt-1">
                                                <span>{item.phone || 'No phone'}</span>
                                                {item.phone && (
                                                    <a
                                                        href={`https://wa.me/${item.phone.replace(/[^0-9]/g, '')}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-md transition-colors"
                                                    >
                                                        <MessageCircle size={12} />
                                                        WhatsApp
                                                    </a>
                                                )}
                                            </div>
                                            {item.email && (
                                                <div className="text-xs text-gray-500 font-mono mt-0.5">{item.email}</div>
                                            )}
                                        </td>

                                        {/* Razorpay Payment ID */}
                                        <td className="py-4 px-6 font-mono text-xs">
                                            <div className="flex items-center gap-2">
                                                <span className="font-bold text-brand-400 bg-brand-500/10 border border-brand-500/20 px-2.5 py-1 rounded-lg">
                                                    {item.razorpayPaymentId}
                                                </span>
                                                <button
                                                    onClick={() => copyToClipboard(item.razorpayPaymentId, `pay_${item._id}`)}
                                                    className="text-gray-500 hover:text-white p-1 rounded transition-colors"
                                                    title="Copy Payment ID"
                                                >
                                                    {copiedId === `pay_${item._id}` ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                                                </button>
                                            </div>
                                        </td>

                                        {/* Razorpay Order ID */}
                                        <td className="py-4 px-6 font-mono text-xs text-gray-400">
                                            <div className="flex items-center gap-2">
                                                <span>{item.razorpayOrderId}</span>
                                                <button
                                                    onClick={() => copyToClipboard(item.razorpayOrderId, `ord_${item._id}`)}
                                                    className="text-gray-500 hover:text-white p-1 rounded transition-colors"
                                                    title="Copy Order ID"
                                                >
                                                    {copiedId === `ord_${item._id}` ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                                                </button>
                                            </div>
                                        </td>

                                        {/* Amount */}
                                        <td className="py-4 px-6 text-center font-black text-emerald-400 text-base">
                                            ₹{item.amount || 1}
                                        </td>

                                        {/* Status */}
                                        <td className="py-4 px-6 text-center">
                                            <span className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-extrabold uppercase">
                                                <CheckCircle2 size={13} />
                                                {item.status || 'CAPTURED'}
                                            </span>
                                        </td>

                                        {/* Date & Time */}
                                        <td className="py-4 px-6 text-right text-xs text-gray-400 font-mono">
                                            {item.createdAt ? new Date(item.createdAt).toLocaleString('en-IN', {
                                                day: '2-digit',
                                                month: 'short',
                                                year: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            }) : 'N/A'}
                                        </td>

                                        {/* Actions */}
                                        <td className="py-4 px-6 text-center">
                                            <div className="flex items-center justify-center gap-1">
                                                <button
                                                    onClick={() => setSelectedPayment(item)}
                                                    className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all"
                                                    title="View Transaction Details"
                                                >
                                                    <Eye size={16} />
                                                </button>
                                                <button
                                                    onClick={() => onDelete(item._id)}
                                                    className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                                                    title="Delete record"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Detailed Transaction Inspector Modal */}
            {selectedPayment && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="relative w-full max-w-lg bg-[#121214] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl text-white">
                        <button
                            onClick={() => setSelectedPayment(null)}
                            className="absolute top-5 right-5 p-2 rounded-full hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
                        >
                            <X size={20} />
                        </button>

                        <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                                <CreditCard size={24} />
                            </div>
                            <div>
                                <span className="bg-emerald-500/20 text-emerald-400 font-extrabold text-[10px] uppercase px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                                    Captured & Verified
                                </span>
                                <h4 className="text-xl font-black mt-1">Transaction Details</h4>
                            </div>
                        </div>

                        <div className="space-y-4 text-xs sm:text-sm">
                            <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl">
                                <span className="text-gray-400">Student Name:</span>
                                <strong className="font-black text-base">{selectedPayment.name}</strong>
                            </div>

                            <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl">
                                <span className="text-gray-400">Phone Number:</span>
                                <div className="flex items-center gap-2">
                                    <strong className="font-bold">{selectedPayment.phone}</strong>
                                    {selectedPayment.phone && (
                                        <a
                                            href={`https://wa.me/${selectedPayment.phone.replace(/[^0-9]/g, '')}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-emerald-400 hover:underline text-xs font-bold"
                                        >
                                            Chat on WhatsApp
                                        </a>
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl">
                                <span className="text-gray-400">Email Address:</span>
                                <span className="font-mono font-semibold">{selectedPayment.email || 'N/A'}</span>
                            </div>

                            <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl font-mono">
                                <span className="text-gray-400">Razorpay Payment ID:</span>
                                <span className="font-bold text-brand-400">{selectedPayment.razorpayPaymentId}</span>
                            </div>

                            <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl font-mono">
                                <span className="text-gray-400">Razorpay Order ID:</span>
                                <span>{selectedPayment.razorpayOrderId}</span>
                            </div>

                            <div className="flex justify-between items-center bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-2xl">
                                <span className="text-emerald-400 font-bold uppercase">Amount Paid:</span>
                                <span className="text-2xl font-black text-emerald-400">₹{selectedPayment.amount} INR</span>
                            </div>

                            <div className="flex justify-between items-center text-xs text-gray-400 pt-2">
                                <span>Timestamp:</span>
                                <span>{selectedPayment.createdAt ? new Date(selectedPayment.createdAt).toLocaleString() : 'N/A'}</span>
                            </div>
                        </div>

                        <div className="mt-6 flex gap-3">
                            <button
                                onClick={() => setSelectedPayment(null)}
                                className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-colors"
                            >
                                Close Details
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
