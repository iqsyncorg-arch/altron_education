import PageHero from '../components/PageHero';
import { Monitor, BookOpen, Award, Users, Wifi, Lock } from 'lucide-react';

const features = [
    { icon: Monitor, title: 'Access Anywhere', desc: 'Study from home, office, or on the go. Our e-Campus is accessible on any device — desktop, tablet, or mobile.' },
    { icon: BookOpen, title: 'Comprehensive Curriculum', desc: 'All course materials, notes, and reference documents are available in digital format for offline and online access.' },
    { icon: Award, title: 'Recorded Lectures', desc: 'Miss a class? Watch recorded video lectures at your own pace. Every session is recorded and archived.' },
    { icon: Users, title: 'Live Doubt Sessions', desc: 'Participate in scheduled live doubt-clearing sessions with faculty through our integrated video conferencing.' },
    { icon: Monitor, title: 'Online Assessments', desc: 'Take chapter-wise tests and mock exams digitally. Instant results with detailed performance analytics.' },
    { icon: Wifi, title: 'Learning Analytics', desc: 'Track your progress, study hours, and performance metrics to understand and improve your learning journey.' },
];

export default function ECampus() {
    return (
        <div>
            <PageHero
                title="Altron e-Campus"
                subtitle="Your digital gateway to world-class security training — learn anytime, anywhere"
                breadcrumbs={['e-Campus']}
            />
            <div className="max-w-7xl mx-auto px-4 py-20">
                {/* Intro */}
                <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-white">Digital Learning Reinvented</h2>
                        <div className="space-y-4 text-gray-400 leading-relaxed">
                            <p>
                                Altron e-Campus is our state-of-the-art digital learning platform designed to complement and enhance your classroom training experience. Students who enroll in any Altron Academy course automatically get access to the e-Campus.
                            </p>
                            <p>
                                The platform hosts all course materials, recorded lectures, assessment tools, and direct access to faculty support. Whether you want to revisit a concept or prepare for your final exam, everything you need is just a click away.
                            </p>
                        </div>
                        <div className="glass rounded-2xl p-6 border border-brand-500/20">
                            <div className="flex items-center gap-3 mb-3">
                                <Lock className="w-5 h-5 text-brand-500" />
                                <h3 className="text-white font-semibold">Student Login</h3>
                            </div>
                            <p className="text-gray-400 text-sm mb-4">Enrolled students can access the e-Campus using their roll number and registered mobile number.</p>
                            <button className="btn-primary w-full">Login to e-Campus</button>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { emoji: '📚', title: '200+', desc: 'Learning Resources' },
                            { emoji: '🎥', title: '50+', desc: 'Video Lectures' },
                            { emoji: '📝', title: '30+', desc: 'Practice Tests' },
                            { emoji: '👨‍🏫', title: '24/7', desc: 'Study Access' },
                        ].map((stat, i) => (
                            <div key={i} className="glass-card text-center hover-lift">
                                <div className="text-3xl mb-2">{stat.emoji}</div>
                                <div className="text-2xl font-black text-white">{stat.title}</div>
                                <div className="text-gray-400 text-xs">{stat.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Features */}
                <div className="mb-16">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-white">Platform Features</h2>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, i) => (
                            <div key={i} className="glass-card hover-lift">
                                <div className="w-12 h-12 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center mb-4">
                                    <feature.icon className="w-6 h-6 text-brand-500" />
                                </div>
                                <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="glass rounded-2xl p-10 border border-brand-500/20 text-center">
                    <div className="text-5xl mb-4">🚀</div>
                    <h2 className="text-2xl font-bold text-white mb-3">Ready to Learn Digitally?</h2>
                    <p className="text-gray-400 max-w-lg mx-auto mb-6">
                        Enroll in any Altron Academy course today and gain automatic access to the full e-Campus platform.
                    </p>
                    <button className="btn-primary px-10 py-4 text-base">Enroll & Get Access</button>
                </div>
            </div>
        </div>
    );
}
