import { useState } from 'react';
import PageHero from '../components/PageHero';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
    {
        q: 'What is the duration of the CCTV course?',
        a: 'The CCTV Surveillance System course offers two options: a 10-day regular batch and a 1-month fast-track intensive program. Classes are held on weekdays, with weekend batches also available.',
    },
    {
        q: 'Is the certificate internationally valid?',
        a: 'Yes! All Altron Academy certificates are accredited by BSA-JAS-ANZ, an internationally recognized certification body from New Zealand and Australia. Our certificates are accepted by employers in 40+ countries.',
    },
    {
        q: 'Do you provide job assistance after course completion?',
        a: 'Absolutely. We provide 100% placement assistance to all eligible students through our dedicated placement cell. We have tie-ups with 200+ security companies and actively facilitate job interviews.',
    },
    {
        q: 'What is the eligibility criteria to join?',
        a: 'For CCTV and Fire Alarm courses: SSLC/HSC/Diploma/Degree holders are eligible with no age limit. For the Safety & Security Engineering program: Engineering graduates or working professionals in the field.',
    },
    {
        q: 'Are there online classes available?',
        a: 'Yes, through Altron e-Campus, students can access recorded lectures, study materials, and online assessments. However, hands-on lab training must be completed at our physical centers.',
    },
    {
        q: 'How can I verify an Altron Academy certificate?',
        a: 'You can verify any certificate using our online verification tool. Simply visit the Authenticity page, enter the roll number printed on the certificate, and the system will immediately confirm its validity.',
    },
    {
        q: 'How many training centers does Altron Academy have?',
        a: 'We currently have multiple centers in Chennai including Arumbakkam and Kundrathur. We also have an expanding franchise network across South India. Visit our Centers page for complete location details.',
    },
    {
        q: 'What is the fee structure for the courses?',
        a: 'Course fees vary based on the program selected. We offer competitive pricing with various payment options including cash, bank transfer, and UPI. Contact us directly or visit a center for the latest fee structure.',
    },
    {
        q: 'Do you offer weekend batches?',
        a: 'Yes, we offer weekend and evening batches specifically designed for working professionals who cannot attend regular weekday classes. Please contact us to check availability of current batches.',
    },
    {
        q: 'What is the Altron e-Campus?',
        a: 'Altron e-Campus is our digital learning portal where enrolled students can access study materials, recorded lectures, practice tests, and live doubt-clearing sessions with faculty. It is available 24/7 on any device.',
    },
    {
        q: 'Do you offer franchise opportunities?',
        a: 'Yes! We offer franchise partnerships for individuals and organizations interested in opening an Altron Academy training center. Visit our Become a Franchise Partner page for complete information and the application form.',
    },
    {
        q: 'What makes Altron Academy different from other institutes?',
        a: 'Altron Academy stands apart through our international accreditation (BSA-JAS-ANZ), 15+ years of industry experience, state-of-the-art labs, government recognition (MSME & NIESBUD), and unmatched 100% placement support.',
    },
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <div>
            <PageHero
                title="Frequently Asked Questions"
                subtitle="Everything you need to know about Altron Academy's courses, certifications, and admission process"
                breadcrumbs={['FAQ']}
            />
            <div className="max-w-4xl mx-auto px-4 py-20">
                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <div
                            key={i}
                            className={`glass rounded-2xl border transition-all duration-300 overflow-hidden ${openIndex === i ? 'border-brand-500/40 bg-brand-500/5' : 'border-white/10 hover:border-white/20'
                                }`}
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="w-full flex items-center justify-between p-6 text-left"
                            >
                                <span className={`font-semibold text-sm pr-4 transition-colors ${openIndex === i ? 'text-brand-400' : 'text-white'}`}>
                                    {faq.q}
                                </span>
                                {openIndex === i ? (
                                    <ChevronUp className="w-5 h-5 text-brand-500 flex-shrink-0" />
                                ) : (
                                    <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                                )}
                            </button>
                            {openIndex === i && (
                                <div className="px-6 pb-6">
                                    <div className="h-px bg-brand-500/20 mb-4" />
                                    <p className="text-gray-400 leading-relaxed text-sm">{faq.a}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Still have questions? */}
                <div className="mt-16 glass rounded-2xl p-8 border border-white/10 text-center">
                    <div className="text-4xl mb-4">💬</div>
                    <h3 className="text-white font-bold text-xl mb-3">Still Have Questions?</h3>
                    <p className="text-gray-400 mb-6">Our team is ready to help you with any queries.</p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <a href="tel:+919962456533" className="btn-primary">Call: 99624 56533</a>
                        <a href="https://wa.me/919962456533" className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl transition-all">WhatsApp Us</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
