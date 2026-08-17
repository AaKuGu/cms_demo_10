import PageHeader from '@/components/PageHeader';
import ActionDenied from '@/components/ActionDenied';
import { fetchAllTeamMembers } from '@/SSRCalls/TeamMember.ssrCalls';
import { routes } from '@/lib/routes/routes';
import TeamList from './TeamList';
export const dynamic = 'force-dynamic';

const page = async () => {
    const { data: teamMembers, error } = await fetchAllTeamMembers();

    if (error) {
        return <ActionDenied message={error} />;
    }

    return (
        <div className="p-6">
            <PageHeader
                title="Team"
                description="Manage who has access to your stores."
                rightButton={{
                    href: routes.teamCreate,
                    label: 'Add Team Member',
                }}
            />

            <TeamList teamMembers={teamMembers} />
        </div>
    );
};

export default page;