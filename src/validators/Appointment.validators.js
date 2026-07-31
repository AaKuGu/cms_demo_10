import { z } from "zod";

const objectIdValidator = z
  .string()
  .trim()
  .regex(/^[0-9a-fA-F]{24}$/, "Invalid ID format");

export const createAppointmentValidator = z.object({
  patientId: objectIdValidator.optional().or(z.literal("")),
  staffId: objectIdValidator.optional().or(z.literal("")),
  title: z
    .string()
    .trim()
    .max(150, "Title must be under 150 characters")
    .optional()
    .or(z.literal("")),
  description: z
    .string()
    .trim()
    .max(500, "Description must be under 500 characters")
    .optional()
    .or(z.literal("")),
  appointmentDate: z
    .string()
    .trim()
    .min(1, "Appointment date is required")
    .refine((val) => !isNaN(Date.parse(val)), "Enter a valid date"),
  startTime: z
    .string()
    .trim()
    .max(20, "Start time is too long")
    .optional()
    .or(z.literal("")),
  endTime: z
    .string()
    .trim()
    .max(20, "End time is too long")
    .optional()
    .or(z.literal("")),
  status: z
    .enum(["scheduled", "completed", "cancelled", "no_show"], {
      errorMap: () => ({ message: "Please select a valid status" }),
    })
    .optional(),
  notes: z
    .string()
    .trim()
    .max(1000, "Notes must be under 1000 characters")
    .optional()
    .or(z.literal("")),
});

export const updateAppointmentValidator = createAppointmentValidator.partial();