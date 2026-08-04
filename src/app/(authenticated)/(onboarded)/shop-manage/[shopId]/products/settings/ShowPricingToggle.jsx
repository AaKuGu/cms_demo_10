"use client";

import React, { useState } from "react";

const ShowPricingToggle = ({ shopId, initialShowPricing }) => {
    const [showPricing, setShowPricing] = useState(initialShowPricing);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    async function handleToggle() {
        const next = !showPricing;
        setShowPricing(next); // optimistic
        setSaving(true);
        setError("");
        try {
            const res = await fetch(`/api/shops/${shopId}/settings/products`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ showPricing: next }),
            });
            if (!res.ok) throw new Error("Failed to save. Try again.");
        } catch (err) {
            setShowPricing(!next); // revert on failure
            setError(err.message);
        } finally {
            setSaving(false);
        }
    }

    return (
        <div className="mt-6 flex items-center justify-between rounded-lg border border-gray-200 p-4">
            <div>
                <div className="text-sm font-medium text-gray-900">Show pricing</div>
                <div className="mt-0.5 text-sm text-gray-500">
                    When off, customers see your products but not the price. They can
                    still ask you the price on WhatsApp.
                </div>
                {error && <div className="mt-1 text-sm text-red-600">{error}</div>}
            </div>

            <button
                type="button"
                role="switch"
                aria-checked={showPricing}
                onClick={handleToggle}
                disabled={saving}
                className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${showPricing ? "bg-green-600" : "bg-gray-300"
                    } ${saving ? "opacity-60" : ""}`}
            >
                <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${showPricing ? "translate-x-6" : "translate-x-1"
                        }`}
                />
            </button>
        </div>
    );
};

export default ShowPricingToggle;