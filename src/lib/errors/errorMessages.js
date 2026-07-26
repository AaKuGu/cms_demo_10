// Centralized user-facing error messages — reused across guards, actions, authorization.
// Keep these short & user-safe (they get shown directly via toast on the client).
export const ERRORS = {
  EMAIL_NOT_FOUND: "Email not found in session.",
  CLINIC_ID_NOT_FOUND: "Clinic not set up.",
  STAFF_NOT_FOUND: "Staff not found.",
  PERMISSION_DENIED: "Permission denied.",
};