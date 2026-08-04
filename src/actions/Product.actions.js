"use server";

import { revalidatePath } from "next/cache";
import { createProduct, deleteProductById, getProductById, updateProductById } from "@/crud/Product.crud";
import { getShopById, updateShopById } from "@/crud/Shop.crud";
import { afterOnboardingActionGuard } from "@/lib/actions/action";
import { logConsole } from "@/lib/console/console";
import { serialize } from "@/lib/serialize";
import { throwError } from "@/lib/throwError";
import { validateInputs } from "@/lib/validateInputs";
import { createProductValidator, productsSettingsValidator } from "@/validators/Product.validators";

export async function createProductAction(formData) {
    return afterOnboardingActionGuard(async ({ appUserId, userIdFromAuthLibrary }) => {
        logConsole("actions/product : createProductAction : appUserId ", appUserId);
        logConsole("actions/product : createProductAction : userIdFromAuthLibrary ", userIdFromAuthLibrary);
        logConsole("actions/product : createProductAction : formData ", formData);

        const rawValues = {
            shopId: formData.get("shopId"),
            categoryId: formData.get("categoryId") ?? "",
            name: formData.get("name"),
            desc: formData.get("desc"),
            price: Number(formData.get("price")),
            image: formData.get("image"),

        };

        logConsole("actions/product : createProductAction : rawValues ", rawValues);

        const validated = validateInputs(createProductValidator, rawValues);
        logConsole("actions/product : createProductAction : validated ", validated);

        if (!validated.success) {
            throwError(validated.error);
        }

        const shop = await getShopById(validated.data.shopId);
        logConsole("actions/product : createProductAction : shop ", shop);

        if (!shop) {
            throwError("Selected shop not found.");
        }

        if (shop.appUserId?.toString() !== appUserId.toString()) {
            throwError("You are not authorized to add products to this shop.");
        }

        const created = await createProduct({
            ...validated.data,
            appUserId,
            userIdFromAuthLibrary,
        });
        logConsole("actions/product : createProductAction : created ", created);

        if (!created) {
            throwError("Failed to add product. Please try again.");
        }

        revalidatePath(`/shop-manage/${validated.data.shopId}/products`);

        return serialize(created);
    });
}

export async function updateProductAction(formData) {
    return afterOnboardingActionGuard(async ({ appUserId }) => {
        logConsole("actions/product : updateProductAction : formData ", formData);

        const rawValues = {
            productId: formData.get("productId"),
            shopId: formData.get("shopId"),
            categoryId: formData.get("categoryId") ?? "",
            name: formData.get("name"),
            desc: formData.get("desc"),
            price: Number(formData.get("price")),
        };

        logConsole("actions/product : updateProductAction : rawValues ", rawValues);

        if (!rawValues.productId) {
            throwError("Product ID is required.");
        }

        const validated = validateInputs(createProductValidator, rawValues);
        logConsole("actions/product : updateProductAction : validated ", validated);

        if (!validated.success) {
            throwError(validated.error);
        }

        const existingProduct = await getProductById(rawValues.productId);
        logConsole("actions/product : updateProductAction : existingProduct ", existingProduct);

        if (!existingProduct) {
            throwError("Product not found.");
        }

        if (existingProduct.shopId?.toString() !== rawValues.shopId.toString()) {
            throwError("Product does not belong to this shop.");
        }

        const shop = await getShopById(rawValues.shopId);
        logConsole("actions/product : updateProductAction : shop ", shop);

        if (!shop) {
            throwError("Selected shop not found.");
        }

        if (shop.appUserId?.toString() !== appUserId.toString()) {
            throwError("You are not authorized to update this product.");
        }

        const updated = await updateProductById(rawValues.productId, {
            ...validated.data,
            appUserId,
        });
        logConsole("actions/product : updateProductAction : updated ", updated);

        if (!updated) {
            throwError("Failed to update product. Please try again.");
        }

        revalidatePath(`/shop-manage/${rawValues.shopId}/products`);

        return serialize(updated);
    });
}

export async function deleteProductAction(productId, shopId) {
    return afterOnboardingActionGuard(async ({ appUserId }) => {
        logConsole("actions/product : deleteProductAction : productId ", productId);
        logConsole("actions/product : deleteProductAction : shopId ", shopId);
        logConsole("actions/product : deleteProductAction : appUserId ", appUserId);

        if (!productId) {
            throwError("Product ID is required.");
        }

        if (!shopId) {
            throwError("Shop ID is required.");
        }

        const existingProduct = await getProductById(productId);
        logConsole("actions/product : deleteProductAction : existingProduct ", existingProduct);

        if (!existingProduct) {
            throwError("Product not found.");
        }

        if (existingProduct.shopId?.toString() !== shopId.toString()) {
            throwError("Product does not belong to this shop.");
        }

        const shop = await getShopById(shopId);
        logConsole("actions/product : deleteProductAction : shop ", shop);

        if (!shop) {
            throwError("Selected shop not found.");
        }

        if (shop.appUserId?.toString() !== appUserId.toString()) {
            throwError("You are not authorized to delete this product.");
        }

        const deleted = await deleteProductById(productId);
        logConsole("actions/product : deleteProductAction : deleted ", deleted);

        if (!deleted) {
            throwError("Failed to delete product. Please try again.");
        }

        revalidatePath(`/shop-manage/${shopId}/products`);

        return serialize(deleted);
    });
}

export async function updateProductSettingsAction(formData, shopId) {
    return afterOnboardingActionGuard(async ({ appUserId }) => {
        logConsole("actions/product : updateProductSettingsAction : formData ", formData);
        logConsole("actions/product : updateProductSettingsAction : shopId ", shopId);

        if (!shopId) {
            throwError("Shop ID is required.");
        }

        const rawValues = {
            showPricing: formData.get("showPricing") === "true",
        };
        logConsole("actions/product : updateProductSettingsAction : rawValues ", rawValues);

        const validated = validateInputs(productsSettingsValidator, rawValues);
        logConsole("actions/product : updateProductSettingsAction : validated ", validated);

        if (!validated.success) {
            throwError(validated.error);
        }

        const shop = await getShopById(shopId);
        logConsole("actions/product : updateProductSettingsAction : shop ", shop);

        if (!shop) {
            throwError("Selected shop not found.");
        }

        if (shop.appUserId?.toString() !== appUserId.toString()) {
            throwError("You are not authorized to update this shop's product settings.");
        }

        // Merge onto existing settings.products, so any future fields not
        // touched by this particular call are preserved rather than wiped out.
        const updated = await updateShopById(shopId, {
            $set: {
                "settings.products": {
                    ...shop.settings?.products,
                    ...validated.data,
                },
            },
        });
        logConsole("actions/product : updateProductSettingsAction : updated ", updated);

        if (!updated) {
            throwError("Failed to update settings. Please try again.");
        }

        revalidatePath(`/shop-manage/${shopId}/products`);

        return serialize(updated);
    });
}