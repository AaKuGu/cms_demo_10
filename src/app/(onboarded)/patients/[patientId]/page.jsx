import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import ActionDenied from "@/components/ActionDenied";
import { fetchPatientById } from "@/lib/SSRCalls/patientSsrCalls";

export default async function PatientDetailPage({ params }) {
  const { patientId } = await params;
  const { data: patient, error } = await fetchPatientById(patientId);

  if (error) {
    return <ActionDenied message={error} />;
  }

  return (
    <div className="max-w-3xl">
      <PageHeader
        title={patient?.name || "Patient"}
        description="Patient record details."
        action={
          <div className="flex gap-2">
            <Link
              href={`/patients/${patientId}/edit`}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              Edit
            </Link>
            <Link
              href="/patients"
              className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800"
            >
              Back to patients
            </Link>
          </div>
        }
      />

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <p className="text-sm font-medium text-gray-500">Name</p>
            <p className="mt-2 text-gray-900">{patient?.name || "-"}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Email</p>
            <p className="mt-2 text-gray-900">{patient?.email || "-"}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Phone</p>
            <p className="mt-2 text-gray-900">{patient?.phone || "-"}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Date of Birth</p>
            <p className="mt-2 text-gray-900">{patient?.dateOfBirth ? new Date(patient.dateOfBirth).toLocaleDateString() : "-"}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Gender</p>
            <p className="mt-2 text-gray-900">{patient?.gender || "-"}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Address</p>
            <p className="mt-2 text-gray-900">{patient?.address || "-"}</p>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-sm font-medium text-gray-500">Notes</p>
          <p className="mt-2 whitespace-pre-wrap text-gray-900">{patient?.notes || "No notes added."}</p>
        </div>
      </div>
    </div>
  );
}
