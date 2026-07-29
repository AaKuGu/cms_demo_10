import PageHeader from "@/components/PageHeader";
import NewPatientForm from "./NewPatientForm";

export default function NewPatientPage() {
  return (
    <div className="max-w-2xl">
      <PageHeader title="Add Patient" description="Create a new patient record in your clinic system." />
      <NewPatientForm />
    </div>
  );
}
