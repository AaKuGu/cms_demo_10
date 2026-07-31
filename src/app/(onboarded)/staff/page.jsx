import { fetchAllStaffs } from "@/lib/SSRCalls/staffSsrCalls";
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
        rightButton={{ href: "/staff/invite", label: "Invite Staff" }}
      />
      <StaffList staff={staff} />
    </div>
  );
}

export default StaffPage;