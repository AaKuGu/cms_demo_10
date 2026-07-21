import { getStaff, getStaffList } from "@/crud/Staff.crud";
import { throwError } from "@/lib/throwError";

export async function getStaffs(clinicId) {
  if(!clinicId){

    throwError("ClinicId is not found");
  }
  return getStaffList({ clinicId });
}

export async function getStaffByEmail(clinicId, email) {
  if (!clinicId || !email) {
    throwError("Staff.services: Invalid clinicId or email");
  }
  return getStaff({ clinicId, email });
}