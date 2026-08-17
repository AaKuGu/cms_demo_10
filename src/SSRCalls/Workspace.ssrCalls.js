import { afterOnboardingActionGuard } from "@/lib/actions/action";
import { getTeamMemberList } from "@/crud/TeamMember.crud";
import { getAppUserList } from "@/crud/AppUser.crud";
import { serialize } from "@/lib/serialize";
import { logConsole } from "@/lib/console/console";

export async function workSpaceAccessCheck() {
    return afterOnboardingActionGuard(async ({ appUserId }) => {

        logConsole("ssrCalls : workSpaceAccessCheck ")

        return null;
    });
}

export async function getManagedClients() {
    return afterOnboardingActionGuard(async ({ appUser }) => {

        logConsole("ssrCalls : workspace : getManagedClients : appUser.email ", appUser.email);

        const teamMemberships = await getTeamMemberList({ email: appUser.email });
        logConsole("ssrCalls : workspace : getManagedClients : teamMemberships ", teamMemberships);

        if (!teamMemberships?.length) {
            return serialize([]);
        }

        const ownerIds = teamMemberships.map((t) => t.ownerId);

        const owners = await getAppUserList({ _id: { $in: ownerIds } });
        logConsole("ssrCalls : workspace : getManagedClients : owners ", owners);

        return serialize(owners);
    });
}

import { getAppUserById } from "@/crud/AppUser.crud";

export async function getWorkspaceContext() {
    return afterOnboardingActionGuard(async ({ appUserId, managingBusinessUserId, appUser }) => {

        logConsole("ssrCalls : workspace : getWorkspaceContext : appUserId ", appUserId);
        logConsole("ssrCalls : workspace : getWorkspaceContext : managingBusinessUserId ", managingBusinessUserId);

        const isOwn = managingBusinessUserId.toString() === appUserId.toString();

        if (isOwn) {
            return serialize({
                isOwn: true,
                businessName: appUser.businessName || appUser.name,
            });
        }

        // delegated case — guard ne sirf ID di hai, display ke liye actual record fetch karo
        const managingBusinessUser = await getAppUserById(managingBusinessUserId);
        logConsole("ssrCalls : workspace : getWorkspaceContext : managingBusinessUser ", managingBusinessUser);

        return serialize({
            isOwn: false,
            businessName: managingBusinessUser?.businessName || managingBusinessUser?.name,
        });
    });
}