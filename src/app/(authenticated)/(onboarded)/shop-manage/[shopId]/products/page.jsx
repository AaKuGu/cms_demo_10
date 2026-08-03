import PageHeader from '@/components/PageHeader';
import ActionDenied from '@/components/ActionDenied';
import { fetchAllProducts } from '@/SSRCalls/Product.ssrCalls';
import ProductsList from './ProductsList';

const page = async ({ params }) => {
    const { shopId } = await params;
    const { data: products, error } = await fetchAllProducts({ shopId });

    if (error) {
        return <ActionDenied message={error} />;
    }

    return (
        <div className="p-6">
            <PageHeader
                title="Products"
                description="Manage your product catalog."
                rightButton={{
                    href: `/shop-manage/${shopId}/products/new`,
                    label: 'Add Product',
                }}
            />

            <ProductsList products={products} shopId={shopId} />
        </div>
    );
};

export default page;
