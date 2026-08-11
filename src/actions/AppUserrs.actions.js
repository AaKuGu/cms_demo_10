"use server";

import { createAppUser } from "@/crud/AppUser.crud";
import { afterOnboardingActionGuard, beforeOnboardingActionGuard } from "@/lib/actions/action";
import { logConsole } from "@/lib/console/console";
import { serialize } from "@/lib/serialize";
import { throwError } from "@/lib/throwError";
import { validateInputs } from "@/lib/validateInputs";
import { createAppUserValidator } from "@/validators/AppUser.validators";


export async function createAppUserAction() {
    return beforeOnboardingActionGuard(async ({ userIdFromAuthLibrary, appUser }) => {

        const email = appUser.email;
        const name = appUser.name;

        logConsole(`/actions/AppUsers.actions : email , name : `, email, name);

        const validated = validateInputs(createAppUserValidator, { email, name });
        if (!validated.success) {
            throwError(validated.error);
        }

        logConsole("actions/appusers : createAppUserAction :  validated ", validated)


        const created = await createAppUser({ name, email, userIdFromAuthLibrary });
        if (!created) {
            throwError("Failed to add patient. Please try again.");
        }

        logConsole("action : createAppUserAction : ", created)

        return serialize(created);
    });
}


//following func can be deleted anytime
export async function updatePatientAction(formData, patientId) {
    return beforeOnboardingActionGuard(PATIENT_PERMISSIONS.UPDATE_PATIENT, async ({ clinicId }) => {
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
