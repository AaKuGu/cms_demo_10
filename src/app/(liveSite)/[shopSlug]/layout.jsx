// src/app/(liveSite)/[shopSlug]/layout.jsx
import { cache } from 'react';
import { notFound } from 'next/navigation';
import { fetchPublicStoreBySlug } from '@/SSRCalls/PublicStore.ssrCalls';
import StoreHeader from '@/components/StorePreview/StoreHeader';

const getStoreData = cache(async (shopSlug) => {
    return fetchPublicStoreBySlug({ shopSlug });
});

export default async function ShopLayout({ children, params }) {
    const { shopSlug } = await params;

    const { data, error } = await getStoreData(shopSlug);

    if (error || !data) {
        notFound();
    }

    const { shop } = data;
    const whatsappMessage = encodeURIComponent(`Hi, I visited ${shop.name.replace(/_/g, " ")} online and wanted to know more.`);

    return (
        <div className="flex min-h-screen flex-col">
            <StoreHeader shop={shop} whatsappMessage={whatsappMessage} />
            <main className="flex-1">{children}</main>
        </div>
    );
}