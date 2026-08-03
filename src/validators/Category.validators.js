import { z } from "zod";

export const createCategoryValidator = z.object({
    shopId: z.string().min(1, "Shop is required."),
    name: z
        .string()
        .trim()
        .min(2, "Name must be at least 2 characters")
        .max(100, "Name must be under 100 characters"),
    slug: z
        .string()
        .trim()
        .min(2, "Slug must be at least 2 characters")
        .max(120, "Slug must be under 120 characters")
        .regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens"),
    description: z
        .string()
        .trim()
        .max(1000, "Description must be under 1000 characters")
        .optional()
        .or(z.literal("")),
});

export const updateCategoryValidator = createCategoryValidator.partial();
