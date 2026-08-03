"use client";

import { logConsole } from "@/lib/console/console";

export default function DeleteCategoryButton({ categoryId, shopId, onDelete, isPending = false }) {
    logConsole("delete category button : categoryId ", categoryId);
    logConsole("delete category button : shopId ", shopId);

    return (
        <button
            type="button"
            disabled={isPending}
            onClick={() => onDelete(categoryId)}
            className="text-sm font-medium text-red-600 hover:text-red-500 disabled:opacity-50"
        >
            {isPending ? "Removing..." : "Remove"}
        </button>
    );
}
