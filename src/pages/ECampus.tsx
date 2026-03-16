

export default function ECampus() {
    return (
        <div className="bg-white min-h-screen">

            {/* HEADER */}
            <section
                className="relative h-[300px] flex items-center justify-center bg-fixed bg-center bg-cover"
                style={{
                    backgroundImage:
                        "url('https://res.cloudinary.com/dq6gr5zjc/image/upload/v1773117512/ChatGPT_Image_Mar_10_2026_10_07_06_AM_tw4ey5.png')",
                }}
            >
                <div className="absolute inset-0 bg-black/70"></div>

                <div className="relative z-10 text-center px-4">
                    <h1 className="text-5xl font-bold text-white mb-4">
                        ALTRON e CAMPUS
                    </h1>
                </div>
            </section>


            {/* CONTENT */}
            <div className="max-w-7xl mx-auto px-6 py-20 space-y-16 text-slate-700 leading-relaxed">

                {/* Intro */}
                <div className="space-y-4">
                    <p className="font-semibold">
                        ALTRON SECURITY ENGINEERING PVT. LTD. (Electronic Safety & Security Integration Solutions)
                    </p>
                    <p className="font-semibold">
                        ALTROX WORLD CORP. (CCTV Surveillance System Manufacturer)
                    </p>
                    <p className="font-semibold">
                        ALTRON SAFETY & SECURITY ACADEMY (CCTV, Safety & Security On-Job Training Institute)
                    </p>
                    <p className="font-semibold">
                        ALTRON INTERIOR DESIGNER (Feel the Difference & Technology)
                    </p>
                </div>


                {/* Section 1 */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-red-600">
                        1. ALTRON SECURITY ENGINEERING PVT. LTD. – ESTD 2000
                    </h2>

                    <p>
                        We are the leading & efficient solution providers of Safety & Security Systems in India & Overseas,
                        having strong clientele & testimonials. It is our commitment for quality, innovation & service that
                        brings our customers back again & again for all the Security & Surveillance needs.
                    </p>

                    <div className="space-y-2">
                        <p className="font-semibold">ALTRON (An ISO Certified Company)</p>
                        <p>ALTRON has been approved by HR & CE Government of Tamil Nadu</p>
                        <p>ALTRON has been approved by (SSI) Small Scale Industry Govt. of Tamil Nadu</p>
                        <p>ALTRON has been approved by IDOL Wing CID Government of Tamil Nadu</p>
                        <p>ALTRON has been approved by (MSME) Ministry of Micro, Small & Medium Enterprises</p>
                    </div>

                    <p>
                        Our core area is “TOTAL INTELLIGENT SECURITY BUILDING MANAGEMENT SYSTEM”.
                        We have a team of technocrats capable of completing work according to customer
                        requirements adhering to international standards with on-time completion.
                    </p>
                </div>


                {/* Section 2 */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-red-600">
                        2. ALTROX WORLD CORP.
                    </h2>

                    <p>
                        ALTROX is a global company manufacturing quality products for modern
                        security needs. Founded in 2007 in Chennai, South India, it focuses on
                        advanced Security & Surveillance Solutions with simplicity, efficiency,
                        and cost effectiveness.
                    </p>

                    <p>
                        ALTROX understands the challenges faced by security professionals
                        and customers, providing efficient solutions using advanced
                        technologies and innovation.
                    </p>

                    <p>
                        With a large product portfolio, ALTROX enables surveillance solution
                        architects across India and Qatar to design robust systems without
                        compromise on security.
                    </p>

                    <p>
                        ALTROX promises making your dream of <strong>24×7 with 360° Surveillance</strong>
                        come true with world-class service and technical support.
                    </p>

                    <div className="space-y-2">
                        <p className="font-semibold">International Certifications</p>
                        <p>CE (Conformité Européene)</p>
                        <p>FCC (Federal Communications Commission)</p>
                        <p>RoHS (Restriction of Hazardous Substances)</p>
                        <p>STQC (Standardization, Testing and Quality Certification)</p>
                        <p>ISO 9001:2015 (International Organization for Standardization)</p>
                    </div>

                    <p>
                        ALTROX offers a broad range of products across India, Qatar, and Dubai
                        serving major industry sectors.
                    </p>
                </div>


                {/* Section 3 */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-red-600">
                        3. ALTRON SAFETY & SECURITY ACADEMY
                    </h2>

                    <p>
                        Altron Institute of Safety & Security Technology has been producing
                        professionals in Safety & Security Systems since 2008.
                    </p>

                    <div className="space-y-2">
                        <p className="font-semibold">Objectives</p>
                        <p>• Creating awareness about Safety & Security Systems</p>
                        <p>• Conducting seminars and demonstrations on new technologies</p>
                        <p>• Organizing training courses in security technologies</p>
                        <p>• International affiliations and accreditations</p>
                        <p>• Encouraging R&D in Safety & Security Technology</p>
                    </div>

                    <div className="space-y-2">
                        <p className="font-semibold">Accreditations</p>
                        <p>NIESBUD – Ministry of Skill Development and Entrepreneurship</p>
                        <p>MSME – Government of India</p>
                        <p>ISO 9001:2008 Certified Institute (BSA – JAS-ANZ)</p>
                    </div>

                    <p>
                        We provide Professional Courses and Diploma Courses in CCTV
                        Surveillance Engineering for students who completed 10th and
                        12th standard. After completing the course students receive
                        placement opportunities in Tamil Nadu and overseas.
                    </p>

                    <p>
                        Our training bridges the gap between students and corporate
                        companies, helping students gain employment with higher salary
                        opportunities.
                    </p>
                </div>


                {/* Section 4 */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-red-600">
                        4. ALTRON INTERIOR DESIGNERS
                    </h2>

                    <p>
                        Altron Interior Designers is a reputed interior design
                        organization focused on technology-oriented solutions.
                    </p>

                    <p>
                        We provide home and commercial interiors along with
                        home redesign services handled by experienced professionals.
                    </p>

                    <p>
                        Our growing customer base stands testimony to our quality
                        standards. Each project is handled by small interdisciplinary teams.
                    </p>

                    <p className="font-semibold">
                        End-to-End Interior Design Solution with Technology
                    </p>
                </div>

            </div>

        </div>
    );
}