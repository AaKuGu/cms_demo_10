import { afterOnboardingActionGuard } from "@/lib/actions/action";
import { getPatientList } from "@/crud/Patient.crud";
import { serialize } from "@/lib/serialize";
import { PATIENT_PERMISSIONS } from "@/config/permissions";

export async function fetchAllPatients() {
  return afterOnboardingActionGuard(PATIENT_PERMISSIONS.VIEW_PATIENT, async ({ clinicId }) => {
    const patients = await getPatientList({ clinicId });
    return serialize(patients);
  });
}
