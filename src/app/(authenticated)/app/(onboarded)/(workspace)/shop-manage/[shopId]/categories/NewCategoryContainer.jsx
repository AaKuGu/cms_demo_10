"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import CategoryForm from "./CategoryForm";
import { createCategoryAction } from "@/actions/Category.actions";
import { errorToast, successToast } from "@/lib/toast";
import { logConsole } from "@/lib/console/console";

const defaultValues = {
    name: "",
    slug: "",
    description: "",
    image: "",
};

const slugify = (value) =>
    value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

export default function NewCategoryContainer({ shopId }) {
    const router = useRouter();
    const [formValues, setFormValues] = useState(() => ({ ...defaultValues }));
    const [isPending, setIsPending] = useState(false);
    const slugTouchedRef = useRef(false);

    logConsole('new category container : shopId ', shopId);

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
        formData.set("shopId", shopId);
        formData.set("name", formValues.name);
        formData.set("slug", formValues.slug);
        formData.set("description", formValues.description || "");
        formData.set("image", formValues.image || "");

        logConsole('new category container : submit formData ', Object.fromEntries(formData.entries()));

        const { data, error } = await createCategoryAction(formData);
        logConsole('new category container : createCategoryAction result ', { data, error });

        setIsPending(false);

        if (error) {
            logConsole('new category container : error ', error);
            errorToast(error);
            return;
        }

        successToast("Category added successfully!");
        setFormValues({ ...defaultValues });
        slugTouchedRef.current = false;
        router.refresh();
    };

    return (
        <CategoryForm
            formValues={formValues}
            onChange={updateField}
            onSubmit={handleSubmit}
            onCancel={() => {
                setFormValues({ ...defaultValues });
                slugTouchedRef.current = false;
            }}
            isPending={isPending}
            submitLabel="Add Category"
        />
    );
}