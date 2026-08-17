"use client";

import ImageUpload from "@/components/ImageUpload";

export default function CategoryForm({
    formValues,
    onChange,
    onSubmit,
    onCancel,
    isPending = false,
    submitLabel = "Add Category",
}) {
    return (
        <form onSubmit={onSubmit} className="mb-6">
            <div className="grid gap-4 md:grid-cols-3">
                <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                        Category name
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formValues.name}
                        onChange={onChange("name")}
                        placeholder="e.g. Men"
                        className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
                        required
                    />
                </div>

                <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                        Slug
                    </label>
                    <input
                        type="text"
                        name="slug"
                        value={formValues.slug}
                        onChange={onChange("slug")}
                        placeholder="e.g. men"
                        className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
                        required
                    />
                </div>

                <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                        Description
                    </label>
                    <input
                        type="text"
                        name="description"
                        value={formValues.description}
                        onChange={onChange("description")}
                        placeholder="Optional description"
                        className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
                    />
                </div>
            </div>

            <div className="mt-4">
                <ImageUpload
                    value={formValues.image}
                    onChange={(url) =>
                        onChange("image")({ target: { value: url } })
                    }
                    label="Category Image"
                />
            </div>

            <div className="mt-4 flex justify-end gap-2">
                <button
                    type="button"
                    onClick={onCancel}
                    className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                    Reset
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