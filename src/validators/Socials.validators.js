import { z } from "zod";

export const socialLinkValidator = z.object({
    platform: z.enum([
        "instagram",
        "facebook",
        "whatsapp",
        "youtube",
        "twitter",
        "linkedin",
        "tiktok",
        "pinterest",
    ]),
    url: z
        .string()
        .trim()
        .min(1, "URL is required.")
        .url("Enter a valid URL")
        .max(500, "URL must be under 500 characters"),
});

export const createSocialsValidator = z.object({
    shopId: z.string().min(1, "Shop is required."),
    links: z.array(socialLinkValidator).optional().default([]),
    isVisible: z.boolean().optional(),
});

export const updateSocialsValidator = createSocialsValidator.partial();