"use client";

import EmptyProductsState from "./EmptyProductsState";
import ProductCard from "./ProductCard";

const ProductGrid = ({ hasAnyCategories, activeCategory, showPricing, getProductWhatsappLink }) => {
    if (!hasAnyCategories) {
        return <EmptyProductsState />;
    }

    return (
        <>
            {activeCategory?.description && (
                <p className="mb-7 max-w-lg text-sm leading-relaxed text-[#948676]">
                    {activeCategory.description}
                </p>
            )}

            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-7 sm:gap-x-6 sm:gap-y-9">
                {activeCategory?.products.map((product) => (
                    <ProductCard
                        key={product._id}
                        product={product}
                        showPricing={showPricing}
                        getProductWhatsappLink={getProductWhatsappLink}
                    />
                ))}
            </div>
        </>
    );
};

export default ProductGrid;