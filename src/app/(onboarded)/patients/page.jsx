import { fetchAllPatients } from "@/lib/SSRCalls/patientSsrCalls";
import PageHeader from "@/components/PageHeader";
import ActionDenied from "@/components/ActionDenied";
import PatientList from "./PatientList";

async function PatientsPage() {
  const { data: patients, error } = await fetchAllPatients();

  if (error) {
    return <ActionDenied message={error} />;
  }

  return (
    <div>
      <PageHeader
        title="Patients"
        description="Manage your clinic patients and their records."
        rightButton={{ href: "/patients", label: "Add Patient" }}
      />
      <PatientList patients={patients} />
    </div>
  );
}

export default PatientsPage;
