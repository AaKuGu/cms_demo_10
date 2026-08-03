"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import EmptyList from "@/components/EmptyList";
import ActionGroup from "@/components/ActionGroup";
import { deleteShopAction } from "@/actions/Shop.actions";
import { errorToast, successToast } from "@/lib/toast";
import { getNameInitials } from "@/lib/ui/initials";
import { logConsole } from "@/lib/console/console";
import Button from "@/ui/Button";

export default function ShopsList({ shops }) {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState(null);

    const handleDelete = async (e, shopId, shopName) => {
        e.stopPropagation();

        const confirmed = window.confirm(
            `Are you sure you want to delete "${shopName || "this shop"}"?`
        );

        if (!confirmed) {
            logConsole(
                "ShopsList : handleDelete : delete cancelled for shopId ",
                shopId
            );
            return;
        }

        setDeletingId(shopId);

        const { error } = await deleteShopAction(shopId);

        setDeletingId(null);

        if (error) {
            errorToast(error);
            return;
        }

        successToast("Shop deleted successfully!");
        router.refresh();
    };

    if (!shops || shops.length === 0) {
        return (
            <EmptyList
                title="No shops yet"
                description="Add your first shop to start managing your locations."
                actionLabel="Add your first shop"
                onAction={() => router.push("/shops")}
            />
        );
    }

    return (
        <div className="overflow-hidden rounded-xl border border-border divide-y divide-gray-200">
            {shops.map((shop) => (
                <div
                    key={shop._id}
                    onClick={() => router.push(`/shops/${shop._id}`)}
                    className="cursor-pointer p-4 transition-colors hover:bg-gray-50"
                >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        {/* Shop Info */}
                        <div className="flex min-w-0 items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-900 text-sm font-semibold text-white">
                                {getNameInitials(shop.name, "S")}
                            </div>

                            <div className="min-w-0 flex-1">
                                <p className="truncate font-medium text-gray-900">
                                    {shop.name || "Unnamed shop"}
                                </p>

                                <p className="truncate text-sm text-faint">
                                    {shop.address ||
                                        shop.googleMapLink ||
                                        "No address added"}
                                </p>
                            </div>
                        </div>

                        {/* Actions */}
                        <div
                            className="flex w-full items-center gap-2 sm:w-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex-1 sm:flex-none">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="w-full sm:w-auto"
                                    onClick={() =>
                                        router.push(
                                            `/shop-manage/${shop._id}/storePreview`
                                        )
                                    }
                                >
                                    Manage Shop
                                </Button>
                            </div>

                            <ActionGroup
                                onEdit={() =>
                                    router.push(`/shops/${shop._id}/edit`)
                                }
                                onDelete={(e) =>
                                    handleDelete(e, shop._id, shop.name)
                                }
                                isDeleting={deletingId === shop._id}
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}