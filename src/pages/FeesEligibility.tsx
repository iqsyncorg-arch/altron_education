import PageHero from '../components/PageHero';
import { Link } from 'react-router-dom';

const courses = [
    {
        title: 'Diploma Course in CCTV Surveillance System',
        slug: 'cctv',
        color: 'from-brand-600 to-brand-800',
        borderColor: 'border-brand-500/30',
        accentColor: 'text-brand-500',
        icon: '📷',
        rows: [
            { label: 'Regular Course Duration', value: '10 Days' },
            { label: 'Fast Track Duration', value: '1 Month' },
            { label: 'Eligibility', value: 'SSLC / HSC / Diploma / Degree' },
            { label: 'Age Limit', value: 'No Age Limit' },
            { label: 'Medium', value: 'English / Tamil' },
        ],
    },
    {
        title: 'Diploma Course in Fire Alarm System',
        slug: 'fire',
        color: 'from-orange-600 to-red-800',
        borderColor: 'border-orange-500/30',
        accentColor: 'text-orange-400',
        icon: '🔥',
        rows: [
            { label: 'Course Duration', value: '5 Days' },
            { label: 'Eligibility', value: 'SSLC / HSC / Diploma / Degree' },
            { label: 'Age Limit', value: 'No Age Limit' },
            { label: 'Medium', value: 'English / Tamil' },
            { label: 'Certification', value: 'BSA-JAS-ANZ International' },
        ],
    },
    {
        title: 'Professional Course in Safety & Security Engineering',
        slug: 'engineering',
        color: 'from-brand-600 to-brand-900',
        borderColor: 'border-brand-500/30',
        accentColor: 'text-brand-500',
        icon: '🛡️',
        rows: [
            { label: 'Course Duration', value: '1 Month' },
            { label: 'Eligibility', value: 'Engineering Graduates / Working Professionals' },
            { label: 'Age Limit', value: 'No Age Limit' },
            { label: 'Medium', value: 'English' },
            { label: 'Certification', value: 'BSA-JAS-ANZ International' },
        ],
    },
];

export default function FeesEligibility() {
    return (
        <div>
            <PageHero
                title="Fees, Duration & Eligibility"
                subtitle="Transparent pricing and eligibility information for all our programs"
                breadcrumbs={['Fees & Eligibility']}
            />
            <div className="max-w-7xl mx-auto px-4 py-20">
                <div className="text-center mb-12">
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        At Altron Academy, we believe education should be accessible. Our courses are priced competitively to ensure every aspiring technician can benefit from world-class training and international certification.
                    </p>
                </div>

                {/* Course Cards */}
                <div className="space-y-8 mb-16">
                    {courses.map((course, i) => (
                        <div key={i} className={`glass rounded-2xl overflow-hidden border ${course.borderColor}`}>
                            <div className={`h-1 bg-gradient-to-r ${course.color}`} />
                            <div className="p-8">
                                <div className="flex items-start gap-4 mb-6">
                                    <div className="text-4xl">{course.icon}</div>
                                    <div>
                                        <h2 className="text-xl font-bold text-white">{course.title}</h2>
                                        <p className={`text-sm font-medium ${course.accentColor}`}>International Certification Program</p>
                                    </div>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-white/10">
                                                <th className="text-left py-3 px-4 text-gray-400 text-sm font-medium">Criteria</th>
                                                <th className="text-left py-3 px-4 text-gray-400 text-sm font-medium">Details</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {course.rows.map((row, j) => (
                                                <tr key={j} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                                                    <td className="py-3 px-4 text-gray-400 text-sm">{row.label}</td>
                                                    <td className={`py-3 px-4 font-semibold text-sm ${course.accentColor}`}>{row.value}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="mt-6 flex gap-4">
                                    <Link to="/contact" className="btn-primary text-sm px-6 py-2.5">Enquire for Fees</Link>
                                    <Link to="/contact" className="btn-secondary text-sm px-6 py-2.5">Schedule Visit</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Fee Note */}
                <div className="glass rounded-2xl p-8 border border-brand-200 text-center">
                    <div className="text-3xl mb-3">💡</div>
                    <h3 className="text-white font-bold text-xl mb-3">Get the Latest Fee Structure</h3>
                    <p className="text-gray-400 max-w-xl mx-auto mb-6">
                        Course fees vary based on the specific program and payment options. Contact us directly or visit our center to get the complete and up-to-date fee structure along with available scholarship options.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <a href="tel:+919962456533" className="btn-amber">Call: 99624 56533</a>
                        <Link to="/contact" className="btn-secondary">Send Enquiry</Link>
                    </div>
                </div>

                {/* Bank Details Note */}
                <div className="mt-8 glass rounded-2xl p-6 border border-white/10">
                    <h3 className="text-white font-semibold mb-3">💳 Payment Options</h3>
                    <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-2"><span>✅</span> Cash Payment at Center</div>
                        <div className="flex items-center gap-2"><span>✅</span> Online Bank Transfer</div>
                        <div className="flex items-center gap-2"><span>✅</span> UPI / QR Code Payment</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
