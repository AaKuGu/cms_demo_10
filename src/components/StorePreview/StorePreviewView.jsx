
"use client";

import { logConsole } from "@/lib/console/console";
import { useMemo, useState } from "react";
import {
    FaInstagram,
    FaFacebook,
    FaYoutube,
    FaTwitter,
    FaLinkedin,
    FaWhatsapp,
    FaTiktok,
    FaPinterest,
    FaEnvelope,
    FaPhone,
    FaClock,
    FaMapMarkerAlt,
} from "react-icons/fa";
import StoreHeader from "./StoreHeader";
import CategoryTabs from "./CategoryTabs";
import ProductCard from "./ProductCard";
import CategoryCards from "./CategoryCards";

const PLATFORM_ICON_MAP = {
    instagram: FaInstagram,
    facebook: FaFacebook,
    youtube: FaYoutube,
    twitter: FaTwitter,
    linkedin: FaLinkedin,
    whatsapp: FaWhatsapp,
    tiktok: FaTiktok,
    pinterest: FaPinterest,
};

const CONTACT_NUMBER_ICON_MAP = {
    phone: FaPhone,
    whatsapp: FaWhatsapp,
};

const getMapEmbedSrc = (googleMapLink, address) => {
    if (!googleMapLink && !address) return null;

    if (googleMapLink && googleMapLink.includes("/maps/embed")) {
        return googleMapLink;
    }

    const query = address || googleMapLink;
    return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
};

