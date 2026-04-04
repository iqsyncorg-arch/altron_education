import { Link } from 'react-router-dom';

interface PageHeroProps {
    title: string;
    subtitle?: string;
    breadcrumbs?: string[];
    image?: string;
    titleClassName?: string;
    subtitleClassName?: string;
    breadcrumbClassName?: string;
}

export default function PageHero({
    title,
    subtitle,
    breadcrumbs = [],
    image,
    titleClassName,
    subtitleClassName,
    breadcrumbClassName
}: PageHeroProps) {
    return (
        <div className="relative pt-20 pb-20 md:pt-32 md:pb-32 overflow-hidden">
            {/* Background */}
            {image ? (
                <>
                    {image.match(/\.(mp4|webm|ogg)$/) || image.includes('/video/upload/') ? (
                        <video
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
                        >
                            <source src={image} type="video/mp4" />
                        </video>
                    ) : (
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
                            style={{ backgroundImage: `url(${image})` }}
                        />
                    )}
                    <div className="absolute inset-0 bg-black/40" />
                </>
            ) : (
                <div className="absolute inset-0 hero-gradient" />
            )}

            <div className="absolute inset-0 grid-overlay opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-brand-950/50" />

            {/* Decorative orbs - reduced opacity when image is present */}
            <div className={`absolute top-1/2 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl ${image ? 'opacity-20' : ''}`} />
            <div className={`absolute top-1/2 right-1/4 w-48 h-48 bg-brand-300/10 rounded-full blur-3xl ${image ? 'opacity-20' : ''}`} />

            <div className="relative max-w-7xl mx-auto px-4 text-center">
                {/* Breadcrumb */}
                {breadcrumbs.length > 0 && (
                    <div className="flex items-center justify-center gap-3 text-sm mb-6">
                        <Link to="/" className="text-white hover:text-brand-200 transition-colors font-medium">Home</Link>
                        {breadcrumbs.map((crumb, i) => (
                            <span key={i} className="flex items-center gap-3">
                                <span className="text-white/40 font-bold">•</span>
                                <span className={i === breadcrumbs.length - 1 ? 'text-white font-bold' : `${breadcrumbClassName || 'text-brand-100'} hover:text-white transition-colors cursor-pointer`}>
                                    {crumb}
                                </span>
                            </span>
                        ))}
                    </div>
                )}

                <h1 className={`text-4xl md:text-6xl font-extrabold mb-6 tracking-tight ${titleClassName || 'text-white'}`}>
                    {title}
                </h1>
                {subtitle && (
                    <p className={`text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed ${subtitleClassName || 'text-brand-100/90'}`}>
                        {subtitle}
                    </p>
                )}

                {/* Decorative line */}
                <div className="flex items-center justify-center gap-3 mt-8">
                    <div className="w-16 h-px bg-white/30" />
                    <div className="w-2.5 h-2.5 rounded-full bg-brand-400 shadow-[0_0_10px_rgba(248,113,113,0.8)]" />
                    <div className="w-16 h-px bg-white/30" />
                </div>
            </div>
        </div>
    );
}
