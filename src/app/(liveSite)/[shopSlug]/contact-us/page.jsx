// src/app/(liveSite)/[shopSlug]/contact-us/page.jsx
import { cache } from 'react';
import { notFound } from 'next/navigation';
import { fetchPublicStoreBySlug } from '@/SSRCalls/PublicStore.ssrCalls';
import { logConsole } from '@/lib/console/console';
import ContactPage from './ContactPage';

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

    const { shop } = data;
    const shopName = shop.name.replace(/_/g, " ");
    const description = `Get in touch with ${shopName}. Find our address, phone number, and contact details.`;

    return {
        title: `Contact us — ${shopName}`,
        description,
        openGraph: {
            title: `Contact us — ${shopName}`,
            description,
            images: shop.logo ? [{ url: shop.logo }] : undefined,
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: `Contact us — ${shopName}`,
            description,
            images: shop.logo ? [shop.logo] : undefined,
        },
    };
}

const page = async ({ params }) => {
    const { shopSlug } = await params;

    logConsole("liveSite/contact-us : shopSlug : ", shopSlug);

    const { data, error } = await getStoreData(shopSlug);

    logConsole("liveSite/contact-us : data : ", data);

    if (error || !data) {
        notFound();
    }

    const { shop, contact } = data;
    logConsole("(liveSite)/[shopSlug]/contact-us/page.jsx : contact : ", contact);

    if (contact && contact.isVisible === false) {
        notFound();
    }

    return <ContactPage shop={shop} contact={contact} />;
}

export default page