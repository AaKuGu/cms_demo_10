// src/app/(liveSite)/[shopSlug]/about-us/page.jsx
import { cache } from 'react';
import { notFound } from 'next/navigation';
import { fetchPublicStoreBySlug } from '@/SSRCalls/PublicStore.ssrCalls';
import { logConsole } from '@/lib/console/console';
import AboutPage from './AboutPage';

const getStoreData = cache(async (shopSlug) => {
    return fetchPublicStoreBySlug({ shopSlug });
});

export async function generateMetadata({ params }) {
    const { shopSlug } = await params;
    const { data, error } = await getStoreData(shopSlug);

    if (error || !data) {
        return { title: "Store not found" };
    }

    const { shop } = data;
    const shopName = shop.name.replace(/_/g, " ");

    return {
        title: `About us — ${shopName}`,
        description: `Learn more about ${shopName} — our story, our team, and what we stand for.`,
        openGraph: {
            title: `About us — ${shopName}`,
            images: shop.logo ? [{ url: shop.logo }] : undefined,
            type: "website",
        },
    };
}

const page = async ({ params }) => {
    const { shopSlug } = await params;

    logConsole("liveSite/about-us : shopSlug : ", shopSlug);

    const { data, error } = await getStoreData(shopSlug);

    logConsole("liveSite/about-us : data : ", data);

    if (error || !data) {
        notFound();
    }

    const { shop, aboutUs } = data;
    logConsole("(liveSite)/[shopSlug]/about-us/page.jsx : aboutUs : ", aboutUs);

    // Only 404 if an AboutUs doc exists AND is explicitly hidden.
    // A shop that hasn't set one up yet still renders — same behavior as contact-us.
    if (aboutUs && aboutUs.isVisible === false) {
        notFound();
    }

    return <AboutPage shop={shop} aboutUs={aboutUs} />;
}

export default page