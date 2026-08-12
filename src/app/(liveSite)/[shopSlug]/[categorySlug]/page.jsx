import { cache } from 'react';
import { notFound } from 'next/navigation';
import { fetchPublicStoreBySlug } from '@/SSRCalls/PublicStore.ssrCalls';
import { logConsole } from '@/lib/console/console';
import StorePreviewView from '@/components/StorePreview/StorePreviewView';

const getStoreData = cache(async (shopSlug) => {
    return fetchPublicStoreBySlug({ shopSlug });
});

export async function generateMetadata({ params }) {
    const { shopSlug, categorySlug } = await params;

    const { data, error } = await getStoreData(shopSlug);

    if (error || !data) {
        return { title: "Store not found" };
    }

    const { shop, categories } = data;
    const category = categories.find((c) => c.slug === categorySlug);

    if (!category) {
        return { title: "Category not found" };
    }

    const shopName = shop.name.replace(/_/g, " ");
    const title = `${category.name} – ${shopName}`;
    const description = category.description || `Browse ${category.name} from ${shopName}. Order directly on WhatsApp.`;
    const previewImage = category.image || shop.logo || undefined;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            images: previewImage ? [{ url: previewImage }] : undefined,
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: previewImage ? [previewImage] : undefined,
        },
    };
}

const page = async ({ params }) => {
    const { shopSlug, categorySlug } = await params;

    logConsole("liveSite category page : shopSlug, categorySlug : ", shopSlug, categorySlug);

    const { data, error } = await getStoreData(shopSlug);

    if (error || !data) {
        notFound();
    }

    const { shop, categories, products, socials, contact, aboutUs } = data;

    const activeCategory = categories.find((c) => c.slug === categorySlug);

    if (!activeCategory) {
        notFound();
    }

    const categoryProducts = products.filter((p) => p.categoryId === activeCategory._id);

    return (
        <StorePreviewView
            shop={shop}
            categories={categories}
            products={products}
            socials={socials}
            contact={contact}
            aboutUs={aboutUs}
            activeCategory={{ ...activeCategory, products: categoryProducts }}
        />
    );
};

export default page;