import PageHeader from '@/components/PageHeader';
import NewTeamMemberContainer from './NewTeamMemberContainer';

const page = () => {
    return (
        <div className="p-6">
            <PageHeader
                title="Add Team Member"
                description="Invite someone to manage your stores."
            />
            <NewTeamMemberContainer />
        </div>
    );
};

export default page;