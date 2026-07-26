import { getStaff } from "@/crud/Staff.crud";
import { ERRORS } from "../errors/errorMessages";

export const checkAuthorization = async ({ email, clinicId, isOwner }, permissionRequest) => {
  if(isOwner) {
    return { allowed: true, reason: "User is owner." };
  }
  const staff = await getStaff({ email, clinicId });
  if (!staff) {
    return { allowed: false, reason: ERRORS.STAFF_NOT_FOUND };
  }
  if (!staff.permissions || !staff.permissions.includes(permissionRequest)) {
    return { allowed: false, reason: ERRORS.PERMISSION_DENIED };
  }
  return { allowed: true, reason: "Authorization successful." };

}

//params = { authData: { email, clinicId, isOwner }, permissionRequest: string }
export const isAuthorized = async (authData, permissionRequest) => {
  const { allowed, reason } = await checkAuthorization(authData, permissionRequest);
  return { allowed, reason };
}