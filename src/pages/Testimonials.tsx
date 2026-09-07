import { Star } from 'lucide-react';
import { useApi } from '../hooks/useApi';
import { getYoutubeEmbedUrl } from '../utils/youtube';

export default function Testimonials() {
    const { data: storiesData, loading: sLoading } = useApi<any>('/stories');
    
    const STATIC_TESTIMONIALS = [
        {
            name: "Janagiraman Boss",
            course: "Professional Course in Safety & Security Systems",
            text: "Altron Academy – My Life Changing Experience Altron Academy provides excellent teaching with a strong focus on practical training. The on-site training is handled by highly experienced senior professionals who guide us step by step. The entire team is very supportive—from training to office assistance—and they also help with placement opportunities. Because of Altron Academy, my life has truly changed in a positive way. Special Thanks to: Gajendran Mari Mahesh Thank you so much to everyone for your support and guidance. I’m truly grateful and send my love to the entire team!",
            rating: 5
        },
        {
            name: "Ajith Kumar",
            course: "Professional Course in Safety & Security Engineering",
            text: "This Altron Company and altrox Cctv is perfectly run in the institute. All teaching staff is very excellent.. I am go through in( professional course) Had completed... Techincal teaching staff : 1.Gajendran 2.Marri 3.mahesh 4.shamim very thanks to all Staff.....",
            rating: 5
        },
        {
            name: "Kaviarasan",
            course: "Professional Course in Safety & Security Systems",
            text: "I am Kaviarasan from Thanjavur, I have completed Access control and biometric, video door phone ,CCTV course, the course is worth for every penny, thanks to Gaja sir, and Mari , I recommend to everyone if you want to learn CCTV and security systems.",
            rating: 5
        }
    ];

    return (
        <div>

            <div className="max-w-7xl mx-auto px-4 py-20">
                {/* Text Testimonials */}
                <div className="mb-20">
                    <div className="text-center mb-12">
                        <p className="section-subtitle text-[#BA442E] font-bold tracking-[0.2em] uppercase text-sm mb-2">Verified Excellence.</p>
                        <h2 className="text-4xl font-black text-gray-900 tracking-tight mb-4">Student Reviews</h2>
                        <div className="flex flex-col items-center gap-3">
                            <div className="flex items-center gap-2 bg-white px-5 py-2.5 rounded-full shadow-sm border border-gray-100">
                                <span className="font-bold text-gray-900 text-lg">4.9/5.0 on</span>
                                <span className="font-black text-[#4285F4] text-xl">G<span className="text-[#EA4335]">o</span><span className="text-[#FBBC05]">o</span><span className="text-[#4285F4]">g</span><span className="text-[#34A853]">l</span><span className="text-[#EA4335]">e</span></span>
                            </div>
                            <a 
                                href="https://www.google.com/maps/place/ALTRON+CCTV,+SAFETY+%26+SECURITY+INSTITUTE/@13.0548357,80.229833,17z/data=!4m8!3m7!1s0x3a5266f51b52007d:0x946b29cd6757348c!8m2!3d13.0548357!4d80.229833!9m1!1b1!16s%2Fg%2F11bxgnpm50?authuser=0&hl=en"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-[#4285F4] hover:bg-[#3367D6] text-white font-bold py-2.5 px-6 rounded-full transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                            >
                                Leave a Review
                            </a>
                        </div>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-8">
                        {STATIC_TESTIMONIALS.map((t: any, i: number) => (
                            <div key={i} className="bg-white border border-gray-100 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col h-full">
                                <div className="flex text-yellow-500 mb-6 font-bold">
                                    {[...Array(t.rating || 5)].map((_, j) => (
                                        <Star key={j} className="w-5 h-5 fill-current" />
                                    ))}
                                </div>
                                <p className="text-gray-600 leading-relaxed mb-10 text-[15px] flex-grow italic">
                                    "{t.text}"
                                </p>
                                <div className="flex items-center gap-4 pt-6 border-t border-gray-50">
                                    <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center text-[#BA442E] font-black text-xl shrink-0">
                                        {t.name[0]}
                                    </div>
                                    <div>
                                        <div className="text-gray-900 font-bold text-base leading-tight">{t.name}</div>
                                        <div className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1 leading-relaxed">{t.course}</div>
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
                    {sLoading ? (
                        <div className="flex justify-center py-10"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-500"></div></div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {storiesData.map((vid: any, i: number) => (
                                <div key={vid.id || i} className="glass-card hover-lift group cursor-pointer border border-white/10 p-4 rounded-2xl bg-white/5">
                                    <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black mb-4">
                                        <iframe
                                            src={getYoutubeEmbedUrl(vid.youtubeUrl)}
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
