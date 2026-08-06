import ActionDenied from '@/components/ActionDenied';
import { logConsole } from '@/lib/console/console';
import { fetchAProduct } from '@/SSRCalls/Product.ssrCalls';
import React from 'react'

const page = async ({ params }) => {

    const { productId } = await params;

    const { data: product, error } = await fetchAProduct({ productId });

    if (error) {
        logConsole('categories page : error ', error);
        return <ActionDenied message={error} />;
    }

    const formattedDate = new Date(product.updatedAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });

    return (
        <div className="min-h-screen bg-stone-50 px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl">

                <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2">

                        {/* Image */}
                        <div className="relative flex aspect-square items-center justify-center bg-gradient-to-br from-indigo-50 to-stone-100 md:aspect-auto">
                            {product.image ? (
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className="flex flex-col items-center gap-3 text-indigo-300">
                                    <svg
                                        className="h-20 w-20"
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
                                    <span className="text-sm font-medium text-indigo-300">
                                        No image yet
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Details */}
                        <div className="flex flex-col justify-between p-6 sm:p-8">
                            <div>
                                <div className="mb-4 flex flex-wrap items-center gap-2">
                                    <span className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-200">
                                        Category · {product.categoryId.slice(-6)}
                                    </span>
                                    <span className="inline-flex items-center rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-600 ring-1 ring-inset ring-stone-200">
                                        Shop · {product.shopId.slice(-6)}
                                    </span>
                                </div>

                                <h1 className="text-2xl font-semibold tracking-tight text-stone-900 sm:text-3xl">
                                    {product.name}
                                </h1>

                                <p className="mt-3 text-sm leading-relaxed text-stone-500">
                                    {product.desc || "No description added yet."}
                                </p>
                            </div>

                            <div className="mt-8">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-sm font-medium text-stone-400">₹</span>
                                    <span className="text-4xl font-bold text-stone-900">
                                        {product.price.toLocaleString("en-IN")}
                                    </span>
                                </div>

                                <div className="mt-6 flex flex-col gap-3 border-t border-dashed border-stone-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
                                    <p className="text-xs text-stone-400">
                                        Last updated on {formattedDate}
                                    </p>
                                    <div className="flex gap-2">
                                        <button className="rounded-lg border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-50">
                                            Edit product
                                        </button>
                                        <button className="rounded-lg bg-stone-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-stone-800">
                                            View in shop
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page