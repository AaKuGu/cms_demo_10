"use client";

import FormInput from "@/components/FormInput";

export default function TeamMemberForm({
    formValues,
    onChange,
    onSubmit,
    onCancel,
    isPending = false,
    submitLabel = "Add Team Member",
}) {
    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <div className="rounded-xl border border-gray-200 bg-white p-5">
                <p className="mb-3 text-sm font-medium text-gray-900">Team member details</p>
                <div className="grid gap-3 md:grid-cols-2">
                    <div className="md:col-span-2">
                        <FormInput
                            label="Email address"
                            name="email"
                            type="email"
                            placeholder="e.g. teammate@example.com"
                            hint="They'll be able to manage your stores once added"
                            value={formValues.email}
                            onChange={onChange("email")}
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