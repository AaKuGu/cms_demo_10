import { updateAppUserValidator } from "./AppUser.validators";

export const createOnboardingValidator = updateAppUserValidator.pick({
    name: true,
    email: true,
    phone: true,
});