import PageHeader from '@/components/PageHeader';
import ActionDenied from '@/components/ActionDenied';
import { fetchDataForProductListing } from '@/SSRCalls/Product.ssrCalls';
import ProductsList from './ProductsList';
import ProductsNav from './ProductsNav';
import { routes } from '@/lib/routes/routes';

const page = async ({ params }) => {
    const { shopId } = await params;
    const { data: products, error } = await fetchDataForProductListing({ shopId });

    if (error) {
        return <ActionDenied message={error} />;
    }

    return (
        <div className="p-6">
            <ProductsNav />
            <PageHeader
                title="Products"
                description="Manage your product catalog."
                rightButton={{
                    href: routes.newProduct(shopId),
                    label: 'Add Product',
                }}
            />

            <ProductsList products={products} shopId={shopId} />
        </div>
    );
};

export default page;
