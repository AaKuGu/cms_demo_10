// src/components/ShareStoreButton.jsx
"use client";

import { useState } from "react";
import { successToast, errorToast } from "@/lib/toast";

export default function ShareStoreButton({ shopSlug, shopName }) {
    const [isCopied, setIsCopied] = useState(false);

    const storeUrl = `${window.location.origin}/${shopSlug}`;

    const handleShare = async () => {
        const url = `${window.location.origin}/${shopSlug}`;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: shopName,
                    text: `Check out ${shopName} — order directly on WhatsApp!`,
                    url,
                });
            } catch (err) {
                // user cancelled the share sheet — not an error, do nothing
                if (err.name !== "AbortError") {
                    errorToast("Couldn't share the link. Try copying it instead.");
                }
            }
            return;
        }

        // Desktop fallback — copy to clipboard
        try {
            await navigator.clipboard.writeText(url);
            setIsCopied(true);
            successToast("Store link copied!");
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            errorToast("Couldn't copy the link.");
        }
    };

    return (
        <button
            onClick={handleShare}
            className="flex items-center gap-2 rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
        >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.684 13.342a3 3 0 100 2.316m0-2.316a3 3 0 110 2.316m0-2.316l6.632-3.316m-6.632 5.632l6.632 3.316m0-8.632a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 4.632a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                />
            </svg>
            {isCopied ? "Copied!" : "Share my store"}
        </button>
    );
}