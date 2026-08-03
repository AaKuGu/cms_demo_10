import { afterOnboardingActionGuard } from "@/lib/actions/action";
import { getPatientById, getPatientList } from "@/crud/Patient.crud";
import { serialize } from "@/lib/serialize";
import { PATIENT_PERMISSIONS } from "@/config/permissions";
import { throwError } from "@/lib/throwError";

export async function fetchAllPatients() {
  return afterOnboardingActionGuard(PATIENT_PERMISSIONS.VIEW_PATIENT, async ({ clinicId }) => {
    const patients = await getPatientList({ clinicId });
    return serialize(patients);
  });
}

export async function fetchPatientById(patientId) {
  return afterOnboardingActionGuard(PATIENT_PERMISSIONS.VIEW_PATIENT, async ({ clinicId }) => {
    if (!patientId) {
      throwError("Patient ID is required.");
    }

    const patient = await getPatientById(patientId);
    if (!patient) {
      throwError("Patient not found.");
    }

    if (patient.clinicId.toString() !== clinicId.toString()) {
      throwError("You are not authorized to view this patient.");
    }

    return serialize(patient);
  });
}
