"use server";

import { createStaffValidator, updateStaffValidator } from "@/validators/Staff.validators";
import { validateInputs } from "@/lib/validateInputs";
import { throwError } from "@/lib/throwError";
import { serialize } from "@/lib/serialize";
import { afterOnboardingActionGuard } from "@/lib/actions/action";
import { deleteStaffById, getStaffById, updateStaffById, createStaff, getStaffByEmail, acceptStaffInvite } from "@/crud/Staff.crud";
import { getEmailFromSession, getUserIdFromSession } from "@/lib/authentication/authentication";
import { tryCatchAction } from "@/lib/tryCatchAction";
import { ERRORS } from "@/lib/errors/errorMessages";
import { STAFF_PERMISSIONS } from "@/config/permissions";

export async function createStaffAction(formData) {
  return afterOnboardingActionGuard(STAFF_PERMISSIONS.CREATE_STAFF, async ({ clinicId }) => {
    const rawValues = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      designation: formData.get("designation"),
      permissions: JSON.parse(formData.get("permissions") || "[]"),
    };

    const validated = validateInputs(createStaffValidator, rawValues);
    if (!validated.success) {
      throwError(validated.error);
    }

    const existingStaff = await getStaffByEmail(clinicId, validated.data.email);
    if (existingStaff) {
      throwError("This email has already been invited.");
    }

    const created = await createStaff({ ...validated.data, clinicId });
    if (!created) {
      throwError("Failed to invite staff member. Please try again.");
    }

    return serialize(created);
  });
}

export async function deleteStaffAction(staffId) {
  return afterOnboardingActionGuard(STAFF_PERMISSIONS.DELETE_STAFF, async ({ clinicId }) => {
    if (!staffId) {
      throwError("Staff ID is required.");
    }

    const staff = await getStaffById(staffId);
    if (!staff) {
      throwError("Staff member not found.");
    }

    if (staff.clinicId.toString() !== clinicId.toString()) {
      throwError("You are not authorized to delete this staff member.");
    }

    const deleted = await deleteStaffById(staffId);
    if (!deleted) {
      throwError("Failed to delete staff member. Please try again.");
    }

    return serialize(deleted);
  });
}

export async function revokeStaffAction(staffId) {
  return afterOnboardingActionGuard(STAFF_PERMISSIONS.REVOKE_STAFF, async ({ clinicId }) => {
    if (!staffId) {
      throwError("Staff ID is required.");
    }

    const staff = await getStaffById(staffId);
    if (!staff) {
      throwError("Staff member not found.");
    }

    if (staff.clinicId.toString() !== clinicId.toString()) {
      throwError("You are not authorized to revoke this staff member.");
    }

    if (staff.status === "revoked") {
      throwError("Staff member is already revoked.");
    }

    const revoked = await updateStaffById(staffId, { status: "revoked" });
    if (!revoked) {
      throwError("Failed to revoke staff access. Please try again.");
    }

    return serialize(revoked);
  });
}

export async function staffAcceptInviteAction(staffId) {
   return tryCatchAction(async () => {

    const userId = await getUserIdFromSession();
    if (!userId) {
      throwError("You must be logged in to accept this invite.");
    }

    const email = await getEmailFromSession();
    if (!email) {
      throwError(ERRORS.EMAIL_NOT_FOUND);
    }

    const staff = await getStaffById(staffId);
    if (!staff) throwError(ERRORS.STAFF_NOT_FOUND);

    // security check — invite kisi aur ke email ka na ho
    if (staff.email !== email) {
      throwError("This invitation does not belong to your account.");
    }

    if (staff.status === "revoked") throwError("This invitation has been revoked.");
    if (staff.status === "active") throwError("This invitation has already been accepted.");

    // agar staff record already kisi userId se linked hai (edge case)
    if (staff.userId && staff.userId !== userId) {
      throwError("This invitation is linked to another account.");
    }

    const updated = await acceptStaffInvite(staff._id, userId);
    if (!updated) throwError("Failed to accept invitation. Please try again.");

    return serialize(updated);
  });
}

export async function updateStaffAction(formData, staffId) {
  return afterOnboardingActionGuard(STAFF_PERMISSIONS.UPDATE_STAFF, async ({ clinicId }) => {
    if (!staffId) {
      throwError("Staff ID is required.");
    }

    const existingStaff = await getStaffById(staffId);
    if (!existingStaff) {
      throwError("Staff member not found.");
    }

    if (existingStaff.clinicId.toString() !== clinicId.toString()) {
      throwError("You are not authorized to update this staff member.");
    }

    const rawValues = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      designation: formData.get("designation"),
      permissions: JSON.parse(formData.get("permissions") || "[]"),
    };

    const validated = validateInputs(updateStaffValidator, rawValues);
    if (!validated.success) {
      throwError(validated.error);
    }

    const duplicateStaff = await getStaffByEmail(clinicId, validated.data.email);
    if (duplicateStaff && duplicateStaff._id.toString() !== staffId) {
      throwError("This email has already been invited.");
    }

    const updated = await updateStaffById(staffId, { ...validated.data, clinicId });
    if (!updated) {
      throwError("Failed to update staff member. Please try again.");
    }

    return serialize(updated);
  });
}
// 9651338585 : durga ji road : 