import PageHeader from '@/components/PageHeader';
import ActionDenied from '@/components/ActionDenied';
import { fetchAllShops } from '@/SSRCalls/Shop.ssrCalls';
import ShopsList from './ShopsList';
import { routes } from '@/lib/routes/routes';
export const dynamic = 'force-dynamic';

const page = async () => {
    const { data: shops, error } = await fetchAllShops();

    if (error) {
        return <ActionDenied message={error} />;
    }

    return (
        <div className="p-6">
            <PageHeader
                title="Shops"
                description="Manage your shops and their details."
                rightButton={{
                    href: routes.shopCreate,
                    label: 'Create A Shop',
                }}
            />

            <ShopsList shops={shops} />
        </div>
    );
};

export default page;