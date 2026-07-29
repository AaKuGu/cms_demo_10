"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PatientForm from "../PatientForm/PatientForm";
import { createPatientAction } from "@/actions/Patient.actions";
import { errorToast, successToast } from "@/lib/toast";
import { logConsole } from "@/lib/console/console";
import { dateToInputValue } from "@/lib/dateToInputValue";

const defaultValues = {
  name: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  gender: "",
  address: "",
  notes: "",
};

export default function NewPatientForm() {
  const router = useRouter();
  const [formValues, setFormValues] = useState(() => ({ ...defaultValues }));
  const [isPending, setIsPending] = useState(false);

  const updateField = (field) => (e) => {
    setFormValues((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);

    const formData = new FormData();
    formData.set("name", formValues.name);
    formData.set("email", formValues.email);
    formData.set("phone", formValues.phone);
    formData.set("dateOfBirth", formValues.dateOfBirth);
    formData.set("gender", formValues.gender);
    formData.set("address", formValues.address);
    formData.set("notes", formValues.notes);

    const { data, error } = await createPatientAction(formData);

    logConsole("createPatientAction response:", { data, error });

    setIsPending(false);

    if (error) {
      errorToast(error);
      return;
    }

    successToast("Patient added successfully!");
    router.push("/patients");
  };

  return (
    <PatientForm
      formValues={formValues}
      onChange={updateField}
      onSubmit={handleSubmit}
      onCancel={() => router.push("/patients")}
      isPending={isPending}
      submitLabel="Add Patient"
    />
  );
}
