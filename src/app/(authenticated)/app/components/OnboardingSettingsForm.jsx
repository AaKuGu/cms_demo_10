"use client";

import FormInput from "@/components/FormInput";

export default function OnboardingSettingsForm({
    formValues,
    onChange,
    onSubmit,
    onCancel,
    isPending = false,
    submitLabel = "Save Details",
}) {
    return (
        <form onSubmit={onSubmit} className="mx-auto max-w-xl space-y-6">
            <div>
                <h1 className="text-lg font-semibold text-gray-900">Onboarding</h1>
                <p className="mt-1 text-sm text-gray-500">Add your details to finish setting up your account.</p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5">
                <p className="mb-3 text-sm font-medium text-gray-900">Your details</p>
                <div className="grid gap-3">
                    <FormInput
                        label="Full Name"
                        name="name"
                        placeholder="e.g. Priya Sharma"
                        value={formValues.name}
                        onChange={onChange("name")}
                    />

                    <FormInput
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="e.g. priya@example.com"
                        hint="Email can't be changed"
                        value={formValues.email}
                        onChange={onChange("email")}
                        readOnly
                        className="cursor-not-allowed bg-slate-50 text-slate-500"
                    />

                    <FormInput
                        label="Phone / WhatsApp Number"
                        name="phone"
                        type="tel"
                        placeholder="e.g. 9876543210"
                        hint="We'll add +91 automatically — just enter your 10-digit number. We'll use this to reach you on WhatsApp with important updates"
                        value={formValues.phone}
                        onChange={onChange("phone")}
                    />
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