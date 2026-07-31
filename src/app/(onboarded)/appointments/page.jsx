import { fetchAllAppointments } from "@/lib/SSRCalls/appointmentSsrCalls";
import PageHeader from "@/components/PageHeader";
import ActionDenied from "@/components/ActionDenied";

async function AppointmentsPage() {
  const { data: appointments, error } = await fetchAllAppointments();

  if (error) {
    return <ActionDenied message={error} />;
  }

  return (
    <div>
      <PageHeader
        title="Appointments"
        description="Manage your clinic schedule and upcoming visits."
        rightButton={{ href: "/appointments/new", label: "Create Appointment" }}

      />

      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <p className="text-sm text-gray-500">
          Appointment data is now being fetched from the server and will be rendered here later.
        </p>
        <pre className="mt-4 overflow-x-auto rounded-lg bg-gray-50 p-4 text-xs text-gray-700">
          {JSON.stringify(appointments, null, 2)}
        </pre>
      </div>
    </div>
  );
}

export default AppointmentsPage;