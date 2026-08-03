"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ShopForm from "./ShopForm";
import { createShopAction } from "@/actions/Shop.actions";
import { errorToast, successToast } from "@/lib/toast";

const defaultValues = {
    name: "",
    address: "",
    googleMapLink: "",
    logo: "",
};

export default function NewShopContainer() {
    const router = useRouter();
    const [formValues, setFormValues] = useState(() => ({ ...defaultValues }));
    const [isPending, setIsPending] = useState(false);

    const updateField = (field) => (e) => {
        setFormValues((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsPending(true);

        const formData = new FormData();
        formData.set("name", formValues.name);
        formData.set("address", formValues.address);
        formData.set("googleMapLink", formValues.googleMapLink);
        formData.set("logo", formValues.logo);

        const { data, error } = await createShopAction(formData);

        setIsPending(false);

        if (error) {
            errorToast(error);
            return;
        }

        successToast("Shop added successfully!");
        router.push("/shops");
    };

    return (
        <ShopForm
            formValues={formValues}
            onChange={updateField}
            onSubmit={handleSubmit}
            onCancel={() => router.push("/shops")}
            isPending={isPending}
            submitLabel="Add Shop"
        />
    );
}
