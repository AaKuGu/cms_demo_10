"use server";

import { createShop, deleteShopById, getShopById, getShop, updateShopById } from "@/crud/Shop.crud";
import { afterOnboardingActionGuard } from "@/lib/actions/action";
import { logConsole } from "@/lib/console/console";
import { serialize } from "@/lib/serialize";
import { throwError } from "@/lib/throwError";
import { validateInputs } from "@/lib/validateInputs";
import { createShopValidator } from "@/validators/Shop.validators";

export async function createShopAction(formData) {
    return afterOnboardingActionGuard(async ({ appUserId }) => {
        logConsole("actions/shop : createShopAction : appUserId ", appUserId)

        const rawValues = {
            name: formData.get("name"),
            slug: formData.get("slug"),
            address: formData.get("address"),
            phone: formData.get("phone"),
            googleMapLink: formData.get("googleMapLink"),
            logo: formData.get("logo"),
        };

        const validated = validateInputs(createShopValidator, rawValues);
        logConsole("actions/shop : createShopAction : validated ", validated)

        if (!validated.success) {
            throwError(validated.error);
        }

        const existingShopWithSlug = await getShop({ slug: validated.data.slug });
        logConsole("actions/shop : createShopAction : existingShopWithSlug ", existingShopWithSlug)

        if (existingShopWithSlug) {
            throwError("This store URL is already taken. Please choose another.");
        }

        const created = await createShop({
            ...validated.data,
            ownerId: appUserId,
        });
        logConsole("actions/shop : createShopAction : created ", created)

        if (!created) {
            throwError("Failed to add shop. Please try again.");
        }

        return serialize(created);
    });
}

export async function updateShopAction(formData, shopId) {
    return afterOnboardingActionGuard(async ({ appUserId }) => {
        logConsole("actions/shop : updateShopAction : shopId ", shopId)
        logConsole("actions/shop : updateShopAction : appUserId ", appUserId)

        if (!shopId) {
            throwError("Shop ID is required.");
        }

        const existingShop = await getShopById(shopId);
        logConsole("actions/shop : updateShopAction : existingShop ", existingShop)

        if (!existingShop) {
            throwError("Shop not found.");
        }

        if (existingShop.appUserId.toString() !== appUserId.toString()) {
            throwError("You are not authorized to update this shop.");
        }

        const rawValues = {
            name: formData.get("name"),
            slug: formData.get("slug"),
            phone: formData.get("phone"),
            address: formData.get("address"),
            googleMapLink: formData.get("googleMapLink"),
            logo: formData.get("logo"),
        };

        const validated = validateInputs(createShopValidator, rawValues);
        logConsole("actions/shop : updateShopAction : validated ", validated)

        if (!validated.success) {
            // throwError(validated.error);
        }

        if (validated.data.slug !== existingShop.slug) {
            const existingShopWithSlug = await getShopBySlug(validated.data.slug);
            logConsole("actions/shop : updateShopAction : existingShopWithSlug ", existingShopWithSlug)

            if (existingShopWithSlug) {
                throwError("This store URL is already taken. Please choose another.");
            }
        }

        const updated = await updateShopById(shopId, { ...validated.data, appUserId });
        logConsole("actions/shop : updateShopAction : updated ", updated)

        if (!updated) {
            throwError("Failed to update shop. Please try again.");
        }

        return serialize(updated);
    });
}

export async function deleteShopAction(shopId) {
    return afterOnboardingActionGuard(async ({ appUserId }) => {
        logConsole("actions/shop : deleteShopAction : shopId ", shopId)
        logConsole("actions/shop : deleteShopAction : appUserId ", appUserId)

        if (!shopId) {
            throwError("Shop ID is required.");
        }

        const existingShop = await getShopById(shopId);
        logConsole("actions/shop : deleteShopAction : existingShop ", existingShop)

        if (!existingShop) {
            throwError("Shop not found.");
        }

        if (existingShop.appUserId.toString() !== appUserId.toString()) {
            throwError("You are not authorized to delete this shop.");
        }

        const deleted = await deleteShopById(shopId);
        logConsole("actions/shop : deleteShopAction : deleted ", deleted)

        if (!deleted) {
            throwError("Failed to delete shop. Please try again.");
        }

        return serialize(deleted);
    });
}