import { z } from "zod";

export const createAppUserValidator = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be under 100 characters"),
  userIdFromAuthLibrary: z
    .string()
    .trim()
    .min(1, "User ID from auth library is required"),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Enter a valid email address"),
  role: z
    .string()
    .trim()
    .max(50, "Role must be under 50 characters")
    .optional()
    .or(z.literal("")),
});

export const updateAppUserValidator = createAppUserValidator.partial();