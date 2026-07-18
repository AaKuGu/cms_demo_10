import { getClinic } from "@/crud/Clinic.crud";
import dbConnect from "@/lib/dbConnect";

export async function getClinicByUserId(userId) {
  await dbConnect();
  return getClinic({ userId });
}
