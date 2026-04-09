import PageHero from '../components/PageHero';
import { CreditCard, Landmark, MapPin, Copy, Check, Shield } from 'lucide-react';
import { useState } from 'react';

export default function BankDetails() {
    const [copiedField, setCopiedField] = useState<string | null>(null);

    const bankInfo = {
        accountName: 'ALTRON ACADEMY',
        accountNumber: '50200057864448',
        ifscCode: 'HDFC0000287',
        bankName: 'HDFC BANK',
        branch: 'Arumbakkam, Chennai',
        upiId: 'altronacademy@hdfcbank'
    };

    const copyToClipboard = (text: string, field: string) => {
        navigator.clipboard.writeText(text);
        setCopiedField(field);
        setTimeout(() => setCopiedField(null), 2000);
    };

    return (
        <div className="bg-slate-50 min-h-screen">
            <PageHero
                title="Bank Details"
                subtitle="Secure payment options for course fees and enrollment"
                breadcrumbs={['Courses', 'Bank Details']}
            />

            <div className="max-w-4xl mx-auto px-4 py-20">
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
                    <div className="bg-brand-600 px-8 py-10 text-white relative overflow-hidden">
                        {/* Decorative Background */}
                        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

                        <div className="relative z-10">
                            <h2 className="text-3xl font-bold mb-2">Electronic Transfer</h2>
                            <p className="text-brand-100 opacity-90">Please use the details below for NEFT/IMPS/RTGS transfers</p>
                        </div>
                    </div>

                    <div className="p-8 lg:p-12">
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Account Details */}
                            <div className="space-y-6">
                                <DetailItem
                                    label="Account Name"
                                    value={bankInfo.accountName}
                                    icon={Landmark}
                                />
                                <DetailItem
                                    label="Account Number"
                                    value={bankInfo.accountNumber}
                                    icon={CreditCard}
                                    onCopy={() => copyToClipboard(bankInfo.accountNumber, 'acc')}
                                    isCopied={copiedField === 'acc'}
                                />
                                <DetailItem
                                    label="IFSC Code"
                                    value={bankInfo.ifscCode}
                                    icon={Shield}
                                    onCopy={() => copyToClipboard(bankInfo.ifscCode, 'ifsc')}
                                    isCopied={copiedField === 'ifsc'}
                                />
                            </div>

                            {/* Bank Details */}
                            <div className="space-y-6">
                                <DetailItem
                                    label="Bank Name"
                                    value={bankInfo.bankName}
                                    icon={Landmark}
                                />
                                <DetailItem
                                    label="Branch"
                                    value={bankInfo.branch}
                                    icon={MapPin}
                                />
                                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
                                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">UPI Payment</div>
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="text-lg font-bold text-slate-900">{bankInfo.upiId}</div>
                                        <button
                                            onClick={() => copyToClipboard(bankInfo.upiId, 'upi')}
                                            className="p-2 rounded-lg hover:bg-white transition-colors"
                                        >
                                            {copiedField === 'upi' ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5 text-slate-400" />}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 p-6 rounded-2xl bg-amber-50 border border-amber-100">
                            <div className="flex gap-4">
                                <div className="text-2xl pt-1">ℹ️</div>
                                <div>
                                    <h4 className="font-bold text-amber-900 mb-1">Important Note</h4>
                                    <p className="text-sm text-amber-800 leading-relaxed">
                                        After making the payment, please share the transaction screenshot/UTR number with our admission team via WhatsApp at <strong className="font-bold">+91 98410 14328</strong> along with the student's name and course selected.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function DetailItem({ label, value, icon: Icon, onCopy, isCopied }: any) {
    return (
        <div className="group relative">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">{label}</div>
            <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-brand-600">
                        <Icon className="w-5 h-5" />
                    </div>
                    <div className="text-lg font-bold text-slate-900">{value}</div>
                </div>
                {onCopy && (
                    <button
                        onClick={onCopy}
                        className="p-2 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-slate-100 transition-all"
                    >
                        {isCopied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4 text-slate-400" />}
                    </button>
                )}
            </div>
        </div>
    );
}

