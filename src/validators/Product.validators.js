import { z } from "zod";

const imagesArraySchema = z
    .string()
    .trim()
    .optional()
    .or(z.literal(""))
    .transform((value, ctx) => {
        if (!value) return [];

        try {
            const parsed = JSON.parse(value);

            if (!Array.isArray(parsed)) {
                ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Images must be a list." });
                return z.NEVER;
            }

            return parsed;
        } catch {
            ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Invalid images data." });
            return z.NEVER;
        }
    })
    .pipe(
        z
            .array(z.string().trim().url("Each image must be a valid URL"))
            .max(4, "A product can have a maximum of 4 images")
    );

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
    images: imagesArraySchema,
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