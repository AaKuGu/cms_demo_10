"use client";

import { useMemo, useState } from "react";

const StorePreviewView = ({ shop, categories, products }) => {
    const categoriesWithProducts = useMemo(() => {
        return categories
            .map((cat) => ({
                ...cat,
                products: products.filter((p) => p.categoryId === cat._id),
            }))
            .filter((cat) => cat.products.length > 0);
    }, [categories, products]);

    const [activeCategoryId, setActiveCategoryId] = useState(
        categoriesWithProducts[0]?._id ?? null
    );

    const activeCategory = categoriesWithProducts.find(
        (cat) => cat._id === activeCategoryId
    );

    const whatsappMessage = encodeURIComponent(
        `Hi, I saw your store "${shop.name.replace(/_/g, " ")}" online and wanted to ask about your products.`
    );

    return (
        <div className="flex h-screen flex-col bg-white">

            {/* Header — logo left, name centered, WhatsApp on the right */}
            <div className="shrink-0 border-b border-zinc-200 bg-gradient-to-b from-zinc-50 to-white">
                <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6 sm:py-8 lg:px-8">
                    <div className="grid grid-cols-[auto_1fr_auto] items-center gap-2 sm:gap-4">

                        {/* Logo — left */}
                        <div className="flex justify-start">
                            {shop.logo ? (
                                <img
                                    src={shop.logo}
                                    alt={shop.name}
                                    className="h-12 w-12 rounded-full object-cover ring-1 ring-zinc-200 sm:h-16 sm:w-16 lg:h-20 lg:w-20"
                                />
                            ) : (
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900 text-base font-medium text-white sm:h-16 sm:w-16 sm:text-xl lg:h-20 lg:w-20 lg:text-2xl">
                                    {shop.name.charAt(0)}
                                </div>
                            )}
                        </div>

                        {/* Name + address — center */}
                        <div className="flex flex-col items-center text-center">
                            <h1 className="font-serif text-lg tracking-tight text-zinc-900 sm:text-2xl lg:text-4xl">
                                {shop.name.replace(/_/g, " ")}
                            </h1>

                            {shop.address && (
                                <p className="mt-1 flex items-center gap-1.5 text-xs text-zinc-500 sm:mt-2 sm:text-sm">
                                    <svg
                                        className="h-3.5 w-3.5 shrink-0 text-zinc-400 sm:h-4 sm:w-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={1.5}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                                        />
                                    </svg>
                                    <span className="line-clamp-1">{shop.address}</span>
                                </p>
                            )}
                        </div>

                        {/* WhatsApp — right */}
                        <div className="flex justify-end">
                            {shop.phone && (
                                <a
                                    href={`https://wa.me/91${shop.phone}?text=${whatsappMessage}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1.5 rounded-full bg-green-500 px-2.5 py-2 text-xs font-medium text-white shadow-sm transition hover:bg-green-600 sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm"
                                >
                                    <svg className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.6 6.32A7.85 7.85 0 0012.05 4a7.94 7.94 0 00-6.9 11.9L4 20l4.2-1.1a7.9 7.9 0 003.85 1h0a7.94 7.94 0 007.94-7.94 7.9 7.9 0 00-2.35-5.62zm-5.55 12.2h0a6.6 6.6 0 01-3.36-.92l-.24-.14-2.5.65.67-2.44-.16-.25a6.6 6.6 0 01-1-3.5A6.6 6.6 0 0117.6 7.24a6.56 6.56 0 011.94 4.66 6.6 6.6 0 01-6.6 6.62zm3.6-4.94c-.2-.1-1.17-.58-1.35-.64s-.32-.1-.45.1-.5.63-.62.77-.23.15-.43.05a5.4 5.4 0 01-1.6-1 6 6 0 01-1.1-1.37c-.12-.2 0-.3.09-.4s.2-.24.3-.36a1.4 1.4 0 00.2-.34.4.4 0 000-.36c-.05-.1-.45-1.08-.62-1.48s-.33-.33-.45-.33h-.4a.75.75 0 00-.55.26 2.3 2.3 0 00-.72 1.7 4 4 0 00.85 2.1 9.2 9.2 0 003.53 3.1c.5.2.9.33 1.2.42a2.9 2.9 0 001.33.08 2.2 2.2 0 001.43-1 1.8 1.8 0 00.12-1c-.05-.1-.18-.15-.38-.25z" />
                                    </svg>
                                    <span className="hidden sm:inline">Chat</span>
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Sections zone — this is where Trending Now, Banners, About, etc. will slot in later,
                stacked above the category tabs, each as its own full-width band. */}

            {/* Category tabs — fixed, doesn't scroll */}
            {
                categoriesWithProducts.length > 0 && (
                    <div className="mx-auto w-full max-w-6xl shrink-0 border-b border-zinc-200 px-4 sm:px-6 lg:px-8">
                        <div className="flex gap-1 overflow-x-auto pb-px">
                            {categoriesWithProducts.map((cat) => {
                                const isActive = cat._id === activeCategoryId;
                                return (
                                    <button
                                        key={cat._id}
                                        onClick={() => setActiveCategoryId(cat._id)}
                                        className={`relative whitespace-nowrap px-3 py-2.5 text-xs font-medium transition sm:px-4 sm:py-3 sm:text-sm ${isActive
                                            ? "text-zinc-900"
                                            : "text-zinc-400 hover:text-zinc-600"
                                            }`}
                                    >
                                        {cat.name}
                                        <span className="ml-1.5 text-xs text-zinc-400">
                                            {cat.products.length}
                                        </span>
                                        {isActive && (
                                            <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-zinc-900" />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )
            }

            {/* Products area — this is the ONLY part that scrolls */}
            <div className="flex-1 overflow-y-auto">
                <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">

                    {categoriesWithProducts.length === 0 ? (
                        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-zinc-300 py-20 text-center">
                            <p className="text-sm text-zinc-400">
                                This store hasn&apos;t added any products yet.
                            </p>
                        </div>
                    ) : (
                        <>
                            {/* Category description */}
                            {activeCategory?.description && (
                                <p className="mb-6 max-w-lg text-sm text-zinc-500">
                                    {activeCategory.description}
                                </p>
                            )}

                            {/* Products grid */}
                            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-6 lg:grid-cols-5">
                                {activeCategory?.products.map((product) => (
                                    <div key={product._id} className="group">
                                        <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-lg bg-zinc-100">
                                            {product.image ? (
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                                />
                                            ) : (
                                                <svg
                                                    className="h-9 w-9 text-zinc-300"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    strokeWidth={1.2}
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M4 6h16v12H4V6z"
                                                    />
                                                </svg>
                                            )}
                                        </div>

                                        <div className="mt-2 sm:mt-3">
                                            <h3 className="line-clamp-1 text-xs font-medium text-zinc-900 sm:text-sm">
                                                {product.name}
                                            </h3>
                                            <p className="mt-0.5 line-clamp-1 text-xs text-zinc-400">
                                                {product.desc}
                                            </p>
                                            <p className="mt-1 text-xs font-semibold text-zinc-900 sm:mt-1.5 sm:text-sm">
                                                ₹{product.price.toLocaleString("en-IN")}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div >
    );
};

export default StorePreviewView;