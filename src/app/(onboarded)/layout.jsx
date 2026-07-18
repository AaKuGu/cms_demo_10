import { AuthenticatedHoc } from "@/hoc/AuthenticatedHoc";
import { redirect } from "next/navigation";
import Navbar from "./Navbar/Navbar";
import Sidebar from "./Sidebar/Sidebar";

async function OnboardedLayout({ clinicId, children }) {
  if (!clinicId) redirect("/onboarding");

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar clinicId={clinicId} />
      <div className="flex flex-1">
        <Sidebar/>
      <main className="flex-1 px-8 py-8 flex justify-center">
          <div className="w-full max-w-3xl">{children}</div>
        </main>
      </div>
    </div>
  );
}

export default AuthenticatedHoc(OnboardedLayout);