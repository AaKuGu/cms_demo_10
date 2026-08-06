"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import ShopForm from "../../ShopForm";
import { updateShopAction } from "@/actions/Shop.actions";
import { errorToast, successToast } from "@/lib/toast";
import { routes } from "@/lib/routes/routes";

const slugify = (value) =>
    value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

export default function UpdateShopContainer({ shop, shopId }) {
    const router = useRouter();
    const [formValues, setFormValues] = useState(() => ({
        name: shop.name || "",
        slug: shop.slug || "",
        phone: shop.phone || "",
        address: shop.address || "",
        googleMapLink: shop.googleMapLink || "",
        logo: shop.logo || "",
    }));
    const [isPending, setIsPending] = useState(false);
    // Existing shop already has a slug — don't overwrite it just because the user edits the name.
    const slugTouchedRef = useRef(true);

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
        formData.set("slug", formValues.slug);
        formData.set("phone", formValues.phone);
        formData.set("address", formValues.address);
        formData.set("googleMapLink", formValues.googleMapLink);
        formData.set("logo", formValues.logo);

        const { data, error } = await updateShopAction(formData, shopId);

        setIsPending(false);

        if (error) {
            errorToast(error);
            return;
        }

        successToast("Shop updated successfully!");
        router.push(routes.shops);
    };

    return (
        <ShopForm
            formValues={formValues}
            onChange={updateField}
            onSubmit={handleSubmit}
            onCancel={() => router.push(routes.shops)}
            isPending={isPending}
            submitLabel="Save Changes"
        />
    );
}