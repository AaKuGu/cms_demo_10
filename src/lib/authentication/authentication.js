import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { logConsole } from "../console/console";
import { serialize } from "../serialize";

export async function getAuthenticatedContext() {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    return {
      userId: session?.user?.id ?? null,
      // clinicId: session?.clinicId ?? null,
      // isOwner: session?.isOwner ?? null,
      email: session?.user?.email ?? null,
    };
  } catch {
    return { userId: null, clinicId: null };
    // return { userId: null, clinicId: null, isOwner: null };
  }
}

// above is the verge of deletion

export async function getUserFromAuthLibraryFromSession() {
  const session = await auth.api.getSession({ headers: await headers() });
  logConsole("/lib/authentication/getUserFromAuthLibraryFromSession : session : ", session);
  return serialize(session?.userFromAuthLibrary ?? null);
}

export async function getAppUserFromSession() {
  const session = await auth.api.getSession({ headers: await headers() });
  logConsole("/lib/authentication/getAppUserFromSession : session : ", session);
  return serialize(session?.appUser ?? null);
}

export async function getAuthenticationLibraryUserIdFromSession() {
  const session = await auth.api.getSession({ headers: await headers() });

  logConsole("/lib/authentication/getAuthenticationLibraryUserIdFromSession : session : ", session)

  return serialize(session?.userFromAuthLibrary?.id ?? null);
}

//above might get deleted 80% chance

export async function getAppUserIdFromAppUserSession() {
  const session = await auth.api.getSession({ headers: await headers() });
  logConsole("/lib/authentication/getAppUserIdFromAppUserSession : session : ", session)
  return serialize(session?.appUser?._id ?? null);
}


//above might get deleted 80% chance

export async function getAppUserIdFromSession() {
  const session = await auth.api.getSession({ headers: await headers() });
  logConsole("/lib/authentication/getAppUserIdFromSession : session : ", session)
  return serialize(session?.appUser?._id ?? null);
}

//above might get deleted 80% chance


export async function getNameFromSession() {
  const session = await auth.api.getSession({ headers: await headers() });
  logConsole("/lib/authentications : getNameFromSession : session : ", session);

  return session?.userFromAuthLibrary?.name ?? null;
}

//above might get deleted 80% chance


// export async function getClinicIdFromSession() {
//   const session = await auth.api.getSession({ headers: await headers() });
//   return session?.clinicId ?? null;
// }

// export async function getIsOwnerFromSession() {
//   const session = await auth.api.getSession({ headers: await headers() });
//   return session?.isOwner ?? null;
// }

export async function getEmailFromSession() {
  const session = await auth.api.getSession({ headers: await headers() });

  logConsole("/lib/authentications : getEmailFromSession : session : ", session);

  return session?.userFromAuthLibrary?.email ?? null;
}

//above might get deleted 80% chance


export async function getEmailFromAppUserSession() {
  const session = await auth.api.getSession({ headers: await headers() });

  logConsole("/lib/authentications : getEmailFromSession : session : ", session);

  return session?.appUser?.email ?? null;
}

//above might get deleted 80% chance


export async function getNameFromAppUserSession() {
  const session = await auth.api.getSession({ headers: await headers() });

  logConsole("/lib/authentications : getNameFromAppUserSession : session : ", session);

  return session?.appUser?.name ?? null;
}

//above might get deleted 80% chance



export async function getOnboardingFromAppUserSession() {
  const session = await auth.api.getSession({ headers: await headers() });

  logConsole("/lib/authentications : getOnboardingFromAppUserSession : session : ", session);

  return session?.appUser?.onboarding ?? null;
}


//above might get deleted 80% chance

