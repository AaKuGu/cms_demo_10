// src/components/liveSite/about/AboutPage.jsx

import FoundersMessageSection from "./FoundersMessageSection";
import MilestonesSection from "./MilestonesSection";
import StorySection from "./StorySection";
import TeamSection from "./TeamSection";
import VisionMissionSection from "./VissionMissionSection";

const AboutPage = ({ shop, aboutUs }) => {
    // No AboutUs doc yet for this shop — render nothing rather than crash.
    if (!aboutUs) return null;

    // Fixed layout order — this niche always renders sections in this sequence.
    // Only visibility is data-driven, not order.
    const sections = [
        { key: "story", Component: StorySection, data: aboutUs.story },
        { key: "visionMission", Component: VisionMissionSection, data: aboutUs.visionMission },
        { key: "foundersMessage", Component: FoundersMessageSection, data: aboutUs.foundersMessage },
        { key: "milestones", Component: MilestonesSection, data: aboutUs.milestones },
        { key: "team", Component: TeamSection, data: aboutUs.team },
    ].filter(({ data }) => data && data.isVisible !== false);

    if (sections.length === 0) return null;

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
                <div className="mb-10 text-center sm:mb-14">
                    <h1 className="font-serif text-3xl tracking-tight text-[#241A15] sm:text-4xl">
                        About {shop.name.replace(/_/g, " ")}
                    </h1>
                </div>

                <div className="space-y-16 sm:space-y-20">
                    {sections.map(({ key, Component, data }) => (
                        <Component key={key} data={data} shop={shop} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AboutPage;