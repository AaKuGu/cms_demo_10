"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { successToast, errorToast } from "@/lib/toast";

export function useSubmitWithToast(action, initialState) {
  const [state, setState] = useState(initialState);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const submit = async (formData) => {
    setIsPending(true);
    try {
      const result = await action(formData);
      setState(result);

      if (result?.error) {
        errorToast(result.error);
      } else if (result?.success) {
        successToast(result.success);
        if (result.redirectTo) router.push(result.redirectTo);
      }
    } finally {
      setIsPending(false);
    }
  };

  return [state, submit, isPending];
}