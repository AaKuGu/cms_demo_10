"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import EmptyList from "@/components/EmptyList";
import { removeTeamMemberAction } from "@/actions/TeamMember.actions";
import { errorToast, successToast } from "@/lib/toast";
import { getNameInitials } from "@/lib/ui/initials";
import { logConsole } from "@/lib/console/console";
import Button from "@/ui/Button";

export default function TeamList({ teamMembers, isOwner }) {
    const router = useRouter();
    const [removingId, setRemovingId] = useState(null);

    const handleRemove = async (e, teamMemberId, email) => {
        e.stopPropagation();

        const confirmed = window.confirm(
            `Are you sure you want to remove "${email || "this team member"}"?`
        );

        if (!confirmed) {
            logConsole(
                "TeamList : handleRemove : remove cancelled for teamMemberId ",
                teamMemberId
            );
            return;
        }

        setRemovingId(teamMemberId);

        const { error } = await removeTeamMemberAction(teamMemberId);

        setRemovingId(null);

        if (error) {
            errorToast(error);
            return;
        }

        successToast("Team member removed successfully!");
        router.refresh();
    };

    if (!teamMembers || teamMembers.length === 0) {
        return (
            <EmptyList
                title="No team members yet"
                description="Add someone to your team so they can manage your stores."
                actionLabel="Add your first team member"
                onAction={() => router.push("/app/team/create")}
            />
        );
    }

    return (
        <div className="overflow-hidden rounded-xl border border-border divide-y divide-gray-200">
            {teamMembers.map((teamMember) => (
                <div
                    key={teamMember._id}
                    className="p-4 transition-colors hover:bg-gray-50"
                >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        {/* Team member info */}
                        <div className="flex min-w-0 items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-900 text-sm font-semibold text-white">
                                {getNameInitials(teamMember.email, "T")}
                            </div>

                            <div className="min-w-0 flex-1">
                                <p className="truncate font-medium text-gray-900">
                                    {teamMember.email}
                                </p>

                                <p className="truncate text-sm text-faint">
                                    Added{" "}
                                    {new Date(
                                        teamMember.createdAt
                                    ).toLocaleDateString()}
                                </p>
                            </div>
                        </div>

                        {/* Actions — remove is owner-only */}
                        {isOwner && (
                            <div
                                className="flex w-full items-center gap-2 sm:w-auto"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="w-full sm:w-auto"
                                    disabled={removingId === teamMember._id}
                                    onClick={(e) =>
                                        handleRemove(
                                            e,
                                            teamMember._id,
                                            teamMember.email
                                        )
                                    }
                                >
                                    {removingId === teamMember._id
                                        ? "Removing..."
                                        : "Remove"}
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}