import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function getAuthenticatedContext() {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    return {
      userId: session?.user?.id ?? null,
      clinicId: session?.clinicId ?? null,
      isOwner: session?.isOwner ?? null,
      email: session?.user?.email ?? null,
    };
  } catch {
    return { userId: null, clinicId: null, isOwner: null };
  }
}

export async function getUserIdFromSession() {
    const session = await auth.api.getSession({ headers: await headers() });
    return session?.user?.id ?? null;
}

export async function getClinicIdFromSession() {
    const session = await auth.api.getSession({ headers: await headers() });
    return session?.clinicId ?? null;
}

export async function getIsOwnerFromSession() {
    const session = await auth.api.getSession({ headers: await headers() });
    return session?.isOwner ?? null;
}

export async function getEmailFromSession() {
    const session = await auth.api.getSession({ headers: await headers() });
    return session?.user?.email ?? null;
}