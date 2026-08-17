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
        <form onSubmit={onSubmit} className="mb-6">
            <div className="rounded-xl border border-gray-200 bg-white p-5">
                <p className="mb-3 text-sm font-medium text-gray-900">Team member details</p>

                <FormInput
                    label="Email address"
                    name="email"
                    type="email"
                    placeholder="e.g. staff@example.com"
                    hint="They'll get full access to manage this shop once they log in with this email."
                    value={formValues.email}
                    onChange={onChange("email")}
                    required
                />
            </div>

            <div className="mt-4 flex justify-end gap-2">
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
                    {isPending ? "Adding..." : submitLabel}
                </button>
            </div>
        </form>
    );
}