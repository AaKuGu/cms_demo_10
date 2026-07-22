// lib/actionWrappers.js

import { tryCatchAction } from "@/lib/tryCatchAction";
import { getOwnerOrReturn } from "@/services/AuthenticatedHoc.services";

export async function withClinicIdActionWrapper(fn) {
  const ownerResult = await getOwnerOrReturn();
  if (!ownerResult.success) return ownerResult.response;
  const { clinicId } = ownerResult.data;

  return tryCatchAction(async () => fn(clinicId));
}