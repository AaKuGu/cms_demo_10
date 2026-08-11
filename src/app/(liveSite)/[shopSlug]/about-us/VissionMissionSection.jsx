// src/components/liveSite/about/sections/VisionMissionSection.jsx
const VisionMissionSection = ({ data }) => {
    if (!data.vision && !data.mission) return null;

    return (
        <section className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {data.vision && (
                <div className="rounded-2xl border border-[#B8873B]/20 bg-[#FBF7F0] p-6 sm:p-8">
                    <h3 className="font-serif text-lg text-[#241A15] sm:text-xl">Our Vision</h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#5C4A3A] sm:text-base">
                        {data.vision}
                    </p>
                </div>
            )}
            {data.mission && (
                <div className="rounded-2xl border border-[#B8873B]/20 bg-[#FBF7F0] p-6 sm:p-8">
                    <h3 className="font-serif text-lg text-[#241A15] sm:text-xl">Our Mission</h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#5C4A3A] sm:text-base">
                        {data.mission}
                    </p>
                </div>
            )}
        </section>
    );
};

export default VisionMissionSection;