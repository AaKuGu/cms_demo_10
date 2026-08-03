"use server";

import { createClinic, getClinicByUserId } from "@/crud/Clinic.crud"
import { tryCatchAction } from "@/lib/tryCatchAction";
import { createClinicValidator } from "@/validators/Clinic.validators";
import { throwError } from "@/lib/throwError";
import { validateInputs } from "@/lib/validateInputs";
import { getUserIdFromSession } from "@/lib/authentication/authentication";
import { serialize } from "@/lib/serialize";
import { redirect } from "next/navigation";

export async function createClinicAction(formData) {
  return tryCatchAction(async () => {
    const rawValues = {
      clinicName: formData.get("clinicName"),
      ownerName: formData.get("ownerName"),
    };
    const userId = await getUserIdFromSession();
    if (!userId) {
      redirect("/login");
    }

    const validated = validateInputs(createClinicValidator, rawValues);
    if (!validated.success) {
      throwError(validated.error); // throw karne ka decision yahan hai, validator ke andar nahi
    }

    const existingClinic = await getClinicByUserId(userId);
    if (existingClinic) {
      redirect("/dashboard");
    }

    const createdClinic = await createClinic({ ...validated.data, userId });
    return serialize(createdClinic); // ye zaroori hai, mat hatana 

  });
}