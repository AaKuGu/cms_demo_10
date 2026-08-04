import { z } from "zod";

export const contactNumberValidator = z.object({
    type: z.enum(["phone", "whatsapp"]),
    number: z
        .string()
        .trim()
        .min(1, "Number is required.")
        .max(20, "Number must be under 20 characters"),
});

export const createContactValidator = z.object({
    shopId: z.string().min(1, "Shop is required."),
    email: z
        .string()
        .trim()
        .email("Enter a valid email")
        .optional()
        .or(z.literal("")),
    contactNumbers: z
        .array(contactNumberValidator)
        .max(2, "You can add up to 2 contact numbers"),
    workingHours: z
        .string()
        .trim()
        .max(200, "Working hours must be under 200 characters")
        .optional()
        .or(z.literal("")),
    googleMapLink: z
        .string()
        .trim()
        .url("Enter a valid Google Maps URL")
        .optional()
        .or(z.literal("")),
    isVisible: z.boolean().optional(),
});

export const updateContactValidator = createContactValidator.partial();