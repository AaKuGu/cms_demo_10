"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import StaffForm from "../StaffForm/StaffForm";
import { createStaffAction } from "@/actions/Staff.actions";
import { errorToast, successToast } from "@/lib/toast";
import { logConsole } from "@/lib/console/console";

const initialFormValues = {
  name: "",
  email: "",
  phone: "",
  designation: "",
};

export default function InviteStaffPage() {
  const router = useRouter();
  const [formValues, setFormValues] = useState(initialFormValues);
  const [selected, setSelected] = useState([]);
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

    const { data, error } = await createStaffAction(formData);

    logConsole("createStaffAction response:", { data, error });

    setIsPending(false);

    if (error) {
      errorToast(error);
      return;
    }

    successToast("Staff invited!");
    router.push("/staff");
  };

  return (
    <div className="max-w-2xl">
      <PageHeader title="Invite Staff" />
      <StaffForm
        formValues={formValues}
        onChange={updateField}
        selected={selected}
        onSelectedChange={setSelected}
        onSubmit={handleSubmit}
        onCancel={() => router.push("/staff")}
        isPending={isPending}
        submitLabel="Send Invite"
      />
    </div>
  );
}