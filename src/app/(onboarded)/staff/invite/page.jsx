"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/PageHeader";

const PERMISSION_GROUPS = [
  {
    resource: "Patients",
    permissions: [
      { key: "create_patient", label: "Create" },
      { key: "view_patient", label: "View" },
      { key: "update_patient", label: "Update" },
      { key: "delete_patient", label: "Delete" },
    ],
  },
  {
    resource: "Appointments",
    permissions: [
      { key: "create_appointment", label: "Create" },
      { key: "view_appointment", label: "View" },
      { key: "update_appointment", label: "Update" },
      { key: "delete_appointment", label: "Delete" },
    ],
  },
  {
    resource: "Billing",
    permissions: [
      { key: "create_billing", label: "Create" },
      { key: "view_billing", label: "View" },
      { key: "update_billing", label: "Update" },
      { key: "delete_billing", label: "Delete" },
    ],
  },
  {
    resource: "Prescriptions",
    permissions: [
      { key: "create_prescription", label: "Create" },
      { key: "view_prescription", label: "View" },
      { key: "update_prescription", label: "Update" },
      { key: "delete_prescription", label: "Delete" },
    ],
  },
  {
    resource: "Reports",
    permissions: [{ key: "view_reports", label: "View" }],
  },
];

export default function InviteStaffPage() {
  const router = useRouter();
  const [selected, setSelected] = useState([]);

  const togglePermission = (key) => {
    setSelected((prev) =>
      prev.includes(key) ? prev.filter((p) => p !== key) : [...prev, key]
    );
  };

  return (
    <div className="max-w-2xl">
      <PageHeader title="Invite Staff" />

      <div className="border rounded-lg p-5 mb-6">
        <p className="text-sm font-medium mb-3">Basic Details</p>
        <div className="grid grid-cols-2 gap-3">
          <input placeholder="Full Name" className="border rounded-md px-3 py-2 text-sm" />
          <input placeholder="Email" className="border rounded-md px-3 py-2 text-sm" />
          <input placeholder="Phone" className="border rounded-md px-3 py-2 text-sm" />
          <input placeholder="Designation (e.g. Receptionist)" className="border rounded-md px-3 py-2 text-sm" />
          <input
            placeholder="Address"
            className="border rounded-md px-3 py-2 text-sm col-span-2"
          />
        </div>
      </div>

      <div className="border rounded-lg p-5 mb-6">
        <p className="text-sm font-medium mb-4">Permissions</p>
        <div className="flex flex-col gap-4">
          {PERMISSION_GROUPS.map((group) => (
            <div key={group.resource}>
              <p className="text-sm text-gray-600 mb-2">{group.resource}</p>
              <div className="flex flex-wrap gap-4">
                {group.permissions.map((perm) => (
                  <label key={perm.key} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={selected.includes(perm.key)}
                      onChange={() => togglePermission(perm.key)}
                    />
                    {perm.label}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <button
          onClick={() => router.push("/staff")}
          className="px-4 py-2 rounded-md text-sm border"
        >
          Cancel
        </button>
        <button className="px-4 py-2 rounded-md bg-gray-900 text-white text-sm">
          Send Invite
        </button>
      </div>
    </div>
  );
}