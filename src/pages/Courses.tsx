import PageHero from '../components/PageHero';
import { CheckCircle, Clock, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApi } from '../hooks/useApi';

export default function Courses() {
    const { data: courses, loading } = useApi<any>('/courses');
    const course = courses.find((c: any) => c.slug === 'diploma-course-in-cctv-surveillance-system');

    if (loading) return <div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500"></div></div>;
    if (!course) return <div className="text-white text-center py-20">Course not found.</div>;

    const curriculum = course.subjects || [];
    return (
        <div>
            <PageHero
                title={course.title}
                subtitle={course.description}
                breadcrumbs={['Courses', 'CCTV Installation']}
            />
            <div className="max-w-7xl mx-auto px-4 py-20">
                {/* Course Overview */}
                <div className="grid lg:grid-cols-3 gap-8 mb-20">
                    <div className="lg:col-span-2 space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-4">Course Overview</h2>
                            <div className="space-y-4 text-gray-400 leading-relaxed">
                                <p>
                                    The <strong className="text-white">{course.title}</strong> is designed to produce industry-ready technicians capable of installing, configuring, and maintaining cutting-edge CCTV systems.
                                </p>
                                <p>
                                    Duration: <strong className="text-white">{course.duration}</strong>.
                                    Timing: <strong className="text-white">{course.timing}</strong>.
                                </p>
                                <p>
                                    Eligibility: <strong className="text-white">{course.eligibility}</strong>.
                                    Batch Size: <strong className="text-white">{course.batchSize}</strong>.
                                </p>
                                <p>
                                    Upon completion, students receive a government-recognized certificate that is highly valued by employers across India.
                                </p>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-white mb-6">Foundation of CCTV — Curriculum</h3>
                            <div className="grid md:grid-cols-2 gap-3">
                                {curriculum.map((item: string, i: number) => (
                                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/3 border border-white/5 hover:bg-white/5 transition-colors">
                                        <div className="w-6 h-6 rounded-full bg-brand-500/20 flex items-center justify-center text-brand-500 text-xs font-bold flex-shrink-0">
                                            {i + 1}
                                        </div>
                                        <span className="text-gray-300 text-sm">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <div className="glass rounded-2xl p-6 border border-brand-500/20">
                            <h3 className="text-white font-bold text-lg mb-4">Course Details</h3>
                            <div className="space-y-4">
                                {[
                                    { label: 'Duration', value: course.duration, icon: Clock },
                                    { label: 'Eligibility', value: course.eligibility, icon: CheckCircle },
                                    { label: 'Batch Size', value: course.batchSize, icon: CheckCircle },
                                    { label: 'Fees', value: `₹${course.fees.offer} (Offer)\n₹${course.fees.original} (Original)`, icon: Award },
                                ].map((detail, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <detail.icon className="w-4 h-4 text-brand-500 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <div className="text-gray-500 text-xs">{detail.label}</div>
                                            <div className="text-white text-sm font-medium whitespace-pre-line">{detail.value}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Link to="/contact" className="btn-primary w-full text-center block mt-6">
                                Enquire Now
                            </Link>
                        </div>

                        <div className="glass rounded-2xl p-6 border border-brand-200">
                            <div className="text-3xl mb-3">🏆</div>
                            <h3 className="text-white font-semibold mb-2">Online Verified Certification</h3>
                            <p className="text-gray-400 text-sm">Official MSME affiliated certifications.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
