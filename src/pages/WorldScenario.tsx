import PageHero from "../components/PageHero";

export default function WorldScenario() {
    return (
        <div>
            <PageHero
                title="World Scenario"
                subtitle="Understanding global safety & security challenges"
                breadcrumbs={["Academy", "World Scenario"]}
            />

            <div className="max-w-5xl mx-auto px-4 py-16 text-gray-700">

                {/* Intro */}
                <h2 className="text-3xl font-bold text-red-600 mb-4">
                    WORLD SCENARIO
                </h2>

                <p className="mb-6 leading-relaxed">
                    In today’s information technology era, Safety, Security and
                    Anti-Terrorism operations are the top concerns all over the world.
                    At this stage, we are here to adequately train in Safety & Security
                    Systems.
                </p>

                {/* Key Issues */}
                <h3 className="text-xl font-bold text-red-600 mb-3">KEY ISSUES</h3>

                <ul className="list-disc pl-6 space-y-2 mb-8">
                    <li>
                        Increase in threats to life & property due to recurring violence
                        and terrorist acts.
                    </li>
                    <li>Manned Security is very expensive & ineffective.</li>
                    <li>
                        As per Law, Installation of Safety & Security Systems for Public &
                        High Rise Infrastructure is mandatory.
                    </li>
                    <li>More manpower required for security Industry.</li>
                    <li>
                        Acute shortage of adequately trained Safety & Security Systems
                        Professionals.
                    </li>
                </ul>

                {/* Career Opportunities */}
                <h3 className="text-xl font-bold text-red-600 mb-3">
                    FUTURE & CAREER OPPORTUNITIES
                </h3>

                <ul className="list-disc pl-6 space-y-2 mb-8">
                    <li>
                        All Government & Non Government Institutions & Organizations are
                        appointing Safety & Security Technicians, Security Officers,
                        Safety Supervisors, Installation Engineers, Service Engineers,
                        Customer Support Engineers, Project Managers, etc.
                    </li>
                    <li>
                        All Multinational Companies & Public / Private Enterprises are on
                        a recruitment drive to take Safety & Security System
                        Professionals.
                    </li>
                    <li>
                        It is mandatory for all Public & High rise Buildings &
                        Infrastructures to have CCTV Surveillance Systems, Fire Safety
                        System, Access Control Systems, Public Address System and
                        Building Management Systems (BMS) as per law.
                    </li>
                    <li>
                        Entrepreneurs can take up this as business ventures in this fast &
                        widely growing industry, as Safety & Security Consultants and
                        Market Safety & Security Products.
                    </li>
                    <li>Excellent Job opportunities abroad in this field.</li>
                </ul>

                {/* Security Importance */}
                <h3 className="text-xl font-bold text-red-600 mb-3">
                    TERROR STRIKES EVERYWHERE
                </h3>

                <h3 className="text-xl font-bold text-red-600 mb-3">
                    WORLD IS CONSTANTLY BEEFING UP SECURITY
                </h3>

                <ul className="list-disc pl-6 space-y-2">
                    <li>
                        All over the world Safety, Security and monitoring Anti-Terrorism
                        operations are of extremely high priority.
                    </li>
                    <li>
                        Safety & Security Industry is booming and full of opportunities.
                    </li>
                    <li>
                        Equip yourself with latest and best knowledge to be part of the
                        greenfield business segment.
                    </li>
                    <li>
                        Join in the <strong>"ALTRON ACADEMY"</strong> and get Assured
                        Placement.
                    </li>
                </ul>
            </div>
        </div>
    );
}