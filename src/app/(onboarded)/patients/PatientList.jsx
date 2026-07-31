"use client";

import { useRouter } from "next/navigation";
import EmptyState from "@/components/EmptyState";
import ActionGroup from "@/components/ActionGroup";
import { getNameInitials } from "@/lib/ui/initials";
import { useState } from "react";
import { deletePatientAction } from "@/actions/Patient.actions";
import { errorToast, successToast } from "@/lib/toast";

export default function PatientList({ patients }) {
   const router = useRouter();
  const [deletingId, setDeletingId] = useState(null);

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

   const handleDelete = async (e, patientId) => {
    e.stopPropagation();
    if (!window.confirm("Delete this patient permanently? This cannot be undone.")) return;

    setDeletingId(patientId);
    const { error } = await deletePatientAction(patientId);
    setDeletingId(null);

    if (error) {
      errorToast(error);
      return;
    }
successToast("Patient deleted.");
    router.refresh();
  };

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

          <ActionGroup
            onEdit={(e) => {
              e.stopPropagation();
              router.push(`/patients/${patient._id}/edit`);
            }}
            onDelete={(e) => {
              e.stopPropagation();
              handleDelete(e, patient._id);
            }}
           isDeleting={deletingId === patient._id}
          />
        </div>
      ))}
    </div>
  );
}
