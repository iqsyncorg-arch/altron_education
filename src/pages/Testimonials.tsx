import PageHero from '../components/PageHero';
import { Star, Play } from 'lucide-react';

const videoTestimonials = [
    { name: 'Rajesh Kumar', role: 'CCTV Technician at TechGuard', videoId: 'dQw4w9WgXcQ', desc: 'Altron Academy changed my life completely. I was unemployed for 2 years before joining this course.' },
    { name: 'Priya Suresh', role: 'Fire Safety Engineer at BuildSafe', videoId: 'dQw4w9WgXcQ', desc: 'The hands-on training and international certification gave me a huge advantage in the job market.' },
    { name: 'Venkatesh M.', role: 'Security Engineer at SecureNet', videoId: 'dQw4w9WgXcQ', desc: 'Got placed in a top security company within 3 weeks of completing my course. Forever grateful!' },
    { name: 'Anitha R.', role: 'Access Control Specialist at CityBank', videoId: 'dQw4w9WgXcQ', desc: 'Best decision of my life. The biometrics course opened many doors for me in the banking sector.' },
    { name: 'Mohammed Imran', role: 'IT Security Engineer at TechCorp', videoId: 'dQw4w9WgXcQ', desc: 'Amazing faculty and modern equipment. I learned more in 1 month than I did in years of self-study.' },
    { name: 'Kavitha S.', role: 'Security Consultant', videoId: 'dQw4w9WgXcQ', desc: 'Altron\'s comprehensive curriculum and industry connections helped me land my dream job.' },
];

const textTestimonials = [
    { name: 'Suresh Babu', course: 'CCTV Installation', stars: 5, text: 'Excellent training with hands-on experience. Got placed within 2 weeks of completing the course! The faculty was very supportive throughout.' },
    { name: 'Lakshmi N.', course: 'Fire Alarm Training', stars: 5, text: 'The course was very practical and job-oriented. I learned everything from theory to actual installation. Highly recommended!' },
    { name: 'Karthik P.', course: 'Access & Biometrics', stars: 5, text: 'International certification is a huge advantage. I am now working in Dubai with a top security firm, all thanks to Altron Academy.' },
];

export default function Testimonials() {
    return (
        <div>
            <PageHero
                title="Student Testimonials"
                subtitle="Hear from our graduates who have built successful careers after training at Altron Academy"
                breadcrumbs={['Gallery', 'Testimonials']}
            />
            <div className="max-w-7xl mx-auto px-4 py-20">
                {/* Text Testimonials */}
                <div className="mb-20">
                    <div className="text-center mb-12">
                        <p className="section-subtitle">Student Reviews</p>
                        <h2 className="text-3xl font-bold text-white">What Our Students Say</h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {textTestimonials.map((t, i) => (
                            <div key={i} className="glass-card hover-lift border border-blue-500/10">
                                <div className="flex text-brand-500 mb-4">
                                    {Array.from({ length: t.stars }).map((_, j) => (
                                        <Star key={j} className="w-4 h-4 fill-current" />
                                    ))}
                                </div>
                                <p className="text-gray-300 leading-relaxed mb-6 text-sm italic">"{t.text}"</p>
                                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-600 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                                        {t.name[0]}
                                    </div>
                                    <div>
                                        <div className="text-white font-semibold text-sm">{t.name}</div>
                                        <div className="text-brand-500 text-xs">{t.course}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Video Testimonials */}
                <div>
                    <div className="text-center mb-12">
                        <p className="section-subtitle">Video Stories</p>
                        <h2 className="text-3xl font-bold text-white">Watch Our Success Stories</h2>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {videoTestimonials.map((vid, i) => (
                            <div key={i} className="glass-card hover-lift group cursor-pointer border border-white/10">
                                {/* Video Thumbnail Placeholder */}
                                <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-brand-700 to-brand-800 mb-4 flex items-center justify-center">
                                    <div className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl">
                                        <Play className="w-6 h-6 text-white fill-current ml-1" />
                                    </div>
                                    <div className="absolute bottom-2 left-2 text-xs text-gray-400 font-medium bg-black/50 px-2 py-1 rounded">Student Video</div>
                                </div>
                                <h3 className="text-white font-semibold mb-1">{vid.name}</h3>
                                <p className="text-brand-500 text-xs mb-3">{vid.role}</p>
                                <p className="text-gray-400 text-sm leading-relaxed">"{vid.desc}"</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-center text-gray-500 text-sm mt-8">
                        📹 Video testimonials available on our YouTube channel. Visit the centers to watch more success stories.
                    </p>
                </div>
            </div>
        </div>
    );
}
