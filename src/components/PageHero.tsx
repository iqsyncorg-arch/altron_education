import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface PageHeroProps {
    title: string;
    subtitle?: string;
    breadcrumbs?: string[];
}

export default function PageHero({ title, subtitle, breadcrumbs = [] }: PageHeroProps) {
    return (
        <div className="relative pt-32 pb-16 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 hero-gradient grid-overlay" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-brand-800/50" />

            {/* Decorative orbs */}
            <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-brand-300/10 rounded-full blur-3xl" />

            <div className="relative max-w-7xl mx-auto px-4 text-center">
                {/* Breadcrumb */}
                {breadcrumbs.length > 0 && (
                    <div className="flex items-center justify-center gap-2 text-sm text-brand-200 mb-4">
                        <Link to="/" className="hover:text-white transition-colors">Home</Link>
                        {breadcrumbs.map((crumb, i) => (
                            <span key={i} className="flex items-center gap-2">
                                <ChevronRight className="w-3.5 h-3.5" />
                                <span className={i === breadcrumbs.length - 1 ? 'text-white font-medium' : 'hover:text-white transition-colors cursor-pointer'}>
                                    {crumb}
                                </span>
                            </span>
                        ))}
                    </div>
                )}

                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                    {title}
                </h1>
                {subtitle && (
                    <p className="text-brand-200 text-lg max-w-2xl mx-auto">{subtitle}</p>
                )}

                {/* Decorative line */}
                <div className="flex items-center justify-center gap-3 mt-6">
                    <div className="w-16 h-px bg-white/40" />
                    <div className="w-3 h-3 rounded-full bg-white" />
                    <div className="w-16 h-px bg-white/40" />
                </div>
            </div>
        </div>
    );
}
