import { z } from "zod";
const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const productsSettingsValidator = z.object({
    showPricing: z.boolean().optional(),
});

const shopSettingsValidator = z
    .object({
        products: productsSettingsValidator.optional(),
    })
    .optional();

export const createShopValidator = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Name must be at least 2 characters")
        .max(100, "Name must be under 100 characters"),
    slug: z
        .string()
        .trim()
        .toLowerCase()
        .min(2, "Slug must be at least 2 characters")
        .max(100, "Slug must be under 100 characters")
        .regex(
            slugRegex,
            "Slug can only contain lowercase letters, numbers, and hyphens (e.g. bhaiya-ji-cosmetics)"
        ),
    phone: z
        .string()
        .trim()
        .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number")
        .or(z.literal("")),
    address: z
        .string()
        .trim()
        .max(200, "Address must be under 200 characters")
        .optional()
        .or(z.literal("")),
    googleMapLink: z
        .string()
        .trim()
        .url("Enter a valid Google Maps URL")
        .max(500, "Google Map link must be under 500 characters")
        .optional()
        .or(z.literal("")),
    logo: z
        .string()
        .trim()
        .url("Enter a valid logo URL")
        .max(500, "Logo URL must be under 500 characters")
        .optional()
        .or(z.literal("")),
    settings: shopSettingsValidator,
});

export const updateShopValidator = createShopValidator.partial();