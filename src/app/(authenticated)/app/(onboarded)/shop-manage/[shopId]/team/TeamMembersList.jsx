"use client";

import { useRouter } from "next/navigation";
import EmptyState from "@/components/EmptyList";
import ActionGroup from "@/components/ActionGroup";
import { getNameInitials } from "@/lib/ui/initials";
import { errorToast, successToast } from "@/lib/toast";
import { useState } from "react";
import { routes } from "@/lib/routes/routes";
import { removeTeamMemberAction } from "@/actions/Team.actions";

export default function TeamMembersList({ teamMembers, shopId }) {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState(null);

    if (!teamMembers || teamMembers.length === 0) {
        return (
            <EmptyState
                title="No team members yet"
                description="Add someone to give them access to manage this shop."
                actionLabel="Add your first team member"
                onAction={() => router.push(routes.newTeamMember(shopId))}
            />
        );
    }

    const handleRemove = async (teamMemberId) => {
        setDeletingId(teamMemberId);

        const { data, error } = await removeTeamMemberAction(teamMemberId, shopId);

        setDeletingId(null);

        if (error) {
            errorToast(error);
            return;
        }

        successToast("Team member removed successfully!");
        router.refresh();
    };

    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 divide-y divide-gray-200">
            {teamMembers.map((member) => (
                <div
                    key={member._id}
                    className="flex items-center justify-between px-5 py-4"
                >
                    <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-900 text-xs font-semibold text-white">
                            {getNameInitials(member.email, "T")}
                        </div>
                        <div className="min-w-0">
                            <p className="truncate font-medium text-gray-900">
                                {member.email}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <ActionGroup
                            onDelete={() => handleRemove(member._id)}
                            isDeleting={deletingId === member._id}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}