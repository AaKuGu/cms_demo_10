import { AuthenticatedHoc } from "@/hoc/AuthenticatedHoc";
import { getStaffs } from "@/services/Staff.services.js";
import PageHeader from "@/components/PageHeader";
import StaffList from "./StaffList";

async function StaffPage({ clinicId }) {
  const staff = await getStaffs(clinicId);

  return (
    <div>
      <PageHeader
        title="Staff"
        description="People with access to your clinic, and what they're allowed to do."
        action={
          <a
            href="/staff/invite"
            className="px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            Invite Staff
          </a>
        }
      />
      <StaffList staff={JSON.parse(JSON.stringify(staff))} />
    </div>
  );
}

export default AuthenticatedHoc(StaffPage);