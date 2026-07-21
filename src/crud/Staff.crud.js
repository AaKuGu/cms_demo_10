import dbConnect from "@/lib/dbConnect";
import Staff from "@/models/Staff.model";

export async function createStaff(data) {
  await dbConnect();
  return Staff.create(data);
}

export async function getStaffById(id) {
  await dbConnect();
  return Staff.findById(id);
}

export async function getStaff(filter) {
  await dbConnect();
  return Staff.findOne(filter);
}

export async function getStaffList(filter) {
  await dbConnect();
  return Staff.find(filter).sort({ createdAt: -1 });
}

export async function updateStaffById(id, data) {
  await dbConnect();
  return Staff.findByIdAndUpdate(id, data, { new: true });
}

export async function deleteStaffById(id) {
  await dbConnect();
  return Staff.findByIdAndDelete(id);
}