import { z } from "zod";

export const createAppUserValidator = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be under 100 characters"),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Enter a valid email address"),
  phone: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit phone number")
    .optional()
    .or(z.literal("")),
});

export const updateAppUserValidator = createAppUserValidator.partial();