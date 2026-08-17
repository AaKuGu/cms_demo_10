"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import TeamMemberForm from "../../TeamMemberForm";
import { createTeamMemberAction } from "@/actions/TeamMember.actions";
import { errorToast, successToast } from "@/lib/toast";
import { routes } from "@/lib/routes/routes";

const defaultValues = {
    email: "",
};

export default function NewTeamMemberContainer() {
    const router = useRouter();
    const [formValues, setFormValues] = useState(() => ({ ...defaultValues }));
    const [isPending, setIsPending] = useState(false);

    const updateField = (field) => (e) => {
        const value = e.target.value;
        setFormValues((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsPending(true);

        const formData = new FormData();
        formData.set("email", formValues.email);

        const { data, error } = await createTeamMemberAction(formData);

        setIsPending(false);

        if (error) {
            errorToast(error);
            return;
        }

        successToast("Team member added successfully!");
        router.push(routes.team);
    };

    return (
        <TeamMemberForm
            formValues={formValues}
            onChange={updateField}
            onSubmit={handleSubmit}
            onCancel={() => router.push(routes.team)}
            isPending={isPending}
            submitLabel="Add Team Member"
        />
    );
}