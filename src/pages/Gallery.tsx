import PageHero from '../components/PageHero';
import { useApi } from '../hooks/useApi';

export default function Gallery() {
    const { data: galleryData, loading } = useApi<any>('/gallery');

    return (
        <div>

            <div className="max-w-7xl mx-auto px-4 py-20">
                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500"></div>
                    </div>
                ) : (
                    <>
                        {/* Gallery Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {galleryData?.map((img: any, i: number) => (
                                <div
                                    key={img.id || i}
                                    className="relative rounded-2xl overflow-hidden aspect-square bg-white/5 border border-white/10 hover-lift cursor-pointer group"
                                >
                                    <img src={img.imageUrl} alt={img.caption} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-4">
                                        <h4 className="text-white text-sm font-bold mt-1">{img.caption}</h4>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {galleryData?.length === 0 && (
                            <div className="text-center py-24 bg-white/3 border border-dashed border-white/10 rounded-3xl">
                                <p className="text-gray-400 font-medium">No images found.</p>
                            </div>
                        )}
                    </>
                )}


            </div>
        </div>
    );
}
