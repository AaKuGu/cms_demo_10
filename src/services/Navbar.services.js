import { getClinicById } from "@/crud/Clinic.crud";

export async function getClinicName(clinicId) {
  const clinic = await getClinicById(clinicId);
  return clinic?.clinicName ?? null;
}