const StorePreviewView = ({ shop, categories, products, socials, contact, aboutUs, activeCategory: activeCategoryProp }) => {
    logConsole("about Us : ", aboutUs);

    const showPricing = shop?.settings?.products?.showPricing !== false; // default true if unset

    const visibleSocialLinks = socials?.isVisible ? socials?.links ?? [] : [];
    const visibleContact = contact?.isVisible ? contact : null;
    const hasContactContent =
        visibleContact &&
        (visibleContact.email ||
            visibleContact.contactNumbers?.length > 0 ||
            visibleContact.workingHours ||
            visibleContact.googleMapLink);

    const mapEmbedSrc = visibleContact?.googleMapLink
        ? getMapEmbedSrc(visibleContact.googleMapLink, shop?.address)
        : null;

    const categoriesWithProducts = useMemo(() => {
        return categories
            .map((cat) => ({
                ...cat,
                products: products.filter((p) => p.categoryId === cat._id),
            }))
            .filter((cat) => cat.products.length > 0);
    }, [categories, products]);

    const isCategoryPage = Boolean(activeCategoryProp);

    const [activeCategoryId, setActiveCategoryId] = useState(
        categoriesWithProducts[0]?._id ?? null
    );

    const activeCategory = isCategoryPage
        ? activeCategoryProp
        : categoriesWithProducts.find((cat) => cat._id === activeCategoryId);

    const whatsappMessage = encodeURIComponent(
        `Hi, I saw your store "${shop.name.replace(/_/g, " ")}" online and wanted to ask about your products.`
    );

    const getProductWhatsappLink = (product) => {
        const message = encodeURIComponent(
            showPricing
                ? `Hi, I'm interested in "${product.name}" (₹${product.price.toLocaleString("en-IN")}) from ${shop.name.replace(/_/g, " ")}. Iska kya price padega / is this available?`
                : `Hi, I'm interested in "${product.name}" from ${shop.name.replace(/_/g, " ")}. Ye kitne ka hai / what's the price and is it available?`
        );
        return `https://wa.me/91${shop.phone}?text=${message}`;
    };

    const getContactNumberHref = (entry) => {
        return entry.type === "whatsapp"
            ? `https://wa.me/${entry.number.replace(/\D/g, "")}`
            : `tel:${entry.number}`;
    };

    // Sort and filter dynamic About Us sections by their `order` key
    const sortedAboutUsSections = useMemo(() => {
        if (!aboutUs || !aboutUs.isVisible) return [];

        const sections = [
            { key: "story", data: aboutUs.story },
            { key: "visionMission", data: aboutUs.visionMission },
            { key: "foundersMessage", data: aboutUs.foundersMessage },
            { key: "milestones", data: aboutUs.milestones },
            { key: "team", data: aboutUs.team },
        ];

        return sections
            .filter((sec) => sec.data && sec.data.isVisible)
            .sort((a, b) => (a.data.order ?? 0) - (b.data.order ?? 0));
    }, [aboutUs]);



    return (
        <div className="flex h-screen flex-col bg-white">
            {/* Floating social icons — fixed to the left edge, vertically centered. */}
            {visibleSocialLinks.length > 0 && (
                <div className="fixed left-2 top-1/2 z-40 flex -translate-y-1/2 flex-col gap-2.5 sm:left-3 sm:gap-3 lg:left-5">
                    {visibleSocialLinks.map((link, index) => {
                        const Icon = PLATFORM_ICON_MAP[link.platform];
                        if (!Icon) return null;
                        return (
                            <a
                                key={`${link.platform}-${index}`}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={link.platform}
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#241A15] text-white shadow-md ring-1 ring-black/10 transition duration-200 hover:-translate-x-0.5 hover:bg-[#7A1F3D] hover:shadow-lg"
                            >
                                <Icon className="h-4 w-4" />
                            </a>
                        );
                    })}
                </div>
            )}

            {/* Floating quick-contact icons — fixed near the bottom-right corner */}
            {(shop.phone || visibleContact?.contactNumbers?.some((n) => n.type === "phone")) && (
                <div className="fixed bottom-6 right-2 z-40 flex flex-col gap-2.5 sm:bottom-8 sm:right-3 sm:gap-3 lg:right-5 lg:bottom-10">
                    {shop.phone && (
                        <a
                            href={`https://wa.me/91${shop.phone}?text=${whatsappMessage}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Chat on WhatsApp"
                            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#241A15] text-white shadow-md ring-1 ring-black/10 transition duration-200 hover:translate-x-0.5 hover:bg-green-600 hover:shadow-lg"
                        >
                            <FaWhatsapp className="h-4 w-4" />
                        </a>
                    )}
                    {shop.phone && (
                        <a
                            href={`tel:${shop.phone}`}
                            aria-label="Call the store"
                            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#241A15] text-white shadow-md ring-1 ring-black/10 transition duration-200 hover:translate-x-0.5 hover:bg-[#7A1F3D] hover:shadow-lg"
                        >
                            <FaPhone className="h-4 w-4" />
                        </a>
                    )}
                </div>
            )}

            {/* Category selector — cards on homepage, nothing on a category page */}
            {!isCategoryPage && categoriesWithProducts.length > 0 && (
                <CategoryCards shopSlug={shop.slug} categories={categoriesWithProducts} />
            )}



            {/* Scrollable body — products, then about us, then contact */}
            <div className="flex-1 overflow-y-auto bg-white">
                <div className="mx-auto max-w-[1440px] px-4 py-7 sm:px-6 sm:py-10 lg:px-8">
                    {categoriesWithProducts.length === 0 ? (
                        <EmptyProductsState />
                    ) : isCategoryPage ? (
                        <>
                            {activeCategory?.description && (
                                <p className="mb-7 max-w-lg text-sm leading-relaxed text-[#948676]">
                                    {activeCategory.description}
                                </p>
                            )}
                            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-7 sm:gap-x-6 sm:gap-y-9">
                                {activeCategory?.products.map((product) => (
                                    <ProductCard key={product._id} product={product} showPricing={showPricing} getProductWhatsappLink={getProductWhatsappLink} />
                                ))}
                            </div>
                        </>
                    ) : null /* homepage: cards already rendered above, nothing else here for now */}
                </div>
            </div>
        </div>
    );
};

export default StorePreviewView;