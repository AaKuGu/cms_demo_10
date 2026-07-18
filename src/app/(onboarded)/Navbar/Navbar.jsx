import { getClinicName } from "@/services/Navbar.services";
import LogoutButton from "./LogoutButton";

export default async function Navbar({ clinicId }) {
  const clinicName = await getClinicName(clinicId);

  return (
    <nav className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-3">
      <span className="text-sm font-semibold text-slate-900">
        {clinicName}
      </span>

      <div className="flex items-center gap-4">
        {/* nav links — empty for now, add later */}
      </div>

      <div>
        <LogoutButton />
      </div>
    </nav>
  );
}