import { getClinicIdFromSession, getUserIdFromSession } from "@/lib/authentication/authentication";
import { redirect } from "next/navigation";

async function OnboardingLayout({children}) {
  
    const userId = await getUserIdFromSession();

    if(!userId) {
      redirect("/login");
    }

    const clinicId = await getClinicIdFromSession();
    if(clinicId){
      redirect("/dashboard")
    }

  return <>{children}</>;
}

export default OnboardingLayout;