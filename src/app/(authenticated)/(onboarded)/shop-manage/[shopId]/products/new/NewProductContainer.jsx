"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ProductForm from "./ProductForm";
import { createProductAction } from "@/actions/Product.actions";
import { errorToast, successToast } from "@/lib/toast";

const defaultValues = {
    categoryId: "",
    name: "",
    desc: "",
    price: "",
};

export default function NewProductContainer({ shopId, categories = [] }) {
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
        formData.set("shopId", shopId);
        formData.set("categoryId", formValues.categoryId || "");
        formData.set("name", formValues.name);
        formData.set("desc", formValues.desc);
        formData.set("price", formValues.price);

        const { data, error } = await createProductAction(formData);

        setIsPending(false);

        if (error) {
            errorToast(error);
            return;
        }

        successToast("Product added successfully!");
        router.push(`/shop-manage/${shopId}/products`);
    };

    return (
        <ProductForm
            formValues={formValues}
            onChange={updateField}
            onSubmit={handleSubmit}
            onCancel={() => router.push(`/shop-manage/${shopId}/products`)}
            isPending={isPending}
            submitLabel="Add Product"
            shopId={shopId}
            categories={categories}
        />
    );
}
