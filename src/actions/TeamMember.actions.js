"use server";

import { revalidatePath } from "next/cache";
import { createTeamMember, deleteTeamMemberById, getTeamMemberById, getTeamMember, updateTeamMemberById } from "@/crud/TeamMember.crud";
import { afterOnboardingActionGuard } from "@/lib/actions/action";
import { logConsole } from "@/lib/console/console";
import { serialize } from "@/lib/serialize";
import { throwError } from "@/lib/throwError";
import { validateInputs } from "@/lib/validateInputs";
import { createTeamMemberValidator, updateTeamMemberValidator } from "@/validators/TeamMember.validators";
import { routes } from "@/lib/routes/routes";

export async function createTeamMemberAction(formData) {
    return afterOnboardingActionGuard(async ({ appUser, appUserId }) => {

        logConsole("actions/teamMember : createTeamMemberAction : appUserId ", appUserId);
        logConsole("actions/teamMember : createTeamMemberAction : formData ", formData);

        const rawValues = {
            email: formData.get("email"),
        };

        logConsole("actions/teamMember : createTeamMemberAction : rawValues ", rawValues);

        const validated = validateInputs(createTeamMemberValidator, rawValues);
        logConsole("actions/teamMember : createTeamMemberAction : validated ", validated);

        if (!validated.success) {
            throwError(validated.error);
        }

        if (validated.data.email === appUser.email) {
            throwError("You cannot add yourself as a team member.");
        }

        const existing = await getTeamMember({
            ownerId: appUserId,
            email: validated.data.email,
        });
        logConsole("actions/teamMember : createTeamMemberAction : existing ", existing);

        if (existing) {
            throwError("This email has already been added as a team member.");
        }

        const created = await createTeamMember({
            ...validated.data,
            ownerId: appUserId,
        });
        logConsole("actions/teamMember : createTeamMemberAction : created ", created);

        if (!created) {
            throwError("Failed to add team member. Please try again.");
        }

        revalidatePath(routes.team);

        return serialize(created);
    });
}

export async function removeTeamMemberAction(teamMemberId) {
    return afterOnboardingActionGuard(async ({ appUserId , managingBusinessUserId}) => {
        logConsole("actions/teamMember : removeTeamMemberAction : teamMemberId ", teamMemberId);
        logConsole("actions/teamMember : removeTeamMemberAction : appUserId ", appUserId);

        if (!teamMemberId) {
            throwError("Team member ID is required.");
        }

        const teamMember = await getTeamMemberById(teamMemberId);
        logConsole("actions/teamMember : removeTeamMemberAction : teamMember ", teamMember);

        if (!teamMember) {
            throwError("Team member not found.");
        }

        if (teamMember.ownerId?.toString() !== appUserId.toString()) {
            throwError("You are not authorized to remove this team member.");
        }

        const deleted = await deleteTeamMemberById(teamMemberId);
        logConsole("actions/teamMember : removeTeamMemberAction : deleted ", deleted);

        if (!deleted) {
            throwError("Failed to remove team member. Please try again.");
        }

        revalidatePath(routes.team);

        return serialize(deleted);
    });
}

export async function updateTeamMemberAction(formData) {
    return afterOnboardingActionGuard(async ({ appUserId }) => {
        logConsole("actions/teamMember : updateTeamMemberAction : formData ", formData);

        const rawValues = {
            teamMemberId: formData.get("teamMemberId"),
            email: formData.get("email"),
        };

        logConsole("actions/teamMember : updateTeamMemberAction : rawValues ", rawValues);

        const validated = validateInputs(updateTeamMemberValidator, {
            email: rawValues.email,
        });
        logConsole("actions/teamMember : updateTeamMemberAction : validated ", validated);

        if (!validated.success) {
            throwError(validated.error);
        }

        if (!rawValues.teamMemberId) {
            throwError("Team member ID is required.");
        }

        const teamMember = await getTeamMemberById(rawValues.teamMemberId);
        logConsole("actions/teamMember : updateTeamMemberAction : teamMember ", teamMember);

        if (!teamMember) {
            throwError("Team member not found.");
        }

        if (teamMember.ownerId?.toString() !== appUserId.toString()) {
            throwError("You are not authorized to update this team member.");
        }

        const updated = await updateTeamMemberById(rawValues.teamMemberId, validated.data);
        logConsole("actions/teamMember : updateTeamMemberAction : updated ", updated);

        if (!updated) {
            throwError("Failed to update team member. Please try again.");
        }

        revalidatePath(routes.team);

        return serialize(updated);
    });
}