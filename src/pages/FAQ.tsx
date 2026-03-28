import { useState } from "react";
import PageHero from "../components/PageHero";
import { ChevronDown } from "lucide-react";

const faqs = [
    {
        q: "What is the duration of the CCTV course?",
        a: "The CCTV Surveillance System course offers two options: a 10-day regular batch and a 1-month fast-track intensive program. Classes are held on weekdays, with weekend batches also available.",
    },
    {
        q: "Is the certificate government recognized?",
        a: "Yes! Altron Academy certificates are recognized by the Government of India through MSME and NIESBUD. Our certifications are highly valued by security companies and government contractors.",
    },
    {
        q: "Do you provide job assistance after course completion?",
        a: "Absolutely. We provide 100% placement assistance to all eligible students through our dedicated placement cell. We have tie-ups with 200+ security companies and actively facilitate job interviews.",
    },
    {
        q: "What is the eligibility criteria to join?",
        a: "For CCTV and Fire Alarm courses: SSLC/HSC/Diploma/Degree holders are eligible with no age limit. For the Safety & Security Engineering program: Engineering graduates or working professionals in the field.",
    },
    {
        q: "Are there online classes available?",
        a: "Yes, through Altron e-Campus, students can access recorded lectures, study materials, and online assessments. However, hands-on lab training must be completed at our physical centers.",
    },
    {
        q: "How can I verify an Altron Academy certificate?",
        a: "You can verify any certificate using our online verification tool. Simply visit the Authenticity page, enter the roll number printed on the certificate, and the system will immediately confirm its validity.",
    },
    {
        q: "How many training centers does Altron Academy have?",
        a: "We currently have multiple centers in Chennai including Arumbakkam and Kundrathur. We also have an expanding franchise network across South India. Visit our Centers page for complete location details.",
    },
    {
        q: "What is the fee structure for the courses?",
        a: "Course fees vary based on the program selected. We offer competitive pricing with various payment options including cash, bank transfer, and UPI. Contact us directly or visit a center for the latest fee structure.",
    },
    {
        q: "Do you offer weekend batches?",
        a: "Yes, we offer weekend and evening batches specifically designed for working professionals who cannot attend regular weekday classes.",
    },
    {
        q: "What is the Altron e-Campus?",
        a: "Altron e-Campus is our digital learning portal where enrolled students can access study materials, recorded lectures, practice tests, and live doubt-clearing sessions.",
    },
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="min-h-screen bg-white">
            <PageHero
                title="Frequently Asked Questions"
                subtitle="Everything you need to know about Altron Academy courses"
                breadcrumbs={["FAQ"]}
            />

            <div className="max-w-4xl mx-auto px-4 py-20">
                <div className="space-y-4">
                    {faqs.map((faq, i) => {
                        const isOpen = openIndex === i;

                        return (
                            <div
                                key={i}
                                className={`rounded-xl border transition-all duration-300 ease-in-out overflow-hidden ${isOpen
                                    ? "border-red-300 bg-red-50 shadow-sm"
                                    : "border-gray-200 bg-white hover:border-gray-300"
                                    }`}
                            >
                                <button
                                    onClick={() => toggleAccordion(i)}
                                    className="w-full flex items-center justify-between p-6 text-left focus:outline-none group"
                                    aria-expanded={isOpen}
                                >
                                    <span
                                        className={`font-semibold text-sm pr-4 transition-colors duration-300 ${isOpen ? "text-red-600" : "text-gray-900"
                                            }`}
                                    >
                                        {faq.q}
                                    </span>

                                    <ChevronDown
                                        className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ease-in-out ${isOpen ? "text-red-500 rotate-180" : "text-gray-400 group-hover:text-gray-600"
                                            }`}
                                    />
                                </button>

                                {/* Animated Content Wrapper */}
                                <div
                                    className={`grid transition-all duration-300 ease-in-out ${isOpen
                                        ? "grid-rows-[1fr] opacity-100"
                                        : "grid-rows-[0fr] opacity-0"
                                        }`}
                                >
                                    <div className="overflow-hidden">
                                        <div className="px-6 pb-6">
                                            <div className="h-px bg-red-100 mb-4 transition-opacity duration-300" />
                                            <p className="text-gray-700 leading-relaxed text-sm">
                                                {faq.a}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* CONTACT BOX */}
                <div className="mt-16 bg-gray-50 rounded-2xl p-8 border border-gray-200 text-center shadow-inner">
                    <div className="text-4xl mb-4">💬</div>
                    <h3 className="text-gray-900 font-bold text-xl mb-3">
                        Still Have Questions?
                    </h3>
                    <p className="text-gray-600 mb-8 max-w-md mx-auto">
                        Can't find what you're looking for? Our team is ready to help you with any technical or course-related queries.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="tel:+919962456533"
                            className="inline-flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3 rounded-xl transition-all hover:scale-105"
                        >
                            Call: 99624 56533
                        </a>

                        <a
                            href="https://wa.me/919962456533"
                            className="inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-3 rounded-xl transition-all hover:scale-105"
                        >
                            WhatsApp Us
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}