import { getStaff, getStaffList } from "@/crud/Staff.crud";
import { getClinicIdFromSession, getEmailFromSession, getIsOwnerFromSession, getUserIdFromSession } from "@/lib/authentication/authentication";
import { isAuthorized } from "@/lib/authorization/authorization";
import { serialize } from "@/lib/serialize";
import { throwError } from "@/lib/throwError";
import { tryCatchAction } from "@/lib/tryCatchAction";
import { redirect } from "next/navigation";

export async function getStaffs() {
return tryCatchAction(async () => {
  const userId = await getUserIdFromSession();
  if (!userId) {
    redirect('/login'); // auth failure ke liye ye zyada clean hai throw se
  }

  const clinicId = await getClinicIdFromSession();
 if (!clinicId) {
  throwError('Clinic not set up.'); // tryCatchAction catch karega, error.tsx trigger nahi hoga
}
  const isOwner = await getIsOwnerFromSession();

  const email = await getEmailFromSession();
  if (!email) {
    throwError('Email not found in session.'); 
  }

  const _isAuthorized = await isAuthorized({ email, clinicId, isOwner }, "view_staff");
  if (!_isAuthorized.allowed) {
    throwError(_isAuthorized.reason);
  }

  console.log("getStaffs: userId, clinicId, email, isOwner", { userId, clinicId, email, isOwner });

  const staffs = await getStaffList({ clinicId });

  console.log("getStaffs response:", { staffs });

  return serialize(staffs);
})};

export async function getStaffByEmail(email) {
  const { clinicId } = await afterOnboardingServicesGuard("view_staff"); // adjust permission string

  if (!email) {
    throwError("Staff.services: Invalid email");
  }
  return getStaff({ clinicId, email });
}
//we did nto use getStaffById in the following , and used getStaff, beause of this clinicId and 
// staffId both used for fitlerering
//vecause of this, we dont need to write an extrac check of if staff.clinciId !== clincId then....
export async function getStaffByStaffId(staffId) {
  const { clinicId } = await afterOnboardingServicesGuard("view_staff"); // adjust permission string

  if (!staffId) {
    throwError("Staff.services: Invalid staffId");
  }
  return getStaff({ _id: staffId, clinicId });
}


export async function createStaff(formData) {
 

  const { clinicId } = await afterOnboardingServicesGuard("create_staff"); // adjust permission string

 const rawValues = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    designation: formData.get("designation"),
    permissions: JSON.parse(formData.get("permissions") || "[]"),
  };

  const parsed = parseOrReturnError(createStaffValidator, rawValues);
  if (!parsed.success) return parsed.response;

  return tryCatchAction(async () => {

    //no passin gof lcinciId from here
    const existingStaff = await getStaffByEmail(clinicId, parsed.data.email);
    if (existingStaff) {
      return { error: "This email has already been invited." };
    }
    
    const created = await createStaff({ ...parsed.data, clinicId });
    if (!created) {
      return { error: "Failed to invite staff member. Please try again." };
    }

    return { success: "Staff invited!", redirectTo: "/staff" };
  }, rawValues);
}
