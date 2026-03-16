import PageHero from "../components/PageHero";

export default function FireAlarmTraining() {
    return (
        <div>

            {/* Header with Video */}
            <PageHero
                title="Fire Alarm Training"
                subtitle="Become a certified fire alarm installation technician"
                breadcrumbs={["Courses", "Fire Alarm Training"]}
                image="https://res.cloudinary.com/dq6gr5zjc/video/upload/v1773556726/Video_Generation_Request_Fulfilled_xmmohj.mp4"
            />

            <div className="max-w-6xl mx-auto px-4 py-20 text-black leading-relaxed">

                {/* FIRE ALARM */}
                <h2 className="text-2xl font-bold text-red-600 mb-4">
                    FIRE ALARM:
                </h2>

                <p className="mb-8">
                    Fire Alarm is usually used to detect signs for fire like smoke and heat and alert people by producing sound to signal them about the upcoming hazards. Every building needs to be installed with fire alarms to ensure safety and security. Nowadays, as people start to realise the importance of safety, Fire Alarms are becoming a priority material to be fixed in all kinds of residential spaces and commercial spaces.
                </p>

                {/* TRAINING */}
                <h3 className="text-xl font-bold text-red-600 mb-4">
                    FIRE ALARM INSTALLATION TRAINING:
                </h3>

                <p className="mb-6">
                    As it becomes important to install fire alarms to buildings, the scope for Fire Alarm technicians is also increasing. It results in the emergence of a lot of Fire Alarm Installation Training Institutions which are offering <b>Fire Alarm Installation Training in Chennai</b> at different durations and schedules.
                </p>

                <p className="mb-8">
                    Though there are many such institutions functioning and new ones are emerging every day, Altron Education is operating as the best and No.1 <b>Fire Alarm Installation Training Institute in Chennai</b> for various reasons.
                </p>

                {/* WHY ALTRON */}
                <h3 className="text-xl font-bold text-red-600 mb-4">
                    WHY ALTRON EDUCATION?
                </h3>

                <p className="mb-6">
                    Altron Education has been functioning as the best Fire Alarm Training in Chennai, for various reasons. Some of the significant ones are listed below.
                </p>

                <ol className="space-y-5 list-decimal pl-6">

                    <li>
                        <b>Experience:</b> As Altron Education has started in 2008, we are having a strong reputation and experience in providing Fire Alarm installation training to people in and around Chennai.
                    </li>

                    <li>
                        <b>Professionalism:</b> As we are having trained professionals to teach our students, we can assure our students can learn the techniques in detail, with no doubts and with full clarity.
                    </li>

                    <li>
                        <b>Courses and Fee structure:</b> As we are having various kinds of Fire Alarm Installation Training courses in different schedules and fee structures, students can join as per their needs and requirements. You can check Duration, Eligibility & Fees page for further clarification and more details.
                    </li>

                    <li>
                        <b>Our Guidance:</b> We are not only engaged in providing best Fire Alarm Installation Training, but also giving our students guidance about governmental and non-governmental job opportunities that the students can try for after completion of this course. This serves the students to get a proper vision on their future goals and assists them to avoid confusions on what to do next. You can check our Employment page for more details.
                    </li>

                </ol>

                <p className="mt-10">
                    Thus, you can choose the best Fire Alarm Installation training from us, based on your choice to upgrade yourself to gain the knowledge on fire alarm systems and installation.
                </p>

            </div>

        </div>
    );
}