// app/staff/accept/page.jsx
import { getEmailFromSession, getUserIdFromSession } from "@/lib/authentication/authentication";
import { getInvitedStaffByEmail, getStaff } from "@/crud/Staff.crud";
import { getClinic } from "@/crud/Clinic.crud";
import PageHeader from "@/components/PageHeader";
import AcceptInviteForm from "./AcceptInviteForm";
import { redirect } from "next/navigation";
import { serialize } from "@/lib/serialize";
export const dynamic = "force-dynamic";

export default async function AcceptInvitePage() {
  const userId = await getUserIdFromSession();
  if(!userId) {
    redirect("/login?redirect=/invite/accept");
  }
  const email = await getEmailFromSession();
  if(!email) {
    redirect("/login?redirect=/invite/accept");
  }

  const activeStaff = await getStaff({ email: email.toLowerCase(), status: "active" });
  if (activeStaff) {
    redirect("/dashboard");
  }

  const invite = await getInvitedStaffByEmail(email);
  const _invite = serialize(invite);

  if (!_invite) {
    return (
      <div className="max-w-md mx-auto mt-16">
        <div className="border border-gray-200 rounded-lg p-6 text-center">
          <p className="text-sm font-medium text-gray-900 mb-1">No invite found</p>
          <p className="text-sm text-gray-500">
            We couldn't find a pending invite for {email}. Ask the
            clinic owner to check the email address they used.
          </p>
        </div>
      </div>
    );
  }

  const clinic = await getClinic({ _id: _invite.clinicId });

  return (
    <div className="max-w-md mx-auto mt-16">
      <PageHeader title="Join clinic" />

      <div className="border border-gray-200 rounded-lg p-6">
        <p className="text-sm text-gray-500 mb-4">
          You've been invited to join
        </p>
        <p className="text-lg font-medium text-gray-900 mb-6">
          {clinic?.clinicName ?? "this clinic"}
        </p>

        <div className="space-y-3 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Name</span>
            <span className="text-gray-900">{invite.name || "—"}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Designation</span>
            <span className="text-gray-900">{invite.designation || "—"}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Email</span>
            <span className="text-gray-900">{invite.email}</span>
          </div>
        </div>

        {invite.permissions?.length > 0 && (
          <div className="mb-6">
            <p className="text-sm text-gray-500 mb-2">Permissions</p>
            <div className="flex flex-wrap gap-2">
              {invite.permissions.map((p) => (
                <span
                  key={p}
                  className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700"
                >
                  {p.replaceAll("_", " ")}
                </span>
              ))}
            </div>
          </div>
        )}

        <AcceptInviteForm staffId={_invite._id} />
      </div>
    </div>
  );
}