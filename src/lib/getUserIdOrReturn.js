// src/services/AuthenticatedHoc.services.js  (or wherever getAuthenticatedContext lives)
import { getAuthenticatedContext } from "@/services/AuthenticatedHoc.services";

export async function getUserIdOrReturn() {
  const { userId } = await getAuthenticatedContext();

  if (!userId) {
    return {
      success: false,
      response: { error: "You must be logged in to continue." },
    };
  }

  return { success: true, data: userId };
}