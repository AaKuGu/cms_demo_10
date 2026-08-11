"use server";

import { revalidatePath } from "next/cache";
import { upsertContactByShopId } from "@/crud/Contact.crud";
import { getShopById } from "@/crud/Shop.crud";
import { afterOnboardingActionGuard } from "@/lib/actions/action";
import { logConsole } from "@/lib/console/console";
import { serialize } from "@/lib/serialize";
import { throwError } from "@/lib/throwError";
import { validateInputs } from "@/lib/validateInputs";
import { createContactValidator } from "@/validators/Contact.validators";

export async function updateContactAction(formData, shopId) {
    return afterOnboardingActionGuard(async ({ appUserId }) => {
        logConsole("actions/contact : updateContactAction : formData ", formData);
        logConsole("actions/contact : updateContactAction : shopId ", shopId);

        if (!shopId) {
            throwError("Shop ID is required.");
        }

        const rawValues = {
            shopId,
            email: formData.get("email") || "",
            contactNumbers: JSON.parse(formData.get("contactNumbers") || "[]"),
            workingHours: formData.get("workingHours") || "",
            googleMapLink: formData.get("googleMapLink") || "",
            isVisible: formData.get("isVisible") === "true",
        };

        logConsole("actions/contact : updateContactAction : rawValues ", rawValues);

        const validated = validateInputs(createContactValidator, rawValues);
        logConsole("actions/contact : updateContactAction : validated ", validated);

        if (!validated.success) {
            throwError(validated.error);
        }

        const shop = await getShopById(shopId);
        logConsole("actions/contact : updateContactAction : shop ", shop);

        if (!shop) {
            throwError("Selected shop not found.");
        }

        if (shop.appUserId?.toString() !== appUserId.toString()) {
            throwError("You are not authorized to update this shop's contact info.");
        }

        const updated = await upsertContactByShopId(shopId, {
            ...validated.data,
            appUserId,
        });
        logConsole("actions/contact : updateContactAction : updated ", updated);

        if (!updated) {
            throwError("Failed to update contact info. Please try again.");
        }

        return serialize(updated);
    });
}