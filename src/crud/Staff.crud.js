import dbConnect from "@/lib/dbConnect";
import Staff from "@/models/Staff.model";

export async function createStaff(data) {
  await dbConnect();
  return Staff.create(data);
}

export async function getStaffById(staffId) {
  return await Staff.findById(staffId);
}

export async function acceptStaffInvite(staffId, userId) {
  return await Staff.findByIdAndUpdate(
    staffId,
    { userId, status: "active" },
    { new: true }
  );
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

export async function getStaffByUserId(userId) {
  await dbConnect();
  return Staff.findOne({ userId, status: "active" });
}

export async function getStaffByEmail(clinicId, email) {
  await dbConnect();
  return Staff.findOne({ clinicId, email: email.toLowerCase(), status: "active" });
}

export async function getInvitedStaffByEmail(email) {
  await dbConnect();
  return Staff.findOne({ email: email.toLowerCase(), status: "invited" });
}