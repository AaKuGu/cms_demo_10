import { getStaffs } from "@/services/Staff.services.js";
import PageHeader from "@/components/PageHeader";
import StaffList from "./StaffList";

async function StaffPage() {
const { data: staff, error } = await getStaffs();

  if (error) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-900 font-medium mb-1">Access denied</p>
        <p className="text-sm text-gray-500">{error.message}</p>
      </div>
    );
  } 
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
      <StaffList staff={staff} />
    </div>
  );
}

export default StaffPage;