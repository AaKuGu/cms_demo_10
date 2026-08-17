"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import ShopForm from "../ShopForm";
import { createShopAction } from "@/actions/Shop.actions";
import { errorToast, successToast } from "@/lib/toast";
import { routes } from "@/lib/routes/routes";

const defaultValues = {
    name: "",
    slug: "",
    phone: "",
    address: "",
    googleMapLink: "",
    logo: "",
};

const slugify = (value) =>
    value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

export default function NewShopContainer() {
    const router = useRouter();
    const [formValues, setFormValues] = useState(() => ({ ...defaultValues }));
    const [isPending, setIsPending] = useState(false);
    const slugTouchedRef = useRef(false);

    const updateField = (field) => (e) => {
        const value = e.target.value;

        if (field === "slug") {
            slugTouchedRef.current = true;
            setFormValues((prev) => ({ ...prev, slug: value }));
            return;
        }

        if (field === "name") {
            setFormValues((prev) => ({
                ...prev,
                name: value,
                slug: slugTouchedRef.current ? prev.slug : slugify(value),
            }));
            return;
        }

        setFormValues((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsPending(true);

        const formData = new FormData();
        formData.set("name", formValues.name);
        formData.set("phone", formValues.phone);
        formData.set("slug", formValues.slug);
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
        router.push(routes.shops);
    };

    return (
        <ShopForm
            formValues={formValues}
            onChange={updateField}
            onSubmit={handleSubmit}
            onCancel={() => router.push(routes.shops)}
            isPending={isPending}
            submitLabel="Add Shop"
        />
    );
}