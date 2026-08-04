"use client";

export default function ProductParentSettings({ formValues, onToggle, isPending }) {
    return (
        <div className="space-y-6">
            <div className="rounded-xl border border-gray-200 bg-white p-5">
                <p className="mb-3 text-sm font-medium text-gray-900">Pricing</p>

                <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
                    <div>
                        <div className="text-sm font-medium text-gray-900">Show pricing</div>
                        <div className="mt-0.5 text-sm text-gray-500">
                            When off, customers see your products but not the price. They can
                            still ask you the price on WhatsApp.
                        </div>
                    </div>

                    <button
                        type="button"
                        role="switch"
                        aria-checked={formValues.showPricing}
                        onClick={() => onToggle("showPricing", !formValues.showPricing)}
                        disabled={isPending}
                        className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
                            formValues.showPricing ? "bg-gray-900" : "bg-gray-300"
                        } ${isPending ? "opacity-60" : ""}`}
                    >
                        <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                formValues.showPricing ? "translate-x-6" : "translate-x-1"
                            }`}
                        />
                    </button>
                </div>

                {/* Next product-level setting goes here as another row, same card. */}
            </div>
        </div>
    );
}