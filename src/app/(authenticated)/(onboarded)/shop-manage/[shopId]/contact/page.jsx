import PageHeader from '@/components/PageHeader';
import ActionDenied from '@/components/ActionDenied';
import { getContactForThisShop } from '@/SSRCalls/Contact.ssrCalls';
import ContactContainer from './ContactContainer';

const page = async ({ params }) => {
    const { shopId } = await params;
    const { data: contact, error } = await getContactForThisShop({ shopId });

    if (error) {
        return <ActionDenied message={error} />;
    }

    return (
        <div className="p-6">
            <PageHeader
                title="Contact Us"
                description="Let customers know how to reach you."
            />

            <ContactContainer shopId={shopId} contact={contact} />
        </div>
    );
};

export default page;