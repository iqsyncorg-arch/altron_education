import { Star } from 'lucide-react';
import { useApi } from '../hooks/useApi';

export default function Testimonials() {
    const { data: testimonialsData, loading: tLoading } = useApi<any>('/testimonials');
    const { data: storiesData, loading: sLoading } = useApi<any>('/stories');
    return (
        <div>

            <div className="max-w-7xl mx-auto px-4 py-20">
                {/* Text Testimonials */}
                <div className="mb-20">
                    <div className="text-center mb-12">
                        <p className="section-subtitle text-[#BA442E] font-bold tracking-[0.2em] uppercase text-sm mb-2">Student Reviews</p>
                        <h2 className="text-4xl font-black text-gray-900 tracking-tight">What Our Students Say</h2>
                    </div>
                    {tLoading ? (
                        <div className="flex justify-center py-10"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-500"></div></div>
                    ) : (
                        <div className="grid md:grid-cols-3 gap-8">
                            {testimonialsData?.map((t: any, i: number) => (
                                <div key={t.id || i} className="bg-white border border-gray-100 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col h-full">
                                    <div className="flex text-yellow-500 mb-6 font-bold">
                                        {[...Array(t.rating || 5)].map((_, j) => (
                                            <Star key={j} className="w-5 h-5 fill-current" />
                                        ))}
                                    </div>
                                    <p className="text-gray-600 leading-relaxed mb-10 text-lg flex-grow">
                                        "{t.reviewText || t.text || t.content || t.comment}"
                                    </p>
                                    <div className="flex items-center gap-4 pt-6 border-t border-gray-50">
                                        <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center text-[#BA442E] font-black text-xl">
                                            {(t.studentName || t.name || t.author || 'A')[0]}
                                        </div>
                                        <div>
                                            <div className="text-gray-900 font-bold text-base leading-tight">{t.studentName || t.name || t.author}</div>
                                            <div className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">{t.courseName || t.course || t.date || 'Verified Student'}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Video Testimonials */}
                <div>
                    <div className="text-center mb-12">
                        <p className="section-subtitle">Video Stories</p>
                        <h2 className="text-3xl font-bold text-white">Watch Our Success Stories</h2>
                    </div>
                    {sLoading ? (
                        <div className="flex justify-center py-10"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-500"></div></div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {storiesData.map((vid: any, i: number) => (
                                <div key={vid.id || i} className="glass-card hover-lift group cursor-pointer border border-white/10 p-4 rounded-2xl bg-white/5">
                                    <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black mb-4">
                                        <iframe
                                            src={vid.youtubeUrl.replace('watch?v=', 'embed/')}
                                            className="absolute inset-0 w-full h-full border-0"
                                            title={vid.title}
                                        />
                                    </div>
                                    <h3 className="text-white font-semibold mb-1">{vid.title}</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">{vid.description}</p>
                                </div>
                            ))}
                        </div>
                    )}
                    <p className="text-center text-gray-500 text-sm mt-8">
                        📹 Video testimonials available on our YouTube channel. Visit the centers to watch more success stories.
                    </p>
                </div>
            </div>
        </div>
    );
}
