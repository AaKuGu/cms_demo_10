// src/hooks/useActionStateWithToast.js
"use client";

import { useActionState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { successToast, errorToast } from "@/lib/toast";

export function useActionStateWithToast(action, initialState) {
  const [state, formAction, isPending] = useActionState(action, initialState);
  const router = useRouter();
  const lastHandledState = useRef(initialState);

  useEffect(() => {
    if (state === lastHandledState.current) return;
    lastHandledState.current = state;

    if (state?.error) {
      errorToast(state.error);
    } else if (state?.success) {
      successToast(state.success);
      if (state.redirectTo) {
        router.push(state.redirectTo);
      }
    }
  }, [state, router]);

  return [state, formAction, isPending];
}