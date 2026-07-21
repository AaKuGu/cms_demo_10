"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import FormInput from "@/components/FormInput";
import PermissionsSelector from "../PermissionsSelector";
import { createStaffAction } from "@/actions/Staff.actions";
import { useSubmitWithToast } from "@/hooks/useSubmitWithToast";

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
   const [state, submit, isPending] = useSubmitWithToast(createStaffAction, {
    error: null,
    success: null,
  });


    const updateField = (field) => (e) => {
    setFormValues((prev) => ({ ...prev, [field]: e.target.value }));
  };

   const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", formValues.name);
    formData.set("email", formValues.email);
    formData.set("phone", formValues.phone);
    formData.set("designation", formValues.designation);
    formData.set("permissions", JSON.stringify(selected));

    submit(formData);
  };

  return (
    <div className="max-w-2xl">
      <PageHeader title="Invite Staff" />
 <form onSubmit={handleSubmit}>
      <div className="border border-gray-200 rounded-lg p-5 mb-6">
        <p className="text-sm font-medium mb-3">Basic Details</p>
        <div className="grid grid-cols-2 gap-3">
         <FormInput label="Full Name" name="name" placeholder="e.g. Riya Sharma"
         value={formValues.name}
              onChange={updateField("name")}
         />
        <FormInput label="Email" name="email" type="email" placeholder="e.g. riya@example.com"
         value={formValues.email}
              onChange={updateField("email")}
        />
        <FormInput label="Phone" name="phone" type="tel" hint="Optional" 
         value={formValues.phone}
              onChange={updateField("phone")}
        />
        <FormInput label="Designation" name="designation" placeholder="e.g. Receptionist" hint="Optional"
         value={formValues.designation}
              onChange={updateField("designation")}
        />
        </div>
      </div>

      <div className="border border-gray-200 rounded-lg p-5 mb-6">
        <p className="text-sm font-medium mb-4">Permissions</p>
        <PermissionsSelector selected={selected} onChange={setSelected} />
      </div>


      <div className="flex justify-end gap-2">
        <button
        type="button"
          onClick={() => router.push("/staff")}
          className="px-4 py-2 rounded-md text-sm border"
        >
          Cancel
        </button>
        <button
            type="submit"
            disabled={isPending}
            className="px-4 py-2 rounded-md bg-gray-900 text-white text-sm disabled:opacity-60"
          >
            {isPending ? "Inviting..." : "Send Invite"}
          </button>
      </div>
      </form>
    </div>
  );
}