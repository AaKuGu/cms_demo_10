// Centralized user-facing error messages — reused across guards, actions, authorization.
// Keep these short & user-safe (they get shown directly via toast on the client).
export const ERRORS = {
  EMAIL_NOT_FOUND: "Email not found in session.",
  APP_USER_NOT_FOUND: "App User not found in session.",
  PERMISSION_DENIED: "Permission denied.",
  NAME_FROM_AUTH_LIBRARY_NOT_FOUND: "Name Not Found in Session"
};