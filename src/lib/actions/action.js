// lib/actions/afterOnboardingActionGuard.js
import { redirect } from "next/navigation";
import {
  getAppUserIdFromSession,
  getAuthenticationLibraryUserIdFromSession,
  getEmailFromSession,
  getNameFromSession,
} from "@/lib/authentication/authentication";
import { tryCatchAction } from "@/lib/tryCatchAction";
import { ERRORS } from "../errors/errorMessages";
import { errorConsole, logConsole } from "../console/console";

/**
 * Onboarding ke baad chalne wale actions ke liye.
 * Login + clinic setup + specific permission — sab check hote hain.
 */
export function afterOnboardingActionGuard(fn) {
  return tryCatchAction(async () => {
    const userIdFromAuthLibrary = await getAuthenticationLibraryUserIdFromSession();

    logConsole("lib/actions/afterOnboardingActionGuard : userIdFromAuthLibrary : ", userIdFromAuthLibrary)

    if (!userIdFromAuthLibrary) {
      redirect(routes.login);
    }


    const appUserId = await getAppUserIdFromSession();

    logConsole("lib/actions/afterOnboardingActionGuard : appUserId : ", appUserId)


    if (!appUserId) {
      redirect(routes.onboarding)
    }

    // const clinicId = await getClinicIdFromSession();
    // if (!clinicId) {
    //   throwError(ERRORS.CLINIC_ID_NOT_FOUND);
    // }

    const email = await getEmailFromSession();
    if (!email) {
      throwError(ERRORS.EMAIL_NOT_FOUND);
    }

    logConsole("lib/actions/afterOnboardingActionGuard/email : ", email)

    // const isOwner = await getIsOwnerFromSession();

    // const _isAuthorized = await isAuthorized({ email, clinicId, isOwner }, permission);
    // if (!_isAuthorized.allowed) {
    //   throwError(_isAuthorized.reason);
    // }

    return fn({ userIdFromAuthLibrary, appUserId, email });
    // return fn({ userId, clinicId, email, isOwner });
  });
}

export function beforeOnboardingActionGuard(fn) {

  return tryCatchAction(async () => {
    const userIdFromAuthLibrary = await getAuthenticationLibraryUserIdFromSession();


    if (!userIdFromAuthLibrary) {
      redirect(routes.login);
    }

    logConsole("lib/actions/beforeOnboardingActionGuard : userIdFromAuthLibrary : ", userIdFromAuthLibrary)

    const email = await getEmailFromSession();
    if (!email) {
      throwError(ERRORS.EMAIL_NOT_FOUND);
    }

    logConsole("lib/actions/beforeOnboardingActionGuard/email : ", email)


    const name = await getNameFromSession();
    if (!name) {
      throwError(ERRORS.NAME_FROM_AUTH_LIBRARY_NOT_FOUND);
    }

    logConsole("lib/actions/beforeOnboardingActionGuard/name : ", name)

    return fn({ userIdFromAuthLibrary, email, name });
  });
}