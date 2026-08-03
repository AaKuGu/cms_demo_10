import { beforeOnboardingActionGuard } from "@/lib/actions/action";
import { getAppUserIdFromSession } from "@/lib/authentication/authentication";
import { logConsole } from "@/lib/console/console";
import { redirect } from "next/navigation";

export async function fetchAppUserId() {
    return beforeOnboardingActionGuard(async () => {
        const appUserId = await getAppUserIdFromSession();

        logConsole("ssrcalls : appUser : fetchAppUserId : appUserId ", appUserId)

        return appUserId;
    });
}