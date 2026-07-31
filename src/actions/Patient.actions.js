"use server";

import { createPatientValidator } from "@/validators/Patient.validators";
import { validateInputs } from "@/lib/validateInputs";
import { throwError } from "@/lib/throwError";
import { serialize } from "@/lib/serialize";
import { afterOnboardingActionGuard } from "@/lib/actions/action";
import { createPatient, getPatient, getPatientById, updatePatientById, deletePatientById } from "@/crud/Patient.crud";
import { PATIENT_PERMISSIONS } from "@/config/permissions";

export async function createPatientAction(formData) {
  return afterOnboardingActionGuard(PATIENT_PERMISSIONS.CREATE_PATIENT, async ({ clinicId }) => {
    const rawValues = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      dateOfBirth: formData.get("dateOfBirth"),
      gender: formData.get("gender"),
      address: formData.get("address"),
      notes: formData.get("notes"),
    };

    const validated = validateInputs(createPatientValidator, rawValues);
    if (!validated.success) {
      throwError(validated.error);
    }

    const existingPatient = await getPatient({ clinicId, email: validated.data.email });
    if (existingPatient && validated.data.email) {
      throwError("This email is already in the patient list.");
    }

    const created = await createPatient({ ...validated.data, clinicId });
    if (!created) {
      throwError("Failed to add patient. Please try again.");
    }

    return serialize(created);
  });
}

export async function updatePatientAction(formData, patientId) {
  return afterOnboardingActionGuard(PATIENT_PERMISSIONS.UPDATE_PATIENT, async ({ clinicId }) => {
    if (!patientId) {
      throwError("Patient ID is required.");
    }

    const existingPatient = await getPatientById(patientId);
    if (!existingPatient) {
      throwError("Patient not found.");
    }

    if (existingPatient.clinicId.toString() !== clinicId.toString()) {
      throwError("You are not authorized to update this patient.");
    }

    const rawValues = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      dateOfBirth: formData.get("dateOfBirth"),
      gender: formData.get("gender"),
      address: formData.get("address"),
      notes: formData.get("notes"),
    };

    const validated = validateInputs(createPatientValidator, rawValues);
    if (!validated.success) {
      throwError(validated.error);
    }

    const duplicatePatient = await getPatient({ clinicId, email: validated.data.email });
    if (duplicatePatient && duplicatePatient._id.toString() !== patientId) {
      throwError("This email is already in the patient list.");
    }

    const updated = await updatePatientById(patientId, { ...validated.data, clinicId });
    if (!updated) {
      throwError("Failed to update patient. Please try again.");
    }

    return serialize(updated);
  });
}

export async function deletePatientAction(patientId) {
  return afterOnboardingActionGuard(PATIENT_PERMISSIONS.DELETE_PATIENT, async ({ clinicId }) => {
    if (!patientId) {
      throwError("Patient ID is required.");
    }

    const patient = await getPatientById(patientId);
    if (!patient) {
      throwError("Patient not found.");
    }

    if (patient.clinicId.toString() !== clinicId.toString()) {
      throwError("You are not authorized to delete this patient.");
    }

    const deleted = await deletePatientById(patientId);
    if (!deleted) {
      throwError("Failed to delete patient. Please try again.");
    }

    return serialize(deleted);
  });
}