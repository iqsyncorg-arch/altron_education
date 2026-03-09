import PageHero from '../components/PageHero';
import { MapPin, Phone, Clock, Mail } from 'lucide-react';

const centers = [
    {
        name: 'Chennai — Arumbakkam (Head Office)',
        address: '79A/44A, S1, Panchali Amman Koil Street, Arumbakkam, Chennai – 600 106',
        phone: '+91 99624 56533',
        email: 'info@altroneducation.com',
        timing: 'Mon – Sat: 9:00 AM – 7:00 PM',
        type: 'Head Office',
        color: 'border-brand-500/30',
        glow: 'from-brand-900/20',
        mapLink: 'https://maps.google.com/?q=Arumbakkam+Chennai',
    },
    {
        name: 'Chennai — Kundrathur',
        address: 'Kundrathur, Chennai, Tamil Nadu – 600069',
        phone: '+91 99624 56533',
        email: 'kundrathur@altroneducation.com',
        timing: 'Mon – Sat: 9:00 AM – 6:00 PM',
        type: 'Training Center',
        color: 'border-brand-500/30',
        glow: 'from-brand-900/20',
        mapLink: 'https://maps.google.com/?q=Kundrathur+Chennai',
    },
];

export default function Centers() {
    return (
        <div>
            <PageHero
                title="Our Centers"
                subtitle="Visit us at any of our training centers across Chennai for enrollment and inquiries"
                breadcrumbs={['Centers']}
            />
            <div className="max-w-7xl mx-auto px-4 py-20">
                {/* Center Cards */}
                <div className="grid md:grid-cols-2 gap-8 mb-20">
                    {centers.map((center, i) => (
                        <div key={i} className={`glass rounded-2xl overflow-hidden border ${center.color}`}>
                            <div className={`h-1 bg-gradient-to-r from-brand-500 to-brand-500`} />
                            <div className="p-8">
                                <div className="flex items-start justify-between mb-5">
                                    <h2 className="text-white font-bold text-xl leading-tight">{center.name}</h2>
                                    <span className="ml-3 bg-brand-500/10 text-brand-400 text-xs px-3 py-1 rounded-full border border-brand-500/20 flex-shrink-0">
                                        {center.type}
                                    </span>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <MapPin className="w-4 h-4 text-brand-500 mt-0.5 flex-shrink-0" />
                                        <span className="text-gray-300 text-sm leading-relaxed">{center.address}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Phone className="w-4 h-4 text-brand-500 flex-shrink-0" />
                                        <a href={`tel:${center.phone}`} className="text-gray-300 hover:text-brand-500 text-sm transition-colors">{center.phone}</a>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Mail className="w-4 h-4 text-brand-500 flex-shrink-0" />
                                        <a href={`mailto:${center.email}`} className="text-gray-300 hover:text-brand-500 text-sm transition-colors">{center.email}</a>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Clock className="w-4 h-4 text-brand-500 flex-shrink-0" />
                                        <span className="text-gray-300 text-sm">{center.timing}</span>
                                    </div>
                                </div>
                                <div className="mt-6 flex gap-3">
                                    <a href={center.mapLink} target="_blank" rel="noopener noreferrer" className="btn-primary flex-1 text-center text-sm py-2.5">
                                        📍 Get Directions
                                    </a>
                                    <a href={`tel:${center.phone}`} className="btn-secondary flex-1 text-center text-sm py-2.5">
                                        📞 Call Center
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Map Embed Placeholder */}
                <div className="mb-16">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-white">Find Us on the Map</h2>
                    </div>
                    <div className="glass rounded-2xl overflow-hidden border border-white/10 h-80 flex items-center justify-center bg-brand-800">
                        <div className="text-center">
                            <div className="text-5xl mb-4">📍</div>
                            <p className="text-gray-400 mb-4">Interactive map coming soon</p>
                            <a
                                href="https://maps.google.com/?q=Arumbakkam+Chennai"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary text-sm"
                            >
                                Open in Google Maps
                            </a>
                        </div>
                    </div>
                </div>

                {/* Franchise */}
                <div className="glass rounded-2xl p-8 border border-brand-200 text-center">
                    <div className="text-4xl mb-4">🤝</div>
                    <h3 className="text-white font-bold text-2xl mb-3">Become a Franchise Partner</h3>
                    <p className="text-gray-400 max-w-xl mx-auto mb-6">
                        Interested in opening an Altron Academy center in your city? Join our growing franchise network and bring world-class security training to your region.
                    </p>
                    <a href="/become-franchise" className="btn-amber inline-block">Apply for Franchise</a>
                </div>
            </div>
        </div>
    );
}
