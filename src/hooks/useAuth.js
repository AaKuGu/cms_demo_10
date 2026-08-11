"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/authClient";
import { successToast, errorToast } from "@/lib/toast";
import { routes } from "@/lib/routes/routes";

export function useAuth() {
  const router = useRouter();

  const logout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push(routes.login);
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
          router.push(routes.onboarding);
        },
        onError: (ctx) => {
          errorToast(ctx.error.message ?? "Login failed.");
        },
      }
    );
  };
  const loginWithGoogle = async (callbackURL) => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL,
    });
  };

  return { login, loginWithGoogle, logout };
}