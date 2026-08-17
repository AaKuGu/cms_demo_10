"use server";

import { revalidatePath } from "next/cache";
import { createCategory, deleteCategoryById, getCategoryById, updateCategoryById } from "@/crud/Category.crud";
import { getShopById } from "@/crud/Shop.crud";
import { afterOnboardingActionGuard } from "@/lib/actions/action";
import { logConsole } from "@/lib/console/console";
import { serialize } from "@/lib/serialize";
import { throwError } from "@/lib/throwError";
import { validateInputs } from "@/lib/validateInputs";
import { createCategoryValidator, updateCategoryValidator } from "@/validators/Category.validators";
import { routes } from "@/lib/routes/routes";

export async function createCategoryAction(formData) {
    return afterOnboardingActionGuard(async ({ appUserId, managingBusinessUserId }) => {

        logConsole("actions/category : createCategoryAction : appUserId ", appUserId);
        logConsole("actions/category : createCategoryAction : formData ", formData);

        const rawValues = {
            shopId: formData.get("shopId"),
            name: formData.get("name"),
            slug: formData.get("slug"),
            description: formData.get("description") ?? "",
            image: formData.get("image") ?? "",
        };

        logConsole("actions/category : createCategoryAction : rawValues ", rawValues);

        const validated = validateInputs(createCategoryValidator, rawValues);
        logConsole("actions/category : createCategoryAction : validated ", validated);

        if (!validated.success) {
            throwError(validated.error);
        }

        const shop = await getShopById(validated.data.shopId);
        logConsole("actions/category : createCategoryAction : shop ", shop);

        if (!shop) {
            throwError("Selected shop not found.");
        }

        if (shop.appUserId?.toString() !== managingBusinessUserId.toString()) {
            throwError("You are not authorized to create category for this shop.");
        }

        const created = await createCategory({
            ...validated.data,
        });
        logConsole("actions/category : createCategoryAction : created ", created);

        if (!created) {
            throwError("Failed to create category. Please try again.");
        }

        return serialize(created);
    });
}

export async function removeCategoryAction(categoryId, shopId) {
    return afterOnboardingActionGuard(async ({ appUserId, managingBusinessUserId }) => {
        logConsole("actions/category : removeCategoryAction : categoryId ", categoryId);
        logConsole("actions/category : removeCategoryAction : shopId ", shopId);
        logConsole("actions/category : removeCategoryAction : appUserId ", appUserId);

        if (!categoryId) {
            throwError("Category ID is required.");
        }

        if (!shopId) {
            throwError("Shop ID is required.");
        }

        const category = await getCategoryById(categoryId);
        logConsole("actions/category : removeCategoryAction : category ", category);

        if (!category) {
            throwError("Category not found.");
        }

        if (category.shopId?.toString() !== shopId.toString()) {
            throwError("Category does not belong to this shop.");
        }

        const shop = await getShopById(shopId);
        logConsole("actions/category : removeCategoryAction : shop ", shop);

        if (!shop) {
            throwError("Selected shop not found.");
        }

        if (shop.appUserId?.toString() !== managingBusinessUserId.toString()) {
            throwError("You are not authorized to delete this category.");
        }

        const deleted = await deleteCategoryById(categoryId);
        logConsole("actions/category : removeCategoryAction : deleted ", deleted);

        if (!deleted) {
            throwError("Failed to delete category. Please try again.");
        }

        revalidatePath(routes.categories(shopId));

        return serialize(deleted);
    });
}

export async function updateCategoryAction(formData) {
    return afterOnboardingActionGuard(async ({ appUserId, managingBusinessUserId }) => {
        logConsole("actions/cateogry : updateCAtegoryACtion : managingBusinessUserId : ", managingBusinessUserId)
        logConsole("actions/category : updateCategoryAction : formData ", formData);

        const rawValues = {
            categoryId: formData.get("categoryId"),
            shopId: formData.get("shopId"),
            name: formData.get("name"),
            slug: formData.get("slug"),
            description: formData.get("description") ?? "",
            image: formData.get("image") ?? "",
        };

        logConsole("actions/category : updateCategoryAction : rawValues ", rawValues);

        const validated = validateInputs(updateCategoryValidator, {
            shopId: rawValues.shopId,
            name: rawValues.name,
            slug: rawValues.slug,
            description: rawValues.description,
            image: rawValues.image,
        });
        logConsole("actions/category : updateCategoryAction : validated ", validated);

        if (!validated.success) {
            throwError(validated.error);
        }

        if (!rawValues.categoryId) {
            throwError("Category ID is required.");
        }

        const category = await getCategoryById(rawValues.categoryId);
        logConsole("actions/category : updateCategoryAction : category ", category);

        if (!category) {
            throwError("Category not found.");
        }

        if (category.shopId?.toString() !== rawValues.shopId.toString()) {
            throwError("Category does not belong to this shop.");
        }

        const shop = await getShopById(rawValues.shopId);
        logConsole("actions/category : updateCategoryAction : shop ", shop);

        if (!shop) {
            throwError("Selected shop not found.");
        }

        if (shop.appUserId?.toString() !== managingBusinessUserId.toString()) {
            throwError("You are not authorized to update this category.");
        }

        const updated = await updateCategoryById(rawValues.categoryId, {
            ...validated.data,
            appUserId,
        });
        logConsole("actions/category : updateCategoryAction : updated ", updated);

        if (!updated) {
            throwError("Failed to update category. Please try again.");
        }

        revalidatePath(routes.categories(rawValues.shopId));

        return serialize(updated);
    });
}
