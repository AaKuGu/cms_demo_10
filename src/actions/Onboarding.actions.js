"use server";

import { createClinic } from "@/crud/Clinic.crud"
import { getClinicByUserId } from "@/services/Clinic.services";
import { tryCatchAction } from "@/lib/tryCatchAction";
import { createClinicValidator } from "@/validators/Clinic.validators";
import { parseOrReturnError } from "@/lib/parseOrReturnError";
import { getUserIdOrReturn } from "@/services/AuthenticatedHoc.services";

export async function createClinicAction(formData) {

  const rawValues = {
    clinicName: formData.get("clinicName"),
    ownerName: formData.get("ownerName"),
  };

  const userResult = await getUserIdOrReturn();
  if (!userResult.success) {
    return userResult.response;
  }
  const userId = userResult.data;

   const parsed = parseOrReturnError(createClinicValidator, rawValues);
  if (!parsed.success) {
    return parsed.response;
  }

 return tryCatchAction(async () => {
    const existingClinic = await getClinicByUserId(userId);
    if (existingClinic) {
      return { error: "You already have a clinic set up." };
    }

    await createClinic({ ...parsed.data, userId });

    return { success: "Clinic created!", redirectTo: "/dashboard" };
  }, rawValues);
}