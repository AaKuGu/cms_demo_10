// lib/actions/afterOnboardingActionGuard.js
import { redirect } from "next/navigation";
import {
  getUserFromAuthLibraryFromSession,
  getAppUserFromSession
} from "@/lib/authentication/authentication";
import { tryCatchAction } from "@/lib/tryCatchAction";
import { ERRORS } from "../errors/errorMessages";
import { errorConsole, logConsole } from "../console/console";
import { routes } from "../routes/routes";

export function afterOnboardingActionGuard(fn) {
  return tryCatchAction(async () => {

    const userFromAuthLibrary = await getUserFromAuthLibraryFromSession();

    logConsole("lib/actions/afterOnboardingActionGuard : userFromAuthLibrary : ", userFromAuthLibrary);

    const userIdFromAuthLibrary = userFromAuthLibrary.id || null;

    logConsole("lib/actions/afterOnboardingActionGuard : userIdFromAuthLibrary : ", userIdFromAuthLibrary);

    if (!userIdFromAuthLibrary) {
      redirect(routes.login);
    }

    const appUser = await getAppUserFromSession();

    logConsole("lib/actions/afterOnboardingActionGuard : appUser : ", appUser);

    const onboarding = appUser?.onboarding || null;

    logConsole("lib/actions/afterOnboardingActionGuard : onboarding : ", onboarding)

    if (!onboarding) {
      redirect(routes.onboarding);
    }

    const appUserId = appUser._id || null;
    if (!appUserId) {
      redirect(routes.onboarding);
    }

    

    return fn({ appUser, appUserId });
  });
}

export function beforeOnboardingActionGuard(fn) {
  return tryCatchAction(async () => {

    const userFromAuthLibrary = await getUserFromAuthLibraryFromSession();

    logConsole("lib/actions/beforeOnboardingActionGuard : userFromAuthLibrary : ", userFromAuthLibrary);

    if (!userFromAuthLibrary) {
      redirect(routes.login);
    }

    const userIdFromAuthLibrary = userFromAuthLibrary.id || null;

    logConsole("lib/actions/beforeOnboardingActionGuard : userIdFromAuthLibrary : ", userIdFromAuthLibrary);

    if (!userIdFromAuthLibrary) {
      redirect(routes.login);
    }

    const appUser = await getAppUserFromSession();

    logConsole("lib/actions/beforeOnboardingActionGuard : appUser : ", appUser);

    const appUserId = appUser._id || null;

    logConsole("lib/actions/beforeOnboardingActionGuard : appUserId : ", appUserId);

    if (!appUserId) {
      redirect(routes.login)
    }

    const onboarding = appUser?.onboarding || null;

    if (onboarding) {
      redirect(routes.shops);
    }

    return fn({ appUser, appUserId, userIdFromAuthLibrary });
  });
}