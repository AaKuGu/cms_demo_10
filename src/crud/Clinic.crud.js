import dbConnect from "@/lib/dbConnect";
import Clinic from "@/models/Clinic.model";

export async function createClinic(data) {
  await dbConnect();
  return Clinic.create(data);
}

export async function getClinicById(id) {
  await dbConnect();
  return Clinic.findById(id);
}

export async function getClinic(filter = {}) {
  await dbConnect();
  return Clinic.findOne(filter);
}

export async function getClinics(filter = {}) {
  await dbConnect();
  return Clinic.find(filter);
}

export async function updateClinicById(id, data) {
  await dbConnect();
  return Clinic.findByIdAndUpdate(id, data, { new: true });
}

export async function deleteClinicById(id) {
  await dbConnect();
  return Clinic.findByIdAndDelete(id);
}