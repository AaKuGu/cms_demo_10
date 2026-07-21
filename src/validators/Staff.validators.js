import { z } from "zod";
import { PERMISSIONS } from "@/config/permissions";

export const createStaffValidator = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be under 100 characters")
    .optional()
    .or(z.literal("")),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Enter a valid email address"),
  phone: z
    .string()
    .trim()
    .max(20, "Phone number must be under 20 characters")
    .optional()
    .or(z.literal("")),
  designation: z
    .string()
    .trim()
    .max(50, "Designation must be under 50 characters")
    .optional()
    .or(z.literal("")),
  permissions: z
    .array(z.enum(PERMISSIONS))
    .default([]),
});

export const updateStaffValidator = createStaffValidator.partial();

