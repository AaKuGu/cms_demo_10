// "use client";

// import { useRouter } from "next/navigation";

// const STATUS_STYLES = {
//   active: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20",
//   invited: "bg-amber-50 text-amber-700 ring-1 ring-amber-600/20",
//   revoked: "bg-gray-100 text-gray-500 ring-1 ring-gray-400/20",
// };

// const STATUS_LABELS = {
//   active: "Active",
//   invited: "Invite sent",
//   revoked: "Revoked",
// };

// function initials(name, email) {
//   const source = name || email;
//   return source
//     .split(/[\s@.]+/)
//     .filter(Boolean)
//     .slice(0, 2)
//     .map((s) => s[0].toUpperCase())
//     .join("");
// }

// export default function StaffList({ staff }) {
//   const router = useRouter();

//   if (staff.length === 0) {
//     return (
//       <div className="border border-dashed border-gray-300 rounded-xl p-12 text-center">
//         <p className="text-gray-900 font-medium mb-1">No staff yet</p>
//         <p className="text-sm text-gray-500 mb-5">
//           Invite your receptionist or helper to give them access.
//         </p>
//         <button
//           onClick={() => router.push("/staff/invite")}
//           className="px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors"
//         >
//           Invite your first team member
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="border border-gray-200 rounded-xl divide-y divide-gray-200 overflow-hidden">
//       {staff.map((member) => (
//         <div
//           key={member._id}
//           onClick={() => router.push(`/staff/${member._id}`)}
//           className="flex items-center justify-between px-5 py-4 hover:bg-gray-50 cursor-pointer transition-colors"
//         >
//           <div className="flex items-center gap-3 min-w-0">
//             <div className="w-9 h-9 rounded-full bg-gray-900 text-white text-xs font-semibold flex items-center justify-center shrink-0">
//               {initials(member.name, member.email)}
//             </div>
//             <div className="min-w-0">
//               <p className="font-medium text-gray-900 truncate">
//                 {member.name || member.email}
//               </p>
//               <p className="text-sm text-gray-500 truncate">
//                 {member.designation || "No designation"} ·{" "}
//                 {member.permissions?.length ?? 0} permissions
//               </p>
//             </div>
//           </div>

//           <div className="flex items-center gap-3 shrink-0">
//             <span
//               className={`text-xs font-medium px-2.5 py-1 rounded-full ${STATUS_STYLES[member.status]}`}
//             >
//               {STATUS_LABELS[member.status]}
//             </span>
//             <button
//               onClick={(e) => e.stopPropagation()}
//               className="text-sm text-red-600 hover:text-red-700 font-medium"
//             >
//               Revoke
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { revokeStaffAction } from "@/actions/Staff.actions";
import { useSubmitWithToast } from "@/hooks/useSubmitWithToast";

const STATUS_STYLES = {
  active: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20",
  invited: "bg-amber-50 text-amber-700 ring-1 ring-amber-600/20",
  revoked: "bg-gray-100 text-gray-500 ring-1 ring-gray-400/20",
};

const STATUS_LABELS = {
  active: "Active",
  invited: "Invite sent",
  revoked: "Revoked",
};

function initials(name, email) {
  const source = name || email;
  return source
    .split(/[\s@.]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0].toUpperCase())
    .join("");
}

export default function StaffList({ staff }) {
  const router = useRouter();
  const [revokingId, setRevokingId] = useState(null);
  const [, submitRevoke, isPending] = useSubmitWithToast(revokeStaffAction, {
    error: null,
    success: null,
  });

  const handleRevoke = (e, staffId) => {
    e.stopPropagation();
    if (!window.confirm("Revoke this staff member's access?")) return;
    setRevokingId(staffId);
    submitRevoke(staffId);
  };

  if (staff.length === 0) {
    return (
      <div className="border border-dashed border-gray-300 rounded-xl p-12 text-center">
        <p className="text-gray-900 font-medium mb-1">No staff yet</p>
        <p className="text-sm text-gray-500 mb-5">
          Invite your receptionist or helper to give them access.
        </p>
        <button
          onClick={() => router.push("/staff/invite")}
          className="px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          Invite your first team member
        </button>
      </div>
    );
  }

  return (
    <div className="border border-gray-200 rounded-xl divide-y divide-gray-200 overflow-hidden">
      {staff.map((member) => (
        <div
          key={member._id}
          onClick={() => router.push(`/staff/${member._id}`)}
          className="flex items-center justify-between px-5 py-4 hover:bg-gray-50 cursor-pointer transition-colors"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-full bg-gray-900 text-white text-xs font-semibold flex items-center justify-center shrink-0">
              {initials(member.name, member.email)}
            </div>
            <div className="min-w-0">
              <p className="font-medium text-gray-900 truncate">
                {member.name || member.email}
              </p>
              <p className="text-sm text-gray-500 truncate">
                {member.designation || "No designation"} ·{" "}
                {member.permissions?.length ?? 0} permissions
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span
              className={`text-xs font-medium px-2.5 py-1 rounded-full ${STATUS_STYLES[member.status]}`}
            >
              {STATUS_LABELS[member.status]}
            </span>
            {member.status !== "revoked" && (
              <button
                onClick={(e) => handleRevoke(e, member._id)}
                disabled={isPending && revokingId === member._id}
                className="text-sm text-red-600 hover:text-red-700 font-medium disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {isPending && revokingId === member._id ? "Revoking..." : "Revoke"}
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}