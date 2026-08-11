import { beforeOnboardingActionGuard } from "@/lib/actions/action";
import { getEmailFromAppUserSession, getNameFromAppUserSession } from "@/lib/authentication/authentication";
import { logConsole } from "@/lib/console/console";

export async function fetchAppUserId() {
    return beforeOnboardingActionGuard(async ({ appUser }) => {

        logConsole("ssrcalls : appUser : fetchAppUserId : appUser ", appUser)

        return appUser?._id;
    });
}

export async function onboardingInitialDetails() {
    return beforeOnboardingActionGuard(async ({ appUser }) => {

        const name = appUser?.name;

        const email = appUser?.email;

        logConsole("ssrcalls : appUser : onboardingInitialDetails :  name, email", name, email)

        return { name, email }
    });
}