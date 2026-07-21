"use client";

import { createClinicAction } from "@/actions/Onboarding.actions";
import FormInput from "@/components/FormInput";
import { useSubmitWithToast } from "@/hooks/useSubmitWithToast";
import { useRouter } from "next/navigation";
import { useState } from "react";

const initialFormValues = {
  clinicName: "",
  ownerName: "",
};


export default function OnboardingPage() {
 const router = useRouter();
  const [formValues, setFormValues] = useState(initialFormValues);
  const [state, submit, isPending] = useSubmitWithToast(createClinicAction, {
    error: null,
    success: null,
  });

  const updateField = (field) => (e) => {
    setFormValues((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("clinicName", formValues.clinicName);
    formData.set("ownerName", formValues.ownerName);
    submit(formData);
  };

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

        <form onSubmit={handleSubmit} className="space-y-4">
         <FormInput
            label="Clinic name"
            name="clinicName"
            type="text"
             value={formValues.clinicName}
            onChange={updateField("clinicName")}
            placeholder="e.g. Sunrise Family Clinic"
            required
          />
          <FormInput
            label="Owner name"
            name="ownerName"
            type="text"
           value={formValues.ownerName}
            onChange={updateField("ownerName")}
            placeholder="e.g. Dr. Aditi Sharma"
            required
          />

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