// app/staff/accept/AcceptInviteForm.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { staffAcceptInviteAction } from "@/actions/Staff.actions";

export default function AcceptInviteForm({ staffId }) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async () => {
    setIsPending(true);
    const { data, error } = await staffAcceptInviteAction(staffId);
    setIsPending(false);

    if (error) {
      toast.error(error);
      return;
    }
    toast.success("Joined clinic!");
    router.push("/dashboard"); // ya jo bhi post-accept destination ho
  };

  return (
    <button
      type="button"
      onClick={handleSubmit}
      disabled={isPending}
      className="w-full px-4 py-2 rounded-md bg-gray-900 text-white text-sm disabled:opacity-60"
    >
      {isPending ? "Joining..." : "Accept & join clinic"}
    </button>
  );
}