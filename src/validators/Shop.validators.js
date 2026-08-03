import { z } from "zod";

export const createShopValidator = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Name must be at least 2 characters")
        .max(100, "Name must be under 100 characters"),
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
});

export const updateShopValidator = createShopValidator.partial();