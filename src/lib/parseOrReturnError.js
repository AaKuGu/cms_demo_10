// src/lib/parseOrReturnError.js
export function parseOrReturnError(schema, rawValues) {
  const parsed = schema.safeParse(rawValues);
  if (!parsed.success) {
    return {
      success: false,
      response: { error: parsed.error.issues[0]?.message ?? "Invalid input." },
    };
  }
  return { success: true, data: parsed.data };
}