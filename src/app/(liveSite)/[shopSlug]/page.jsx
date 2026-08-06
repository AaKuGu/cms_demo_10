// src/app/(liveSite)/[shopSlug]/page.jsx
import { cache } from 'react';
import { notFound } from 'next/navigation';
import { fetchPublicStoreBySlug } from '@/SSRCalls/PublicStore.ssrCalls';
import { logConsole } from '@/lib/console/console';
import StorePreviewView from '@/components/StorePreview/StorePreviewView';

const getStoreData = cache(async (shopSlug) => {
    return fetchPublicStoreBySlug({ shopSlug });
});

export async function generateMetadata({ params }) {
    const { shopSlug } = await params;

    const { data, error } = await getStoreData(shopSlug);

    if (error || !data) {
        return {
            title: "Store not found",
        };
    }

    const { shop, products } = data;
    const shopName = shop.name.replace(/_/g, " ");
    const description = shop.address
        ? `Browse products from ${shopName}, ${shop.address}. Order directly on WhatsApp.`
        : `Browse products from ${shopName}. Order directly on WhatsApp.`;

    // Prefer shop logo for the preview image, fall back to the first product image if no logo
    const previewImage = shop.logo || products?.[0]?.image || undefined;

    return {
        title: shopName,
        description,
        openGraph: {
            title: shopName,
            description,
            images: previewImage ? [{ url: previewImage }] : undefined,
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: shopName,
            description,
            images: previewImage ? [previewImage] : undefined,
        },
    };
}

const page = async ({ params }) => {
    const { shopSlug } = await params;

    logConsole("liveSite : shopSlug : ", shopSlug);

    const { data, error } = await getStoreData(shopSlug);

    logConsole("liveSite : data : ", data);

    if (error || !data) {
        notFound();
    }

    const { shop, categories, products, socials, contact, aboutUs } = data;
    logConsole("(liveSite)/[shopSlug]/page.jsx : contact :  ", contact);
    logConsole("(liveSite)/[shopSlug]/page.jsx : aboutUs :  ", aboutUs);

    return <StorePreviewView shop={shop} categories={categories} products={products} socials={socials} contact={contact} aboutUs={aboutUs} />;
}

export default page