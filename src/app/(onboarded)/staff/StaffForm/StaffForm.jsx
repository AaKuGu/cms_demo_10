"use client";

import FormInput from "@/components/FormInput";
import PermissionsSelector from "../PermissionsSelector";

export default function StaffForm({
  formValues,
  onChange,
  selected,
  onSelectedChange,
  onSubmit,
  onCancel,
  isPending = false,
  submitLabel = "Send Invite",
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <p className="mb-3 text-sm font-medium text-gray-900">Basic Details</p>
        <div className="grid gap-3 md:grid-cols-2">
          <FormInput
            label="Full Name"
            name="name"
            placeholder="e.g. Riya Sharma"
            value={formValues.name}
            onChange={onChange("name")}
          />
          <FormInput
            label="Email"
            name="email"
            type="email"
            placeholder="e.g. riya@example.com"
            value={formValues.email}
            onChange={onChange("email")}
          />
          <FormInput
            label="Phone"
            name="phone"
            type="tel"
            hint="Optional"
            value={formValues.phone}
            onChange={onChange("phone")}
          />
          <FormInput
            label="Designation"
            name="designation"
            placeholder="e.g. Receptionist"
            hint="Optional"
            value={formValues.designation}
            onChange={onChange("designation")}
          />
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <p className="mb-4 text-sm font-medium text-gray-900">Permissions</p>
        <PermissionsSelector selected={selected} onChange={onSelectedChange} />
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