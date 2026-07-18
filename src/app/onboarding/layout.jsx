import { AuthenticatedHoc } from "@/hoc/AuthenticatedHoc";
import { redirect } from "next/navigation";

function OnboardingLayout({ children, userId, clinicId }) {
  console.log(userId); // the logged-in user's id, available here

  if(!userId) redirect("/login");
  if(clinicId) redirect ("/dashboard")

  return <>{children}</>;
}

export default AuthenticatedHoc(OnboardingLayout);