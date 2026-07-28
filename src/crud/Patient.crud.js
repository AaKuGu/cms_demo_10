import dbConnect from "@/lib/dbConnect";
import Patient from "@/models/Patient.model";

export async function createPatient(data) {
  await dbConnect();
  return Patient.create(data);
}

export async function getPatientById(patientId) {
  await dbConnect();
  return Patient.findById(patientId);
}

export async function getPatient(filter) {
  await dbConnect();
  return Patient.findOne(filter);
}

export async function getPatientList(filter = {}) {
  await dbConnect();
  return Patient.find(filter).sort({ createdAt: -1 });
}

export async function updatePatientById(id, data) {
  await dbConnect();
  return Patient.findByIdAndUpdate(id, data, { new: true });
}

export async function deletePatientById(id) {
  await dbConnect();
  return Patient.findByIdAndDelete(id);
}
