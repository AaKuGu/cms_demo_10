"use server";

import { updateAppUserById } from "@/crud/AppUser.crud";
import { beforeOnboardingActionGuard } from "@/lib/actions/action";
import { logConsole } from "@/lib/console/console";
import { serialize } from "@/lib/serialize";
import { throwError } from "@/lib/throwError";
import { validateInputs } from "@/lib/validateInputs";
import { createOnboardingValidator } from "@/validators/Onboarding.validators";

const INDIA_COUNTRY_CODE = "+91";

export async function createOnboardingAction(formData) {
    return beforeOnboardingActionGuard(async ({ appUserId }) => {
        logConsole("actions/onboarding : createOnboardingAction : appUserId ", appUserId);
        logConsole("actions/onboarding : createOnboardingAction : formData ", formData);

        const rawValues = {
            name: formData.get("name"),
            email: formData.get("email"),
            phone: formData.get("phone") ?? "",
        };

        logConsole("actions/onboarding : createOnboardingAction : rawValues ", rawValues);

        const validated = validateInputs(createOnboardingValidator, rawValues);
        logConsole("actions/onboarding : createOnboardingAction : validated ", validated);

        if (!validated.success) {
            throwError(validated.error);
        }

        // Local 10-digit number is validated as-is; we store it with the
        // country code attached so the value is WhatsApp/E.164-ready.
        // India-only for now — this is the one place to touch when more
        // countries are supported.
        const phone = validated.data.phone
            ? `${INDIA_COUNTRY_CODE}${validated.data.phone}`
            : validated.data.phone;

        const updated = await updateAppUserById(appUserId, {
            name: validated.data.name,
            phone,
            onboarding: true,
            onboardingCompletedAt: new Date(),
        });
        logConsole("actions/onboarding : createOnboardingAction : updated ", updated);

        if (!updated) {
            throwError("Failed to save your details. Please try again.");
        }

        return serialize(updated);
    });
}