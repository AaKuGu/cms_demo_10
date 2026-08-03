import PageHeader from '@/components/PageHeader';
import ActionDenied from '@/components/ActionDenied';
import { fetchAllCategories } from '@/SSRCalls/Category.ssrCalls';
import { getProductById } from '@/crud/Product.crud';
import UpdateProductContainer from './UpdateProductContainer';

export default async function EditProductPage({ params }) {
    const { shopId, productId } = await params;

    const [productResult, categoriesResult] = await Promise.all([
        getProductById(productId),
        fetchAllCategories({ shopId }),
    ]);

    const product = productResult;
    const { data: categories = [], error: categoryError } = categoriesResult;

    if (categoryError) {
        return <ActionDenied message={categoryError} />;
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
