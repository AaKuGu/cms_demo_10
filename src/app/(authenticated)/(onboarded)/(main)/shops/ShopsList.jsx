"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import EmptyList from "@/components/EmptyList";
import ActionGroup from "@/components/ActionGroup";
import { deleteShopAction } from "@/actions/Shop.actions";
import { errorToast, successToast } from "@/lib/toast";
import { getNameInitials } from "@/lib/ui/initials";
import { logConsole } from "@/lib/console/console";

export default function ShopsList({ shops }) {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState(null);

    const handleDelete = async (e, shopId, shopName) => {
        e.stopPropagation();

        const confirmed = window.confirm(`Are you sure you want to delete "${shopName || "this shop"}"?`);
        if (!confirmed) {
            logConsole("ShopsList : handleDelete : delete cancelled for shopId ", shopId)
            return;
        }

        setDeletingId(shopId);
        logConsole("ShopsList : handleDelete : shopId ", shopId)

        const { error } = await deleteShopAction(shopId);
        logConsole("ShopsList : handleDelete : deleteShopAction response ", { error })

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
        <div className="overflow-hidden rounded-xl border border-gray-200 divide-y divide-gray-200">
            {shops.map((shop) => (
                <div
                    key={shop._id}
                    onClick={() => router.push(`/shops/${shop._id}`)}
                    className="flex items-center justify-between px-5 py-4 transition-colors hover:bg-gray-50 cursor-pointer"
                >
                    <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-900 text-xs font-semibold text-white">
                            {getNameInitials(shop.name, "S")}
                        </div>
                        <div className="min-w-0">
                            <p className="truncate font-medium text-gray-900">
                                {shop.name || "Unnamed shop"}
                            </p>
                            <p className="truncate text-sm text-gray-500">
                                {shop.address || shop.googleMapLink || "No address added"}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                router.push(`/shop-manage/${shop._id}/`);
                            }}
                            className="rounded-md bg-slate-900 px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-slate-800"
                        >
                            Manage Shop
                        </button>

                        <ActionGroup
                            onEdit={(e) => {
                                e.stopPropagation();
                                router.push(`/shops/${shop._id}/edit`);
                            }}
                            onDelete={(e) => handleDelete(e, shop._id, shop.name)}
                            isDeleting={deletingId === shop._id}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}