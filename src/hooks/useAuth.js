"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/authClient";
import { successToast, errorToast } from "@/lib/toast";

export function useAuth() {
  const router = useRouter();

  const logout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
        onError: () => {
          errorToast("Failed to log out. Please try again.");
        },
      },
    });
  };

 const login = async ({ email, password }) => {
    await authClient.signIn.email(
      { email, password },
      {
        onSuccess: () => {
          router.push("/onboarding");
        },
        onError: (ctx) => {
          errorToast(ctx.error.message ?? "Login failed.");
        },
      }
    );
  };
  const loginWithGoogle = async (callbackURL = "/onboarding") => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL,
    });
  };

  return { login, loginWithGoogle, logout };
}