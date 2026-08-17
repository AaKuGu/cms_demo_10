"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { errorToast, successToast } from "@/lib/toast";
import { logConsole } from "@/lib/console/console";
import { routes } from "@/lib/routes/routes";
import TeamMemberForm from "../TeamMemberForm";
import { addTeamMemberAction } from "@/actions/Team.actions";

const defaultValues = {
    email: "",
};

export default function NewTeamMemberContainer({ shopId }) {
    const router = useRouter();
    const [formValues, setFormValues] = useState(() => ({ ...defaultValues }));
    const [isPending, setIsPending] = useState(false);

    logConsole('new team member container : shopId ', shopId);

    const updateField = (field) => (e) => {
        setFormValues((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsPending(true);

        const formData = new FormData();
        formData.set("email", formValues.email);

        logConsole('new team member container : submit formData ', Object.fromEntries(formData.entries()));

        const { data, error } = await addTeamMemberAction(formData);
        logConsole('new team member container : addTeamMemberAction result ', { data, error });

        setIsPending(false);

        if (error) {
            errorToast(error);
            return;
        }

        successToast("Team member added successfully!");
        router.push(routes.team(shopId));
    };

    return (
        <TeamMemberForm
            formValues={formValues}
            onChange={updateField}
            onSubmit={handleSubmit}
            onCancel={() => router.push(routes.team(shopId))}
            isPending={isPending}
            submitLabel="Add Team Member"
        />
    );
}