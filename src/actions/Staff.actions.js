"use server";

import { getOwnerOrReturn } from "@/services/AuthenticatedHoc.services";
import { createStaffValidator } from "@/validators/Staff.validators";
import { createStaff, getStaffById, updateStaffById } from "@/crud/Staff.crud";
import { getStaffByEmail } from "@/services/Staff.services";
import { tryCatchAction } from "@/lib/tryCatchAction";
import { parseOrReturnError } from "@/lib/parseOrReturnError";

export async function createStaffAction(formData) {
  const rawValues = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    designation: formData.get("designation"),
    permissions: JSON.parse(formData.get("permissions") || "[]"),
  };

  const ownerResult = await getOwnerOrReturn();
  if (!ownerResult.success) return ownerResult.response;
  const { clinicId } = ownerResult.data;

  const parsed = parseOrReturnError(createStaffValidator, rawValues);
  if (!parsed.success) return parsed.response;

  return tryCatchAction(async () => {
    const existingStaff = await getStaffByEmail(clinicId, parsed.data.email);
    if (existingStaff) {
      return { error: "This email has already been invited." };
    }

    const created = await createStaff({ ...parsed.data, clinicId });
    if (!created) {
      return { error: "Failed to invite staff member. Please try again." };
    }

    return { success: "Staff invited!", redirectTo: "/staff" };
  }, rawValues);
}




export async function revokeStaffAction(staffId) {
  const ownerResult = await getOwnerOrReturn();
  if (!ownerResult.success) return ownerResult.response;
  const { clinicId } = ownerResult.data;

  return tryCatchAction(async () => {
    const staff = await getStaffById(staffId);

    if (!staff) {
      return { error: "Staff member not found." };
    }

    if (String(staff.clinicId) !== String(clinicId)) {
      return { error: "You do not have permission to revoke this staff member." };
    }

    if (staff.status === "revoked") {
      return { error: "This staff member is already revoked." };
    }

    const updated = await updateStaffById(staffId, { status: "revoked" });
    if (!updated) {
      return { error: "Failed to revoke staff member. Please try again." };
    }

    return { success: "Staff access revoked." };
  });
}