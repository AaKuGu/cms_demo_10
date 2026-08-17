import { z } from "zod";

export const addTeamMemberValidator = z.object({
    email: z
        .string()
        .trim()
        .toLowerCase()
        .email("Enter a valid email address."),
});

export const updateTeamMemberValidator = addTeamMemberValidator.partial();