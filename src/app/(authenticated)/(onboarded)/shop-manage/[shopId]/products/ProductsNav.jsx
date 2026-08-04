import React from "react";
import Link from "next/link";

const ProductsNav = () => {
    return (
        <div className="flex items-center justify-between">
            <Link
                href="products/settings"
                className="inline-flex items-center gap-1.5 rounded-full border border-gray-300 bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
            >
                Settings
            </Link>
        </div>
    );
};

export default ProductsNav;