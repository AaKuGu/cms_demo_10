import { z } from "zod";

export const createClinicValidator = z.object({
  clinicName: z
    .string()
    .trim()
    .min(2, "Clinic name must be at least 2 characters")
    .max(100, "Clinic name must be under 100 characters"),
  ownerName: z
    .string()
    .trim()
    .min(2, "Owner name must be at least 2 characters")
    .max(100, "Owner name must be under 100 characters"),
});

export const updateClinicValidator = createClinicValidator.partial();