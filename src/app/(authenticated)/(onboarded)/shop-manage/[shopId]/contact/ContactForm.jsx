"use client";

export default function ContactForm({
    email,
    onEmailChange,
    contactNumbers,
    onNumberChange,
    onAddNumber,
    onRemoveNumber,
    workingHours,
    onWorkingHoursChange,
    googleMapLink,
    onGoogleMapLinkChange,
    isVisible,
    onVisibleChange,
    onSubmit,
    isPending = false,
}) {
    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5">
                <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm font-medium text-gray-900">Contact details</p>
                    <label className="flex items-center gap-2 text-sm text-slate-600">
                        <input
                            type="checkbox"
                            checked={isVisible}
                            onChange={(e) => onVisibleChange(e.target.checked)}
                        />
                        Show on storefront
                    </label>
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                    <div className="md:col-span-2">
                        <label className="mb-1.5 block text-sm font-medium text-slate-700">Email</label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => onEmailChange(e.target.value)}
                            className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="mb-1.5 block text-sm font-medium text-slate-700">
                            Contact numbers <span className="text-slate-400">(max 2)</span>
                        </label>

                        <div className="space-y-2">
                            {contactNumbers.map((entry, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col gap-2 rounded-lg border border-slate-100 p-3 sm:flex-row sm:items-center sm:border-0 sm:p-0"
                                >
                                    <select
                                        value={entry.type}
                                        onChange={onNumberChange(index, "type")}
                                        className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 sm:w-32 sm:shrink-0"
                                    >
                                        <option value="phone">Phone</option>
                                        <option value="whatsapp">WhatsApp</option>
                                    </select>

                                    <input
                                        type="text"
                                        placeholder="e.g. 9876543210"
                                        value={entry.number}
                                        onChange={onNumberChange(index, "number")}
                                        className="w-full min-w-0 flex-1 rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => onRemoveNumber(index)}
                                        className="w-full shrink-0 rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-500 hover:bg-gray-50 sm:w-auto sm:py-2.5"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>

                        {contactNumbers.length < 2 && (
                            <button
                                type="button"
                                onClick={onAddNumber}
                                className="mt-2 w-full rounded-md border border-dashed border-gray-300 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 sm:w-auto"
                            >
                                + Add another number
                            </button>
                        )}
                    </div>

                    <div className="md:col-span-2">
                        <label className="mb-1.5 block text-sm font-medium text-slate-700">Working hours</label>
                        <input
                            type="text"
                            placeholder="e.g. Mon–Sat, 10 AM – 8 PM"
                            value={workingHours}
                            onChange={(e) => onWorkingHoursChange(e.target.value)}
                            className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="mb-1.5 block text-sm font-medium text-slate-700">Google Maps link</label>
                        <input
                            type="text"
                            placeholder="https://maps.google.com/..."
                            value={googleMapLink}
                            onChange={(e) => onGoogleMapLinkChange(e.target.value)}
                            className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300"
                        />
                    </div>
                </div>
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