import Navbar from "./Navbar/Navbar";
import Sidebar from "./Sidebar/Sidebar";
import { afterOnboardingRoutesGuard } from "@/lib/routes/routes";
export const dynamic = "force-dynamic";

async function OnboardedLayout({ children }) {
  const { clinicId } = await afterOnboardingRoutesGuard();

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

export default OnboardedLayout;