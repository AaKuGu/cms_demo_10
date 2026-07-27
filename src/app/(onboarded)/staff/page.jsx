import { fetchAllStaffs } from "@/lib/SSRCalls/ssrCalls";
import PageHeader from "@/components/PageHeader";
import ActionDenied from "@/components/ActionDenied";
import StaffList from "./StaffList";

async function StaffPage() {
  const { data: staff, error } = await fetchAllStaffs();

  if (error) {
    return <ActionDenied message={error} />;
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