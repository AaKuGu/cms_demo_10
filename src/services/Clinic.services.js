import { getClinic } from "@/crud/Clinic.crud";
import dbConnect from "@/lib/dbConnect";

export async function getClinicByUserId(userId) {
  await dbConnect();
  const clinic = await getClinic({ userId });
  if(clinic?.success) {
    return clinic;
  }
  return { msg: "Clinic not found.", success: false, data: null };
}
