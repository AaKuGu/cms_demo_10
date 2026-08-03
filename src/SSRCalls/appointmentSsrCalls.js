import { afterOnboardingActionGuard } from "@/lib/actions/action";
import { getAppointmentList } from "@/crud/Appointment.crud";
import { serialize } from "@/lib/serialize";
import { APPOINTMENT_PERMISSIONS } from "@/config/permissions";

export async function fetchAllAppointments() {
  return afterOnboardingActionGuard(APPOINTMENT_PERMISSIONS.VIEW_APPOINTMENT, async ({ clinicId }) => {
    const appointments = await getAppointmentList({ clinicId });
    return serialize(appointments);
  });
}
