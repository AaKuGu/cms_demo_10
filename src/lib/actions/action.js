// lib/actions/afterOnboardingActionGuard.js
import { redirect } from "next/navigation";
import { 
  getClinicIdFromSession, 
  getEmailFromSession, 
  getIsOwnerFromSession, 
  getUserIdFromSession,
  getStaffIdFromSession,
} from "@/lib/authentication/authentication";
import { isAuthorized } from "@/lib/authorization/authorization";
import { throwError } from "@/lib/throwError";
import { tryCatchAction } from "@/lib/tryCatchAction";
import { ERRORS } from "../errors/errorMessages";

/**
 * Onboarding ke baad chalne wale actions ke liye.
 * Login + clinic setup + specific permission — sab check hote hain.
 */
export function afterOnboardingActionGuard(permission, fn) {
  return tryCatchAction(async () => {
    const userId = await getUserIdFromSession();
    if (!userId) {
      redirect("/login");
    }

    const clinicId = await getClinicIdFromSession();
    if (!clinicId) {
      throwError(ERRORS.CLINIC_ID_NOT_FOUND);
    }

    const email = await getEmailFromSession();
    if (!email) {
      throwError(ERRORS.EMAIL_NOT_FOUND);
    }

    const isOwner = await getIsOwnerFromSession();

    const _isAuthorized = await isAuthorized({ email, clinicId, isOwner }, permission);
    if (!_isAuthorized.allowed) {
      throwError(_isAuthorized.reason);
    }

    const staffId = await getStaffIdFromSession();

    return fn({ userId, clinicId, email, isOwner, staffId});
  });
}