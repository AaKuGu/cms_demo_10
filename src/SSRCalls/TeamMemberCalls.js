import { afterOnboardingActionGuard } from "@/lib/actions/action";
import { serialize } from "@/lib/serialize";
import { logConsole } from "@/lib/console/console";
import { getTeamMemberList } from "@/crud/Team.crud";

export async function fetchAllTeamMembers() {
    return afterOnboardingActionGuard(async ({ appUserId }) => {

        logConsole("ssrcalls : Team Members : fetchAllTeamMembers : appUserId ", appUserId)

        const teamMembers = await getTeamMemberList({ ownerId: appUserId });

        logConsole("ssrcalls : Team Members : fetchAllTeamMembers : teamMembers ", teamMembers)

        return serialize(teamMembers);
    });
}