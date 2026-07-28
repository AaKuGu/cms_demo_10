"use client";

import { useRouter } from "next/navigation";
import EmptyState from "@/components/EmptyState";
import { getNameInitials } from "@/lib/ui/initials";

export default function PatientList({ patients }) {
  const router = useRouter();

  if (!patients || patients.length === 0) {
    return (
      <EmptyState
        title="No patients yet"
        description="Add your first patient to start building the clinic record."
        actionLabel="Add your first patient"
        onAction={() => router.push("/patients")}
      />
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 divide-y divide-gray-200">
      {patients.map((patient) => (
        <div
          key={patient._id}
          onClick={() => router.push(`/patients/${patient._id}`)}
          className="flex items-center justify-between px-5 py-4 transition-colors hover:bg-gray-50 cursor-pointer"
        >
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-900 text-xs font-semibold text-white">
              {getNameInitials(patient.name, "P")}
            </div>
            <div className="min-w-0">
              <p className="truncate font-medium text-gray-900">
                {patient.name || "Unnamed patient"}
              </p>
              <p className="truncate text-sm text-gray-500">
                {patient.email || patient.phone || "No contact details"}
              </p>
            </div>
          </div>

          <div className="shrink-0 text-right">
            <p className="text-sm font-medium text-gray-700">
              {patient.phone || "No phone"}
            </p>
            <p className="text-xs text-gray-500">
              {patient.status === "active" ? "Active" : "Inactive"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
