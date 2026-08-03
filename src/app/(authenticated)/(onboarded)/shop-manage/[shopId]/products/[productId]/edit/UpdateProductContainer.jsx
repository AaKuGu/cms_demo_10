"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ProductForm from "@/app/(authenticated)/(onboarded)/shop-manage/[shopId]/products/new/ProductForm";
import { updateProductAction } from "@/actions/Product.actions";
import { errorToast, successToast } from "@/lib/toast";

export default function UpdateProductContainer({ product, shopId, categories = [] }) {
    const router = useRouter();
    const [isPending, setIsPending] = useState(false);
    const [formValues, setFormValues] = useState({
        categoryId: product.categoryId || "",
        name: product.name || "",
        desc: product.desc || "",
        price: product.price || "",
    });

    const updateField = (field) => (e) => {
        setFormValues((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsPending(true);

        const formData = new FormData();
        formData.set("productId", product._id);
        formData.set("shopId", shopId);
        formData.set("categoryId", formValues.categoryId || "");
        formData.set("name", formValues.name);
        formData.set("desc", formValues.desc || "");
        formData.set("price", String(formValues.price));

        const { data, error } = await updateProductAction(formData);
        setIsPending(false);

        if (error) {
            errorToast(error);
            return;
        }

        successToast("Product updated successfully!");
        router.push(`/shop-manage/${shopId}/products`);
    };

    return (
        <ProductForm
            formValues={formValues}
            onChange={updateField}
            onSubmit={handleSubmit}
            onCancel={() => router.push(`/shop-manage/${shopId}/products`)}
            isPending={isPending}
            submitLabel="Update Product"
            shopId={shopId}
            categories={categories}
        />
    );
}
