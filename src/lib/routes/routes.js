import { redirect } from "next/navigation";
import { getAuthenticatedContext } from "../authentication/authentication";

export async function afterOnboardingRoutesGuard() {
  const context = await getAuthenticatedContext();

  if (!context.userId) {
    redirect("/login");
  }

  if (!context.clinicId) {
    redirect("/onboarding"); // hasn't completed clinic setup yet
  }

  return context; // { userId, clinicId, isOwner }
}

export async function beforeOnboardingRoutesGuard() {
  const context = await getAuthenticatedContext();
  console.log("before on boarding routes guard : ", context);

  if (!context.userId) {
    redirect("/login");
  }

  if (context.clinicId) {
    redirect("/dashboard"); // Clinic is already setup for this
  }


  return context; // { userId, clinicId, isOwner }
}