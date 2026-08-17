"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { afterOnboardingActionGuard } from "@/lib/actions/action";
import { getTeamMember } from "@/crud/TeamMember.crud";
import { routes } from "@/lib/routes/routes";
import { logConsole } from "@/lib/console/console";

export async function selectManagedClientAction(clientOwnerId) {
    return afterOnboardingActionGuard(async ({ appUser }) => {
        logConsole("actions/workspace : selectManagedClientAction : clientOwnerId ", clientOwnerId);

        const delegation = await getTeamMember({
            ownerId: clientOwnerId,
            email: appUser.email,
        });
        logConsole("actions/workspace : selectManagedClientAction : delegation ", delegation);

        if (!delegation) {
            throwError("You are not authorized to manage this client.");
        }

        (await cookies()).set("managingBusinessUserId", clientOwnerId.toString(), {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            path: "/",
        });

        redirect(routes.shops);
    });
}

export async function selectOwnWorkspaceAction() {
    return afterOnboardingActionGuard(async ({ appUserId }) => {
        logConsole("actions/workspace : selectOwnWorkspaceAction : appUserId ", appUserId);

        (await cookies()).set("managingBusinessUserId", appUserId.toString(), {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            path: "/",
        });

        redirect(routes.shops);
    });
}

export async function clearWorkspaceCookieAction() {
    logConsole("actions/workspace : clearWorkspaceCookieAction : clearing managingBusinessUserId");
    (await cookies()).delete("managingBusinessUserId");
}