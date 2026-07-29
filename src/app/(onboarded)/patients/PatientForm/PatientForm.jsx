"use client";

import FormInput from "@/components/FormInput";

export default function PatientForm({
  formValues,
  onChange,
  onSubmit,
  onCancel,
  isPending = false,
  submitLabel = "Add Patient",
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <p className="mb-3 text-sm font-medium text-gray-900">Basic details</p>
        <div className="grid gap-3 md:grid-cols-2">
          <FormInput
            label="Full Name"
            name="name"
            placeholder="e.g. Asha Patel"
            value={formValues.name}
            onChange={onChange("name")}
          />
          <FormInput
            label="Email"
            name="email"
            type="email"
            placeholder="e.g. asha@example.com"
            hint="Optional"
            value={formValues.email}
            onChange={onChange("email")}
          />
          <FormInput
            label="Phone"
            name="phone"
            type="tel"
            placeholder="e.g. 9876543210"
            hint="Optional"
            value={formValues.phone}
            onChange={onChange("phone")}
          />
          <FormInput
            label="Date of Birth"
            name="dateOfBirth"
            type="date"
            value={formValues.dateOfBirth}
            onChange={onChange("dateOfBirth")}
          />
          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-sm font-medium text-slate-700">Gender</label>
            <div className="flex flex-wrap gap-3 rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-700">
              {[
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
                { value: "other", label: "Other" },
                { value: "prefer_not_to_say", label: "Prefer not to say" },
              ].map((option) => (
                <label key={option.value} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="gender"
                    value={option.value}
                    checked={formValues.gender === option.value}
                    onChange={onChange("gender")}
                    className="h-4 w-4 border-slate-300 text-slate-900 focus:ring-slate-400"
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
            <p className="text-xs text-slate-400">Optional</p>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <p className="mb-3 text-sm font-medium text-gray-900">Address & Notes</p>
        <div className="grid gap-3">
          <FormInput
            label="Address"
            name="address"
            placeholder="e.g. 12, Ashok Vihar, Delhi"
            hint="Optional"
            value={formValues.address}
            onChange={onChange("address")}
          />
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700">Notes</label>
            <textarea
              name="notes"
              rows={4}
              placeholder="Add any important patient notes"
              value={formValues.notes}
              onChange={onChange("notes")}
              className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md border border-gray-300 px-4 py-2 text-sm"
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
