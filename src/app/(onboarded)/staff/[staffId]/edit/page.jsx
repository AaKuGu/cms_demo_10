import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import ActionDenied from "@/components/ActionDenied";
import { fetchStaff } from "@/lib/SSRCalls/staffSsrCalls";
import EditClient from "./EditClient";

export default async function StaffEditPage({ params }) {
  const { staffId } = await params;
  const { data: staff, error } = await fetchStaff(staffId);

  if (error) {
    return <ActionDenied message={error} />;
  }

  return (
    <div className="max-w-3xl">
      <PageHeader
        title="Staff Edit"
        description="Fetched staff data from the SSR call."
        action={
          <Link
            href="/staff"
            className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800"
          >
            Back to staff
          </Link>
        }
      />

      <EditClient initialValues={staff} />
    </div>
  );
}
