import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import ActionDenied from "@/components/ActionDenied";
import { fetchStaff } from "@/lib/SSRCalls/staffSsrCalls";

export default async function StaffDetailPage({ params }) {
  const { staffId } = await params;
  const { data: staff, error } = await fetchStaff(staffId);

  if (error) {
    return <ActionDenied message={error} />;
  }

  const { name, email, designation, phone, status, permissions } = staff;

  return (
    <div className="space-y-8 max-w-4xl">
      <PageHeader
        title={name || email || "Staff member"}
        description="Staff profile and permissions for the selected team member."
        action={
          <Link
            href="/staff"
            className="px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            Back to staff
          </Link>
        }
      />

      <div className="grid gap-6">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <p className="text-sm font-medium text-gray-500">Name</p>
              <p className="mt-2 text-gray-900">{name || "-"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Email</p>
              <p className="mt-2 text-gray-900">{email || "-"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Designation</p>
              <p className="mt-2 text-gray-900">{designation || "No designation"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Phone</p>
              <p className="mt-2 text-gray-900">{phone || "Not provided"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Status</p>
              <p className="mt-2 text-gray-900 capitalize">{status || "Unknown"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Permissions</p>
              <p className="mt-2 text-gray-900">{permissions?.length ?? 0} assigned</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-500 mb-4">Permission details</p>
          {permissions?.length > 0 ? (
            <div className="space-y-2">
              {permissions.map((permission) => (
                <div
                  key={permission}
                  className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700"
                >
                  {permission}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No permissions assigned to this member.</p>
          )}
        </div>
      </div>
    </div>
  );
}
