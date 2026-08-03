"use client";

import Link from 'next/link'

const ShopManageNav = () => {
    return (
        <div className="sticky top-0 z-40 border-b border-stone-200 bg-white/80 backdrop-blur-md">
            <div className="mx-auto flex max-w-7xl items-center px-4 py-3 sm:px-6 lg:px-8">
                <Link
                    href="/dashboard"
                    className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-stone-600 transition hover:bg-stone-100 hover:text-stone-900"
                >
                    <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                    Back
                </Link>
            </div>
        </div>
    )
}

export default ShopManageNav