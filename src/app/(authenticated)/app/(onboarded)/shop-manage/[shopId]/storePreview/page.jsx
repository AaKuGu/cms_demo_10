import ActionDenied from '@/components/ActionDenied';
import { fetchStorePreviewByShopId } from '@/SSRCalls/StorePreview.ssrCalls';
import { logConsole } from '@/lib/console/console';
import ShareStoreButton from '@/components/ShareStoreButton';
import React from 'react'
import StorePreviewView from '@/components/StorePreview/StorePreviewView';

const page = async ({ params }) => {
    const { shopId } = await params;

    logConsole("storePreview : shopId : ", shopId);

    const { data, error } = await fetchStorePreviewByShopId({ shopId });

    logConsole(" storePreview : data : ", data)

    const { shop, categories, products, socials, contactUs, aboutUs } = data;
    // logConsole("storePreview : data : ", { shop, categories, products, socials, contactUs, aboutUs });

    if (error) {
        return <ActionDenied message={error} />;
    }



    return (
        <div className="relative">
            {/* Floating on top of the preview — seller-only, never shown on the public live site */}
            {/* <div className="sticky top-0 z-25 flex justify-end border-b border-gray-200 bg-white/90 px-2 py-1 backdrop-blur-sm sm:px-3">
                <ShareStoreButton
                    shopSlug={shop.slug}
                    shopName={shop.name.replace(/_/g, " ")}
                />
            </div> */}

            <StorePreviewView shop={shop} categories={categories} products={products} socials={socials} contact={contactUs} aboutUs={aboutUs} />
        </div>
    );
}

export default page