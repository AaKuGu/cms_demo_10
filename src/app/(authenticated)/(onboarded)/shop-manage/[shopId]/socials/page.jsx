import PageHeader from '@/components/PageHeader';
import ActionDenied from '@/components/ActionDenied';
import { getAllSocialsForThisShop } from '@/SSRCalls/Socials.ssrCalls';
import SocialsContainer from './SocialsContainer';

const page = async ({ params }) => {
    const { shopId } = await params;
    const { data: socials, error } = await getAllSocialsForThisShop({ shopId });

    if (error) {
        return <ActionDenied message={error} />;
    }

    return (
        <div className="p-6">
            <PageHeader
                title="Social Links"
                description="Add links to your social profiles."
            />

            <SocialsContainer shopId={shopId} socials={socials} />
        </div>
    );
};

export default page;