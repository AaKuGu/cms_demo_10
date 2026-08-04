"use client";

import { useState } from "react";
import ProductParentSettings from "./ProductParentSettings";
import { updateProductSettingsAction } from "@/actions/Product.actions";
import { errorToast, successToast } from "@/lib/toast";

const defaultValues = {
    showPricing: true,
};

export default function ProductParentSettingsContainer({ shopId, initialSettings = {} }) {
    const [formValues, setFormValues] = useState(() => ({
        ...defaultValues,
        ...initialSettings,
    }));
    const [isPending, setIsPending] = useState(false);

    // Settings save immediately on toggle rather than needing a submit button --
    // matches how a switch/toggle input is expected to behave.
    const handleToggle = async (field, value) => {
        const previous = formValues[field];
        setFormValues((prev) => ({ ...prev, [field]: value })); // optimistic
        setIsPending(true);

        const formData = new FormData();
        formData.set(field, String(value));

        const { data, error } = await updateProductSettingsAction(formData, shopId);

        setIsPending(false);

        if (error) {
            errorToast(error);
            setFormValues((prev) => ({ ...prev, [field]: previous })); // revert
            return;
        }

        successToast("Settings updated!");
    };

    return (
        <ProductParentSettings
            formValues={formValues}
            onToggle={handleToggle}
            isPending={isPending}
        />
    );
}