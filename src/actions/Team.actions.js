"use server";

import { createTeamMember, deleteTeamMemberById, getTeamMemberById, getTeamMemberList } from "@/crud/Team.crud";
import { getShopById } from "@/crud/Shop.crud";
import { afterOnboardingActionGuard } from "@/lib/actions/action";
import { logConsole } from "@/lib/console/console";
import { serialize } from "@/lib/serialize";
import { throwError } from "@/lib/throwError";
import { validateInputs } from "@/lib/validateInputs";
import { addTeamMemberValidator } from "@/validators/TeamMember.validators";

export async function addTeamMemberAction(formData) {
    return afterOnboardingActionGuard(async ({ appUserId }) => {
        logConsole("actions/shopTeamMember : addTeamMemberAction : formData ", formData);

        const rawValues = {
            email: formData.get("email"),
        };

        logConsole("actions/shopTeamMember : addTeamMemberAction : rawValues ", rawValues);

        const validated = validateInputs(addTeamMemberValidator, rawValues);
        logConsole("actions/shopTeamMember : addTeamMemberAction : validated ", validated);

        if (!validated.success) {
            throwError(validated.error);
        }

        // const shop = await getShopById(validated.data.shopId);
        // logConsole("actions/shopTeamMember : addTeamMemberAction : shop ", shop);

        // if (!shop) {
        //     throwError("Selected shop not found.");
        // }

        // if (shop.appUserId?.toString() !== appUserId.toString()) {
        //     throwError("You are not authorized to manage this shop's team.");
        // }

        const created = await createTeamMember({
            ...validated.data,
            ownerId: appUserId,
        });
        logConsole("actions/shopTeamMember : addTeamMemberAction : created ", created);

        if (!created) {
            throwError("Failed to add team member. Please try again.");
        }

        return serialize(created);
    });
}

// export async function getTeamMembersAction(shopId) {
//     return afterOnboardingActionGuard(async ({ appUserId }) => {
//         logConsole("actions/shopTeamMember : getTeamMembersAction : shopId ", shopId);

//         if (!shopId) {
//             throwError("Shop ID is required.");
//         }

//         const shop = await getShopById(shopId);
//         logConsole("actions/shopTeamMember : getTeamMembersAction : shop ", shop);

//         if (!shop) {
//             throwError("Selected shop not found.");
//         }

//         if (shop.appUserId?.toString() !== appUserId.toString()) {
//             throwError("You are not authorized to view this shop's team.");
//         }

//         const teamMembers = await getTeamMemberList({ shopId });
//         logConsole("actions/shopTeamMember : getTeamMembersAction : teamMembers ", teamMembers);

//         return serialize(teamMembers);
//     });
// }

export async function removeTeamMemberAction(teamMemberId) {
    return afterOnboardingActionGuard(async ({ appUserId }) => {
        logConsole("actions/shopTeamMember : removeTeamMemberAction : teamMemberId ", teamMemberId);

        if (!teamMemberId) {
            throwError("Team member ID is required.");
        }

        // if (!shopId) {
        //     throwError("Shop ID is required.");
        // }

        // const shop = await getShopById(shopId);
        // logConsole("actions/shopTeamMember : removeTeamMemberAction : shop ", shop);

        // if (!shop) {
        //     throwError("Selected shop not found.");
        // }

        // if (shop.appUserId?.toString() !== appUserId.toString()) {
        // throwError("You are not authorized to manage this shop's team.");
        // }

        const teamMember = await getTeamMemberById(teamMemberId);

        if (!teamMember) {
            throwError("Selected Team Member not found.");
        }

        if (teamMember.ownerId?.toString() !== appUserId.toString()) {
            throwError("You are not authorized to manage this shop's team.");
        }

        const deleted = await deleteTeamMemberById(teamMemberId);
        logConsole("actions/shopTeamMember : removeTeamMemberAction : deleted ", deleted);

        if (!deleted) {
            throwError("Failed to remove team member. Please try again.");
        }

        return serialize(deleted);
    });
}