"use client";

import FormInput from "@/components/FormInput";
import ImageUploadMultiple from "@/components/ImageUploadMultiple";

export default function ProductForm({
    formValues,
    onChange,
    onImagesChange,
    onSubmit,
    onCancel,
    isPending = false,
    submitLabel = "Add Product",
    shopId,
    categories = [],
}) {
    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <div className="rounded-xl border border-gray-200 bg-white p-5">
                <p className="mb-3 text-sm font-medium text-gray-900">Product details</p>

                <div className="grid gap-3 md:grid-cols-2">
                    <div className="md:col-span-2">
                        <label className="mb-1.5 block text-sm font-medium text-slate-700">Shop</label>
                        <input
                            type="text"
                            value={shopId}
                            readOnly
                            className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <ImageUploadMultiple
                            value={formValues.images}
                            onChange={onImagesChange}
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="mb-1.5 block text-sm font-medium text-slate-700">Category</label>
                        <select
                            name="categoryId"
                            value={formValues.categoryId || ""}
                            onChange={onChange("categoryId")}
                            className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300"
                        >
                            <option value="">No category</option>
                            {categories.map((category) => (
                                <option key={category._id} value={category._id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="md:col-span-2">
                        <FormInput
                            label="Product Name"
                            name="name"
                            placeholder="e.g. Cotton T-Shirt"
                            value={formValues.name}
                            onChange={onChange("name")}
                        />
                    </div>

                    <div className="md:col-span-2">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-slate-700">Description</label>
                            <textarea
                                name="desc"
                                rows={4}
                                placeholder="Add product description"
                                value={formValues.desc}
                                onChange={onChange("desc")}
                                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300"
                            />
                        </div>
                    </div>

                    <div className="md:col-span-2">
                        <FormInput
                            label="Price"
                            name="price"
                            type="number"
                            min="0"
                            step="0.01"
                            placeholder="0.00"
                            value={formValues.price}
                            onChange={onChange("price")}
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