import ActionDenied from '@/components/ActionDenied';
import { fetchStorePreviewByShopId } from '@/SSRCalls/StorePreview.ssrCalls';
import { logConsole } from '@/lib/console/console';
import StorePreviewView from './StorePreviewView';
import React from 'react'

const page = async ({ params }) => {
    const { shopId } = await params;

    logConsole("storePreview : shopId : ", shopId);

    const { data: { shop, categories, products }, error } = await fetchStorePreviewByShopId({ shopId });

    logConsole("storePreview : data : ", { shop, categories, products });

    if (error) {
        return <ActionDenied message={error} />;
    }

    return <StorePreviewView shop={shop} categories={categories} products={products} />;
}

export default page