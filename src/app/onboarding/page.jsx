"use client";

import { useActionStateWithToast } from "@/hooks/useActionWithToast";
import { createClinicAction } from "@/actions/Onboarding.actions";

const initialState = { error: null, values: null };

export default function OnboardingPage() {
  const [state, formAction, isPending] = useActionStateWithToast(
    createClinicAction,
    initialState
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-sm rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-8 text-center">
          <h1 className="text-xl font-semibold text-slate-900">
            Set up your clinic
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Tell us a bit about your clinic to get started
          </p>
        </div>

        <form action={formAction} className="space-y-4">
          <div>
            <label
              htmlFor="clinicName"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Clinic name
            </label>
            <input
              id="clinicName"
              name="clinicName"
              type="text"
               defaultValue={state?.values?.clinicName ?? ""}
              placeholder="e.g. Sunrise Family Clinic"
              required
              className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300"
            />
          </div>

          <div>
            <label
              htmlFor="ownerName"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Owner name
            </label>
            <input
              id="ownerName"
              name="ownerName"
              type="text"
              defaultValue={state?.values?.ownerName ?? ""}
              placeholder="e.g. Dr. Aditi Sharma"
              required
              className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="mt-2 w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? "Creating..." : "Continue"}
          </button>
        </form>
      </div>
    </div>
  );
}