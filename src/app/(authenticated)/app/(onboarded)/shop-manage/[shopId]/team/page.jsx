import ActionDenied from "@/components/ActionDenied";
import PageHeader from "@/components/PageHeader";
import { routes } from "@/lib/routes/routes";
import { fetchAllTeamMembers } from "@/SSRCalls/TeamMemberCalls";
import TeamMembersList from "./TeamMembersList";

const page = async ({ params }) => {
    const { shopId } = await params;

    const { data: teamMembers, error } = await fetchAllTeamMembers();

    if (error) {
        return <ActionDenied message={error} />;
    }

    return (
        <div className="p-6">
            <PageHeader
                title="Team"
                description="Give someone access to manage this shop on your behalf."
                rightButton={{
                    href: routes.newTeamMember(shopId),
                    label: 'Add Member',
                }}
            />
            <TeamMembersList teamMembers={teamMembers} shopId={shopId} />
        </div>
    );
};

export default page;