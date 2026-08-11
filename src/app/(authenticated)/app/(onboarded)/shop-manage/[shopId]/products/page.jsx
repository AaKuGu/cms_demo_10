import ActionDenied from "@/components/ActionDenied";
import { fetchDataForProductListing } from "@/SSRCalls/Product.ssrCalls";
import ProductsNav from "./ProductsNav";
import PageHeader from "@/components/PageHeader";
import { routes } from "@/lib/routes/routes";
import ProductsList from "./ProductsList";
import ProductFilterWrapper from "./ProductFilterWrapper";
import { logConsole } from "../../../../../../../lib/console/console";

const page = async ({ params, searchParams }) => {
    const { shopId } = await params;
    const sp = await searchParams;

    const { data: { products, hasFilter }, error } = await fetchDataForProductListing({ shopId, searchParams: sp });
    logConsole("shop-manage/products/page.jsx : products, hasfiler ", products, hasFilter)

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
            <ProductFilterWrapper shopId={shopId} />
            <ProductsList products={products} shopId={shopId} hasFilter={hasFilter} />
        </div>
    );
};

export default page;