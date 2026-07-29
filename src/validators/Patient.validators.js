import { z } from "zod";

export const createPatientValidator = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be under 100 characters"),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Enter a valid email address")
    .optional()
    .or(z.literal("")),
  phone: z
    .string()
    .trim()
    .max(20, "Phone number must be under 20 characters")
    .optional()
    .or(z.literal("")),
  dateOfBirth: z
    .string()
    .trim()
    .max(50, "Date of birth is too long")
    .optional()
    .or(z.literal("")),
  gender: z
    .enum(["", "male", "female", "other", "prefer_not_to_say"], {
      errorMap: () => ({ message: "Please select a valid gender option" }),
    })
    .optional(),
  address: z
    .string()
    .trim()
    .max(200, "Address must be under 200 characters")
    .optional()
    .or(z.literal("")),
  notes: z
    .string()
    .trim()
    .max(1000, "Notes must be under 1000 characters")
    .optional()
    .or(z.literal("")),
});

export const updatePatientValidator = createPatientValidator.partial();
