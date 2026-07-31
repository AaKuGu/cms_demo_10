"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateStaffAction } from "@/actions/Staff.actions";
import { logConsole } from "@/lib/console/console";
import { errorToast, successToast } from "@/lib/toast";
import StaffForm from "../../StaffForm/StaffForm";

const defaultValues = {
  name: "",
  email: "",
  phone: "",
  designation: "",
};

export default function EditClient({ initialValues = {} }) {
  const router = useRouter();
  const [formValues, setFormValues] = useState(() => ({
    ...defaultValues,
    ...initialValues,
  }));
  const [selected, setSelected] = useState(initialValues?.permissions || []);
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
    formData.set("designation", formValues.designation);
    formData.set("permissions", JSON.stringify(selected));

    const { data, error } = await updateStaffAction(formData, initialValues?._id);

    logConsole("updateStaffAction response:", { data, error });

    setIsPending(false);

    if (error) {
      errorToast(error);
      return;
    }

    successToast("Staff member updated successfully!");
    router.push("/staff");
  };

  return (
    <StaffForm
      formValues={formValues}
      onChange={updateField}
      selected={selected}
      onSelectedChange={setSelected}
      onSubmit={handleSubmit}
      onCancel={() => router.push("/staff")}
      isPending={isPending}
      submitLabel="Save Changes"
    />
  );
}