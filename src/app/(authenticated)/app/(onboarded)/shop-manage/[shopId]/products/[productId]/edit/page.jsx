import PageHeader from '@/components/PageHeader';
import ActionDenied from '@/components/ActionDenied';
import { fetchAllCategories } from '@/SSRCalls/Category.ssrCalls';
import { getProductById } from '@/crud/Product.crud';
import UpdateProductContainer from './UpdateProductContainer';
import { logConsole } from '@/lib/console/console';
import { fetchProductAndCategoresForEditPage } from '@/SSRCalls/Product.ssrCalls';

export default async function EditProductPage({ params }) {
    const { shopId, productId } = await params;

    // const [productResult, categoriesResult] = await Promise.all([
    //     getProductById(productId),
    //     fetchAllCategories({ shopId }),
    // ]);

    const { data: { product, categories }, error } = await fetchProductAndCategoresForEditPage({ productId, shopId });

    logConsole("shop-manage/shopid/products/productid/edit/page.jsx : product : ", product)
    logConsole("shop-manage/shopid/products/productid/edit/page.jsx : categories : ", categories)


    if (error) {
        return <ActionDenied message={error} />;
    }

    if (!product || product.shopId?.toString() !== shopId.toString()) {
        return <ActionDenied message="Product not found for this shop." />;
    }

    return (
        <div className="p-6">
            <PageHeader
                title="Edit Product"
                description="Update product details for this shop."
            />

            <UpdateProductContainer
                product={product}
                shopId={shopId}
                categories={categories || []}
            />
        </div>
    );
}
