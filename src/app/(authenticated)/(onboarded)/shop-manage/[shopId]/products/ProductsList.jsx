"use client";

import { useRouter } from "next/navigation";
import EmptyState from "@/components/EmptyList";
import ActionGroup from "@/components/ActionGroup";
import { deleteProductAction } from "@/actions/Product.actions";
import { getNameInitials } from "@/lib/ui/initials";
import { errorToast, successToast } from "@/lib/toast";
import { useState } from "react";

export default function ProductsList({ products, shopId }) {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState(null);

    if (!products || products.length === 0) {
        return (
            <EmptyState
                title="No products yet"
                description="Add your first product to start building your catalog."
                actionLabel="Add your first product"
                onAction={() => router.push(`/shop-manage/${shopId}/products/new`)}
            />
        );
    }

    const handleDelete = async (productId) => {
        setDeletingId(productId);

        const { data, error } = await deleteProductAction(productId, shopId);

        setDeletingId(null);

        if (error) {
            errorToast(error);
            return;
        }

        successToast("Product deleted successfully!");
        router.refresh();
    };

    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 divide-y divide-gray-200">
            {products.map((product) => (
                <div
                    key={product._id}
                    onClick={() => router.push(`/shop-manage/${shopId}/products/${product._id}`)}
                    className="flex items-center justify-between px-5 py-4 transition-colors hover:bg-gray-50 cursor-pointer"
                >
                    <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-900 text-xs font-semibold text-white">
                            {getNameInitials(product.name, "P")}
                        </div>
                        <div className="min-w-0">
                            <p className="truncate font-medium text-gray-900">
                                {product.name || "Unnamed product"}
                            </p>
                            <p className="truncate text-sm text-gray-500">
                                {product.categoryId.name || "No Category added"}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-sm font-medium text-gray-900">
                            ₹{Number(product.price || 0).toFixed(2)}
                        </span>
                        <ActionGroup
                            onEdit={(e) => {
                                e.stopPropagation();
                                router.push(`/shop-manage/${shopId}/products/${product._id}/edit`);
                            }}
                            onDelete={(e) => {
                                e.stopPropagation();
                                handleDelete(product._id);
                            }}
                            isDeleting={deletingId === product._id}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}
