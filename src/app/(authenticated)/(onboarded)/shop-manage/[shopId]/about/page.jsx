import PageHeader from "@/components/PageHeader";
import ActionDenied from "@/components/ActionDenied";
import AboutUsContainer from "./AboutUsContainer";
import { getAboutUsForThisShop } from "@/SSRCalls/AboutUs.srrCalls";

const page = async ({ params }) => {
    const { shopId } = await params;
    const { data: aboutUs, error } = await getAboutUsForThisShop({ shopId });

    if (error) {
        return <ActionDenied message={error} />;
    }

    return (
        <div className="p-6">
            <PageHeader
                title="About Us"
                description="Tell your brand story, showcase your vision, team, and milestones."
            />

            <AboutUsContainer shopId={shopId} aboutUs={aboutUs} />
        </div>
    );
};

export default page;