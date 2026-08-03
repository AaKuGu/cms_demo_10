"use client";

import FormInput from "@/components/FormInput";

export default function ShopForm({
    formValues,
    onChange,
    onSubmit,
    onCancel,
    isPending = false,
    submitLabel = "Add Shop",
}) {
    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <div className="rounded-xl border border-gray-200 bg-white p-5">
                <p className="mb-3 text-sm font-medium text-gray-900">Shop details</p>
                <div className="grid gap-3 md:grid-cols-2">
                    <div className="md:col-span-2">
                        <FormInput
                            label="Shop Name"
                            name="name"
                            placeholder="e.g. Green Leaf Boutique"
                            value={formValues.name}
                            onChange={onChange("name")}
                        />
                    </div>

                    <div className="md:col-span-2">
                        <FormInput
                            label="Store URL"
                            name="slug"
                            placeholder="e.g. green-leaf-boutique"
                            hint={
                                formValues.slug
                                    ? `shop99.com/${formValues.slug}`
                                    : "Lowercase letters, numbers, and hyphens only"
                            }
                            value={formValues.slug}
                            onChange={onChange("slug")}
                        />
                    </div>

                    <div className="md:col-span-2">
                        <FormInput
                            label="WhatsApp Number"
                            name="phone"
                            type="tel"
                            placeholder="e.g. 9876543210"
                            hint="Customers will message you directly on WhatsApp from your store"
                            value={formValues.phone}
                            onChange={onChange("phone")}
                        />
                    </div>

                    <div className="md:col-span-2">
                        <FormInput
                            label="Address"
                            name="address"
                            placeholder="e.g. 42 Market Road, Bengaluru"
                            hint="Optional"
                            value={formValues.address}
                            onChange={onChange("address")}
                        />
                    </div>

                    <div className="md:col-span-2">
                        <FormInput
                            label="Google Maps Link"
                            name="googleMapLink"
                            type="url"
                            placeholder="https://maps.google.com/..."
                            hint="Optional"
                            value={formValues.googleMapLink}
                            onChange={onChange("googleMapLink")}
                        />
                    </div>

                    <div className="md:col-span-2">
                        <FormInput
                            label="Logo URL"
                            name="logo"
                            type="url"
                            placeholder="https://example.com/logo.png"
                            hint="Optional"
                            value={formValues.logo}
                            onChange={onChange("logo")}
                        />
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-2">
                <button
                    type="button"
                    onClick={onCancel}
                    className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isPending}
                    className="rounded-md bg-gray-900 px-4 py-2 text-sm text-white disabled:opacity-60"
                >
                    {isPending ? "Saving..." : submitLabel}
                </button>
            </div>
        </form>
    );
}