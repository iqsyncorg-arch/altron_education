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
        <div>

            <PageHero
                title="CCTV Installation & Maintenance Training"
                subtitle="Professional CCTV, Fire Alarm & Security Engineering Courses"
                breadcrumbs={['Courses']}
            />

            <div className="max-w-7xl mx-auto px-4 py-20">

                {/* COURSE INTRO */}
                <div className="mb-16 max-w-4xl mx-auto text-black leading-relaxed space-y-5">

                    <p>
                        Altron Institute of Safety & Security Practical Training understands the industry
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


                {/* COURSE CARDS */}
                <div className="space-y-8 mb-16">

                    {courses.map((course, i) => (

                        <div
                            key={i}
                            className={`bg-white rounded-2xl border ${course.borderColor} shadow-lg hover:shadow-2xl transition-all duration-300`}
                        >

                            <div className={`h-1 bg-gradient-to-r ${course.color}`} />

                            <div className="p-8">

                                <div className="flex items-start gap-4 mb-6">

                                    <div className="text-4xl">{course.icon}</div>

                                    <div>
                                        <h2 className="text-xl font-bold text-black">
                                            {course.title}
                                        </h2>

                                        <p className={`text-sm font-semibold ${course.accentColor}`}>
                                            Practical Training Program
                                        </p>
                                    </div>

                                </div>


                                <div className="overflow-x-auto">

                                    <table className="w-full">

                                        <thead>
                                            <tr className="border-b border-gray-200">
                                                <th className="text-left py-3 px-4 text-gray-600 text-sm font-medium">
                                                    Criteria
                                                </th>

                                                <th className="text-left py-3 px-4 text-gray-600 text-sm font-medium">
                                                    Details
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody>

                                            {course.rows.map((row, j) => (

                                                <tr
                                                    key={j}
                                                    className="border-b border-gray-100 hover:bg-gray-50 transition"
                                                >

                                                    <td className="py-3 px-4 text-gray-700 text-sm">
                                                        {row.label}
                                                    </td>

                                                    <td className={`py-3 px-4 font-semibold text-sm ${course.accentColor}`}>
                                                        {row.value}
                                                    </td>

                                                </tr>

                                            ))}

                                        </tbody>

                                    </table>

                                </div>


                                <div className="mt-6 flex gap-4">

                                    <Link
                                        to="/contact"
                                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-lg text-sm font-semibold"
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



                {/* Placement Section */}

                <div className="bg-white rounded-2xl p-10 border border-red-200 shadow-lg text-center">

                    <h3 className="text-black font-bold text-xl mb-4">
                        Placement Opportunities
                    </h3>

                    <p className="text-gray-700 max-w-2xl mx-auto mb-6">
                        Our training bridges the gap between students and corporate companies.
                        After successful completion of the Professional Course,
                        students receive <strong className="text-red-600"> 100% placement assistance</strong>
                        in Tamil Nadu and overseas opportunities.
                    </p>

                    <div className="flex flex-wrap gap-4 justify-center">

                        <a
                            href="tel:+919962456533"
                            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold"
                        >
                            Call: 99624 56533
                        </a>

                        <Link
                            to="/contact"
                            className="border border-gray-300 hover:border-red-600 hover:text-red-600 px-6 py-3 rounded-lg font-semibold"
                        >
                            Send Enquiry
                        </Link>

                    </div>

                </div>

            </div>

        </div>
    );
}