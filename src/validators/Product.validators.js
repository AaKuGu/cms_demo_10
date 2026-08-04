import { z } from "zod";

export const createProductValidator = z.object({
    shopId: z.string().min(1, "Shop is required."),
    categoryId: z
        .string()
        .trim()
        .optional()
        .or(z.literal(""))
        .transform((value) => (value ? value : null)),
    name: z
        .string()
        .trim()
        .min(2, "Name must be at least 2 characters")
        .max(100, "Name must be under 100 characters"),
    image: z
        .string()
        .trim()
        .url("Enter a valid image URL")
        .max(500, "Image URL must be under 500 characters")
        .optional()
        .or(z.literal("")),
    desc: z
        .string()
        .trim()
        .max(1000, "Description must be under 1000 characters")
        .optional()
        .or(z.literal("")),
    price: z
        .number({ invalid_type_error: "Price is required." })
        .min(0, "Price must be 0 or greater"),
});

export const updateProductValidator = createProductValidator.partial();


export const productsSettingsValidator = z.object({
    showPricing: z.boolean().optional(),
});