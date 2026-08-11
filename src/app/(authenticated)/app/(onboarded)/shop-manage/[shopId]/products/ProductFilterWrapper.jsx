import React from 'react'
import ProductFilter from './ProductFilter'
import { getCategoryList } from '@/crud/Category.crud';

const ProductFilterWrapper = async ({ shopId }) => {
    const categories = await getCategoryList({ shopId });

    return (
        <ProductFilter categories={categories} />
    );
}

export default ProductFilterWrapper