import { afterOnboardingActionGuard } from "@/lib/actions/action";
import { getTeamMemberList, getTeamMemberById } from "@/crud/TeamMember.crud";
import { serialize } from "@/lib/serialize";
import { logConsole } from "@/lib/console/console";

export async function fetchAllTeamMembers() {
    return afterOnboardingActionGuard(async ({ appUserId }) => {
        logConsole("ssrcalls : teamMember : fetchAllTeamMembers : appUserId ", appUserId);

        const teamMembers = await getTeamMemberList({ ownerId: appUserId });
        logConsole("ssrcalls : teamMember : fetchAllTeamMembers : teamMembers ", teamMembers);

        return serialize(teamMembers);
    });
}

export async function fetchTeamMemberById(teamMemberId) {
    return afterOnboardingActionGuard(async ({ appUserId }) => {
        logConsole("ssrcalls : teamMember : fetchTeamMemberById : appUserId ", appUserId);
        logConsole("ssrcalls : teamMember : fetchTeamMemberById : teamMemberId ", teamMemberId);

        const teamMember = await getTeamMemberById(teamMemberId);
        logConsole("ssrcalls : teamMember : fetchTeamMemberById : teamMember ", teamMember);

        if (teamMember && teamMember.ownerId?.toString() !== appUserId.toString()) {
            return serialize(null);
        }

        return serialize(teamMember);
    });
}