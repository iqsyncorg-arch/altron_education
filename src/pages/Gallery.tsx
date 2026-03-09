import { useState } from 'react';
import PageHero from '../components/PageHero';

const categories = ['All', 'CCTV Training', 'Fire Alarm', 'Biometrics', 'Classroom', 'Events'];

const galleryImages = [
    { category: 'CCTV Training', title: 'CCTV Lab Session', emoji: '📷', color: 'from-blue-900 to-brand-800' },
    { category: 'Fire Alarm', title: 'Fire Alarm Panel', emoji: '🔥', color: 'from-orange-900 to-red-900' },
    { category: 'Biometrics', title: 'Biometric Setup', emoji: '🔐', color: 'from-purple-900 to-purple-800' },
    { category: 'Classroom', title: 'Theory Class', emoji: '📚', color: 'from-teal-900 to-teal-800' },
    { category: 'Events', title: 'Certification Day', emoji: '🏆', color: 'from-amber-900 to-yellow-900' },
    { category: 'CCTV Training', title: 'Camera Installation', emoji: '🎥', color: 'from-blue-800 to-indigo-900' },
    { category: 'Fire Alarm', title: 'Sensor Testing', emoji: '🔍', color: 'from-red-900 to-orange-900' },
    { category: 'Biometrics', title: 'Face Recognition Lab', emoji: '😊', color: 'from-violet-900 to-brand-900' },
    { category: 'Classroom', title: 'Practical Demo', emoji: '🖥️', color: 'from-cyan-900 to-teal-900' },
    { category: 'Events', title: 'Industry Visit', emoji: '🏭', color: 'from-green-900 to-emerald-900' },
    { category: 'CCTV Training', title: 'Network Setup', emoji: '🌐', color: 'from-blue-900 to-sky-900' },
    { category: 'Events', title: 'Graduation Ceremony', emoji: '🎓', color: 'from-amber-900 to-orange-900' },
];

export default function Gallery() {
    const [activeCategory, setActiveCategory] = useState('All');

    const filtered = activeCategory === 'All'
        ? galleryImages
        : galleryImages.filter((img) => img.category === activeCategory);

    return (
        <div>
            <PageHero
                title="Photo Gallery"
                subtitle="Snapshots from our training sessions, labs, events, and student achievements"
                breadcrumbs={['Gallery', 'Photos']}
            />
            <div className="max-w-7xl mx-auto px-4 py-20">
                {/* Filter Tabs */}
                <div className="flex flex-wrap gap-3 justify-center mb-12">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${activeCategory === cat
                                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                                    : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Gallery Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filtered.map((img, i) => (
                        <div
                            key={i}
                            className={`relative rounded-2xl overflow-hidden aspect-square bg-gradient-to-br ${img.color} border border-white/10 hover-lift cursor-pointer group`}
                        >
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                                <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">{img.emoji}</div>
                                <p className="text-white text-xs font-medium text-center">{img.title}</p>
                                <p className="text-gray-400 text-xs mt-1">{img.category}</p>
                            </div>
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                        </div>
                    ))}
                </div>

                {/* Photo Note */}
                <p className="text-center text-gray-500 text-sm mt-10">
                    📸 Showing highlights from Altron Academy's training activities. More photos available at our centers.
                </p>
            </div>
        </div>
    );
}
