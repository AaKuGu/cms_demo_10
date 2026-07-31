import PageHeader from "@/components/PageHeader";
import NewAppointmentForm from "./NewAppointmentForm";

export default function NewAppointmentPage() {
  return (
    <div className="max-w-2xl">
      <PageHeader title="Add Appointment" description="Create a new appointment record in your clinic system." />
      <NewAppointmentForm />
    </div>
  );
}
