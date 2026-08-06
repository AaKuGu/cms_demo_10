import PageHeader from '@/components/PageHeader';
import NewProductContainer from './NewProductContainer';
import { fetchAllCategories } from '@/SSRCalls/Category.ssrCalls';
import ActionDenied from '@/components/ActionDenied';
import { logConsole } from '@/lib/console/console';

const page = async ({ params }) => {
    const { shopId } = await params;
    const { data: categories = [], error: categoryError } = await fetchAllCategories({ shopId });

    logConsole("products/new/page.jsx : shopId ", shopId);
    logConsole("products/new/page.jsx : categories ", categories);

    if (categoryError) {
        return <ActionDenied message={categoryError} />;
    }

    return (
        <div className="p-6">
            <PageHeader
                title="Add Product"
                description="Create a new product for this shop."
            />
            <NewProductContainer shopId={shopId} categories={categories || []} />
        </div>
    );
};

export default page;
