import PageHero from '../components/PageHero';

export default function Employment() {
    return (
        <div>
            <PageHero
                title="Employment & Placement"
                subtitle="Your career success is our ultimate goal — 100% placement support for all eligible students"
                breadcrumbs={['Employment']}
            />

            <div className="max-w-6xl mx-auto px-4 py-20">

                {/* Employment Section */}
                <div className="grid md:grid-cols-2 gap-10 items-start mb-16">

                    {/* Image */}
                    <div>
                        <img
                            src="https://res.cloudinary.com/dq6gr5zjc/image/upload/v1773552911/Screenshot_2026-03-15_at_11.04.45_AM_ap4xtx.png"
                            alt="Employment"
                            className="rounded-xl w-full"
                        />
                    </div>

                    {/* Text */}
                    <div>
                        <h2 className="text-3xl font-bold text-black mb-6">Employment</h2>
                        <h4 className="text-brand-400 mb-6">Future & Career Opportunities</h4>

                        <ul className="space-y-4 text-black">
                            <li>
                                All Government & Non Government Institutions & Organizations are appointing
                                Safety & Security Technicians, Security Officers, Safety Supervisors,
                                Installation Engineers, Service Engineers, Customer Support Engineers,
                                Project Managers, etc.
                            </li>

                            <li>
                                All Multinational Companies & Public / Private Enterprises are on
                                recruitment drive to take Safety & Security System Professionals.
                            </li>

                            <li>
                                It is mandatory for all Public & High rise Buildings & Infrastructures
                                to have CCTV Surveillance Systems, Fire Safety System,
                                Access Control Systems, Public Address System and Building
                                Management Systems (BMS) as per law.
                            </li>

                            <li>
                                Entrepreneurs can take up this as business ventures in this fast
                                & widely growing industry as Safety & Security Consultants
                                and market Safety & Security Products.
                            </li>

                            <li>
                                Excellent job opportunities abroad in this field.
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Benefits */}
                <div className="mb-16">
                    <h3 className="text-2xl font-semibold text-black mb-6">Benefits :</h3>

                    <p className="text-black mb-6">
                        After successful completion of this course initially we will give you placement
                        as an Installation Engineer for one of reputed companies. From here you can
                        improve yourself by acquiring expertise and enrich your skill sets to go up
                        in the career ladder. All depends upon your hard work, passion to perform
                        and diehard dedication.
                    </p>

                    <ul className="space-y-3 text-black">
                        <li>• Installation Engineers</li>
                        <li>• Service Engineers</li>
                        <li>• Customer Support Engineers</li>
                        <li>• Project Engineers</li>
                        <li>• Project Managers</li>
                        <li>• Sales Managers</li>
                        <li>• Starting own entrepreneurial business ventures</li>
                    </ul>
                </div>

                {/* Consultancy */}
                <div>
                    <h3 className="text-2xl font-semibold text-black mb-6">Consultancy :</h3>

                    <div className="space-y-6 text-black">

                        <div>
                            <h4 className="text-brand-400 font-semibold mb-2">
                                Training & Placement – Dubai (Engineer Category)
                            </h4>
                            <p>
                                We are providing jobs for experienced candidates in Safety and
                                Security Field in abroad for persons who had completed BE – IT,
                                Electrical and Computer Science for the designation of
                                CCTV Engineer and Fire Alarm Engineer.
                            </p>
                        </div>

                        <div>
                            <h4 className="text-brand-400 font-semibold mb-2">
                                Technician Category
                            </h4>
                            <p>
                                We are providing jobs for experienced candidates in Safety and
                                Security Field in abroad for persons who had completed
                                ITI / Diploma (Electrical and Plumber) for the designation
                                of CCTV Technician and Fire Alarm Technician.
                            </p>
                        </div>

                        <div>
                            <h4 className="text-brand-400 font-semibold mb-2">
                                Department of Protective System by Dubai Police
                            </h4>
                            <p>
                                We are providing Training to get CCTV Engineer Card / Fire Alarm
                                Engineer Card / CCTV Technician Card in Department of Protective
                                System by Dubai Police for eligible candidates.
                            </p>
                        </div>

                        <div>
                            <h4 className="text-brand-400 font-semibold mb-2">
                                Freshers
                            </h4>
                            <p>
                                We are providing Training for Safety and Security Products in our
                                Institute. After Course Completion we are providing job placement
                                in abroad depends upon your eligibility.
                            </p>
                        </div>

                        <div>
                            <h4 className="text-brand-400 font-semibold mb-2">
                                Tamilnadu
                            </h4>
                            <p>
                                We are providing Professional Course in CCTV Surveillance
                                Engineering / Diploma Course in CCTV Surveillance Training
                                for persons who had completed 10th and 12th Std.
                                After completion of course they will be getting placements
                                in Tamilnadu and also Overseas.
                            </p>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}