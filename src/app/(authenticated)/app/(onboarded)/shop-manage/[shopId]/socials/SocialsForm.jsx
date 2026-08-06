"use client";

const PLATFORM_OPTIONS = [
    "instagram",
    "facebook",
    "whatsapp",
    "youtube",
    "twitter",
    "linkedin",
    "tiktok",
    "pinterest",
];

export default function SocialsForm({
    links,
    isVisible,
    onVisibleChange,
    onLinkChange,
    onAddLink,
    onRemoveLink,
    onSubmit,
    isPending = false,
}) {
    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5">
                <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm font-medium text-gray-900">Social links</p>
                    <label className="flex items-center gap-2 text-sm text-slate-600">
                        <input
                            type="checkbox"
                            checked={isVisible}
                            onChange={(e) => onVisibleChange(e.target.checked)}
                        />
                        Show on storefront
                    </label>
                </div>

                <div className="space-y-3">
                    {links.map((link, index) => (
                        <div
                            key={index}
                            className="flex flex-col gap-2 rounded-lg border border-slate-100 p-3 sm:flex-row sm:items-center sm:border-0 sm:p-0"
                        >
                            <select
                                value={link.platform}
                                onChange={onLinkChange(index, "platform")}
                                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 sm:w-40 sm:shrink-0"
                            >
                                {PLATFORM_OPTIONS.map((platform) => (
                                    <option key={platform} value={platform}>
                                        {platform.charAt(0).toUpperCase() + platform.slice(1)}
                                    </option>
                                ))}
                            </select>

                            <input
                                type="text"
                                placeholder="https://..."
                                value={link.url}
                                onChange={onLinkChange(index, "url")}
                                className="w-full min-w-0 flex-1 rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300"
                            />

                            <button
                                type="button"
                                onClick={() => onRemoveLink(index)}
                                className="w-full shrink-0 rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-500 hover:bg-gray-50 sm:w-auto sm:py-2.5"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>

                <button
                    type="button"
                    onClick={onAddLink}
                    className="mt-4 w-full rounded-md border border-dashed border-gray-300 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 sm:w-auto"
                >
                    + Add another link
                </button>
            </div>

            <div className="flex justify-end gap-2">
                <button
                    type="submit"
                    disabled={isPending}
                    className="w-full rounded-md bg-gray-900 px-4 py-2 text-sm text-white disabled:opacity-60 sm:w-auto"
                >
                    {isPending ? "Saving..." : "Save Changes"}
                </button>
            </div>
        </form>
    );
}