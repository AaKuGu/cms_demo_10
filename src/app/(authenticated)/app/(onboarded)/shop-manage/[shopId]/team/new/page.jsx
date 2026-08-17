import PageHeader from '@/components/PageHeader';
import NewTeamMemberContainer from './NewTeamMemberContainer';
import ActionDenied from '@/components/ActionDenied';
import { logConsole } from '@/lib/console/console';

const page = async ({ params }) => {
    const { shopId } = await params;

    logConsole("team/new/page.jsx : shopId ", shopId);

    return (
        <div className="p-6">
            <PageHeader
                title="Add Team Member"
                description="Give someone access to manage this shop on your behalf."
            />
            <NewTeamMemberContainer shopId={shopId} />
        </div>
    );
};

export default page;