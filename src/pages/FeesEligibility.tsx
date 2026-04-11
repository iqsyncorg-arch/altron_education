import PageHero from '../components/PageHero';
import { Link } from 'react-router-dom';
import { useApi } from '../hooks/useApi';

const COURSE_STYLING: Record<string, any> = {
    'cctv-diploma': { color: 'bg-red-600', borderColor: 'border-red-100', accentColor: 'text-red-600', icon: '📷' },
    'fire-alarm-training': { color: 'bg-red-600', borderColor: 'border-red-100', accentColor: 'text-red-600', icon: '🔥' },
    'access-biometric-training': { color: 'bg-red-600', borderColor: 'border-red-100', accentColor: 'text-red-600', icon: '🆔' },
    'engineering': { color: 'bg-red-600', borderColor: 'border-red-100', accentColor: 'text-red-600', icon: '🛡️' },
};

export default function FeesEligibility() {
    const { data: backendCourses, loading } = useApi<any[]>('/courses');

    if (loading) return <div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div></div>;

    const courses = ((backendCourses || []) as any).map((course: any) => {
        const style = COURSE_STYLING[course.slug] || COURSE_STYLING['cctv-diploma'];
        return {
            ...course,
            ...style,
            rows: [
                { label: 'Duration', value: course.duration },
                { label: 'Timing', value: course.timing },
                { label: 'Eligibility', value: course.eligibility },
                { label: 'Batch', value: course.batchSize },
                {
                    label: 'Course Fees',
                    value: (
                        <span>
                            <span className="line-through text-gray-400 mr-2">₹{course.fees?.original}</span>
                            <span className="font-extrabold">Offer Price ₹{course.fees?.offer}</span>
                        </span>
                    )
                },
                ...(course.slug === 'engineering' ? [{ label: 'Placement', value: '100% Job Placement' }] : []),
            ]
        };
    });
    return (
        <div className="bg-gradient-to-b from-white to-gray-50">

            <PageHero
                title="Duration, Eligibility & Fees"
                breadcrumbs={['Courses']}
                image="https://res.cloudinary.com/dq6gr5zjc/image/upload/v1774868275/Screenshot_2026-03-30_at_4.27.02_PM_tjt8be.png"
                breadcrumbClassName="text-red-600"
            />

            <div className="max-w-7xl mx-auto px-4 py-20">

                {/* INTRO */}
                <div className="mb-20 max-w-4xl mx-auto text-black leading-relaxed space-y-6 text-[15px]">


                </div>


                {/* CARDS */}
                <div className="grid md:grid-cols-2 gap-8 lg:gap-10 mb-20">

                    {courses.map((course: any, i: number) => (

                        <div
                            key={i}
                            className={`group bg-white/80 backdrop-blur rounded-2xl border ${course.borderColor} shadow-md hover:shadow-xl transition duration-300`}
                        >

                            {/* TOP COLOR BAR */}
                            <div className={`h-1.5 ${course.color} rounded-t-2xl`} />

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

                                            {course.rows.map((row: any, j: number) => (

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
                        across Tamil Nadu and nationwide opportunities.
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