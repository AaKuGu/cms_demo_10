import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import ActionDenied from "@/components/ActionDenied";
import { fetchPatientById } from "@/lib/SSRCalls/patientSsrCalls";
import EditPatientForm from "./EditPatientForm";

export default async function EditPatientPage({ params }) {
  const { patientId } = await params;
  const { data: patient, error } = await fetchPatientById(patientId);

  if (error) {
    return <ActionDenied message={error} />;
  }

  return (
    <div className="max-w-3xl">
      <PageHeader
        title={`Edit ${patient?.name || "Patient"}`}
        description="Update the patient profile details below."
        action={
          <Link
            href="/patients"
            className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800"
          >
            Back to patients
          </Link>
        }
      />

      <EditPatientForm initialValues={patient} />
    </div>
  );
}
