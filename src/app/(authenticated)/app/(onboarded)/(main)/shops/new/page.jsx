import PageHeader from '@/components/PageHeader';
import NewShopContainer from './NewShopContainer';

const page = () => {
    return (
        <div className="p-6">
            <PageHeader
                title="Add Shop"
                description="Create a new shop and add its details."
            />
            <NewShopContainer />
        </div>
    );
};

export default page;