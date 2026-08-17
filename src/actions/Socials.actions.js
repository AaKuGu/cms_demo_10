"use server";

import { revalidatePath } from "next/cache";
import { upsertSocialsByShopId } from "@/crud/Socials.crud";
import { getShopById } from "@/crud/Shop.crud";
import { afterOnboardingActionGuard } from "@/lib/actions/action";
import { logConsole } from "@/lib/console/console";
import { serialize } from "@/lib/serialize";
import { throwError } from "@/lib/throwError";
import { validateInputs } from "@/lib/validateInputs";
import { createSocialsValidator } from "@/validators/Socials.validators";

export async function updateSocialsAction(formData, shopId) {
    return afterOnboardingActionGuard(async ({ appUserId, managingBusinessUserId}) => {
        logConsole("actions/socials : updateSocialsAction : formData ", formData);
        logConsole("actions/socials : updateSocialsAction : shopId ", shopId);

        if (!shopId) {
            throwError("Shop ID is required.");
        }

        const rawValues = {
            shopId,
            links: JSON.parse(formData.get("links") || "[]"),
            isVisible: formData.get("isVisible") === "true",
        };

        logConsole("actions/socials : updateSocialsAction : rawValues ", rawValues);

        const validated = validateInputs(createSocialsValidator, rawValues);
        logConsole("actions/socials : updateSocialsAction : validated ", validated);

        if (!validated.success) {
            throwError(validated.error);
        }

        const shop = await getShopById(shopId);
        logConsole("actions/socials : updateSocialsAction : shop ", shop);

        if (!shop) {
            throwError("Selected shop not found.");
        }

        if (shop.appUserId?.toString() !== managingBusinessUserId.toString()) {
            throwError("You are not authorized to update this shop's social links.");
        }

        const updated = await upsertSocialsByShopId(shopId, {
            ...validated.data,
        });
        logConsole("actions/socials : updateSocialsAction : updated ", updated);

        if (!updated) {
            throwError("Failed to update social links. Please try again.");
        }

        revalidatePath(`/shop-manage/${shopId}/socials`);

        return serialize(updated);
    });
}