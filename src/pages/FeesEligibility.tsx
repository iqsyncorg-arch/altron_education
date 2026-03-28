import PageHero from '../components/PageHero';
import { Link } from 'react-router-dom';

const courses = [
    {
        title: 'Diploma Course in CCTV Surveillance System',
        slug: 'cctv',
        color: 'from-red-600 to-red-800',
        borderColor: 'border-red-200',
        accentColor: 'text-red-600',
        icon: '📷',
        rows: [
            { label: 'Duration', value: '6 Days with Practical Exam' },
            { label: 'Day', value: 'Monday to Saturday' },
            { label: 'Timing', value: '10:00 AM – 05:30 PM' },
            { label: 'Eligibility', value: 'No Need & No Age Bar' },
            { label: 'Batch', value: '1 or 2 Candidates Only' },
            { label: 'Course Fees', value: '₹15,900 (Offer Price ₹10,900)' },
        ],
    },
    {
        title: 'Diploma Course in Fire Alarm System',
        slug: 'fire',
        color: 'from-orange-600 to-red-700',
        borderColor: 'border-orange-200',
        accentColor: 'text-orange-600',
        icon: '🔥',
        rows: [
            { label: 'Duration', value: '6 Days with Practical Exam' },
            { label: 'Day', value: 'Monday to Saturday' },
            { label: 'Timing', value: '10:00 AM – 05:30 PM' },
            { label: 'Eligibility', value: 'SSLC / HSC / ITI / Diploma / Any Degree' },
            { label: 'Batch', value: '1 or 2 Candidates Only' },
            { label: 'Course Fees', value: '₹15,900 (Offer Price ₹10,900)' },
        ],
    },
    {
        title: 'Professional Course in Safety & Security Engineering',
        slug: 'engineering',
        color: 'from-red-600 to-red-900',
        borderColor: 'border-red-200',
        accentColor: 'text-red-600',
        icon: '🛡️',
        rows: [
            { label: 'Duration', value: '4 Weeks + On-Site Practical' },
            { label: 'Timing', value: '10:00 AM – 05:30 PM' },
            { label: 'Subjects Covered', value: 'CCTV, Fire Alarm, Access Control, Biometric System, Home Security System' },
            { label: 'Eligibility', value: 'SSLC / HSC / ITI / Diploma / Any Degree (Below 35)' },
            { label: 'Course Fees', value: '₹49,000 (Offer Price ₹33,000)' },
            { label: 'Placement', value: '100% Job Placement' },
        ],
    },
];

export default function FeesEligibility() {
    return (
        <div className="bg-gradient-to-b from-white to-gray-50">

            <PageHero
                title="CCTV Installation & Maintenance Training"
                subtitle="Professional CCTV, Fire Alarm & Security Engineering Courses"
                breadcrumbs={['Courses']}
            />

            <div className="max-w-7xl mx-auto px-4 py-20">

                {/* INTRO */}
                <div className="mb-20 max-w-4xl mx-auto text-black leading-relaxed space-y-6 text-[15px]">

                    <p>
                        Altron Safety & Security Academy understands the industry
                        needs of the ever-growing security system sector. Our CCTV Course is designed in
                        an easy and practical way so students can learn through real hands-on experience.
                    </p>

                    <p>
                        Our institute includes classroom sessions and fully equipped practical labs for
                        advanced CCTV Camera Courses in Chennai. Apart from CCTV technology training,
                        we also provide Fire Alarm Systems training and Safety & Security Engineering
                        professional courses.
                    </p>

                    <p>
                        Students receive <strong className="text-red-600">100% practical training </strong>
                        for camera installation, networking configuration, troubleshooting, and system
                        maintenance. We also train students to diagnose CCTV faults and provide real-time
                        solutions for installation problems.
                    </p>

                    <p>
                        Our institute is one of the most popular technical training institutes for CCTV,
                        security systems, and surveillance technology education.
                    </p>

                    <p className="text-red-600 font-semibold">
                        For more details about our courses and admission, feel free to contact us and
                        schedule an appointment.
                    </p>

                </div>


                {/* CARDS */}
                <div className="space-y-10 mb-20">

                    {courses.map((course, i) => (

                        <div
                            key={i}
                            className={`group bg-white/80 backdrop-blur rounded-2xl border ${course.borderColor} shadow-md hover:shadow-xl transition duration-300`}
                        >

                            {/* TOP GRADIENT BAR */}
                            <div className={`h-1.5 bg-gradient-to-r ${course.color} rounded-t-2xl`} />

                            <div className="p-8">

                                {/* HEADER */}
                                <div className="flex items-center gap-4 mb-8">

                                    <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-gray-100 text-2xl shadow-sm group-hover:scale-105 transition">
                                        {course.icon}
                                    </div>

                                    <div>
                                        <h2 className="text-xl font-semibold text-black tracking-tight">
                                            {course.title}
                                        </h2>

                                        <p className={`text-xs font-semibold ${course.accentColor}`}>
                                            Practical Training Program
                                        </p>
                                    </div>

                                </div>


                                {/* TABLE */}
                                <div className="overflow-hidden rounded-xl border border-gray-100">

                                    <table className="w-full">

                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="text-left py-3 px-5 text-gray-500 text-xs uppercase tracking-wide">
                                                    Criteria
                                                </th>

                                                <th className="text-left py-3 px-5 text-gray-500 text-xs uppercase tracking-wide">
                                                    Details
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody>

                                            {course.rows.map((row, j) => (

                                                <tr
                                                    key={j}
                                                    className="border-t border-gray-100 hover:bg-gray-50/60 transition"
                                                >

                                                    <td className="py-3 px-5 text-gray-600 text-sm">
                                                        {row.label}
                                                    </td>

                                                    <td className={`py-3 px-5 font-semibold text-sm ${course.accentColor}`}>
                                                        {row.value}
                                                    </td>

                                                </tr>

                                            ))}

                                        </tbody>

                                    </table>

                                </div>


                                {/* BUTTONS */}
                                <div className="mt-8 flex gap-4">

                                    <Link
                                        to="/contact"
                                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-lg text-sm font-semibold shadow-sm hover:shadow-md transition"
                                    >
                                        Enquire for Fees
                                    </Link>

                                    <Link
                                        to="/contact"
                                        className="border border-gray-300 hover:border-red-600 hover:text-red-600 px-6 py-2.5 rounded-lg text-sm font-semibold transition"
                                    >
                                        Schedule Visit
                                    </Link>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>


                {/* PLACEMENT */}
                <div className="bg-white/80 backdrop-blur rounded-2xl p-12 border border-red-200 shadow-md text-center">

                    <h3 className="text-black font-semibold text-xl mb-4 tracking-tight">
                        Placement Opportunities
                    </h3>

                    <p className="text-gray-700 max-w-2xl mx-auto mb-8 text-[15px] leading-relaxed">
                        Our training bridges the gap between students and corporate companies.
                        After successful completion of the Professional Course,
                        students receive <strong className="text-red-600"> 100% placement assistance</strong>
                        in Tamil Nadu and overseas opportunities.
                    </p>

                    <div className="flex flex-wrap gap-4 justify-center">

                        <a
                            href="tel:+919962456533"
                            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold shadow-sm hover:shadow-md transition"
                        >
                            Call: 99624 56533
                        </a>

                        <Link
                            to="/contact"
                            className="border border-gray-300 hover:border-red-600 hover:text-red-600 px-6 py-3 rounded-lg font-semibold transition"
                        >
                            Send Enquiry
                        </Link>

                    </div>

                </div>

            </div>

        </div>
    );
}