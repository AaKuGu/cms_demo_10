export function validateInputs(validator, rawValues) {
  const parsed = validator.safeParse(rawValues);

  if (!parsed.success) {
    const { fieldErrors } = parsed.error.flatten();
    const firstError = Object.values(fieldErrors)[0]?.[0] || "Invalid input.";
    return { success: false, error: firstError, data: null };
  }

  return { success: true, error: null, data: parsed.data };
}