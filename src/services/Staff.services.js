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

//we did nto use getStaffById in the following , and used getStaff, beause of this clinicId and 
// staffId both used for fitlerering
//vecause of this, we dont need to write an extrac check of if staff.clinciId !== clincId then....
export async function getStaffByStaffId(clinicId, staffId) {
  if (!clinicId || !staffId) {
    throwError("Staff.services: Invalid clinicId or staffId");
  }
  return getStaff({ _id: staffId, clinicId });
}
