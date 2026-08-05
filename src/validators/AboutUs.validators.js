import { z } from "zod";

// Helper for optional string inputs that convert empty inputs to ""
const optionalString = (maxLength, message) =>
  z
    .string()
    .trim()
    .max(maxLength, message || `Must be under ${maxLength} characters`)
    .optional()
    .transform((val) => val || "");

// Helper for optional Cloudinary image URLs that allow empty strings or undefined
const optionalUrl = (message = "Must be a valid URL") =>
  z
    .string()
    .trim()
    .transform((val) => (val === "" ? undefined : val))
    .pipe(
      z
        .string()
        .url(message)
        .max(500, "URL must be under 500 characters")
        .optional()
    )
    .transform((val) => val || "");

// Helper for optional numbers that converts "" or "NaN" to undefined
const optionalNumber = (minVal, minMsg, maxVal, maxMsg) =>
  z
    .preprocess((val) => {
      if (val === "" || val === null || val === undefined) return undefined;
      const num = Number(val);
      return isNaN(num) ? undefined : num;
    }, z.number().optional())
    .refine((val) => val === undefined || minVal === undefined || val >= minVal, {
      message: minMsg,
    })
    .refine((val) => val === undefined || maxVal === undefined || val <= maxVal, {
      message: maxMsg,
    });

// ---------- Sub-Schema Validators ----------

export const teamMemberValidator = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be under 100 characters"),
  designation: optionalString(100, "Designation must be under 100 characters"),
  photo: optionalUrl("Enter a valid image URL for photo"),
  bio: optionalString(1000, "Bio must be under 1000 characters"),
  yearsOfExperience: optionalNumber(
    0,
    "Years of experience cannot be negative"
  ),
  socialLinks: z
    .object({
      instagram: optionalUrl("Enter a valid Instagram URL"),
      linkedin: optionalUrl("Enter a valid LinkedIn URL"),
      facebook: optionalUrl("Enter a valid Facebook URL"),
    })
    .optional()
    .default({ instagram: "", linkedin: "", facebook: "" }),
  order: z.number().default(0),
  isVisible: z.boolean().default(true),
});

export const milestoneStatValidator = z.object({
  label: z
    .string()
    .trim()
    .min(1, "Label is required")
    .max(100, "Label must be under 100 characters"),
  value: z
    .string()
    .trim()
    .min(1, "Value is required")
    .max(100, "Value must be under 100 characters"),
  icon: optionalString(100, "Icon class/name must be under 100 characters"),
  order: z.number().default(0),
});

// ---------- Section Validators ----------

export const storySectionValidator = z.object({
  isVisible: z.boolean().default(true),
  order: z.number().default(1),
  heading: optionalString(100, "Heading must be under 100 characters"),
  content: optionalString(5000, "Content must be under 5000 characters"),
  establishedYear: optionalNumber(
    1800,
    "Year must be 1800 or later",
    new Date().getFullYear(),
    "Year cannot be in the future"
  ),
  coverImage: optionalUrl("Enter a valid cover image URL"),
});

export const visionMissionSectionValidator = z.object({
  isVisible: z.boolean().default(true),
  order: z.number().default(2),
  vision: optionalString(2000, "Vision text must be under 2000 characters"),
  mission: optionalString(2000, "Mission text must be under 2000 characters"),
});

export const foundersMessageSectionValidator = z.object({
  isVisible: z.boolean().default(false),
  order: z.number().default(3),
  founderName: optionalString(100, "Founder name must be under 100 characters"),
  designation: optionalString(100, "Designation must be under 100 characters"),
  photo: optionalUrl("Enter a valid founder photo URL"),
  message: optionalString(3000, "Message must be under 3000 characters"),
  signatureImage: optionalUrl("Enter a valid signature image URL"),
});

export const milestonesSectionValidator = z.object({
  isVisible: z.boolean().default(true),
  order: z.number().default(4),
  stats: z.array(milestoneStatValidator).default([]),
});

export const teamSectionValidator = z.object({
  isVisible: z.boolean().default(false),
  order: z.number().default(5),
  heading: optionalString(100, "Heading must be under 100 characters"),
  members: z.array(teamMemberValidator).default([]),
});

// ---------- Main About Us Validators ----------

export const createAboutUsValidator = z.object({
  shopId: z.string().min(1, "Shop ID is required"),
  story: storySectionValidator.optional(),
  visionMission: visionMissionSectionValidator.optional(),
  foundersMessage: foundersMessageSectionValidator.optional(),
  milestones: milestonesSectionValidator.optional(),
  team: teamSectionValidator.optional(),
  isVisible: z.boolean().default(true),
});

export const updateAboutUsValidator = createAboutUsValidator.partial();