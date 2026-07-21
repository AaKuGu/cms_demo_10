import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function getAuthenticatedContext() {
  const session = await auth.api.getSession({ headers: await headers() });
  return {
    userId: session?.user?.id ?? null,
    clinicId: session?.clinicId ?? null,
    isOwner : session?.isOwner ?? null
  };
}

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

export async function getOwnerOrReturn() {
  const { userId, clinicId, isOwner } = await getAuthenticatedContext();
  console.log("userID : ", userId);
  console.log("clinicId : ", clinicId);
  console.log("isOnwer : ",isOwner);

  if (!isOwner) {
    return {
      success: false,
      response: { error: "Only the clinic owner can perform this action." },
    };
  }

  return { success: true, data: { userId, clinicId } };
}

