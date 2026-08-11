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

    return (
        <div className="min-h-screen bg-white">

            {/* Hero */}
            <div className="border-b border-zinc-200 bg-gradient-to-b from-zinc-50 to-white">
                <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center text-center">
                        {shop.logo ? (
                            <img
                                src={shop.logo}
                                alt={shop.name}
                                className="h-20 w-20 rounded-full object-cover ring-1 ring-zinc-200"
                            />
                        ) : (
                            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-zinc-900 text-2xl font-medium text-white">
                                {shop.name.charAt(0)}
                            </div>
                        )}

                        <h1 className="mt-5 font-serif text-3xl tracking-tight text-zinc-900 sm:text-4xl">
                            {shop.name.replace(/_/g, " ")}
                        </h1>

                        {shop.address && (
                            <p className="mt-3 flex items-center gap-1.5 text-sm text-zinc-500">
                                <svg
                                    className="h-4 w-4 text-zinc-400"
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
                                {shop.address}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">

                {categoriesWithProducts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-zinc-300 py-20 text-center">
                        <p className="text-sm text-zinc-400">
                            This store hasn&apos;t added any products yet.
                        </p>
                    </div>
                ) : (
                    <>
                        {/* Category tabs */}
                        <div className="flex justify-center border-b border-zinc-200">
                            <div className="flex gap-1 overflow-x-auto pb-px">
                                {categoriesWithProducts.map((cat) => {
                                    const isActive = cat._id === activeCategoryId;
                                    return (
                                        <button
                                            key={cat._id}
                                            onClick={() => setActiveCategoryId(cat._id)}
                                            className={`relative whitespace-nowrap px-4 py-3 text-sm font-medium transition ${isActive
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

                        {/* Category description */}
                        {activeCategory?.description && (
                            <p className="mx-auto mt-6 max-w-lg text-center text-sm text-zinc-500">
                                {activeCategory.description}
                            </p>
                        )}

                        {/* Products grid */}
                        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
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

                                    <div className="mt-3">
                                        <h3 className="text-sm font-medium text-zinc-900">
                                            {product.name}
                                        </h3>
                                        <p className="mt-0.5 line-clamp-1 text-xs text-zinc-400">
                                            {product.desc}
                                        </p>
                                        <p className="mt-1.5 text-sm font-semibold text-zinc-900">
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
    );
};

export default StorePreviewView;