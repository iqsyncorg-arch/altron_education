import { useState, useEffect } from 'react';
import { MapPin, Phone, Clock, Mail, ExternalLink, Globe, UserCheck } from 'lucide-react';
import PageHero from '../components/PageHero';
import { API_BASE } from '../config/api';


export default function Centers() {
    const [centers, setCenters] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_BASE}/centers`)

            .then(res => res.json())
            .then(data => {
                setCenters(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching centers:', err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div></div>;
    return (
        <div className="bg-gray-50 min-h-screen text-gray-800">
            <PageHero
                title="Visit Altron Academy"
                image="https://res.cloudinary.com/dq6gr5zjc/image/upload/v1774865871/Screenshot_2026-03-30_at_3.46.08_PM_jewtgg.png"
                subtitleClassName="text-black"
                breadcrumbClassName="text-black"
            />

            <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">

                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-extrabold text-red-600 mb-4">
                        Visit Altron Academy
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                        Our centers are equipped with state-of-the-art labs for CCTV, Fire Alarm, and Integrated Security System training.
                    </p>
                    <div className="w-24 h-1.5 bg-red-600 mx-auto mt-6 rounded-full"></div>
                </div>

                {/* Centers Grid */}
                <div className="grid lg:grid-cols-2 gap-10 mb-24">
                    {centers.map((center, i) => (
                        <div
                            key={i}
                            className="group bg-white border border-gray-200 rounded-3xl transition-all duration-300 hover:shadow-2xl hover:border-red-200 overflow-hidden flex flex-col"
                        >
                            <div className="p-8 md:p-10">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="bg-red-50 p-3 rounded-2xl">
                                        <MapPin className="w-7 h-7 text-red-600" />
                                    </div>
                                    <span className="text-xs font-bold uppercase tracking-widest text-red-600 bg-red-50 px-4 py-1.5 rounded-full border border-red-100">
                                        {center.type}
                                    </span>
                                </div>

                                <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                                    {center.name}
                                </h3>

                                {center.contactPerson && (
                                    <div className="flex items-center gap-2 mb-6 text-sm font-semibold text-gray-700 bg-gray-50 p-3 rounded-xl border border-gray-100">
                                        <UserCheck className="w-4 h-4 text-red-600" />
                                        <span>{center.contactPerson}</span>
                                    </div>
                                )}

                                <div className="space-y-6 text-gray-600 mb-8">
                                    <div className="flex items-start gap-4">
                                        <Globe className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                                        <p className="text-sm leading-relaxed font-medium">{center.address}</p>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div className="flex items-start gap-4">
                                            <Phone className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                                            <div>
                                                <a href={`tel:${center.phone}`} className="block text-gray-900 font-bold hover:text-red-600 transition-colors">{center.phone}</a>
                                                {center.mobile && <a href={`tel:${center.mobile}`} className="text-xs font-medium text-gray-500 underline decoration-red-200 uppercase tracking-tighter">M: {center.mobile}</a>}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <Clock className="w-5 h-5 text-red-600 flex-shrink-0" />
                                            <span className="text-sm font-medium">{center.timing}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <Mail className="w-5 h-5 text-red-600 flex-shrink-0" />
                                        <a href={`mailto:${center.email}`} className="text-sm font-medium hover:text-red-600 transition-colors">{center.email}</a>
                                    </div>
                                </div>

                                <div className="mt-auto pt-4 flex flex-col sm:flex-row gap-4">
                                    <a
                                        href={center.mapLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-red-200 active:scale-95"
                                    >
                                        Get Directions <ExternalLink className="w-4 h-4" />
                                    </a>
                                    <a
                                        href={`tel:${center.mobile || center.phone}`}
                                        className="flex-1 inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-900 font-bold py-4 rounded-xl border-2 border-gray-100 transition-all active:scale-95"
                                    >
                                        Call Office
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Franchise / Partnership Section */}
                <div className="bg-white border-2 border-red-100 rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden shadow-xl shadow-red-50">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-red-50 rounded-full -mr-32 -mt-32 opacity-50" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-red-50 rounded-full -ml-16 -mb-16 opacity-50" />

                    <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600 rounded-2xl text-white text-3xl mb-6 shadow-xl shadow-red-200">
                                🤝
                            </div>
                            <h3 className="text-3xl font-extrabold text-gray-900 mb-4">Partner with Altron</h3>
                            <p className="text-gray-600 text-lg leading-relaxed mb-0">
                                Grow your business by becoming an authorized training partner. We offer complete technical support, curriculum, and global certification pathways.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-end">
                            <a href="/become-franchise" className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all text-center">
                                Apply for Franchise
                            </a>
                            <a href="https://wa.me/919841014328" className="px-8 py-4 bg-gray-900 hover:bg-black text-white font-bold rounded-xl transition-all text-center">
                                WhatsApp Inquiry
                            </a>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}