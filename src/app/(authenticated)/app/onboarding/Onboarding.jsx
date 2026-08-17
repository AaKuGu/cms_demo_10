"use client";

import { useState } from "react";
import { redirect, useRouter } from "next/navigation";
import OnboardingSettingsForm from "../components/OnboardingSettingsForm";
import { errorToast, successToast } from "@/lib/toast";
import { routes } from "@/lib/routes/routes";
import { createOnboardingAction } from "@/actions/Onboading.actions";

export default function OnboardingContainer({ initialDetails = {} }) {
    const router = useRouter();
    const [formValues, setFormValues] = useState(() => ({
        name: initialDetails.name || "",
        email: initialDetails.email || "",
        phone: "",
    }));
    const [isPending, setIsPending] = useState(false);

    const updateField = (field) => (e) => {
        setFormValues((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsPending(true);

        const formData = new FormData();
        formData.set("name", formValues.name);
        formData.set("email", formValues.email);
        formData.set("phone", formValues.phone);

        const { data, error } = await createOnboardingAction(formData);

        setIsPending(false);

        if (error) {
            errorToast(error);
            return;
        }

        successToast("Details saved successfully!");
        redirect(routes.workspace)
    };

    return (
        <OnboardingSettingsForm
            formValues={formValues}
            onChange={updateField}
            onSubmit={handleSubmit}
            onCancel={() => router.push(routes.dashboard())}
            isPending={isPending}
            submitLabel="Save Details"
        />
    );
}