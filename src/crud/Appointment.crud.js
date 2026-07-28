import dbConnect from "@/lib/dbConnect";
import Appointment from "@/models/Appointment.model";

export async function createAppointment(data) {
  await dbConnect();
  return Appointment.create(data);
}

export async function getAppointmentById(appointmentId) {
  await dbConnect();
  return Appointment.findById(appointmentId);
}

export async function getAppointment(filter) {
  await dbConnect();
  return Appointment.findOne(filter);
}

export async function getAppointmentList(filter = {}) {
  await dbConnect();
  return Appointment.find(filter).sort({ appointmentDate: 1, startTime: 1 });
}

export async function updateAppointmentById(id, data) {
  await dbConnect();
  return Appointment.findByIdAndUpdate(id, data, { new: true });
}

export async function deleteAppointmentById(id) {
  await dbConnect();
  return Appointment.findByIdAndDelete(id);
}
